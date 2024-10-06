<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { createBotsStore } from '~/store/createBots';
import { BotCreateTitle, Strategy } from '~/const/bots';

const storeCreateBots = createBotsStore();
const { isModalSelectBots, isModalCreateBots, createBotParams } = storeToRefs(storeCreateBots);

const botsStrategy = [
	{ name: BotCreateTitle[Strategy.DEFAULT], strategy: Strategy.DEFAULT },
	{ name: BotCreateTitle[Strategy.MARTINGALE], strategy: Strategy.MARTINGALE, info: 'Стратегия Мартингейл удваивает ставку после каждого проигрыша, чтобы при победе вернуть потери и получить прибыль. Однако она рискованна из-за возможности значительных убытков при длительной серии проигрышей' },
];

const selectBot = (strategy: Strategy): void => {
	createBotParams.value.strategy = strategy;
	isModalSelectBots.value = false;
	isModalCreateBots.value = true;
	console.log(isModalCreateBots.value);
};
</script>

<template>
	<wrapper-modal v-model="isModalSelectBots">
		<template #body>
			<div class="bots-select-body">
				<p class="title">
					Выберите бота
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
		</template>
		<template #actions>
			<v-btn @click="isModalSelectBots = false">
				Отмена
			</v-btn>
		</template>
	</wrapper-modal>
</template>

<style scoped lang="scss">
.bots-select-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;

  .title {
    margin-bottom: 30px;
  }

  .btn {
    width: max-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
}
</style>
