import { defineStore } from 'pinia';
import { ENDPOINT } from '~/const/request';
import { apiStore } from '~/store/api';
import { notificationStore } from '~/store/notification';

export const historyStore = defineStore('historyStore', () => {
	const api = apiStore();
	const storeNotification = notificationStore();

	const isModalHistoryGridBotCreated = ref(false);
	const isLoadingHistoryCreatedGridBot = ref(false);
	const isLoadingDeleteHistoryCreatedGridBot = ref<Record<string, boolean>>({});
	const historyCreatedGridBot = ref<HISTORY_BOTS.GridBot[]>([]);

	const requestHistoryGridBotCreated = async (): Promise<void> => {
		isLoadingHistoryCreatedGridBot.value = true;
		try {
			const response = await api.get(ENDPOINT.history.gridBot.created);
			if (response?.success) historyCreatedGridBot.value = response?.history || [];
		}
		catch (e) {
			console.error(e);
		}
		isLoadingHistoryCreatedGridBot.value = false;
	};

	const requestDeleteHistoryGridBotCreated = async (id: string): Promise<void> => {
		isLoadingDeleteHistoryCreatedGridBot.value = { ...isLoadingDeleteHistoryCreatedGridBot.value, [id]: true };
		try {
			const response = await api.deleteJson(ENDPOINT.history.gridBot.created, { id });
			if (response?.success) {
				historyCreatedGridBot.value = historyCreatedGridBot.value.filter(item => item._id !== id);
				storeNotification.addNotification('success', response.message);
			}
		}
		catch (e) {
			console.error(e);
		}
		isLoadingDeleteHistoryCreatedGridBot.value[id] = false;
	};

	return {
		isModalHistoryGridBotCreated,
		isLoadingHistoryCreatedGridBot,
		historyCreatedGridBot,
		isLoadingDeleteHistoryCreatedGridBot,
		requestDeleteHistoryGridBotCreated,
		requestHistoryGridBotCreated,
	};
});
