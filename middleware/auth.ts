import { storeToRefs } from 'pinia';
import { userStore } from '~/store/user';
import { COOKIES_TOKEN } from '~/const/const';
import { getCookie } from '~/utils/cookie';

export default defineNuxtRouteMiddleware((to, from) => {
	const storeUser = userStore();
	const { isAuthenticated, userToken } = storeToRefs(storeUser);

	if (process.client) {
		userToken.value = getCookie(COOKIES_TOKEN) || '';
	} else {
		// На сервере получаем токен из cookies
		const event = useRequestEvent();
		const cookie = event?.node?.req?.headers?.cookie || '';
		const tokenMatch = cookie.match(new RegExp(`${COOKIES_TOKEN}=([^;]+)`));
		userToken.value = tokenMatch ? tokenMatch[1] : '';
	}

	if (!isAuthenticated.value) return navigateTo('/login');
});
