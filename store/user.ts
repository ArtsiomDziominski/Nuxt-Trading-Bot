import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { setCookie } from '~/utils/cookie';
import { COOKIES_TOKEN } from '~/const/const';
import { ENDPOINT } from '~/const/request';
import { apiStore } from '~/store/api';
import { encryptPassword } from '~/utils/encrypt';
import { notificationStore } from '~/store/notification';

export const userStore = defineStore('userStore', () => {
	const api = apiStore();
	const storeNotification = notificationStore();

	const user: Ref<USER.User | null> = ref(null);
	const userToken: Ref<string> = ref('');
	const isAuthenticated = computed(() => !!userToken.value);

	const saveToken = async (token: string): Promise<void> => {
		userToken.value = token;
		setCookie(COOKIES_TOKEN, token, 10);
	};

	const requestSetUser = async (): Promise<void> => {
		try {
			const response = await api.get(ENDPOINT.auth.user);
			if (response?.success) user.value = response?.data || null;
		}
		catch (e) {
			if ((e as unknown)?.response?.data) deleteUserToken();
		}
	};

	const deleteUserToken = (): void => {
		document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		userToken.value = '';
	};

	const userApiKeys = computed(() => {
		return user.value?.apiKeys.map((item) => {
			if (item?._id) return { ...item, id: item._id.toString() };
		}) || [];
	});

	const changePasswordUser = async (password: { current: string; new: string; newRepeat: string }) => {
		const body = {
			newPassword: encryptPassword(password.new),
			currentPassword: encryptPassword(password.current),
		};
		const response = await api.put(ENDPOINT.user.password, body);
		if (response?.success) storeNotification.addNotification('success', response?.message);
		else storeNotification.addNotification('error', response?.message);
	};

	return {
		user,
		userToken,
		isAuthenticated,
		userApiKeys,
		saveToken,
		requestSetUser,
		deleteUserToken,
		changePasswordUser,
	};
});
