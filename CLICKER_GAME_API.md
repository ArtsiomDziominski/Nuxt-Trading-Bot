# API для игры-кликера

## Описание
Документация API endpoints для интеграции игры-кликера с бэкендом.

## Endpoints

### 1. Сохранение игрового прогресса
**POST** `/api/clicker-game/save`

**Описание**: Сохраняет текущий прогресс игрока

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body**:
```json
{
  "score": 1500,
  "clicks": 150,
  "level": 2,
  "coinsPerClick": 1,
  "autoClickerLevel": 0,
  "autoClickerCost": 10,
  "multiplierLevel": 1,
  "multiplierCost": 50,
  "achievements": [
    {
      "id": "first_click",
      "name": "Первый клик",
      "description": "Сделайте первый клик",
      "requirement": 1,
      "reward": "basic_subscription",
      "icon": "mdi-cursor-default-click"
    }
  ],
  "unlockedRewards": ["basic_subscription"]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Game progress saved successfully"
}
```

### 2. Загрузка игрового прогресса
**GET** `/api/clicker-game/load`

**Описание**: Загружает сохраненный прогресс игрока

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "score": 1500,
    "clicks": 150,
    "level": 2,
    "coinsPerClick": 1,
    "autoClickerLevel": 0,
    "autoClickerCost": 10,
    "multiplierLevel": 1,
    "multiplierCost": 50,
    "achievements": [
      {
        "id": "first_click",
        "name": "Первый клик",
        "description": "Сделайте первый клик",
        "requirement": 1,
        "reward": "basic_subscription",
        "icon": "mdi-cursor-default-click"
      }
    ],
    "unlockedRewards": ["basic_subscription"]
  }
}
```

### 3. Получение награды
**POST** `/api/clicker-game/claim-reward`

**Описание**: Выдает награду игроку за достижение

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body**:
```json
{
  "rewardType": "basic_subscription"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Reward claimed successfully",
  "data": {
    "subscriptionType": "basic_subscription",
    "duration": 30,
    "expiresAt": "2024-02-15T00:00:00Z"
  }
}
```

### 4. Сброс игры
**POST** `/api/clicker-game/reset`

**Описание**: Сбрасывает прогресс игрока

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "message": "Game reset successfully"
}
```

## Типы наград

| Тип награды | Описание | Длительность |
|-------------|----------|--------------|
| `basic_subscription` | Базовая подписка | 30 дней |
| `pro_subscription` | Pro подписка | 90 дней |
| `premium_subscription` | Premium подписка | 180 дней |
| `lifetime_subscription` | Пожизненная подписка | -1 (бессрочно) |

## Достижения

| ID | Название | Требование | Награда |
|----|----------|------------|---------|
| `first_click` | Первый клик | 1 клик | `basic_subscription` |
| `hundred_clicks` | Сотня кликов | 100 кликов | `basic_subscription` |
| `thousand_clicks` | Тысяча кликов | 1000 кликов | `pro_subscription` |
| `ten_thousand_clicks` | Десять тысяч | 10000 кликов | `premium_subscription` |
| `hundred_thousand_clicks` | Сто тысяч | 100000 кликов | `premium_subscription` |
| `million_clicks` | Миллионер | 1000000 кликов | `lifetime_subscription` |
| `level_10` | Уровень 10 | 10 уровень | `pro_subscription` |
| `level_25` | Уровень 25 | 25 уровень | `premium_subscription` |
| `level_50` | Уровень 50 | 50 уровень | `lifetime_subscription` |

## Обработка ошибок

### Стандартные коды ошибок:
- `400` - Неверные данные запроса
- `401` - Не авторизован
- `403` - Доступ запрещен
- `404` - Ресурс не найден
- `500` - Внутренняя ошибка сервера

### Формат ошибки:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "field": "score",
      "message": "Score must be a positive number"
    }
  }
}
```

## Безопасность

1. **Аутентификация**: Все endpoints требуют JWT токен
2. **Валидация**: Проверка всех входящих данных
3. **Rate Limiting**: Ограничение частоты запросов
4. **Анти-чит**: Проверка на валидность игрового прогресса

## Интеграция с существующей системой подписок

### Связь с пользователями:
- Использовать существующую таблицу `users`
- Добавить поля для игрового прогресса или создать отдельную таблицу `clicker_game_progress`

### Связь с подписками:
- Интегрировать с существующей системой подписок
- При выдаче награды создавать соответствующую подписку в системе

## Примеры использования

### Сохранение прогресса:
```javascript
const saveGame = async (gameData) => {
  const response = await fetch('/api/clicker-game/save', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameData)
  });
  return response.json();
};
```

### Получение награды:
```javascript
const claimReward = async (rewardType) => {
  const response = await fetch('/api/clicker-game/claim-reward', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rewardType })
  });
  return response.json();
};
```

## TODO для реализации

1. Создать API endpoints в бэкенде
2. Добавить валидацию данных
3. Интегрировать с системой пользователей
4. Интегрировать с системой подписок
5. Добавить логирование и мониторинг
6. Настроить rate limiting
7. Добавить тесты
