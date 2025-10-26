export enum Strategy {
	MARTINGALE = 'MARTINGALE',
	DEFAULT = 'DEFAULT',
}

export enum BotTypes {
	Limit = 'LIMIT',
	Market = 'MARKET',
}

export enum BotMarketType {
	Futures = 'FUTURES',
	Spot = 'SPOT',
}

export const BotCreateTitle = {
	[Strategy.DEFAULT]: 'Сеточный бот',
	[Strategy.MARTINGALE]: 'Сеточный бот "Мартингейл"',
};

export enum BotStatus {
	Start = 'START',
	Stop = 'STOP',
	Pause = 'PAUSE',
}
