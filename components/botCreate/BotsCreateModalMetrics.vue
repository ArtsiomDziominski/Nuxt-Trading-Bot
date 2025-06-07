<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { calculateGridBot } from '~/utils/calculate/calculateLiquidationPrice';
import { sharedStore } from '~/store/shared';
import { createBotsStore } from '~/store/createBots';

const storeShared = sharedStore();
const { markPriceBinance } = storeToRefs(storeShared);
const storeCreateBots = createBotsStore();
const { createBotParams } = storeToRefs(storeCreateBots);

const balance = ref(1000);

const priceNow = computed((): string => {
	const price = markPriceBinance.value.find(item => item.s === createBotParams.value.symbol?.symbol)?.p;
	return price ? Number(price).toFixed(2) : '';
});

const gridBotMetrics = computed(() => {
	const body = {
		entryPrice: Number(priceNow.value),
		startCoins: Number(createBotParams.value.amountStart),
		walletBalance: balance.value,
		stepPercent: Number(createBotParams.value.step),
		numberOfOrders: Number(createBotParams.value.orders),
		decimals: Number(createBotParams.value.decimals),
	};

	if (Object.values(body).every(Boolean)) {
		const calculateGridBotMetrics = calculateGridBot.calculateGridBotMetrics(body);
		return {
			price: priceNow.value + ' ' + symbolFiat.value,
			...calculateGridBotMetrics,
			coinsAtEachOrder: calculateGridBotMetrics.coinsAtEachOrder.join(', '),
			averagePrice: '~' + calculateGridBotMetrics.averagePrice + ' ' + symbolFiat.value,
			nextOrderCoins: calculateGridBotMetrics.nextOrderCoins + ' ' + symbolCrypto.value,
			totalCoins: calculateGridBotMetrics.totalCoins + ' ' + symbolCrypto.value,
			liquidationPrice: (Number(calculateGridBotMetrics?.liquidationPrice) > 0 ? `~${calculateGridBotMetrics.liquidationPrice} ${symbolFiat.value}` : '-'),
		};
	}
	return undefined;
});

const symbolCrypto = computed(() => {
	return createBotParams.value.symbol?.symbol.replace('USDT', '').replace('USDC', '');
});

const symbolFiat = computed(() => {
	return createBotParams.value.symbol?.symbol.includes('USDT') ? 'USDT' : createBotParams.value.symbol?.symbol.includes('USDT') ? 'USDC' : '';
});
</script>

<template>
	<v-expansion-panels v-if="gridBotMetrics?.liquidationPrice">
		<v-expansion-panel>
			<v-expansion-panel-title>{{ $t(`createBot.liquidationPrice`) }}: {{ gridBotMetrics?.liquidationPrice }}</v-expansion-panel-title>
			<v-expansion-panel-text>
				<BotCreateBotsCreateModalMetricsBalance v-model="balance" />
				<div
					v-for="(metric, key) in gridBotMetrics"
					:key="key"
					class="create-bot-metrics__metric"
				>
					<span
						:title="String(metric)"
						class="text-grey"
					>
						{{ $t(`createBot.${key}`) }}:
					</span>
					<span :title="String(metric)">{{ metric }}</span>
				</div>
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<style scoped lang="scss">
  .create-bot-metrics {
    &__metric {
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 4px 0;
    }
  }
</style>
