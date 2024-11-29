interface CoinCalculationParams {
	startCoins: number; // Количество монет на старте
	numberOfOrders: number; // Количество ордеров
	entryPrice: number; // Цена первого ордера
	stepPercent: number; // Шаг уменьшения в процентах
}

interface LiquidationParams {
	walletBalance: number; // Баланс кошелька в USDT
	averagePurchasePrice: number; // Средняя цена закупки
	totalCoins: number; // Общее количество монет
}

interface GridBotMetrics extends CoinCalculationParams, LiquidationParams {
	decimals: number;
}

function calculateOrdersAndAveragePrice(params: CoinCalculationParams) {
	const { entryPrice, startCoins, numberOfOrders, stepPercent } = params;

	let nextOrderCoins = 0;
	let totalSpent = 0;
	let currentPrice = entryPrice;

	// Массив для хранения значений количества монет на каждом ордере
	const coinsAtEachOrder: number[] = [];

	// Проходим по всем ордерам
	for (let i = 0; i < numberOfOrders; i++) {
		nextOrderCoins += startCoins; // Увеличиваем общее количество монет на каждый ордер
		coinsAtEachOrder.push(nextOrderCoins); // Добавляем количество монет после каждого ордера
		totalSpent += currentPrice * startCoins; // Добавляем стоимость монет на этом ордере
		currentPrice = currentPrice * (1 - stepPercent / 100); // Для шорта уменьшаем цену на шаг
	}

	const averagePrice = totalSpent / nextOrderCoins; // Средняя цена закупки

	const totalCoins = coinsAtEachOrder.reduce((accumulator, currentValue) => accumulator += currentValue, 0);

	return {
		coinsAtEachOrder,
		nextOrderCoins,
		totalCoins,
		totalSpent,
		averagePrice,
	};
}

function calculateLiquidationPrice(params: LiquidationParams): number {
	const { walletBalance, averagePurchasePrice, totalCoins } = params;

	// Проверяем, чтобы общее количество монет было больше нуля
	if (totalCoins <= 0) {
		console.log('Общее количество монет должно быть больше нуля.');
	}

	// Рассчитываем цену ликвидации
	return averagePurchasePrice * (1 - walletBalance / (totalCoins * averagePurchasePrice));
}

function calculateGridBotMetrics(params: {
	entryPrice: number;
	walletBalance: number;
	decimals: number;
	numberOfOrders: number;
	startCoins: number;
	stepPercent: number;
}) {
	const {
		entryPrice,
		startCoins,
		walletBalance,
		numberOfOrders,
		stepPercent,
		decimals,
	} = params;
	const ordersAndAveragePriceParams: CoinCalculationParams = {
		entryPrice,
		startCoins,
		numberOfOrders,
		stepPercent,
	};
	const result = calculateOrdersAndAveragePrice(ordersAndAveragePriceParams);

	const liquidationParams: LiquidationParams = {
		walletBalance, // Баланс кошелька в USDT
		averagePurchasePrice: result.averagePrice, // Средняя цена закупки
		totalCoins: result.totalCoins, // Общее количество монет
	};

	const liquidationPrice = calculateLiquidationPrice(liquidationParams);

	return {
		coinsAtEachOrder: result.coinsAtEachOrder.map(item => Number(item.toFixed(decimals))),
		averagePrice: Number((result.averagePrice).toFixed(decimals)),
		nextOrderCoins: Number((result.nextOrderCoins).toFixed(decimals)),
		totalCoins: Number((result.totalCoins).toFixed(decimals)),
		liquidationPrice: Number((liquidationPrice).toFixed(decimals)),
	};
}

export const calculateGridBot = { calculateGridBotMetrics };
