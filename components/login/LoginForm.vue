<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { authStore } from '~/store/auth';
import { userStore } from '~/store/user';

const storeAuth = authStore();
const { userLogin, errors, isLoaderLogin } = storeToRefs(storeAuth);

const storeUser = userStore();
const { isAuthenticated } = storeToRefs(storeUser);

const router = useRouter();

onUnmounted(() => storeAuth.clearUserLogin());

const showPassword = ref(false);

const isValidForm = computed((): boolean => {
	const isMail = !storeAuth.checkValidationMailForm();
	const isPassword = !storeAuth.checkValidationPasswordForm();
	return isMail || isPassword;
});

const submit = async (): Promise<void> => {
	if (isValidForm.value) return;
	await storeAuth.requestLogin();
	if (isAuthenticated.value) await router.push('/bots');
};

const inputMail = async (): Promise<void> => {
	errors.value.mail.message = '';
};

const blurMail = async (): Promise<void> => {
	errors.value.mail.message = '';
	if (userLogin.value.mail) storeAuth.checkValidationMailForm();
};

const inputPassword = async (): Promise<void> => {
	errors.value.password.message = '';
};

const blurPassword = async (): Promise<void> => {
	errors.value.password.message = '';
	if (userLogin.value.password) storeAuth.checkValidationPasswordForm();
};

const isDisabledBtn = computed((): boolean => {
	return !!errors.value.mail.message && !!errors.value.password.message;
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
				<v-text-field
					v-model="userLogin.mail"
					class="card__input"
					:label="$t('singIn.labelEmail')"
					placeholder="johndoe@gmail.com"
					type="email"
					variant="outlined"
					name="email"
					:error-messages="$t(errors.mail.message)"
					@input="inputMail"
					@blur="blurMail"
				/>

				<v-text-field
					v-model="userLogin.password"
					class="card__input"
					hint="Enter your password to access this website"
					:label="$t('singIn.labelPassword')"
					:type="showPassword ? 'text' : 'password'"
					variant="outlined"
					:error-messages="$t(errors.password.message)"
					:append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					name="current-password"
					@input="inputPassword"
					@blur="blurPassword"
					@click:append-inner="showPassword = !showPassword"
				/>
				<div class="card__signup text-caption">
					<span>{{ $t('singIn.notAccount') }}</span>
					<nuxt-link
						to="/signup"
					>
						{{ $t('singIn.toSingUpBtn') }}
					</nuxt-link>
				</div>
			</v-card-item>

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
