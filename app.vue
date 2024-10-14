<template>
	<start-loading v-if="isLoading" />
	<NuxtLayout v-else>
		<NuxtHead>
			<title>Лучшие торговые боты для торговли криптовалютой</title>
			<meta
				name="description"
				content="Узнайте о лучших торговых ботах для криптовалюты, которые помогут вам оптимизировать торговлю, автоматизировать стратегии и максимизировать прибыль. Сравните функциональность, особенности и отзывы пользователей, чтобы выбрать идеального бота для своих нужд."
			>

			<meta
				property="og:title"
				content="Узнайте о лучших торговых ботах для криптовалюты, которые помогут вам оптимизировать торговлю, автоматизировать стратегии и максимизировать прибыль. Сравните функциональность, особенности и отзывы пользователей, чтобы выбрать идеального бота для своих нужд."
			>
		</NuxtHead>
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
