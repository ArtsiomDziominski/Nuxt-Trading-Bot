<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { authStore } from '~/store/auth';
import { userStore } from '~/store/user';

const storeAuth = authStore();
const { userSignup, isLoaderSignup, errors } = storeToRefs(storeAuth);

const storeUser = userStore();
const { isAuthenticated } = storeToRefs(storeUser);

const router = useRouter();

onUnmounted(() => storeAuth.clearUserSignup());

const showPassword = ref(false);

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

const input = (name: 'login' | 'mail' | 'password') => {
	errors.value[name].message = '';
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
			class="mx-auto pa-8 card"
		>
			<v-card-title class="card__title">
				<p class="text-h4">
					{{ $t('singUp.title') }}
				</p>
			</v-card-title>
			<v-card-item>
				<div class="card__item">
					<v-text-field
						v-model="userSignup.login"
						class="card__input"
						:label="$t('singUp.labelLogin')"
						variant="outlined"
						:error-messages="$t(errors.login.message)"
						@input="input('login')"
						@blur="storeAuth.checkValidationLoginForm()"
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
						@blur="storeAuth.checkValidationMailForm()"
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
						@blur="storeAuth.checkValidationPasswordForm()"
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

    &__item {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &__actions {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
