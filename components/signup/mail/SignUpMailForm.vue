<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { authStore } from '~/store/auth';
import { userStore } from '~/store/user';
import LoginFormExtra from '~/components/login/LoginFormExtra.vue';
import SingUpMail from '~/components/signup/mail/SingUpMail.vue';
import SignSeparator from '~/components/SignSeparator.vue';

const storeAuth = authStore();

const storeUser = userStore();
const { isAuthenticated } = storeToRefs(storeUser);

const userSignup: Ref<AUTH.ISignupMail> = inject('userSignup') as Ref<AUTH.ISignupMail>;
const isLoaderSignup: Ref<boolean> = inject('isLoaderSignup') as Ref<boolean>;

const router = useRouter();

onUnmounted(() => storeAuth.clearUserSignup());

const isValidForm = computed((): boolean => {
	const isLogin = !storeAuth.checkValidationLoginForm();
	const isMail = !storeAuth.checkValidationMailForm();
	const isPassword = !storeAuth.checkValidationPasswordForm();
	return isLogin || isMail || isPassword;
});

const submit = async (): Promise<void> => {
	if (isValidForm.value) return;

	if (!await storeAuth.requestSignupMail()) return;
	if (isAuthenticated.value) {
		storeUser.requestSetUser();
		await router.push('/bots');
	}
	storeAuth.clearUserSignup();
};
</script>

<template>
	<v-form
		fast-fail
		class="form"
		@submit.prevent="submit"
	>
		<v-card
			color="secondary"
			class="mx-auto pa-8 card d-flex flex-column"
		>
			<v-card-title class="card__title">
				<p class="text-h4">
					{{ $t('singUp.title') }}
				</p>
			</v-card-title>
			<v-card-item class="d-flex flex-column">
				<login-form-extra type="signup" />
				<sign-separator />
				<sing-up-mail />
			</v-card-item>

			<NuxtTurnstile
				v-model="userSignup.captchaToken"
				class="d-flex justify-center"
			/>

			<v-card-actions class="card__actions">
				<v-btn
					class="mt-2"
					type="submit"
					:disabled="!userSignup.captchaToken"
					:loading="isLoaderSignup"
				>
					{{ $t('singUp.reg') }}
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

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
