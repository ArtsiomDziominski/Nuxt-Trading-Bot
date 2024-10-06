<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { apiKeysStore } from '~/store/apiKeys';
import { ruleEmpty } from '~/const/validation';
import { validationStore } from '~/store/validation';

const storeValidation = validationStore();
const storeApiKeys = apiKeysStore();
const { isModalCreateApiKey, isAddApiLoading, isModalListApiKey, errors } = storeToRefs(storeApiKeys);

const api = ref<APIKEY.IApiAdd>({ name: '', publicKey: '', secretKey: '' });

const addApi = async (): Promise<void> => {
	if (!checkValidationApiKey()) return;
	const isAddedApi = await storeApiKeys.requestAddApi(api.value);
	if (isAddedApi) {
		isModalCreateApiKey.value = false;
		clearApi();
	}
};

const openListApi = (): void => {
	isModalListApiKey.value = true;
	isModalCreateApiKey.value = false;
};

const clearApi = () => {
	for (const apiKey in api.value) {
		if (api.value?.[apiKey as keyof APIKEY.IApiAdd]) api.value[apiKey as keyof APIKEY.IApiAdd] = '';
	}
};

const handleInput = (val: string): void => {
	if (errors.value?.[val]?.message) errors.value[val].message = '';
};

const checkValidationApiKey = (): boolean => {
	const validationRulesName = ruleEmpty(api.value.name);
	const validationRulesPublicKey = ruleEmpty(api.value.publicKey);
	const validationRulesSecretKey = ruleEmpty(api.value.secretKey);

	const validationName = storeValidation.makeCheckRules('name', validationRulesName);
	const validationPublicKey = storeValidation.makeCheckRules('publicKey', validationRulesPublicKey);
	const validationSecretKey = storeValidation.makeCheckRules('secretKey', validationRulesSecretKey);
	storeApiKeys.appendErrors({ ...validationName.error, ...validationPublicKey.error, ...validationSecretKey.error });
	return validationName.isValid && validationPublicKey.isValid && validationSecretKey.isValid;
};
</script>

<template>
	<wrapper-form-modal v-model="isModalCreateApiKey">
		<template #body>
			<div class="api-add-body">
				<p class="title">
					Добавить Api ключ
				</p>
				<v-text-field
					v-model="api.name"
					label="Имя"
					variant="outlined"
					maxlength="150"
					clearable
					:error-messages="errors.name.message"
					@input="handleInput('name')"
				/>
				<v-text-field
					v-model="api.publicKey"
					label="Public key"
					variant="outlined"
					maxlength="150"
					:error-messages="errors.publicKey.message"
					@input="handleInput('publicKey')"
				/>
				<v-text-field
					v-model="api.secretKey"
					label="Secret key"
					variant="outlined"
					maxlength="150"
					:error-messages="errors.secretKey.message"
					@input="handleInput('secretKey')"
				/>
				<v-select
					model-value="Binance"
					label="Криптовалютные биржи"
					:items="['Binance']"
					variant="outlined"
				/>
				<v-btn @click="openListApi">
					Посмотреть API-ключи
				</v-btn>
			</div>
		</template>
		<template #actions>
			<v-btn @click="isModalCreateApiKey = false">
				Отмена
			</v-btn>

			<v-btn
				type="submit"
				:loading="isAddApiLoading"
				@click="addApi"
			>
				Подтвердить
			</v-btn>
		</template>
	</wrapper-form-modal>
</template>

<style scoped lang="scss">
.api-add-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;

  .title {
    margin-bottom: 30px;
  }
}
</style>
