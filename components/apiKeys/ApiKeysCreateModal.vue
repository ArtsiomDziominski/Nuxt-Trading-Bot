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
					{{ $t('apiKey.title') }}
				</p>
				<v-text-field
					v-model="api.name"
					:label="$t('apiKey.title')"
					variant="outlined"
					maxlength="150"
					clearable
					:error-messages="$t(errors.name.message)"
					@input="handleInput('name')"
				/>
				<v-text-field
					v-model="api.publicKey"
					:label="$t('apiKey.public')"
					variant="outlined"
					maxlength="150"
					:error-messages="$t(errors.publicKey.message)"
					@input="handleInput('publicKey')"
				/>
				<v-text-field
					v-model="api.secretKey"
					:label="$t('apiKey.secret')"
					variant="outlined"
					maxlength="150"
					:error-messages="$t(errors.secretKey.message)"
					@input="handleInput('secretKey')"
				/>
				<v-select
					model-value="Binance"
					:label="$t('apiKey.cryptocurrencyExchanges')"
					:items="['Binance']"
					variant="outlined"
				/>
				<v-btn @click="openListApi">
					{{ $t('apiKey.vieKey') }}
				</v-btn>
			</div>
		</template>
		<template #actions>
			<v-btn @click="isModalCreateApiKey = false">
				{{ $t('cancel') }}
			</v-btn>

			<v-btn
				type="submit"
				:loading="isAddApiLoading"
				@click="addApi"
			>
				{{ $t('confirm') }}
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
