import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { ENDPOINT, HEADER_PARAMETERS } from '~/const/request';
import { getHeadersRequest } from '~/utils/request';
import { userStore } from '~/store/user';
import { apiStore } from '~/store/api';
import { ruleLoginForm, rulePasswordForm } from '~/const/validation';
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
	});

	const userSignup: Ref<AUTH.ISignupMail> = ref({
		login: '',
		mail: '',
		password: '',
	});

	const errors: Ref<COMMON.Errors> = ref({
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

	const checkValidationLoginForm = (): boolean => {
		const validationRules = ruleLoginForm(userLogin.value.mail);
		const { isValid, error } = storeValidation.makeCheckRules('mail', validationRules);
		appendErrors(error);
		return isValid;
	};

	const requestSignupMail = async (): Promise<void> => {
		isLoaderSignup.value = true;
		try {
			const passwordEncrypt = encryptPassword(userSignup.value.password);
			const body = {
				...userSignup.value,
				password: passwordEncrypt,
			};
			const response = await axios.post(BURL + ENDPOINT.auth.signupMail, body, getHeadersRequest([HEADER_PARAMETERS.content]));
			if (response.data.success) {
				await storeUser.saveToken(response.data.token);
				storeWS.webSocketServer();
				clearUserSignup();
			}
		}
		catch (e) { /* empty */ }
		isLoaderSignup.value = false;
	};

	const checkValidationPasswordForm = (): boolean => {
		const validationRules = rulePasswordForm(userLogin.value.password);
		const { isValid, error } = storeValidation.makeCheckRules('password', validationRules);
		appendErrors(error);
		return isValid;
	};

	const clearUserLogin = (): void => {
		userLogin.value = { mail: '', password: '' };
	};

	const clearUserSignup = (): void => {
		userSignup.value = {
			login: '',
			mail: '',
			password: '',
		};
	};

	return {
		userLogin,
		userSignup,
		errors,
		isLoaderLogin,
		isLoaderSignup,
		requestLogin,
		requestSignupMail,
		checkValidationLoginForm,
		checkValidationPasswordForm,
	};
});
