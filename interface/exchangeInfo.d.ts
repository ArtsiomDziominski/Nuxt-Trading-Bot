import type { ExchangeInfoFilters } from '~/const/exchangeInfo';

export interface RateLimits {
	rateLimitType: string;
	interval: string;
	intervalNum: number;
	limit: number;
}

export interface Assets {
	asset: string;
	marginAvailable: boolean;
	autoAssetExchange: string;
}

export interface Filters {
	maxPrice?: string;
	filterType: ExchangeInfoFilters;
	minPrice?: string;
	tickSize?: string;
	minQty?: string;
	maxQty?: string;
	stepSize?: string;
	limit?: number;
}

export interface SymbolInfo {
	symbol: string;
	pair: string;
	contractType: string;
	deliveryDate: number;
	onboardDate: number;
	status: string;
	maintMarginPercent: string;
	requiredMarginPercent: string;
	baseAsset: string;
	quoteAsset: string;
	marginAsset: string;
	pricePrecision: number;
	quantityPrecision: number;
	baseAssetPrecision: number;
	quotePrecision: number;
	underlyingType: string;
	underlyingSubType: string[];
	triggerProtect: string;
	liquidationFee: string;
	marketTakeBound: string;
	maxMoveOrderLimit: number;
	filters: Filters[];
	orderTypes: string[];
	timeInForce: string[];
}

export interface exchangeInfo {
	timezone: string;
	serverTime: number;
	futuresType: string;
	rateLimits: RateLimits[];
	exchangeFilters: [];
	assets: Assets[];
	symbols: SymbolInfo[];
}
export as namespace EXCHANGE_INFO;
