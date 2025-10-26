<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { createBotsStore } from '~/store/createBots';
import { BotCreateTitle, Strategy, BotMarketType } from '~/const/bots';

const storeCreateBots = createBotsStore();
const { isModalSelectBots, isModalCreateBots, createBotParams } = storeToRefs(storeCreateBots);

const { t } = useI18n();

const botsStrategy = [
	{ name: BotCreateTitle[Strategy.DEFAULT], strategy: Strategy.DEFAULT },
	{
		name: BotCreateTitle[Strategy.MARTINGALE],
		strategy: Strategy.MARTINGALE,
		info: t('createBot.strategies.martingale.description'),
	},
];

const selectBot = (strategy: Strategy): void => {
	createBotParams.value.strategy = strategy;
	isModalSelectBots.value = false;
	isModalCreateBots.value = true;
};

const selectMarketType = (marketType: BotMarketType): void => {
	createBotParams.value.marketType = marketType;
};

const marketTypes = [
	{ name: t('createBot.marketTypes.spot.name'), type: BotMarketType.Spot, description: t('createBot.marketTypes.spot.description') },
	{ name: t('createBot.marketTypes.futures.name'), type: BotMarketType.Futures, description: t('createBot.marketTypes.futures.description') },
];
</script>

<template>
	<wrapper-modal v-model="isModalSelectBots">
		<template #body>
			<div class="bots-select-body">
				<p class="title">
					{{ $t('createBot.selectMarketType') }}
				</p>

				<div class="market-type-selection">
					<v-btn
						v-for="market in marketTypes"
						:key="market.type"
						:class="createBotParams.marketType === market.type ? 'primary' : 'default'"
						size="large"
						@click="selectMarketType(market.type)"
					>
						<div class="btn">
							<v-icon>
								{{ market.type === BotMarketType.Futures ? 'mdi-chart-line' : 'mdi-cash' }}
							</v-icon>
							<div class="btn-content">
								<p class="btn-title">
									{{ market.name }}
									<v-icon
										v-if="market.description"
										v-tooltip:top="market.description"
										max-width="100px"
									>
										mdi-information-outline
									</v-icon>
								</p>
							</div>
						</div>
					</v-btn>
				</div>

				<div
					v-if="createBotParams.marketType"
					class="strategy-selection"
				>
					<p class="title">
						{{ $t('createBot.selectBot') }}
					</p>
					<v-btn
						v-for="bot in botsStrategy"
						:key="bot.name + bot.strategy"
						size="x-large"
						@click="selectBot(bot.strategy)"
					>
						<div class="btn">
							<v-icon>
								mdi-robot-excited-outline
							</v-icon>
							<p>
								{{ bot.name }}
							</p>
							<v-icon
								v-if="bot.info"
								v-tooltip:top="bot.info"
								max-width="100px"
							>
								mdi-information-outline
							</v-icon>
						</div>
					</v-btn>
				</div>
			</div>
		</template>
		<template #actions>
			<v-btn @click="isModalSelectBots = false">
				{{ $t('cancel') }}
			</v-btn>
		</template>
	</wrapper-modal>
</template>

<style scoped lang="scss">
.bots-select-body {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;

  .title {
    margin-bottom: 20px;
    font-size: 1.2em;
    font-weight: 600;
  }

  .market-type-selection .default {
    --shadow-primary: 0 4px 20px rgba(0, 212, 255, 0.03);
  }

  .market-type-selection .primary {
    color: #4caf50;
  }

  .market-type-selection {
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: wrap;

    .btn {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 15px;

      .btn-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;

        .btn-title {
          font-weight: 600;
          margin: 0;
        }
      }
    }
  }

  .strategy-selection {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .btn {
      width: max-content;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
    }
  }
}
</style>
