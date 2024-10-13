export interface ActiveBots {
	api: {
		id: string;
		name: string;
	};
	positionsRisk: ActiveBotsPositionRisk[];
}

export interface PositionRisk {
	symbol: string;
	positionAmt: string;
	entryPrice: string;
	markPrice: string;
	unRealizedProfit: string;
	liquidationPrice: string;
	isolatedMargin: string;
	isolatedWallet: string;
	updateTime: number;
	isActive: boolean;
	isProcessingOrders: false;
}

export interface PositionParam {
	symbol: string;
	qty: number;
	price: number;
	side: string;
	qtyOpenOrders: number;
	step: number;
	decimals: number;
	strategy: 'DEFAULT';
	marginType: 'CROSSED';
	stepRevers: number;
}

export interface ActiveBotsPositionRisk {
	positionRisk: PositionRisk;
	positionParam: PositionParam;
}

export as namespace BOTS;
