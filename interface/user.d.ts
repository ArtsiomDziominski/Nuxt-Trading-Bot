export interface User {
	login: string;
	mail: string;
	untilSubscription: string;
	apiKeys: {
		name: string;
		publicKey: string;
		secretKey: string;
		type: string;
		id: string;
	}[];
	tgId?: number;
}

export as namespace USER;
