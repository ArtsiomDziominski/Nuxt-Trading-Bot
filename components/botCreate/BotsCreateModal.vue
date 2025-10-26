<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { createBotsStore } from '~/store/createBots';
import { userStore } from '~/store/user';
import { BotCreateTitle, BotTypes, BotMarketType } from '~/const/bots';
import { botsStore } from '~/store/bots';
import { historyStore } from '~/store/historyBots';
import { sharedStore } from '~/store/shared';
import BotsCreateModalMetrics from '~/components/botCreate/BotsCreateModalMetrics.vue';
import { useExchangeInfo } from '~/store/exchangeInfo';
import { ExchangeInfoFilters } from '~/const/exchangeInfo';

const storeCreateBots = createBotsStore();
const { createBotParams, errors, isModalCreateBots, isLoadingCreateBot } = storeToRefs(storeCreateBots);
const storeUser = userStore();
const { userApiKeys } = storeToRefs(storeUser);
const storeBot = botsStore();
const storeHistory = historyStore();
const { isModalHistoryGridBotCreated } = storeToRefs(storeHistory);
const storeShared = sharedStore();
const { markPriceBinance } = storeToRefs(storeShared);
const storeExchangeInfo = useExchangeInfo();
const { exchangeInfoSymbols } = storeToRefs(storeExchangeInfo);

onMounted(() => storeExchangeInfo.loadExchangeInfo());
onUnmounted(() => storeCreateBots.clearBotParams());

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
	const strategyTitle = BotCreateTitle?.[createBotParams.value?.strategy] || '';
	const marketType = createBotParams.value?.marketType === BotMarketType.Spot ? ' (Спот)' : ' (Фьючерсы)';
	return strategyTitle + marketType;
});

const priceNow = computed((): string => {
	const price = markPriceBinance.value.find(item => item.s === createBotParams.value.symbol?.symbol)?.p;
	return price ? Number(price).toFixed(2) : '';
});

const exchangeInfoSymbol = computed(() => exchangeInfoSymbols.value.find(symbol => symbol.symbol === createBotParams.value.symbol?.symbol));
const exchangeInfoSymbolSize = computed(() => exchangeInfoSymbol.value?.filters.find(filter => filter.filterType === ExchangeInfoFilters.LOT_SIZE));
const exchangeInfoSymbolOrdersLimit = computed(() => exchangeInfoSymbol.value?.filters.find(filter => filter.filterType === ExchangeInfoFilters.MAX_NUM_ORDERS)?.limit);

const openHistoryGridBot = () => {
	storeHistory.requestHistoryGridBotCreated();
	isModalHistoryGridBotCreated.value = true;
};

const updateSymbol = (value: EXCHANGE_INFO.SymbolInfo) => {
	errors.value.symbol.message = '';
	createBotParams.value.decimals = String(value?.pricePrecision || value?.quantityPrecision || '');
	createBotParams.value.price = String(priceNow.value);
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
					:error-messages="$t(errors.apiId.message)"
					@input="errors.apiId.message = ''"
					@update:model-value="errors.apiId.message = ''"
				/>
				<v-autocomplete
					v-model="createBotParams.symbol"
					:label="$t('createBot.symbol')"
					placeholder="ETHUSDT"
					:items="exchangeInfoSymbols"
					:item-value="'symbol'"
					:item-title="'symbol'"
					return-object
					variant="outlined"
					:error-messages="$t(errors.symbol.message)"
					@input="errors.symbol.message = ''"
					@update:model-value="updateSymbol"
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
					<div>
						<v-text-field
							v-model.trim="createBotParams.amountStart"
							:label="$t('createBot.qtyTokens')"
							placeholder="1,2"
							variant="outlined"
							maxlength="50"
							:hide-details="!errors.amountStart.message"
							:error-messages="$t(errors.amountStart.message)"
							@input="errors.amountStart.message = ''"
						/>
						<div
							v-if="!errors.amountStart.message"
							class="d-flex justify-space-between mt-1"
						>
							<p
								v-if="exchangeInfoSymbolSize?.minQty"
								class="text-caption cursor-pointer"
								@click="createBotParams.amountStart = exchangeInfoSymbolSize.minQty"
							>
								Мin: {{ exchangeInfoSymbolSize.minQty }} {{ exchangeInfoSymbol?.baseAsset || createBotParams.symbol }}
							</p>
							<p
								v-if="exchangeInfoSymbolSize?.maxQty"
								class="text-caption cursor-pointer"
								@click="createBotParams.amountStart = exchangeInfoSymbolSize.maxQty"
							>
								Max: {{ exchangeInfoSymbolSize.maxQty }} {{ exchangeInfoSymbol?.baseAsset || createBotParams.symbol }}
							</p>
						</div>
					</div>
					<div>
						<v-text-field
							v-model.trim="createBotParams.orders"
							:label="$t('createBot.offers')"
							placeholder="10"
							variant="outlined"
							maxlength="50"
							:hide-details="!errors.orders.message"
							:error-messages="$t(errors.orders.message)"
							@input="errors.orders.message = ''"
						/>
						<p
							v-if="exchangeInfoSymbolOrdersLimit && !errors.orders.message"
							class="text-caption cursor-pointer mt-1 ml-auto d-flex justify-end"
							@click="createBotParams.orders = String(exchangeInfoSymbolOrdersLimit)"
						>
							Мax: {{ exchangeInfoSymbolOrdersLimit }}
						</p>
					</div>
					<v-text-field
						v-model.trim="createBotParams.step"
						:label="$t('createBot.step')"
						placeholder="5"
						variant="outlined"
						maxlength="50"
						:error-messages="$t(errors.step.message)"
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
							:error-messages="$t(errors.price.message)"
							@click:append-inner="setPrice"
							@input="errors.price.message = ''"
						>
							<template #append-inner>
								<p
									class="cursor-pointer text-no-wrap"
									@click="setPrice"
								>
									{{ priceNow }} {{ createBotParams.symbol?.symbol }}
								</p>
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
