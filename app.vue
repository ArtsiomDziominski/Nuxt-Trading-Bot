<template>
	<GlobalLoading v-if="isLoading" />
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
</script>

<style lang="scss">
.app {}
</style>
