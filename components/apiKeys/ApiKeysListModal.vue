<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { apiKeysStore } from '~/store/apiKeys';
import { userStore } from '~/store/user';

const storeApiKeys = apiKeysStore();
const { isModalListApiKey, isModalCreateApiKey, isRemoveApiLoading } = storeToRefs(storeApiKeys);

const storeUser = userStore();
const { userApiKeys } = storeToRefs(storeUser);

const removeApiKey = async (apiId: string): Promise<void> => {
	const isAddedApi = await storeApiKeys.requestRemoveApi(apiId);
	if (isAddedApi) isModalListApiKey.value = false;
};

const back = () => {
	close();
	isModalCreateApiKey.value = true;
};

const close = () => {
	isModalListApiKey.value = false;
};
</script>

<template>
	<wrapper-modal v-model="isModalListApiKey">
		<template #body>
			<p class="title">
				Список Api ключей
			</p>
			<div class="api-keys">
				<div
					v-for="(key, index) in userApiKeys"
					:key="key?.id || index"
					class="api-keys__item"
				>
					<p>{{ key?.name }}</p>
					<p>...{{ key?.publicKey.slice(key?.publicKey.length - 8) }}</p>
					<p>{{ key?.type }}</p>
					<v-btn
						icon=""
						variant="plain"
						:loading="isRemoveApiLoading?.[key?.id]"
						@click="removeApiKey(key?.id)"
					>
						<v-icon color="red">
							mdi-trash-can-outline
						</v-icon>
					</v-btn>
				</div>
			</div>
		</template>
		<template #actions>
			<v-btn @click="back">
				Назад
			</v-btn>

			<v-btn @click="close">
				Закрыть
			</v-btn>
		</template>
	</wrapper-modal>
</template>

<style scoped lang="scss">
.title {
  margin-bottom: 30px;
}

.api-keys {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  gap: 20px;

  &__item {
    display: grid;
    grid-template-columns: 1.2fr 1fr 0.8fr min-content;
    align-items: center;

    p {
      max-width: 130px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
