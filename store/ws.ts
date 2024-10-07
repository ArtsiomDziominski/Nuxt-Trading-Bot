import { defineStore, storeToRefs } from 'pinia';
import { userStore } from '~/store/user';
import { botsStore } from '~/store/bots';
import { notificationStore } from '~/store/notification';

export const wsStore = defineStore('wsStore', () => {
	const config = computed(() => useRuntimeConfig());
	const WS_URL = computed(() => config.value.public.WS_URL);
	const storeUser = userStore();
	const { userToken } = storeToRefs(storeUser);
	const storeBots = botsStore();
	const storeNotification = notificationStore();

	const reconnectAttempts = ref(0);
	const maxReconnectAttempts = 10;

	function webSocketServer() {
		const socket = new WebSocket(WS_URL.value);

		const reconnect = () => {
			if (reconnectAttempts.value < maxReconnectAttempts) {
				reconnectAttempts.value++;
				const reconnectTimeout = Math.min(1000 * Math.pow(2, reconnectAttempts.value), 30000);
				setTimeout(() => {
					console.log(`Попытка переподключения (${reconnectAttempts.value})...`);
					webSocketServer();
				}, reconnectTimeout);
			}
			else {
				storeNotification.addNotification('error', 'Не удалось подключиться к WebSocket после нескольких попыток');
			}
		};

		socket.onopen = () => {
			reconnectAttempts.value = 0;
			socket.send(JSON.stringify({
				authorization: userToken.value,
			}));
		};

		socket.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				switch (data.type) {
					case 'NOTIFICATION_POSITION_RISK':
						if (data?.data?.api?.id && data?.data?.positionsRisk?.length) {
							storeBots.updateActiveBotsFromWS(data.data.api.id, data.data.positionsRisk);
						}
						break;
					case 'NOTIFICATION_BOT':
						storeNotification.addNotification('success', data?.data?.message);
						break;
				}
			}
			catch (e) {
				console.error('Ошибка при обработке сообщения WebSocket:', e);
			}
		};

		socket.onclose = () => {
			storeNotification.addNotification('error', 'Соединение с WebSocket закрыто');
			console.log('WebSocket закрыт, попытка переподключения...');
			reconnect();
		};

		socket.onerror = (error) => {
			storeNotification.addNotification('error', 'Произошла ошибка WebSocket');
			console.error('Произошла ошибка WebSocket:', error);
			socket.close();
		};
	}

	return {
		webSocketServer,
	};
});
