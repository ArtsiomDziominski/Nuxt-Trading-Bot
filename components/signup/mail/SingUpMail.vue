<script setup lang="ts">
import type { Ref } from 'vue';

const userSignup: Ref<AUTH.ISignupMail> = inject('userSignup') as Ref<AUTH.ISignupMail>;
const errors: Ref<COMMON.Errors> = inject ('errors') as Ref<COMMON.Errors>;
const checkValidationLoginForm = inject ('checkValidationLoginForm');
const checkValidationMailForm = inject ('checkValidationMailForm');
const checkValidationPasswordForm = inject ('checkValidationPasswordForm');

const showPassword = ref(false);

const input = (name: 'login' | 'mail' | 'password') => {
	errors.value[name].message = '';
};
</script>

<template>
	<div class="sing-up-mail">
		<v-text-field
			v-model="userSignup.login"
			class="card__input"
			:label="$t('singUp.labelLogin')"
			variant="outlined"
			:error-messages="$t(errors.login.message)"
			@input="input('login')"
			@blur="checkValidationLoginForm"
		/>
		<v-text-field
			v-model="userSignup.mail"
			:label="$t('singUp.labelEmail')"
			placeholder="johndoe@gmail.com"
			type="email"
			variant="outlined"
			name="email"
			:error-messages="$t(errors.mail.message)"
			@input="input('mail')"
			@blur="checkValidationMailForm"
		/>
		<v-text-field
			v-model="userSignup.password"
			hint="Enter your password to access this website"
			:label="$t('singUp.labelPassword')"
			:type="showPassword ? 'text' : 'password'"
			:append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
			variant="outlined"
			:error-messages="$t(errors.password.message)"
			name="new-password"
			@input="input('password')"
			@blur="checkValidationPasswordForm"
			@click:append-inner="showPassword = !showPassword"
		/>
		<p class="card__signup text-grey-lighten-2 text-caption">
			{{ $t('singUp.alreadyRegistered') }} <NuxtLink
				class="text-white"
				to="/login"
			>
				{{ $t('singUp.enter') }}
			</NuxtLink>
		</p>
	</div>
</template>

<style scoped lang="scss">
.sing-up-mail {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
