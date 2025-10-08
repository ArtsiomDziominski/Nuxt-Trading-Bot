<script setup lang="ts">
const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true,
	},
	pendingOrders: {
		type: Array as PropType<BOTS.ActiveBotsPositionRisk['pendingOrders']>,
		required: true,
	},
});

const emit = defineEmits(['update:modelValue']);

const isOpen = computed({
	get: () => props.modelValue,
	set: value => emit('update:modelValue', value),
});

const close = () => {
	isOpen.value = false;
};
</script>

<template>
	<WrapperFormModal
		v-model="isOpen"
		:title="$t('cardBot.pendingOrdersModal.title', { symbol: pendingOrders?.[0]?.symbol, count: pendingOrders?.length || 0 })"
		max-width="800"
	>
		<template #body>
			<div class="orders-container">
				<span class="orders-count">{{ pendingOrders?.length || 0 }}</span>
				<template v-if="pendingOrders && pendingOrders.length > 0">
					<v-card
						v-for="order in pendingOrders"
						:key="order.orderId"
						class="order-card"
						outlined
						elevation="2"
					>
						<v-card-text>
							<div class="order-header">
								<span
									class="order-side"
									:class="{ 'order-buy': order.side === 'BUY', 'order-sell': order.side === 'SELL' }"
								>
									{{ order.side === 'BUY' ? $t('cardBot.pendingOrdersModal.buy') : $t('cardBot.pendingOrdersModal.sell') }}
								</span>
								<span class="order-type">{{ order.type }}</span>
							</div>

							<div class="order-info">
								<div class="info-row">
									<span class="info-label">{{ $t('cardBot.pendingOrdersModal.price') }}:</span>
									<span class="info-value">${{ Number(order.price).toFixed(2) }}</span>
								</div>
								<div class="info-row">
									<span class="info-label">{{ $t('cardBot.pendingOrdersModal.quantity') }}:</span>
									<span class="info-value">{{ order.origQty }}</span>
								</div>
								<div
									v-if="order.status"
									class="info-row"
								>
									<span class="info-label">{{ $t('cardBot.pendingOrdersModal.status') }}:</span>
									<span class="info-value">{{ order.status }}</span>
								</div>
								<div
									v-if="order.timeInForce"
									class="info-row"
								>
									<span class="info-label">{{ $t('cardBot.pendingOrdersModal.timeInForce') }}:</span>
									<span class="info-value">{{ order.timeInForce }}</span>
								</div>
								<div class="info-row">
									<span class="info-label">{{ $t('cardBot.pendingOrdersModal.orderId') }}:</span>
									<span class="info-value order-id">{{ order.orderId }}</span>
								</div>
							</div>
						</v-card-text>
					</v-card>
				</template>
				<div
					v-else
					class="orders-container__not-found"
				>
					<v-icon size="70">
						mdi-file-document-outline
					</v-icon>
					<p>{{ $t('cardBot.pendingOrdersModal.noOrders') }}</p>
				</div>
			</div>
		</template>
		<template #actions>
			<v-btn
				color="primary"
				@click="close"
			>
				{{ $t('cardBot.pendingOrdersModal.close') }}
			</v-btn>
		</template>
	</WrapperFormModal>
</template>

<style scoped lang="scss">
.orders-count {
  position: absolute;
  top: -20px;
  right: 4px;
  font-size: 11px;
  color: rgba(var(--v-theme-on-surface), 0.4);
  font-weight: 400;
}

.orders-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  min-height: 200px;
  width: 100%;
  margin-bottom: 24px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  &__not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 16px;
    grid-column: 1 / -1;
  }
}

.order-card {
  background-color: rgba(var(--v-theme-surface-variant), 0.05);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    border-color: rgba(var(--v-theme-on-surface), 0.4);
  }
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.order-side {
  font-size: 18px;
  font-weight: bold;
  padding: 4px 12px;
  border-radius: 4px;

  &.order-buy {
    color: #4caf50;
    background: rgba(76, 175, 80, 0.1);
  }

  &.order-sell {
    color: #f44336;
    background: rgba(244, 67, 54, 0.1);
  }
}

.order-type {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
  padding: 4px 8px;
  background: rgba(var(--v-theme-on-surface), 0.05);
  border-radius: 4px;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-weight: 500;
  opacity: 0.7;
  font-size: 14px;
}

.info-value {
  font-weight: 600;
  font-size: 14px;
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));

  &.order-id {
    font-family: monospace;
    font-size: 12px;
    opacity: 0.8;
  }
}
</style>
