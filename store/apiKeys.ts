import { defineStore } from 'pinia';
import {ENDPOINT} from "~/const/request";
import {apiStore} from "~/store/api";
import {encryptAPI} from "~/utils/encrypt";

export const apiKeysStore = defineStore('apiKeysStore', () => {
	const api = apiStore();

	const isModalCreateApiKey = ref(false);
	const isAddApiLoading = ref(false);

	const requestAddApi = async (apiKey: APIKEY.IApiAdd): Promise<boolean> => {
		isAddApiLoading.value = true;
		try {
			const encryptSecretKey = encryptAPI(apiKey.secretKey);
			const body = {
				...apiKey,
				secretKey: encryptSecretKey,
			};
			const response = await api.post(ENDPOINT.user.apiKey.add, body);

            // if (response.success) {}
            // else add notification (response.message);

			return !!response?.success;
		} catch (e) {
            console.error(e);
        }
		isAddApiLoading.value = false;
		return false;
	};

	return {
		isModalCreateApiKey,
		isAddApiLoading,
		requestAddApi
	};
});
