<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { createBotsStore } from '~/store/createBots';
import { userStore } from '~/store/user';
import { BotCreateTitle, BotTypes } from '~/const/bots';
import { botsStore } from '~/store/bots';

const storeCreateBots = createBotsStore();
const { createBotParams, errors, isModalCreateBots, isLoadingCreateBot } = storeToRefs(storeCreateBots);
const storeUser = userStore();
const { userApiKeys } = storeToRefs(storeUser);
const storeBot = botsStore();

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
	createBotParams.value.price = '50000';
};

const titleModal = computed((): string => {
	return BotCreateTitle?.[createBotParams.value?.strategy] || '';
});
</script>

<template>
	<wrapper-form-modal
		v-model="isModalCreateBots"
		:title="titleModal"
	>
		<template #body>
			<div>
				<v-autocomplete
					v-model="createBotParams.apiId"
					label="Api key"
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
					v-model="createBotParams.symbol"
					label="Пара"
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
						Market
					</v-tab>
					<v-tab :value="BotTypes.Limit">
						Limit
					</v-tab>
				</v-tabs>
				<div class="create-bot-fields">
					<v-text-field
						v-model="createBotParams.amountStart"
						label="Количество токенов"
						placeholder="1,2"
						variant="outlined"
						maxlength="50"
						:error-messages="errors.amountStart.message"
						@input="errors.amountStart.message = ''"
					/>
					<v-text-field
						v-model="createBotParams.orders"
						label="Ордеров"
						placeholder="10"
						variant="outlined"
						maxlength="50"
						:error-messages="errors.orders.message"
						@input="errors.orders.message = ''"
					/>
					<v-text-field
						v-model="createBotParams.step"
						label="Шаг (%)"
						placeholder="5"
						variant="outlined"
						maxlength="50"
						:error-messages="errors.step.message"
						@input="errors.step.message = ''"
					/>
					<v-text-field
						v-model="createBotParams.decimals"
						label="Decimals"
						placeholder="2"
						variant="outlined"
						maxlength="50"
						:error-messages="errors.decimals.message"
						@input="errors.decimals.message = ''"
					/>
					<v-expand-transition>
						<v-text-field
							v-show="createBotParams?.type === BotTypes.Limit"
							v-model="createBotParams.price"
							class="create-bot-fields__price"
							label="Цена"
							variant="outlined"
							maxlength="50"
							:suffix="createBotParams.symbol"
							:error-messages="errors.price.message"
							@click:append-inner="setPrice"
							@input="errors.price.message = ''"
						>
							<template #append-inner>
								<p
									class="cursor-pointer"
									@click="setPrice"
								>
									50000
								</p>
							</template>
						</v-text-field>
					</v-expand-transition>
				</div>
			</div>
		</template>
		<template #actions>
			<v-btn @click="isModalCreateBots = false">
				Отмена
			</v-btn>

			<v-btn
				type="submit"
				:loading="isLoadingCreateBot"
				@click="createBot"
			>
				Подтвердить
			</v-btn>
		</template>
	</wrapper-form-modal>
</template>

<style scoped lang="scss">
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
</style>
