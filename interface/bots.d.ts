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
	pendingOrdersCount: number;
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
	pendingOrders: {
		orderId: number;
		symbol: string;
		status: string;
		clientOrderId: string;
		price: string;
		avgPrice: string;
		origQty: string;
		executedQty: string;
		cumQuote: string;
		timeInForce: string;
		type: string;
		reduceOnly: boolean;
		closePosition: boolean;
		side: string;
		positionSide: string;
		stopPrice: string;
		workingType: string;
		priceProtect: boolean;
		origType: string;
		priceMatch: string;
		selfTradePreventionMode: string;
		goodTillDate: number;
		time: number;
		updateTime: number;
	}[];
}

// Spot Bot Interfaces
export interface SpotPositionRisk {
	symbol: string;
	markPrice: string;
	positionPercent: string;
	positionAmt: string;
	entryPrice: string;
	avgPrice: string;
	unRealizedProfit: string;
	updateTime: number;
	isActive: boolean;
	isProcessingOrders: boolean;
	pendingOrdersCount: number;
}

export interface SpotPositionParam {
	symbol: string;
	qty: number;
	price: number;
	side: string;
	qtyOpenOrders: number;
	step: number;
	decimals: number;
	strategy: 'DEFAULT';
}

export interface SpotActiveBotsPositionRisk {
	positionRisk: SpotPositionRisk;
	positionParam: SpotPositionParam;
	pendingOrders: {
		orderId: number;
		symbol: string;
		status: string;
		clientOrderId: string;
		price: string;
		avgPrice: string;
		origQty: string;
		executedQty: string;
		cumQuote: string;
		timeInForce: string;
		type: string;
		side: string;
		stopPrice: string;
		workingType: string;
		priceProtect: boolean;
		origType: string;
		priceMatch: string;
		selfTradePreventionMode: string;
		goodTillDate: number;
		time: number;
		updateTime: number;
	}[];
}

export interface SpotActiveBots {
	api: {
		id: string;
		name: string;
	};
	positionsRisk: SpotActiveBotsPositionRisk[];
}

export as namespace BOTS;
