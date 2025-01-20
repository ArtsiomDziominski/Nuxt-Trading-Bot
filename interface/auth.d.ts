export interface IUser {
	login: string;
	mail: string;
}

export interface ILogin {
	password: string;
	mail: string;
	captchaToken: string;
}

export interface ISignupMail {
	login: string;
	password: string;
	mail: string;
	captchaToken: string;
}

export as namespace AUTH;
