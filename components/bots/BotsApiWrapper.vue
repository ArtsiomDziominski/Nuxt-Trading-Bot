<script setup lang="ts">
import { botsStore } from '~/store/bots';
import { BotStatus } from '~/const/bots';
import BotsActionCardStyleSecond from '~/components/bots/card-style/BotsActionCardStyleSecond.vue';

const { bots } = defineProps({
	bots: {
		type: Object as PropType<BOTS.ActiveBots>,
		required: true,
	},
});

const activeBots = inject<Ref<BOTS.ActiveBots[]>>('activeBots', []);

const storeBots = botsStore();

const loadingBot = ref<Record<string, boolean>>({});

const requestTakeProfitGridBot = async (symbol: string, apiId: string, isActive: boolean) => {
	loadingBot.value[apiId + symbol] = true;
	await storeBots.requestTakeProfitGridBot(symbol, apiId);
	if (!isActive) {
		const botIndex = activeBots.value.findIndex(bot => bot.api.id === apiId);
		if (activeBots.value?.[botIndex]?.positionsRisk) activeBots.value[botIndex].positionsRisk = activeBots.value?.[botIndex]?.positionsRisk.filter(position => position.positionRisk.symbol !== symbol);
	}
};

const requestChangeWatchingGridBot = async (symbol: string, apiId: string, status: BotStatus) => {
	loadingBot.value[apiId + symbol] = true;
	await storeBots.requestChangeWatchingGridBot(symbol, apiId, status);
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
			<BotsActionCardStyleSecond
				v-for="positionRisk in bots.positionsRisk"
				:key="positionRisk.positionRisk.symbol"
				:position="positionRisk"
				:loading="loadingBot[bots.api.id + positionRisk.positionRisk.symbol]"
				@pause-bot="requestChangeWatchingGridBot(positionRisk.positionRisk.symbol, bots.api.id, BotStatus.Pause)"
				@start-bot="requestChangeWatchingGridBot(positionRisk.positionRisk.symbol, bots.api.id, BotStatus.Start)"
				@stop-bot="requestChangeWatchingGridBot(positionRisk.positionRisk.symbol, bots.api.id, BotStatus.Stop)"
				@take-profit="requestTakeProfitGridBot(positionRisk.positionRisk.symbol, bots.api.id, positionRisk.positionRisk.isActive)"
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
    gap: 20px;
    margin: 40px 0 20px 0;
    white-space: nowrap;
  }
}

.position-risk {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 60px;
}
</style>
