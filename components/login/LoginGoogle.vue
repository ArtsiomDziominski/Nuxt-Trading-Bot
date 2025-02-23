<script setup lang="ts">
import {
	GoogleSignInButton,
	type CredentialResponse,
} from 'vue3-google-signin';

const router = useRouter();
const translation = useI18n();

const userLogin = inject('userLogin') as Ref;
const requestLoginGoogle = inject('requestLoginGoogle') as Function;
const addNotification = inject('addNotification') as Function;

const handleLoginSuccess = async (response: CredentialResponse): Promise<void> => {
	const { credential } = response;
	if (!userLogin.value.captchaToken) {
		addNotification('info', String(translation.t('singIn.completeTheCaptcha')));
		return;
	}
	const isLogin = await requestLoginGoogle(credential);
	if (isLogin) await router.push({ name: 'bots' });
};

const handleLoginError = () => {
	addNotification('error', String(translation.t('error.errorSingIn')));
};
</script>

<template>
	<GoogleSignInButton
		auto-select="true"
		size="medium"
		text="continue_with"
		@success="handleLoginSuccess"
		@error="handleLoginError"
	/>
</template>
