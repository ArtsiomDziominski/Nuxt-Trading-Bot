export enum Strategy {
	MARTINGALE = 'MARTINGALE',
	DEFAULT = 'DEFAULT',
}

export enum BotTypes {
	Limit = 'LIMIT',
	Market = 'MARKET',
}

export const BotCreateTitle = {
	[Strategy.DEFAULT]: 'Сеточный бот',
	[Strategy.MARTINGALE]: 'Сеточный бот "Мартингейл"',
};