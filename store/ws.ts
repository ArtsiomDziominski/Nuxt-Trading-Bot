import { defineStore, storeToRefs } from 'pinia';
import { userStore } from '~/store/user';
import { botsStore } from '~/store/bots';
import { notificationStore } from '~/store/notification';
import { sharedStore } from '~/store/shared';

enum NotificationType {
	connection = 'CONNECTION',
	auth = 'NOTIFICATION_AUTH',
	bot = 'NOTIFICATION_BOT',
	botError = 'ERROR_NOTIFICATION_BOT',
	positionRisk = 'NOTIFICATION_POSITION_RISK',
	positionRiskError = 'ERROR_NOTIFICATION_POSITION_RISK',
}

export const wsStore = defineStore('wsStore', () => {
	const config = computed(() => useRuntimeConfig());
	const WS_URL = computed(() => config.value.public.WS_URL);
	const storeUser = userStore();
	const { userToken } = storeToRefs(storeUser);
	const storeBots = botsStore();
	const storeNotification = notificationStore();
	const storeShared = sharedStore();
	const { markPriceBinance } = storeToRefs(storeShared);

	const reconnectAttempts = ref(0);
	const maxReconnectAttempts = 10;

	const socket = ref<WebSocket | null>(null);
	const socketMarkPrice = ref<WebSocket | null>(null);

	function webSocketServer() {
		socket.value = new WebSocket(WS_URL.value);

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
				console.log('Не удалось подключиться к WebSocket после нескольких попыток');
			}
		};

		socket.value.onopen = () => {
			reconnectAttempts.value = 0;
		};

		socket.value.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				switch (data?.notificationType || data?.type) {
					case NotificationType.positionRisk:
						if (data?.data?.api?.id && data?.data?.positionsRisk?.length) {
							storeBots.updateActiveBotsFromWS(data.data.api.id, data.data.positionsRisk);
						}
						break;
					case NotificationType.bot:
						storeNotification.addNotification('success', data?.data?.message);
						break;
					case NotificationType.botError:
						storeNotification.addNotification('error', data?.data?.message);
						break;
					case NotificationType.connection:
						console.log(socket.value);
						if (socket.value) socket.value.send(JSON.stringify({
							authorization: userToken.value,
						}));
						break;
				}
			}
			catch (e) {
				console.error('Ошибка при обработке сообщения WebSocket:', e);
			}
		};

		socket.value.onclose = () => {
			storeNotification.addNotification('error', 'Соединение с WebSocket "Server" закрыто');
			console.log('WebSocket закрыт, попытка переподключения...');
			if (socket.value) reconnect();
		};

		socket.value.onerror = (error) => {
			storeNotification.addNotification('error', 'Произошла ошибка WebSocket');
			console.error('Произошла ошибка WebSocket:', error);
			if (socket.value) socket.value.close();
		};
	}

	const webSocketServerDisconnect = () => {
		if (socket.value) {
			socket.value.close();
			socket.value = null;
		}
		else {
			console.log('Нет активного WebSocket соединения для отключения');
		}
	};

	const webSocketMarkPrice = () => {
		const WS_URL = 'wss://fstream.binance.com/ws/!markPrice@arr';
		socketMarkPrice.value = new WebSocket(WS_URL);
		const reconnectAttempts = { value: 0 };
		const maxReconnectAttempts = 20;

		const reconnect = () => {
			if (reconnectAttempts.value < maxReconnectAttempts) {
				reconnectAttempts.value++;
				const reconnectTimeout = Math.min(1000 * Math.pow(2, reconnectAttempts.value), 30000);
				setTimeout(() => {
					console.log(`Попытка переподключения (${reconnectAttempts.value})...`);
					webSocketMarkPrice();
				}, reconnectTimeout);
			}
			else {
				console.log('Не удалось подключиться к WebSocket после нескольких попыток');
			}
		};

		socketMarkPrice.value.onopen = () => {
			reconnectAttempts.value = 0;
			console.log('Подключено к WebSocket Binance Futures');
		};

		socketMarkPrice.value.onmessage = (event) => {
			try {
				markPriceBinance.value = JSON.parse(event.data);
			}
			catch (e) {
				markPriceBinance.value = [];
				console.error('Ошибка при обработке сообщения WebSocket:', e);
			}
		};

		socketMarkPrice.value.onclose = () => {
			console.log('WebSocket закрыт, попытка переподключения...');
			if (socketMarkPrice.value) reconnect();
		};

		socketMarkPrice.value.onerror = (error) => {
			console.error('Произошла ошибка WebSocket:', error);
			if (socketMarkPrice.value) socketMarkPrice.value.close();
		};
	};

	const webSocketMarkPriceDisconnect = () => {
		if (socketMarkPrice.value) {
			socketMarkPrice.value.close();
			socketMarkPrice.value = null;
		}
		else {
			console.log('Нет активного WebSocket соединения для отключения');
		}
	};

	return {
		webSocketServer,
		webSocketMarkPrice,
		webSocketServerDisconnect,
	};
});
