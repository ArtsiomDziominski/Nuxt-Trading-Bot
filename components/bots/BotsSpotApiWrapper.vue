<script setup lang="ts">
import { botsStore } from '~/store/bots';
import { BotStatus } from '~/const/bots';
import BotsSpotActionCard from '~/components/bots/card-style/BotsSpotActionCard.vue';

const { bots } = defineProps({
	bots: {
		type: Object as PropType<BOTS.SpotActiveBots>,
		required: true,
	},
});

const activeSpotBots = inject<Ref<BOTS.SpotActiveBots[]>>('activeSpotBots', ref([]));

const storeBots = botsStore();

const loadingBot = ref<Record<string, boolean>>({});

const requestChangeWatchingSpotBot = async (symbol: string, apiId: string, status: BotStatus) => {
	loadingBot.value[apiId + symbol] = true;
	await storeBots.requestChangeWatchingSpotBot(symbol, apiId, status);
	loadingBot.value[apiId + symbol] = false;
};
</script>

<template>
	<div class="api-wrapper spot-bot">
		<div class="title">
			<p>{{ bots.api.name }}</p>
			<v-chip
				color="green"
				size="small"
			>
				Спот
			</v-chip>
			<v-divider />
		</div>
		<div class="position-risk">
			<BotsSpotActionCard
				v-for="positionRisk in bots.positionsRisk"
				:key="positionRisk.positionRisk.symbol"
				:position="positionRisk"
				:loading="loadingBot[bots.api.id + positionRisk.positionRisk.symbol]"
				@pause-bot="requestChangeWatchingSpotBot(positionRisk.positionRisk.symbol, bots.api.id, BotStatus.Pause)"
				@start-bot="requestChangeWatchingSpotBot(positionRisk.positionRisk.symbol, bots.api.id, BotStatus.Start)"
				@stop-bot="requestChangeWatchingSpotBot(positionRisk.positionRisk.symbol, bots.api.id, BotStatus.Stop)"
				@reset-loading="loadingBot[bots.api.id + positionRisk.positionRisk.symbol] = false"
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
    gap: 16px;
    margin: 0;
    white-space: nowrap;
  }

  &.spot-bot {
    border-left: 4px solid #4caf50;
    padding-left: 16px;
  }
}

.position-risk {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 60px;
}
</style>
