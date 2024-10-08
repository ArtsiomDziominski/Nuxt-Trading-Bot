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
	<v-card
		class="compact-card"
	>
		<LoaderBox
			v-if="loading"
			class="loading"
		/>
		<div class="card-header">
			<h2>{{ position.positionRisk.symbol }}</h2>
			<v-chip
				class="profit-chip"
				:color="position.positionRisk.unRealizedProfit < 0 ? 'red' : 'green'"
				outlined
			>
				{{ Number(position.positionRisk.unRealizedProfit).toFixed(2) }}$
			</v-chip>
		</div>

		<v-divider />

		<v-card-text>
			<div class="price-section">
				<span class="label">Рыночная цена:</span>
				<span class="value">${{ Number(position.positionRisk.markPrice).toFixed(2) }}</span>
			</div>
			<div class="price-section">
				<span class="label">Кол-во монет:</span>
				<span class="value">{{ position.positionRisk.positionAmt }}</span>
			</div>
			<div class="price-section">
				<span class="label">Цена входа:</span>
				<span class="value">${{ Number(position.positionRisk.entryPrice).toFixed(2) }}</span>
			</div>
			<div class="price-section">
				<span class="label">Цена ликвидации:</span>
				<span class="value">{{ Number(position.positionRisk.liquidationPrice) || 'N/A' }}</span>
			</div>
		</v-card-text>

		<v-divider />

		<v-card-actions class="card-actions">
			<v-btn
				color="red darken-1"
				outlined
				@click="$emit('stopBot')"
			>
				Остановить
			</v-btn>
			<v-btn
				color="green darken-1"
				outlined
				@click="$emit('takeProfit')"
			>
				Собрать
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

.compact-card {
  background-color: #1e1e2f;
  border-radius: 10px;
  color: white;
  padding: 16px;
  max-width: 320px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.profit-chip {
  font-weight: bold;
}

.price-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.label {
  color: #b0b0b0;
}

.value {
  color: #e0e0e0;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.v-btn {
  font-size: 14px;
  padding: 8px 16px;
}
</style>
