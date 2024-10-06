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

	const countBotsActive = computed((): number => {
		return activeBots.value.reduce((acc, bot) => (bot.positionsRisk.filter(risk => risk.positionRisk.isActive)?.length || 0) + acc, 0);
	});

	const countBotsDeactivate = computed((): number => {
		return activeBots.value.reduce((acc, bot) => (bot.positionsRisk.filter(risk => !risk.positionRisk.isActive)?.length || 0) + acc, 0);
	});

	return {
		activeBots,
		countBotsActive,
		countBotsDeactivate,
		requestActiveBots,
	};
});
