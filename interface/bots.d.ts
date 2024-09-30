export interface ActiveBots {
    "api": {
        "id": string,
        "name": string
    },
    "positionsRisk": ActiveBotsPositionRisk[]
}

export interface ActiveBotsPositionRisk {
    "positionRisk": {
        "symbol": string,
        "positionAmt": string,
        "entryPrice": string,
        "markPrice": string,
        "unRealizedProfit": string,
        "liquidationPrice": string,
        "isolatedMargin": string,
        "isolatedWallet": string,
        "updateTime": number,
        "isActive": true,
        "isProcessingOrders": false
    },
    "positionParam": {
        "symbol": string,
        "qty": number,
        "price": number,
        "side": string,
        "qtyOpenOrders": number,
        "step": number,
        "decimals": number,
        "strategy": "DEFAULT",
        "marginType": "CROSSED",
        "stepRevers": number
    }[]
}

export as namespace BOTS;
