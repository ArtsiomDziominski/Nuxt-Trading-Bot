import { defineStore } from 'pinia';
import axios from 'axios';
import { ENDPOINT_BINANCE, URL_BINANCE } from '~/const/request';

export const useExchangeInfo = defineStore('exchangeInfo', () => {
	const exchangeInfo = ref<EXCHANGE_INFO.exchangeInfo | null>(null);
	const isLoadingExchangeInfo = ref(false);

	const exchangeInfoSymbols = computed(() => {
		return exchangeInfo.value?.symbols || [];
	});

	const loadExchangeInfo = async (): Promise<void> => {
		isLoadingExchangeInfo.value = true;
		try {
			const response = await axios.get(URL_BINANCE.futures + ENDPOINT_BINANCE.exchangeInfo);
			if (response?.data) exchangeInfo.value = response?.data || null;
		}
		catch (e) {
			//
		}
		isLoadingExchangeInfo.value = false;
	};

	return {
		exchangeInfoSymbols,
		isLoadingExchangeInfo,
		loadExchangeInfo,
	};
});
