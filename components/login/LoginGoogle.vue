<script setup lang="ts">
// Conditionally import Google Sign-In components
let GoogleSignInButton: any = null;
let CredentialResponse: any = null;

try {
	const googleSignIn = await import('vue3-google-signin');
	GoogleSignInButton = googleSignIn.GoogleSignInButton;
	CredentialResponse = googleSignIn.CredentialResponse;
} catch (error) {
	// Google Sign-In module not available, will handle gracefully
	console.warn('Google Sign-In module not available:', error);
}

const props = defineProps({
	type: {
		type: String,
		default: 'signin',
	},
});

const router = useRouter();
const translation = useI18n();
const config = useRuntimeConfig();

const userLogin = inject('userLogin') as Ref;
const requestLoginGoogle = inject('requestLoginGoogle') as Function;
const addNotification = inject('addNotification') as Function;

// Check if Google Sign-In is available
const isGoogleSignInAvailable = computed(() => {
	return !!config.public.googleClientId && !!GoogleSignInButton;
});

const text = computed(() => props.type === 'signin' ? 'signin_with' : 'signup_with');

const handleLoginSuccess = async (response: any): Promise<void> => {
	const { credential } = response;
	await requestLoginGoogle(credential);
};

const handleLoginError = () => {
	addNotification('error', String(translation.t('error.errorSingIn')));
};
</script>

<template>
	<div v-if="isGoogleSignInAvailable">
		<GoogleSignInButton
			auto-selec
			size="large"
			:text="text"
			@success="handleLoginSuccess"
			@error="handleLoginError"
		/>
	</div>
	<div v-else class="text-center text-gray-500">
		{{ translation.t('googleSignIn.notAvailable') || 'Google Sign-In is not available' }}
	</div>
</template>
