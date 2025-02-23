import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { ENDPOINT, HEADER_PARAMETERS } from '~/const/request';
import { getHeadersRequest } from '~/utils/request';
import { userStore } from '~/store/user';
import { apiStore } from '~/store/api';
import { ruleLoginForm, ruleMailForm, ruleNewPassword, rulePasswordForm } from '~/const/validation';
import { validationStore } from '~/store/validation';
import { encryptPassword } from '~/utils/encrypt';
import { wsStore } from '~/store/ws';
import { notificationStore } from '~/store/notification';

export const authStore = defineStore('authStore', () => {
	const storeUser = userStore();
	const storeValidation = validationStore();
	const api = apiStore();
	const storeWS = wsStore();
	const storeNotification = notificationStore();
	const BURL = api.BURL;

	const userLogin: Ref<AUTH.ILogin> = ref({
		mail: '',
		password: '',
		captchaToken: '',
	});

	const userSignup: Ref<AUTH.ISignupMail> = ref({
		login: '',
		mail: '',
		password: '',
		captchaToken: '',
	});

	const errors: Ref<COMMON.Errors> = ref({
		login: { message: '' },
		mail: { message: '' },
		password: { message: '' },
	});

	const isLoaderLogin: Ref<boolean> = ref(false);
	const isLoaderSignup: Ref<boolean> = ref(false);

	const appendErrors = (error: COMMON.Errors): void => {
		errors.value = { ...errors.value, ...error };
	};

	const requestLogin = async (): Promise<void> => {
		isLoaderLogin.value = true;
		try {
			const passwordEncrypt = encryptPassword(userLogin.value.password);
			const body = {
				...userLogin.value,
				password: passwordEncrypt,
			};
			const response = await axios.post(BURL + ENDPOINT.auth.login, body, getHeadersRequest([HEADER_PARAMETERS.content]));
			if (response.data.success) {
				await storeUser.saveToken(response.data.token);
				await storeUser.requestSetUser();
				storeWS.webSocketServer();
				clearUserLogin();
			}
		}
		catch (e) {
			if (e?.response?.data?.message) storeNotification.addNotification('error', e.response.data.message);
		}
		isLoaderLogin.value = false;
	};

	const requestLoginTelegram = async (body: AUTH.ILoginTelegramBody): Promise<boolean> => {
		isLoaderLogin.value = true;
		let success = false;
		try {
			const response = await axios.post(BURL + ENDPOINT.auth.loginTelegram, body, getHeadersRequest([HEADER_PARAMETERS.content]));
			if (response.data.success) {
				await storeUser.saveToken(response.data.token);
				await storeUser.requestSetUser();
				storeWS.webSocketServer();
				clearUserLogin();
				success = response.data.success;
			}
		}
		catch (e) {
			if (e?.response?.data?.message) storeNotification.addNotification('error', e.response.data.message);
		}
		isLoaderLogin.value = false;
		return success;
	};

	const requestLoginGoogle = async (accessToken: string): Promise<boolean> => {
		isLoaderLogin.value = true;
		let success = false;
		try {
			const response = await axios.post(BURL + ENDPOINT.auth.loginGoogle, { accessToken }, getHeadersRequest([HEADER_PARAMETERS.content]));
			if (response.data.success) {
				await storeUser.saveToken(response.data.data.token);
				await storeUser.requestSetUser();
				storeWS.webSocketServer();
				clearUserLogin();
				success = response.data.success;
			}
		}
		catch (e) {
			if (e?.response?.data?.message) storeNotification.addNotification('error', e.response.data.message);
		}
		isLoaderLogin.value = false;
		return success;
	};

	const requestSignupMail = async (): Promise<boolean> => {
		isLoaderSignup.value = true;
		try {
			const passwordEncrypt = encryptPassword(userSignup.value.password);
			const body = {
				...userSignup.value,
				password: passwordEncrypt,
			};
			const response = await axios.post(BURL + ENDPOINT.auth.signupMail, body, getHeadersRequest([HEADER_PARAMETERS.content]));
			if (response.data.success) {
				if (response?.data?.message) storeNotification.addNotification('success', response.data.message);
				await storeUser.saveToken(response.data.token);
				storeWS.webSocketServer();
				clearUserSignup();
			}

			isLoaderSignup.value = false;
			return response?.data?.success;
		}
		catch (e) {
			if (e?.response?.data?.message) storeNotification.addNotification('error', e.response.data.message);
			isLoaderSignup.value = false;
			return !!e?.response?.data?.success;
		}
	};

	const checkValidationMailForm = (): boolean => {
		const mail = useRoute().name === 'login' ? userLogin.value.mail : userSignup.value.mail;
		const validationRules = ruleMailForm(mail);
		const { isValid, error } = storeValidation.makeCheckRules('mail', validationRules);
		appendErrors(error);
		return isValid;
	};

	const checkValidationPasswordForm = (): boolean => {
		const isLogin = useRoute().name === 'login';
		const password = isLogin ? userLogin.value.password : userSignup.value.password;
		const validationRules = isLogin ? rulePasswordForm(password) : ruleNewPassword(password);

		const { isValid, error } = storeValidation.makeCheckRules('password', validationRules);
		appendErrors(error);
		return isValid;
	};

	const checkValidationLoginForm = (): boolean => {
		const validationRules = ruleLoginForm(userSignup.value.login);
		const { isValid, error } = storeValidation.makeCheckRules('login', validationRules);
		appendErrors(error);
		return isValid;
	};

	const clearUserLogin = (): void => {
		userLogin.value = { mail: '', password: '', captchaToken: '' };
	};

	const clearUserSignup = (): void => {
		userSignup.value = {
			login: '',
			mail: '',
			password: '',
			captchaToken: '',
		};
	};

	return {
		userLogin,
		userSignup,
		errors,
		isLoaderLogin,
		isLoaderSignup,
		requestLogin,
		requestLoginTelegram,
		requestLoginGoogle,
		requestSignupMail,
		checkValidationMailForm,
		checkValidationPasswordForm,
		checkValidationLoginForm,
		clearUserLogin,
		clearUserSignup,
	};
});
