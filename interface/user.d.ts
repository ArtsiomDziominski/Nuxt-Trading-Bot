export interface User {
	login: string;
	mail: string;
	apiKeys: {
		name: string;
		publicKey: string;
		secretKey: string;
		type: string;
		id: string;
	}[];
}

export as namespace USER;
