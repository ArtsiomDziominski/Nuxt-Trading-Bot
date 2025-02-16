<script setup lang="ts">
const showPassword = ref(false);

const userLogin = inject('userLogin') as Ref;
const errors = inject('errors') as Ref;
const checkValidationPasswordForm = inject('checkValidationPasswordForm') as Function;
const checkValidationMailForm = inject('checkValidationMailForm') as Function;

const inputMail = async (): Promise<void> => {
	errors.value.mail.message = '';
};

const blurMail = async (): Promise<void> => {
	errors.value.mail.message = '';
	if (userLogin.value.mail) checkValidationMailForm();
};

const inputPassword = async (): Promise<void> => {
	errors.value.password.message = '';
};

const blurPassword = async (): Promise<void> => {
	errors.value.password.message = '';
	if (userLogin.value.password) checkValidationPasswordForm();
};
</script>

<template>
	<div>
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
	</div>
</template>

<style scoped lang="scss">

</style>
