<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { authStore } from '~/store/auth';
import { userStore } from '~/store/user';
import { notificationStore } from '~/store/notification';

const storeAuth = authStore();
const { userLogin, errors, isLoaderLogin } = storeToRefs(storeAuth);

const storeUser = userStore();
const { isAuthenticated } = storeToRefs(storeUser);

const storeNotification = notificationStore();

provide('userLogin', userLogin);
provide('isLoaderLogin', isLoaderLogin);
provide('errors', errors);
provide('isAuthenticated', isAuthenticated);
provide('checkValidationPasswordForm', storeAuth.checkValidationPasswordForm);
provide('checkValidationMailForm', storeAuth.checkValidationMailForm);
provide('requestLoginTelegram', storeAuth.requestLoginTelegram);
provide('requestLogin', storeAuth.requestLogin);
provide('clearUserLogin', storeAuth.clearUserLogin);
provide('requestSetUser', storeUser.requestSetUser);
provide('addNotification', storeNotification.addNotification);
provide('requestLoginGoogle', storeAuth.requestLoginGoogle);
</script>

<template>
	<div class="login-wrapper">
		<LoginForm />
	</div>
</template>

<style scoped lang="scss">
.login-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
