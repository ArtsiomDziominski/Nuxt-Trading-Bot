<script setup lang="ts">
import {
	GoogleSignInButton,
	type CredentialResponse,
} from 'vue3-google-signin';

const props = defineProps({
	type: {
		type: String,
		default: 'signin',
	},
});

const router = useRouter();
const translation = useI18n();

const userLogin = inject('userLogin') as Ref;
const requestLoginGoogle = inject('requestLoginGoogle') as Function;
const addNotification = inject('addNotification') as Function;

const text = computed(() => props.type === 'signin' ? 'signin_with' : 'signup_with');

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
		auto-selec
		size="large"
		:text="text"
		@success="handleLoginSuccess"
		@error="handleLoginError"
	/>
</template>
