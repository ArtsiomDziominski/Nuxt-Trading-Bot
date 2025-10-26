# Поддержка спотовых ботов

## Обзор

В приложение добавлена поддержка создания и управления спотовыми ботами в дополнение к существующим фьючерсным ботам.

## Новые возможности

### 1. Выбор типа рынка
- При создании бота пользователь может выбрать между фьючерсным и спотовым рынком
- Фьючерсы: торговля с использованием кредитного плеча
- Спот: торговля без кредитного плеча

### 2. API Endpoints

#### Спотовые боты
- `POST /gridBot/spot/create` - Создание нового spot бота
- `PUT /gridBot/spot/watching` - Изменение статуса мониторинга spot бота
- `GET /gridBot/spot/activeBots` - Получение активных спотовых ботов

#### Фьючерсные боты (существующие)
- `POST /gridBot/create` - Создание нового futures бота
- `PUT /gridBot/watching` - Изменение статуса мониторинга futures бота
- `GET /gridBot/activeBots` - Получение активных фьючерсных ботов

### 3. Интерфейсы данных

#### Спотовые боты
```typescript
interface SpotPositionRisk {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  baseAssetBalance: string;
  quoteAssetBalance: string;
  avgPrice: string;
  unRealizedProfit: string;
  updateTime: number;
  isActive: boolean;
  isProcessingOrders: boolean;
  pendingOrdersCount: number;
}

interface SpotActiveBots {
  api: {
    id: string;
    name: string;
  };
  positionsRisk: SpotActiveBotsPositionRisk[];
}
```

#### Фьючерсные боты (существующие)
```typescript
interface PositionRisk {
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
```

### 4. UI Компоненты

#### Новые компоненты
- `BotsSpotApiWrapper.vue` - Обертка для спотовых ботов
- `BotsSpotActionCard.vue` - Карточка спотового бота

#### Обновленные компоненты
- `BotsSelectModal.vue` - Добавлен выбор типа рынка
- `BotsCreateModal.vue` - Показывает тип рынка в заголовке
- `BotsActionsBar.vue` - Добавлены индикаторы типов рынка
- `pages/bots/index.vue` - Отображает оба типа ботов

### 5. Store обновления

#### createBotsStore
- Добавлено поле `marketType: BotMarketType`
- Обновлена функция `requestCreateBot()` для выбора правильного endpoint
- Обновлена функция `clearBotParams()` для сброса типа рынка

#### botsStore
- Добавлено поле `activeSpotBots: BOTS.SpotActiveBots[]`
- Добавлена функция `requestChangeWatchingSpotBot()`
- Добавлена функция `changeActiveSpotBot()`
- Добавлена функция `updateActiveSpotBotsFromWS()`
- Обновлена функция `requestActiveBots()` для загрузки обоих типов ботов
- Обновлены computed свойства для подсчета ботов обоих типов

### 6. Константы

#### Новые enum
```typescript
export enum BotMarketType {
  Futures = 'FUTURES',
  Spot = 'SPOT',
}
```

#### Обновленные endpoints
```typescript
bots: {
  gritBot: {
    get: '/gridBot/activeBots',
    create: '/gridBot/create',
    takeProfit: '/gridBot/takeProfit',
    watching: '/gridBot/watching',
    spot: {
      get: '/gridBot/spot/activeBots',
      create: '/gridBot/spot/create',
      watching: '/gridBot/spot/watching',
    },
  },
}
```

### 7. Переводы

#### Русский (ru.json)
- `"selectMarketType": "Выберите тип рынка"`

#### Английский (en.json)
- `"selectMarketType": "Select market type"`

## Использование

### Создание спотового бота
1. Нажмите "Создать нового бота"
2. Выберите "Спот" в качестве типа рынка
3. Выберите стратегию бота
4. Заполните параметры бота
5. Нажмите "Создать бота"

### Управление спотовыми ботами
- Спотовые боты отображаются с зеленой полосой слева
- Имеют отдельные кнопки управления (Запуск/Пауза/Остановить)
- Показывают баланс базовой и котируемой валют
- Отображают нереализованную прибыль

## Технические детали

### Различия между фьючерсными и спотовыми ботами

#### Фьючерсные боты
- Используют кредитное плечо
- Имеют цену ликвидации
- Показывают изолированную маржу
- Торгуют контрактами

#### Спотовые боты
- Торгуют реальными активами
- Показывают баланс базовой и котируемой валют
- Не имеют цены ликвидации
- Торгуют актуальными токенами

### WebSocket обновления
- Фьючерсные боты обновляются через `updateActiveBotsFromWS()`
- Спотовые боты обновляются через `updateActiveSpotBotsFromWS()`

## Совместимость

Все существующие фьючерсные боты продолжают работать без изменений. Новая функциональность полностью обратно совместима.


