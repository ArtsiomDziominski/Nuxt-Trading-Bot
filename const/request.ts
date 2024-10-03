export const HEADER_PARAMETERS = {
	content: {
		key: 'Content-Type',
		body: 'application/json',
	},
	accept: {
		key: 'Accept',
		body: 'application/json',
	},
	authorization: {
		key: 'Authorization',
		body: 'Bearer',
	},
};

export const ENDPOINT = {
	auth: {
		login: '/auth/login',
		signupMail: '/auth/registration',
		user: '/auth/user',
	},
	bots: {
		gritBot: {
			get: '/gridBot/activeBots',
		},
	},
	user: {
		apiKey: {
			add: '/user/api',
		}
	}
};

export enum ErrorCodes {
	notAdmin = 101,
	notAuth = 100,
}
