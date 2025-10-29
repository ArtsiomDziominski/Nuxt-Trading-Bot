<script setup lang="ts">
const { position, loading } = defineProps({
	position: {
		type: Object as PropType<BOTS.SpotActiveBotsPositionRisk>,
		required: true,
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits<{
	pauseBot: [];
	startBot: [];
	stopBot: [];
	resetLoading: [];
}>();

const { t } = useI18n();

const formatNumber = (value: string | number): string => {
	return Number(value).toFixed(2);
};
</script>

<template>
	<v-card class="bot-card spot-card">
		<v-card-title class="bot-card__title">
			<div class="title-content">
				<span class="symbol">{{ position.positionRisk.symbol }}</span>
				<v-chip
					:color="position.positionRisk.isActive ? 'green' : 'red'"
					size="small"
				>
					{{ position.positionRisk.isActive ? t('spotCard.active') : t('spotCard.stopped') }}
				</v-chip>
			</div>
		</v-card-title>

		<v-card-text class="bot-card__content">
			<div class="metrics-grid">
				<div class="metric">
					<span class="metric-label">{{ t('spotCard.marketPrice') }}</span>
					<span class="metric-value">{{ formatNumber(position.positionRisk.avgPrice) }} {{ position.positionRisk.quoteAsset }}</span>
				</div>
				<div class="metric">
					<span class="metric-label">{{ t('spotCard.amount') }}</span>
					<span class="metric-value">{{ formatNumber(position.positionRisk.baseAssetBalance) }} {{ position.positionRisk.baseAsset }}</span>
				</div>
				<div class="metric">
					<span class="metric-label">{{ t('spotCard.entryPrice') }}</span>
					<span class="metric-value">{{ formatNumber(position.positionRisk.avgPrice) }} {{ position.positionRisk.quoteAsset }}</span>
				</div>
				<div class="metric">
					<span class="metric-label">{{ t('spotCard.unrealizedProfit') }}</span>
					<span
						class="metric-value"
						:class="{ 'profit-positive': Number(position.positionRisk.unRealizedProfit) > 0, 'profit-negative': Number(position.positionRisk.unRealizedProfit) < 0 }"
					>
						{{ formatNumber(position.positionRisk.unRealizedProfit) }} {{ position.positionRisk.quoteAsset }}
					</span>
				</div>
				<div class="metric">
					<span class="metric-label">{{ t('spotCard.pendingOrders') }}</span>
					<span class="metric-value">{{ position.positionRisk.pendingOrdersCount }}</span>
				</div>
			</div>
		</v-card-text>

		<v-card-actions class="bot-card__actions">
			<v-btn
				v-if="position.positionRisk.isActive"
				color="orange"
				:loading="loading"
				@click="emit('pauseBot')"
			>
				<v-icon start>
					mdi-pause
				</v-icon>
				{{ t('spotCard.pause') }}
			</v-btn>
			<v-btn
				v-else
				color="green"
				:loading="loading"
				@click="emit('startBot')"
			>
				<v-icon start>
					mdi-play
				</v-icon>
				{{ t('spotCard.start') }}
			</v-btn>

			<v-btn
				color="red"
				:loading="loading"
				@click="emit('stopBot')"
			>
				<v-icon start>
					mdi-stop
				</v-icon>
				{{ t('spotCard.stop') }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<style scoped lang="scss">
.bot-card {
	&.spot-card {
		border-left: 4px solid #4caf50;
	}

	&__title {
		.title-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;

			.symbol {
				font-weight: 600;
				font-size: 1.1em;
			}
		}
	}

	&__content {
		.metrics-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 12px;

			.metric {
				display: flex;
				flex-direction: column;
				gap: 4px;

				.metric-label {
					font-size: 0.9em;
					color: rgba(0, 0, 0, 0.6);
				}

				.metric-value {
					font-weight: 600;

					&.profit-positive {
						color: #4caf50;
					}

					&.profit-negative {
						color: #f44336;
					}
				}
			}
		}
	}

	&__actions {
		display: flex;
		gap: 8px;
		justify-content: flex-end;
	}
}
</style>
