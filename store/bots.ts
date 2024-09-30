import { defineStore } from 'pinia';
import { ENDPOINT } from '~/const/request';
import { apiStore } from '~/store/api';

export const botsStore = defineStore('botsStore', () => {
	const api = apiStore();

	const activeBots = ref<BOTS.ActiveBots[]>([]);

	const requestActiveBots = async (): Promise<void> => {
		try {
			const response = await api.get(ENDPOINT.bots.gritBot.get);
			if (response?.success) activeBots.value = response?.data || [];
		}
		catch (e) {
			activeBots.value = [];
		}
	};

	return {
		activeBots,
		requestActiveBots
	};
});
