<script setup lang="ts">
defineProps({
	position: {
		type: Object as PropType<BOTS.ActiveBotsPositionRisk>,
		required: true,
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

defineEmits(['takeProfit', 'stopBot']);
</script>

<template>
	<v-card class="action-card">
		<LoaderBox
			v-if="loading"
			class="loading"
		/>

		<v-card-title class="pair-title">
			{{ position.positionRisk.symbol }}
		</v-card-title>

		<v-card-subtitle class="market-price">
			<span>Рыночная цена:</span>
			<span class="price-value">${{ Number(position.positionRisk.markPrice).toFixed(2) }}</span>
		</v-card-subtitle>

		<v-card-text>
			<div class="info-row">
				<div class="amount">
					<span>Кол-во монет:</span>
					<span class="amount-value">{{ position.positionRisk.positionAmt }}</span>
				</div>
				<div class="liquidation">
					<span>Цена ликвидации:</span>
					<span class="liquidation-value">{{ position.positionRisk.liquidationPrice }}</span>
				</div>
			</div>

			<div class="profit-loss">
				<span
					class="loss-value"
					:class="{ negative: Number(position.positionRisk.unRealizedProfit) < 0, positive: Number(position.positionRisk.unRealizedProfit) >= 0 }"
				>
					{{ Number(position.positionRisk.unRealizedProfit).toFixed(2) }}$
				</span>
			</div>

			<div class="entry-price">
				<span>Цена входа:</span>
				<span>{{ Number(position.positionRisk.entryPrice).toFixed(2) }}</span>
			</div>
		</v-card-text>

		<v-card-actions>
			<v-btn
				color="red darken-2"
				outlined
				@click="$emit('stopBot')"
			>
				Остановить
			</v-btn>
			<v-btn
				color="green darken-2"
				outlined
				@click="$emit('takeProfit')"
			>
				Собрать профит
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<style scoped lang="scss">
.loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}

.action-card {
  background-color: #2e2b35;
  border: 2px solid #ff3864;
  border-radius: 12px;
  color: white;
  padding: 20px;
  max-width: 300px;
}

.pair-title {
  color: #ff3864;
  font-weight: bold;
  font-size: 24px;
}

.market-price {
  font-size: 16px;
  margin-bottom: 10px;
}

.price-value {
  font-weight: bold;
  color: #00d1b2;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.amount-value,
.liquidation-value {
  font-weight: bold;
  color: #7f8c8d;
}

.profit-loss {
  font-size: 28px;
  margin-bottom: 15px;
}

.loss-value {
  font-weight: bold;
}

.negative {
  color: #ff3864;
}

.positive {
  color: #00d1b2;
}

.entry-price {
  font-size: 16px;
  margin-bottom: 10px;
}

.v-btn {
  margin-top: 10px;
}
</style>
