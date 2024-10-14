<template>
	<start-loading v-if="isLoading" />
	<NuxtLayout v-else>
		<NuxtPage />
		<global-notification />
	</NuxtLayout>
</template>

<script setup lang="ts">
import { userStore } from '~/store/user';
import { wsStore } from '~/store/ws';

const storeUser = userStore();
const storeWS = wsStore();

const isLoading = ref(true);

onMounted(() => {
	storeUser.requestSetUser();
	isLoading.value = false;
	storeWS.webSocketServer();
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
