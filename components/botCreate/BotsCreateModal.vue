<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { createBotsStore } from '~/store/createBots';
import { userStore } from '~/store/user';
import { BotCreateTitle, BotTypes } from '~/const/bots';
import { botsStore } from '~/store/bots';
import { historyStore } from '~/store/historyBots';
import { sharedStore } from '~/store/shared';
import BotsCreateModalMetrics from '~/components/botCreate/BotsCreateModalMetrics.vue';

const storeCreateBots = createBotsStore();
const { createBotParams, errors, isModalCreateBots, isLoadingCreateBot } = storeToRefs(storeCreateBots);
const storeUser = userStore();
const { userApiKeys } = storeToRefs(storeUser);
const storeBot = botsStore();
const storeHistory = historyStore();
const { isModalHistoryGridBotCreated } = storeToRefs(storeHistory);
const storeShared = sharedStore();
const { markPriceBinance } = storeToRefs(storeShared);

const createBot = async (): Promise<void> => {
	if (storeCreateBots.checkValidationCreateBot()) {
		if (await storeCreateBots.requestCreateBot()) {
			storeBot.requestActiveBots();
			storeCreateBots.clearBotParams();
			isModalCreateBots.value = false;
		}
	}
};

const setPrice = () => {
	createBotParams.value.price = priceNow.value;
};

const titleModal = computed((): string => {
	return BotCreateTitle?.[createBotParams.value?.strategy] || '';
});

const priceNow = computed((): string => {
	const price = markPriceBinance.value.find(item => item.s === createBotParams.value.symbol)?.p;
	return price ? Number(price).toFixed(2) : '';
});

const openHistoryGridBot = () => {
	storeHistory.requestHistoryGridBotCreated();
	isModalHistoryGridBotCreated.value = true;
};
</script>

<template>
	<wrapper-form-modal
		v-model="isModalCreateBots"
		:title="titleModal"
	>
		<template #body>
			<div class="modal-body">
				<v-autocomplete
					v-model="createBotParams.apiId"
					:label="$t('createBot.apiKey')"
					item-title="name"
					item-value="id"
					:items="userApiKeys"
					maxlength="50"
					variant="outlined"
					:error-messages="errors.apiId.message"
					@input="errors.apiId.message = ''"
					@update:model-value="errors.apiId.message = ''"
				/>
				<v-text-field
					v-model.trim="createBotParams.symbol"
					:label="$t('createBot.symbol')"
					placeholder="ETHUSDT"
					variant="outlined"
					maxlength="50"
					:error-messages="errors.symbol.message"
					@input="errors.symbol.message = ''"
				/>
				<v-tabs
					v-model="createBotParams.type"
					class="create-bot-tabs"
				>
					<v-tab :value="BotTypes.Market">
						{{ $t(BotTypes.Market) }}
					</v-tab>
					<v-tab :value="BotTypes.Limit">
						{{ $t(BotTypes.Limit) }}
					</v-tab>
				</v-tabs>
				<div class="create-bot-fields">
					<v-text-field
						v-model.trim="createBotParams.amountStart"
						:label="$t('createBot.qtyTokens')"
						placeholder="1,2"
						variant="outlined"
						maxlength="50"
						:error-messages="errors.amountStart.message"
						@input="errors.amountStart.message = ''"
					/>
					<v-text-field
						v-model.trim="createBotParams.orders"
						:label="$t('createBot.offers')"
						placeholder="10"
						variant="outlined"
						maxlength="50"
						:error-messages="errors.orders.message"
						@input="errors.orders.message = ''"
					/>
					<v-text-field
						v-model.trim="createBotParams.step"
						:label="$t('createBot.step')"
						placeholder="5"
						variant="outlined"
						maxlength="50"
						:error-messages="errors.step.message"
						@input="errors.step.message = ''"
					/>
					<v-text-field
						v-model.trim="createBotParams.decimals"
						:label="$t('createBot.decimals')"
						placeholder="2"
						variant="outlined"
						maxlength="50"
						:error-messages="errors.decimals.message"
						@input="errors.decimals.message = ''"
					/>
					<v-expand-transition>
						<v-text-field
							v-show="createBotParams?.type === BotTypes.Limit"
							v-model.trim="createBotParams.price"
							class="create-bot-fields__price"
							:label="$t('createBot.price')"
							variant="outlined"
							maxlength="50"
							:error-messages="errors.price.message"
							@click:append-inner="setPrice"
							@input="errors.price.message = ''"
						>
							<template #append-inner>
								<v-btn
									class="cursor-pointer"
									@click="setPrice"
								>
									{{ priceNow }} {{ createBotParams.symbol }}
								</v-btn>
							</template>
						</v-text-field>
					</v-expand-transition>
				</div>
				<div class="create-bot-info">
					<v-btn
						variant="text"
						@click="openHistoryGridBot"
					>
						<v-icon>
							mdi-history
						</v-icon>
					</v-btn>
				</div>
				<div class="create-bot-metrics">
					<BotsCreateModalMetrics />
				</div>
			</div>
		</template>
		<template #actions>
			<v-btn @click="isModalCreateBots = false">
				{{ $t('cancel') }}
			</v-btn>

			<v-btn
				type="submit"
				:loading="isLoadingCreateBot"
				@click="createBot"
			>
				{{ $t('confirm') }}
			</v-btn>
		</template>
	</wrapper-form-modal>
</template>

<style scoped lang="scss">
.modal-body{
  .create-bot-tabs {
    margin-bottom: 16px;
  }

  .create-bot-fields {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px 20px;

    &__price {
      grid-column: 1/3;
    }
  }

  .create-bot-metrics {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 6px 4px;
    margin: 16px 0;

    &__metric {
      display: flex;
      flex-direction: row;
      gap: 6px;

      &:first-child {
        grid-area: 1/1/2/3;
      }
    }
  }
}
</style>
