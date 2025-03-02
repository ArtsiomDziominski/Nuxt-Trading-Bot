import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import { ENDPOINT } from '~/const/request';
import { apiStore } from '~/store/api';
import { BotTypes, Strategy } from '~/const/bots';
import { ruleEmpty } from '~/const/validation';
import { validationStore } from '~/store/validation';
import { notificationStore } from '~/store/notification';

export const createBotsStore = defineStore('createBotsStore', () => {
	const api = apiStore();
	const storeValidation = validationStore();
	const storeNotification = notificationStore();
	const translation = useI18n();
	const isModalSelectBots = ref(false);
	const isModalCreateBots = ref(false);
	const isLoadingCreateBot = ref(false);
	const createBotParams = ref<
		{
			apiId: null | number;
			symbol: EXCHANGE_INFO.SymbolInfo | null;
			amountStart: string;
			price: string;
			amount: string;
			orders: string;
			step: string;
			decimals: string;
			strategy: Strategy;
			type: BotTypes;
		}
	>({
		apiId: null,
		symbol: null,
		amountStart: '',
		price: '',
		amount: '',
		orders: '',
		step: '',
		decimals: '',
		strategy: Strategy.DEFAULT,
		type: BotTypes.Market,
	});
	const errors = ref({
		apiId: { message: '' },
		symbol: { message: '' },
		amountStart: { message: '' },
		orders: { message: '' },
		step: { message: '' },
		decimals: { message: '' },
		price: { message: '' },
	});

	const requestCreateBot = async (): Promise<boolean> => {
		isLoadingCreateBot.value = true;
		try {
			const body = {
				idApi: createBotParams.value.apiId,
				params: {
					symbol: createBotParams.value.symbol?.pair?.toUpperCase() || '',
					qty: Number(createBotParams.value.amountStart),
					price: createBotParams.value.type === BotTypes.Market ? 0 : createBotParams.value.price,
					side: 'BUY',
					qtyOpenOrders: Number(createBotParams.value.orders),
					step: Number(createBotParams.value.step),
					decimals: Number(createBotParams.value.decimals),
					strategy: createBotParams.value.strategy,
					stepRevers: null, // stepRevers: (Number(createBotParams.value.amountStart) * 3).toFixed(Number(createBotParams.value.decimals)),
				},
			};

			const response = await api.post(ENDPOINT.bots.gritBot.create, body);
			if (response?.success)
				storeNotification.addNotification('success', response?.message || translation.t('createBot.botReadySoon'));

			isLoadingCreateBot.value = false;
			return !!response?.success;
		}
		catch (e) {
			console.error(e);
		}
		isLoadingCreateBot.value = false;
		return false;
	};

	const appendErrors = (error: COMMON.Errors): void => {
		errors.value = { ...errors.value, ...error };
	};

	const clearBotParams = (): void => {
		createBotParams.value = {
			...createBotParams.value,
			...{
				symbol: null,
				amountStart: '',
				price: '',
				amount: '',
				orders: '',
				step: '',
				decimals: '',
				strategy: Strategy.DEFAULT,
			},
		};
	};

	const checkValidationCreateBot = (): boolean => {
		let errorsList = {};
		const isValidationList = [];
		const validationRulesApi = ruleEmpty(createBotParams.value?.apiId || '');
		const validationRulesSymbol = ruleEmpty(createBotParams.value.symbol?.symbol);
		const validationRulesAmountStart = ruleEmpty(createBotParams.value.amountStart);
		const validationRulesOrders = ruleEmpty(createBotParams.value.orders);
		const validationRulesStep = ruleEmpty(createBotParams.value.step);
		const validationRulesDecimals = ruleEmpty(createBotParams.value.decimals);
		const validationRulesPrice = ruleEmpty(createBotParams.value.price);

		const validationApi = storeValidation.makeCheckRules('apiId', validationRulesApi);
		const validationSymbol = storeValidation.makeCheckRules('symbol', validationRulesSymbol);
		const validationAmountStart = storeValidation.makeCheckRules('amountStart', validationRulesAmountStart);
		const validationOrders = storeValidation.makeCheckRules('orders', validationRulesOrders);
		const validationStep = storeValidation.makeCheckRules('step', validationRulesStep);
		const validationDecimals = storeValidation.makeCheckRules('decimals', validationRulesDecimals);

		if (createBotParams.value.type === BotTypes.Limit) {
			const validationPrice = storeValidation.makeCheckRules('price', validationRulesPrice);
			errorsList = { ...errorsList, ...validationPrice.error };
			isValidationList.push(validationPrice.isValid);
		}

		appendErrors({
			...errorsList,
			...validationApi.error,
			...validationSymbol.error,
			...validationAmountStart.error,
			...validationOrders.error,
			...validationStep.error,
			...validationDecimals.error,
		});
		return validationApi.isValid
			&& validationSymbol.isValid
			&& validationAmountStart.isValid
			&& validationOrders.isValid
			&& validationStep.isValid
			&& validationDecimals.isValid;
	};

	return {
		isModalSelectBots,
		isModalCreateBots,
		createBotParams,
		errors,
		isLoadingCreateBot,
		requestCreateBot,
		appendErrors,
		clearBotParams,
		checkValidationCreateBot,
	};
});
