import { defineStore } from 'pinia';

export const sharedStore = defineStore('sharedStore', () => {
	const markPriceBinance = ref<SHARED.MarkPrice[]>([]);

	return {
		markPriceBinance,
	};
});
