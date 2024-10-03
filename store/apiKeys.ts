import { defineStore } from 'pinia';
import { ENDPOINT } from '~/const/request';
import { apiStore } from '~/store/api';
import { encryptAPI } from '~/utils/encrypt';
import { userStore } from '~/store/user';

export const apiKeysStore = defineStore('apiKeysStore', () => {
	const api = apiStore();
	const storeUser = userStore();

	const isModalCreateApiKey = ref(false);
	const isModalListApiKey = ref(false);
	const isAddApiLoading = ref(false);
	const isRemoveApiLoading = ref<{ [key: string]: boolean }>({});

	const requestAddApi = async (apiKey: APIKEY.IApiAdd): Promise<boolean> => {
		isAddApiLoading.value = true;
		try {
			const encryptSecretKey = encryptAPI(apiKey.secretKey);
			const body = {
				...apiKey,
				secretKey: encryptSecretKey,
			};
			const response = await api.post(ENDPOINT.user.apiKey.add, body);

			if (response.success) {
				storeUser.requestSetUser();
			}
			// else add notification (response.message);

			isAddApiLoading.value = false;
			return !!response?.success;
		}
		catch (e) {
			console.error(e);
		}
		isAddApiLoading.value = false;
		return false;
	};

	const requestRemoveApi = async (apiKeyId: string): Promise<boolean> => {
		isRemoveApiLoading.value = { [apiKeyId]: true };
		try {
			const response = await api.deleteJson(ENDPOINT.user.apiKey.delete, { id: apiKeyId });

			if (response.success) {
				storeUser.requestSetUser();
			}
			// else add notification (response.message);

			isRemoveApiLoading.value = { [apiKeyId]: false };
			return !!response?.success;
		}
		catch (e) {
			console.error(e);
		}
		isRemoveApiLoading.value = { [apiKeyId]: false };
		return false;
	};

	return {
		isModalCreateApiKey,
		isModalListApiKey,
		isAddApiLoading,
		isRemoveApiLoading,
		requestAddApi,
		requestRemoveApi,
	};
});
