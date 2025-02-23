<script setup lang="ts">
import LoginFormExtra from '~/components/login/LoginFormExtra.vue';
import LoginFormMail from '~/components/login/LoginFormMail.vue';
import SignSeparator from '~/components/SignSeparator.vue';

const router = useRouter();

const userLogin = inject('userLogin') as Ref;
const errors = inject('errors') as Ref;
const isLoaderLogin = inject('isLoaderLogin') as Ref<boolean>;
const isAuthenticated = inject('isAuthenticated') as Ref<boolean>;
const requestLogin = inject('requestLogin') as Function;
const requestSetUser = inject('requestSetUser') as Function;
const checkValidationMailForm = inject('checkValidationMailForm') as Function;
const checkValidationPasswordForm = inject('checkValidationPasswordForm') as Function;
const clearUserLogin = inject('clearUserLogin') as Function;

onUnmounted(() => clearUserLogin());

const isValidForm = computed((): boolean => {
	const isMail = !checkValidationMailForm();
	const isPassword = !checkValidationPasswordForm();
	return isMail || isPassword;
});

const submit = async (): Promise<void> => {
	if (isValidForm.value) return;
	await requestLogin();
	if (isAuthenticated.value) {
		requestSetUser();
		await router.push('/bots');
	}
};

const isDisabledBtn = computed((): boolean => {
	return (!!errors.value.mail.message && !!errors.value.password.message) || !userLogin.value.captchaToken;
});
</script>

<template>
	<v-form
		fast-fail
		class="form"
		@submit.prevent="submit"
	>
		<v-card
			color="secondary"
			class="mx-auto pa-8 card"
		>
			<v-card-title class="card__title">
				<p class="text-h4">
					{{ $t('singIn.title') }}
				</p>
			</v-card-title>
			<v-card-item class="card__item">
				<login-form-extra type="signin" />
				<sign-separator />
				<login-form-mail />
			</v-card-item>

			<NuxtTurnstile
				v-model="userLogin.captchaToken"
				class="d-flex justify-center"
			/>

			<v-card-actions class="card__actions">
				<v-btn
					class="mt-2"
					type="submit"
					block
					:disabled="isDisabledBtn"
					:loading="isLoaderLogin"
				>
					{{ $t('singIn.title') }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-form>
</template>

<style scoped lang="scss">
.form {
  width: 100%;

  .card {
    min-width: 300px;
    max-width: 600px;
    width: 100%;

    &__title {
      display: flex;
      justify-content: center;
    }

    &__input {
      padding: 6px 0;
    }

    &__actions {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__signup {
      text-decoration: none;
      color: white;
      display: flex;
      gap: 4px;
    }
  }
}
</style>
