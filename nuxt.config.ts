// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// devServer: {
	// 	port: 80,
	// 	host: '0.0.0.0',
	// },

	nitro: {
		preset: 'vercel',
		errorHandler: '~/server/errorHandler.ts',
	},

	ssr: true,

	experimental: {
		payloadExtraction: false,
	},

	app: {
		head: {
			title: 'Trading Bot',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			],
		},
	},

	css: [
		'vuetify/lib/styles/main.sass',
		'@mdi/font/css/materialdesignicons.min.css',
		'~/assets/css/global.css',
	],

	build: {
		transpile: ['vuetify'],
	},

	modules: [// ...
		'@pinia/nuxt', '@nuxt/eslint', '@nuxtjs/i18n', '@nuxtjs/turnstile', 'nuxt-vue3-google-signin',
	],

	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL || 'https://api.botinex.ru',
			WS_URL: process.env.WS_URL || 'wss://api.botinex.ru',
			SECRET_KEY_API: process.env.SECRET_KEY_API || '',
			TELEGRAM_BOT: process.env.TELEGRAM_BOT || '',
			NUXT_TURNSTILE_SECRET_KEY: process.env.NUXT_TURNSTILE_SECRET_KEY || '',
		},
	},

	googleSignIn: {
		clientId: process.env.GOOGLE_CLIENT_ID || '',
	},

	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
				// ...
			},
		},
	},

	i18n: {
		strategy: 'no_prefix',
		locales: [
			{
				code: 'en',
				file: 'en.json',
				name: 'English',
			},
			{
				code: 'ru',
				file: 'ru.json',
				name: 'Russia',
			},
		],
		langDir: 'locales/',
		defaultLocale: 'ru',
	},

	turnstile: {
		siteKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '',
	},

	compatibilityDate: '2025-01-06',
});
