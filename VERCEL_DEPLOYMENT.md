# Инструкции по деплою на Vercel

## Исправленные проблемы

### 1. SSR/SSG проблемы
- ✅ Исправлена проблема с `useAsyncData` в `app.vue`
- ✅ Добавлена проверка `process.client` для WebSocket инициализации
- ✅ Исправлена работа с `document` и `localStorage` на сервере
- ✅ Исправлена работа с `useRouter` в store на сервере

### 2. Middleware проблемы
- ✅ Исправлена работа middleware на сервере
- ✅ Добавлена поддержка получения cookies на сервере

### 3. Типизация
- ✅ Исправлены ошибки типизации в store файлах

### 4. Unhead package export error
- ✅ Исправлена ошибка `ERR_PACKAGE_PATH_NOT_EXPORTED` для пакета unhead
- ✅ Добавлена конфигурация Vite для правильной обработки unhead

## Переменные окружения для Vercel

Убедитесь, что в настройках Vercel установлены следующие переменные окружения:

```env
API_URL=https://api.botinex.ru
WS_URL=wss://api.botinex.ru
SECRET_KEY_API=your_secret_key
TELEGRAM_BOT=your_telegram_bot_token
NUXT_TURNSTILE_SECRET_KEY=your_turnstile_key
GOOGLE_CLIENT_ID=your_google_client_id
NODE_ENV=production
```

## Настройки Vercel

1. **Framework Preset**: Nuxt.js
2. **Build Command**: `npm run build` (автоматически)
3. **Output Directory**: `.output` (автоматически)
4. **Install Command**: `npm install` (автоматически)

**Важно**: Не создавайте файл `vercel.json` для Nuxt 3 - это может вызвать конфликты. Nuxt автоматически настраивается для Vercel.

## Возможные дополнительные проблемы

Если ошибка 500 все еще возникает, проверьте:

1. **Логи Vercel**: Перейдите в раздел Functions → View Function Logs
2. **Переменные окружения**: Убедитесь, что все переменные установлены
3. **API доступность**: Проверьте, что API сервер доступен по указанному URL
4. **WebSocket соединения**: Убедитесь, что WebSocket сервер работает

## Решение проблемы с unhead

Если возникает ошибка `ERR_PACKAGE_PATH_NOT_EXPORTED` для пакета unhead, в `nuxt.config.ts` уже добавлена следующая конфигурация:

```typescript
nitro: {
  preset: 'vercel',
  errorHandler: '~/server/errorHandler.ts',
  minify: true,
  sourceMap: false,
  esbuild: {
    options: {
      target: 'es2020'
    }
  }
},

vite: {
  optimizeDeps: {
    include: ['unhead']
  },
  ssr: {
    noExternal: ['unhead']
  }
}
```

**Важно**: Для Nuxt 3 не нужен файл `vercel.json` - Nuxt автоматически настраивается для Vercel.

## Дополнительные настройки

Если проблема сохраняется, попробуйте:

1. Убедиться, что все зависимости совместимы с Node.js 18+
2. Проверить, что нет проблем с CORS на API сервере
3. Очистить кэш Vercel и пересобрать проект
