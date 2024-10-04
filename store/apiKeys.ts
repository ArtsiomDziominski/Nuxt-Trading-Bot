import { defineStore } from 'pinia';
import { ENDPOINT } from '~/const/request';
import { apiStore } from '~/store/api';
import { encryptAPI } from '~/utils/encrypt';
import { userStore } from '~/store/user';
import { notificationStore } from '~/store/notification';

export const apiKeysStore = defineStore('apiKeysStore', () => {
	const api = apiStore();
	const storeUser = userStore();
	const storeNotification = notificationStore();

	const isModalCreateApiKey = ref(false);
	const isModalListApiKey = ref(false);
	const isAddApiLoading = ref(false);
	const isRemoveApiLoading = ref<{ [key: string]: boolean }>({});
	const errors = ref({
		name: { message: '' },
		publicKey: { message: '' },
		secretKey: { message: '' },
	});

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
				storeNotification.addNotification('success', response.message);
			}
			else {
				storeNotification.addNotification('error', response.message);
			}

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
				storeNotification.addNotification('success', response.message);
			}
			else {
				storeNotification.addNotification('error', response.message);
			}

			isRemoveApiLoading.value = { [apiKeyId]: false };
			return !!response?.success;
		}
		catch (e) {
			console.error(e);
		}
		isRemoveApiLoading.value = { [apiKeyId]: false };
		return false;
	};

	const appendErrors = (error: COMMON.Errors): void => {
		errors.value = { ...errors.value, ...error };
	};

	return {
		isModalCreateApiKey,
		isModalListApiKey,
		isAddApiLoading,
		isRemoveApiLoading,
		errors,
		appendErrors,
		requestAddApi,
		requestRemoveApi,
	};
});
