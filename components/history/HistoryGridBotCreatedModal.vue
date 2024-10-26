<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { historyStore } from '~/store/historyBots';
import { createBotsStore } from '~/store/createBots';

const storeHistory = historyStore();
const { historyCreatedGridBot, isModalHistoryGridBotCreated, isLoadingDeleteHistoryCreatedGridBot } = storeToRefs(storeHistory);

const storeCreateBot = createBotsStore();
const { createBotParams } = storeToRefs(storeCreateBot);

const useBot = (params: BOTS.PositionParam) => {
	createBotParams.value = {
		...createBotParams.value,
		symbol: params.symbol,
		price: String(params.price),
		step: String(params.step),
		amountStart: String(params.qty),
		decimals: String(params.decimals),
		orders: String(params.qtyOpenOrders),
	};
	isModalHistoryGridBotCreated.value = false;
};
</script>

<template>
	<WrapperFormModal
		v-model="isModalHistoryGridBotCreated"
		:title="$t('historyTitle')"
		max-width="1000"
	>
		<template #body>
			<div class="bot-info-container">
				<template v-if="historyCreatedGridBot.length">
					<v-expand-transition>
						<v-card
							v-for="gridBot in historyCreatedGridBot"
							:key="gridBot.dateCreated + gridBot.params.symbol"
							class="bot-info-card"
							outlined
							elevation="2"
						>
							<v-card-title class="bot-info-card__title">
								{{ gridBot.params.symbol }}
							</v-card-title>

							<v-card-text>
								<div class="bot-info-card__info">
									<div>
										<p>Количество монет: </p><span>{{ gridBot.params.qty }}</span>
									</div>
									<div>
										<p>Прайс покупки: </p><span>{{ gridBot.params.price ? gridBot.params.price : 'Market' }}</span>
									</div>
									<div>
										<p>Количество ордеров: </p><span>{{ gridBot.params.qtyOpenOrders }}</span>
									</div>
									<div>
										<p>Шаг: </p><span>{{ gridBot.params.step }}%</span>
									</div>
									<div>
										<p>Decimals: </p><span>{{ gridBot.params.decimals }}</span>
									</div>
								</div>
							</v-card-text>

							<v-card-actions>
								<v-btn
									color="green"
									@click="useBot(gridBot.params)"
								>
									Использовать
								</v-btn>
								<v-btn
									color="error"
									:loading="isLoadingDeleteHistoryCreatedGridBot[gridBot._id]"
									@click="storeHistory.requestDeleteHistoryGridBotCreated(gridBot._id)"
								>
									Удалить
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-expand-transition>
				</template>
				<div
					v-else
					class="bot-info-container__not-found"
				>
					<v-icon size="70">
						mdi-card-search-outline
					</v-icon>
					<p>{{ $t('cardBot.historyNotFound') }}</p>
				</div>
			</div>
		</template>
	</WrapperFormModal>
</template>

<style scoped lang="scss">
.bot-info-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  min-height: 300px;

  &__not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 16px;
  }
}

.bot-info-card {
  background-color: transparent;
  border: 1px solid white;
  border-radius: 8px;
  padding: 16px;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  &__title {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }

  &__info {
    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4px;
      color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
      margin: 4px 0;
    }
    p {
      opacity: 0.6;
    }
  }
}
</style>
