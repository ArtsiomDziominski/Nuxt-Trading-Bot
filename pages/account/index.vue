<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from '~/store/user';

const storeUser = userStore();
const { user } = storeToRefs(storeUser);
provide('user', user);
provide('requestSetUser', storeUser.requestSetUser);
</script>

<template>
	<div class="account">
		<AccountNavigation />

		<NuxtPage />
	</div>
</template>

<style scoped lang="scss">
.account {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}
</style>
