<script setup lang="ts">
const props = defineProps({
	position: {
		type: Object as PropType<BOTS.SpotActiveBotsPositionRisk>,
		required: true,
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['takeProfit', 'pauseBot', 'startBot', 'stopBot', 'resetLoading']);

const { t } = useI18n();

const isActiveChangeAnimation = ref<boolean>(false);
const dateLastUpdate = ref<number>(Date.now());
const lastUpdate = ref<number>(0);
const intervaLastUpdate = ref<ReturnType<typeof setInterval> | null>(null);

onMounted(() => (setLastUpdate()));

watch(
	() => props.position.positionRisk.unRealizedProfit,
	() => {
		setLastUpdate();

		if (props.loading) emit('resetLoading');
		isActiveChangeAnimation.value = true;
		setTimeout(() => (isActiveChangeAnimation.value = false), 300);
	},
);

const setLastUpdate = () => {
	dateLastUpdate.value = Date.now();
	lastUpdate.value = 0;
	if (intervaLastUpdate.value) clearInterval(intervaLastUpdate.value);
	intervaLastUpdate.value = setInterval(() => (lastUpdate.value = Math.round((Date.now() - dateLastUpdate.value) / 1000)), 1000);
};

const formatNumber = (value: string | number): string => {
	return Number(value).toFixed(2);
};
</script>

<template>
	<v-card
		class="compact-card"
		:class="{ change: isActiveChangeAnimation }"
		elevation="10"
	>
		<p class="last-update">
			{{ lastUpdate }} s
		</p>
		<LoaderBox
			v-if="loading"
			class="loading"
		/>
		<div class="card-header">
			<h2>{{ position.positionRisk.symbol }}</h2>
			<v-chip
				class="profit-chip"
				:class="{
					'profit-chip-negative': Number(position.positionRisk.unRealizedProfit) < 0,
					'profit-chip-zero': Number(position.positionRisk.unRealizedProfit) === 0,
					'profit-chip-positive': Number(position.positionRisk.unRealizedProfit) > 0,
				}"
				:color="Number(position.positionRisk.unRealizedProfit) < 0 ? 'red' : Number(position.positionRisk.unRealizedProfit) === 0 ? 'grey' : 'green'"
				outlined
			>
				{{ Number(position.positionRisk.unRealizedProfit).toFixed(2) }}
			</v-chip>
		</div>

		<v-divider />

		<v-card-text>
			<div class="price-section">
				<span class="label">{{ t('spotCard.marketPrice') }}</span>
				<span class="value">{{ formatNumber(position.positionRisk.markPrice) }}</span>
			</div>
			<div class="price-section">
				<span class="label">{{ t('spotCard.amount') }}</span>
				<span class="value">{{ formatNumber(position.positionRisk.positionAmt) }} {{ position.positionRisk.symbol }}</span>
			</div>
			<div class="price-section">
				<span class="label">{{ t('spotCard.entryPrice') }}</span>
				<span class="value">{{ formatNumber(position.positionRisk.entryPrice) }} {{ position.positionRisk.quoteAsset }}</span>
			</div>
			<div class="price-section">
				<span class="label">{{ t('spotCard.pendingOrders') }}</span>
				<span class="value">{{ position.positionRisk.pendingOrdersCount }}</span>
			</div>
		</v-card-text>

		<v-divider />

		<v-card-actions class="card-actions">
			<v-btn
				v-if="position.positionRisk.isActive"
				color="red"
				outlined
				@click="$emit('pauseBot')"
			>
				{{ t('spotCard.pause') }}
			</v-btn>
			<v-btn
				v-else
				color="primary"
				outlined
				@click="$emit('startBot')"
			>
				{{ t('spotCard.start') }}
			</v-btn>
			<v-btn
				color="green"
				outlined
				@click="$emit('takeProfit')"
			>
				{{ t('cardBot.take') }}
			</v-btn>

			<v-btn
				color="warning card-actions__close"
				outlined
				@click="$emit('stopBot')"
			>
				{{ t('cardBot.closeBot') }}
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
  position: relative;
  background-color: var(--card-second-background);
  border-radius: 10px;
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  padding: 16px;
  max-width: 320px;
  border-left: 4px solid #4caf50;
}

.last-update {
  position: absolute;
  bottom: 4px;
  right: 10px;
  font-size: 14px;
  color: grey;
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
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  opacity: 0.6;
}

.value {
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
}

.card-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, min-content);
  margin-top: 10px;

  &__close {
    grid-area: 2/1/3/3;
  }
}

.v-btn {
  font-size: 14px;
  padding: 8px 16px;
}

.change {
  opacity: 0.6;
}
</style>
