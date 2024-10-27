<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { sharedStore } from '~/store/shared';

const storeShared = sharedStore();
const { markPriceBinance } = storeToRefs(storeShared);

const marketPrice = computed(() => {
	const marketPrice: SHARED.MarkPrice[] = [];
	for (const symbol of ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'IMXUSDT']) {
		const market = markPriceBinance.value.find(item => item.s === symbol);
		if (market) marketPrice.push({ ...market, p: Number(market.p).toFixed(2) });
	}
	return marketPrice;
});
</script>

<template>
	<div class="d-flex flex-row ga-4 ma-8">
		<p
			v-for="market in marketPrice"
			:key="market.s"
			class="text-body-2"
		>
			{{ market?.s }} {{ market?.p }}
		</p>
	</div>
</template>

<style scoped lang="scss">

</style>
