<template>
	<start-loading v-if="isLoading" />
	<NuxtLayout v-else>
		<NuxtPage />
		<global-notification />
	</NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTheme } from 'vuetify';
import { userStore } from '~/store/user';
import { wsStore } from '~/store/ws';
import { keyTheme } from '~/const/theme';
import { getCookie } from '~/utils/cookie';

const storeUser = userStore();
const { userToken, isAuthenticated } = storeToRefs(storeUser);
const storeWS = wsStore();
const theme = useTheme();

const isLoading = ref(false);

onMounted(() => {
	if (process.client) {
		storeWS.webSocketMarkPrice();
		// Безопасное получение темы
		try {
			const savedTheme = localStorage.getItem(keyTheme);
			theme.global.name.value = savedTheme || 'dark';
		} catch (e) {
			theme.global.name.value = 'dark';
		}
		isAuthenticated.value && storeWS.webSocketServer();
	}
});

await useAsyncData('app', (app) => {
	const cookie = app?.ssrContext?.event.node.req.headers?.cookie || '';
	const cookieArray = cookie.split(';');
	const cookieObject: Record<string, string> = {};
	cookieArray.forEach((c) => {
		const cookArray = c.split('=');
		cookieObject[cookArray[0].trim()] = cookArray[1];
	});

	userToken.value = cookieObject?.['token'];
	theme.global.name.value = cookieObject?.[keyTheme] || 'dark';

	return Promise.allSettled([
		isAuthenticated.value && storeUser.requestSetUser(),
	]);
});

useHead({
	title: 'Лучшие торговые боты для торговли криптовалютой',
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ name: 'description', content: 'Узнайте о лучших торговых ботах для криптовалюты, которые помогут вам оптимизировать торговлю, автоматизировать стратегии и максимизировать прибыль. Сравните функциональность, особенности и отзывы пользователей, чтобы выбрать идеального бота для своих нужд.' },
	],
	link: [
		{ rel: 'icon', type: 'image/png', href: '/favicon.png' },
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
	],
});
</script>

<style lang="scss">
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
