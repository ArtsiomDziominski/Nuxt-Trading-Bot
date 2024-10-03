<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { apiKeysStore } from '~/store/apiKeys';

const storeApiKeys = apiKeysStore();
const { isModalCreateApiKey, isAddApiLoading, isModalListApiKey } = storeToRefs(storeApiKeys);

const api = ref<APIKEY.IApiAdd>({ name: '', publicKey: '', secretKey: '' });

const addApi = async (): Promise<void> => {
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
</script>

<template>
	<wrapper-form-modal v-model="isModalCreateApiKey">
		<template #body>
			<p class="title">
				Добавить Api ключ
			</p>
			<v-text-field
				v-model="api.name"
				label="Имя"
				variant="outlined"
			/>
			<v-text-field
				v-model="api.publicKey"
				label="Public key"
				variant="outlined"
			/>
			<v-text-field
				v-model="api.secretKey"
				label="Secret key"
				variant="outlined"
			/>
			<v-select
				model-value="Binance"
				label="Криптовалютные биржи"
				:items="['Binance']"
				variant="outlined"
			/>
			<v-btn @click="openListApi">
				Просмотреть созданные API ключи
			</v-btn>
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
.title {
  margin-bottom: 30px;
}
</style>
