<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { authStore } from '~/store/auth';

const storeAuth = authStore();
const { userSignup, isLoaderSignup, errors } = storeToRefs(storeAuth);

provide('userSignup', userSignup);
provide('isLoaderSignup', isLoaderSignup);
provide('errors', errors);
provide('checkValidationLoginForm', storeAuth.checkValidationLoginForm);
provide('checkValidationMailForm', storeAuth.checkValidationMailForm);
provide('checkValidationPasswordForm', storeAuth.checkValidationPasswordForm);
</script>

<template>
	<div class="signup-wrapper">
		<SignupMailSignUpMailForm />
	</div>
</template>

<style scoped lang="scss">
.signup-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
