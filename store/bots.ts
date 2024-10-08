import { defineStore } from 'pinia';
import { ENDPOINT } from '~/const/request';
import { apiStore } from '~/store/api';
import { notificationStore } from '~/store/notification';

export const botsStore = defineStore('botsStore', () => {
	const api = apiStore();
	const notification = notificationStore();

	const activeBots = ref<BOTS.ActiveBots[]>([]);
	const isLoadingActiveBots = ref<boolean>(false);
	const isLoadingTakeProfitGridBot = ref<boolean>(false);

	const requestActiveBots = async (): Promise<void> => {
		isLoadingActiveBots.value = true;
		try {
			const response = await api.get(ENDPOINT.bots.gritBot.get);
			if (response?.success) activeBots.value = response?.data || [];
		}
		catch (e) {
			activeBots.value = [];
		}
		isLoadingActiveBots.value = false;
	};

	const requestTakeProfitGridBot = async (symbol: string, apiId: string | undefined): Promise<void> => {
		isLoadingTakeProfitGridBot.value = true;
		try {
			const response = await api.post(ENDPOINT.bots.gritBot.takeProfit, { symbol, apiId });
			if (response?.success) notification.addNotification('success', `${response?.message} ${response?.data?.symbol}`);
			else notification.addNotification('error', `${response?.message} ${response?.data?.symbol}`);
		}
		catch (e) {
			activeBots.value = [];
		}
		isLoadingTakeProfitGridBot.value = false;
	};

	const countBotsActive = computed((): number => {
		return activeBots.value?.reduce((acc, bot) => (bot.positionsRisk?.filter(risk => risk.positionRisk.isActive)?.length || 0) + acc, 0) || 0;
	});

	const countBotsDeactivate = computed((): number => {
		return activeBots.value?.reduce((acc, bot) => (bot.positionsRisk?.filter(risk => !risk.positionRisk.isActive)?.length || 0) + acc, 0) || 0;
	});

	const updateActiveBotsFromWS = (apiId: string, positionsRisk: BOTS.PositionRisk[]): void => {
		const apiIndex = activeBots.value.findIndex(item => item.api.id === apiId);
		if (apiIndex === -1) return;
		positionsRisk.forEach((newRisk) => {
			const positionRiskIndex = activeBots.value?.[apiIndex]?.positionsRisk.findIndex(risk => risk.positionParam?.symbol === newRisk?.symbol);
			if (positionRiskIndex === -1) return;
			if (activeBots.value?.[apiIndex]?.positionsRisk?.[positionRiskIndex]?.positionRisk) activeBots.value[apiIndex].positionsRisk[positionRiskIndex].positionRisk = newRisk;
		});
	};

	return {
		activeBots,
		countBotsActive,
		countBotsDeactivate,
		isLoadingActiveBots,
		isLoadingTakeProfitGridBot,
		requestActiveBots,
		updateActiveBotsFromWS,
		requestTakeProfitGridBot,
	};
});
