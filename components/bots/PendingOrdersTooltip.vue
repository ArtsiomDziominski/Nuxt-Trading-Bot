<script setup lang="ts">
defineProps({
	pendingOrders: {
		type: Array as PropType<BOTS.ActiveBotsPositionRisk['pendingOrders']>,
		required: true,
	},
	pendingOrdersCount: {
		type: Number,
		required: true,
	},
});

const isModalOpen = ref(false);

const openModal = () => {
	isModalOpen.value = true;
};
</script>

<template>
	<v-tooltip location="top">
		<template #activator="{ props: tooltipProps }">
			<div
				class="price-section"
				v-bind="tooltipProps"
				@click="openModal"
			>
				<span class="label">{{ $t('cardBot.pendingOrders') }}</span>
				<span class="value">{{ pendingOrdersCount || '0' }}</span>
			</div>
		</template>
		<div class="orders-tooltip">
			<div
				v-if="pendingOrders && pendingOrders.length > 0"
				class="orders-tooltip__list"
			>
				<div
					v-for="order in pendingOrders"
					:key="order.orderId"
					class="orders-tooltip__item"
					:class="{ 'order-buy': order.side === 'BUY', 'order-sell': order.side === 'SELL' }"
				>
					${{ order.price }} ({{ order.origQty }})
				</div>
			</div>
			<div
				v-else
				class="orders-tooltip__empty"
			>
				{{ $t('cardBot.pendingOrdersTooltip.noOrders') }}
			</div>
		</div>
	</v-tooltip>

	<BotsPendingOrdersModal
		v-model="isModalOpen"
		:pending-orders="pendingOrders"
	/>
</template>

<style scoped lang="scss">
.price-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--v-theme-on-surface), 0.05);
  }

  &:active {
    background: rgba(var(--v-theme-on-surface), 0.1);
  }
}

.label {
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  opacity: 0.6;
}

.value {
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
}

.orders-tooltip {
  padding: 8px;
  max-width: 250px;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 300px;
    overflow-y: auto;
  }

  &__item {
    padding: 2px 4px;
    font-size: 8px;
    font-weight: 500;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.05);

    &.order-buy {
      color: #4caf50;
    }

    &.order-sell {
      color: #f44336;
    }
  }

  &__empty {
    text-align: center;
    font-style: italic;
    opacity: 0.7;
    padding: 8px 0;
  }
}
</style>
