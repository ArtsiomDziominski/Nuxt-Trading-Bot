<script setup lang="ts">
import { botsStore } from '~/store/bots';

defineProps({
	bots: {
		type: Object as PropType<BOTS.ActiveBots>,
		required: true,
	},
});

const storeBots = botsStore();

const loadingBot = ref<Record<string, boolean>>({});

const requestTakeProfitGridBot = async (symbol: string, apiId: string) => {
	loadingBot.value[apiId + symbol] = true;
	await storeBots.requestTakeProfitGridBot(symbol, apiId);
	loadingBot.value[apiId + symbol] = false;
};
</script>

<template>
	<div class="api-wrapper">
		<div class="title">
			<p>{{ bots.api.name }}</p>
			<v-divider />
		</div>
		<div class="position-risk">
			<bots-action-card-style-second
				v-for="positionRisk in bots.positionsRisk"
				:key="positionRisk.positionRisk.symbol"
				:position="positionRisk"
				:loading="loadingBot[bots.api.id + positionRisk.positionRisk.symbol]"
				@stop-bot="storeBots.requestTakeProfitGridBot"
				@take-profit="requestTakeProfitGridBot(positionRisk.positionRisk.symbol, bots.api.id)"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.api-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    margin: 40px 0 20px 0
  }
}

.position-risk {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 60px;
}
</style>
