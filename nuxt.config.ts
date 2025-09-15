// https://nuxt.com/docs/api/configuration/nuxt-config

// Type declaration for process.env
declare const process: {
	env: Record<string, string | undefined>;
};

export default defineNuxtConfig({
	// devServer: {
	// 	port: 80,
	// 	host: '0.0.0.0',
	// },

	nitro: {
		preset: 'vercel',
		errorHandler: '~/server/errorHandler.ts',
		minify: true,
		sourceMap: false,
		esbuild: {
			options: {
				target: 'es2020',
			},
		},
		rollupConfig: {
			external: [],
		},
	},

	ssr: true,

	experimental: {
		payloadExtraction: false,
	},

	vite: {
		optimizeDeps: {
			include: ['unhead', '@unhead/vue', '@unhead/dom'],
		},
		ssr: {
			noExternal: ['unhead', '@unhead/vue', '@unhead/dom'],
		},
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

	modules: [
		'@pinia/nuxt',
		'@nuxt/eslint',
		'@nuxtjs/i18n',
		'@nuxtjs/turnstile',
		// Only include Google Sign-In module if clientId is available
		...(process.env.GOOGLE_CLIENT_ID ? ['nuxt-vue3-google-signin'] : []),
	],

	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL || 'https://api.botinex.ru',
			WS_URL: process.env.WS_URL || 'wss://api.botinex.ru',
			SECRET_KEY_API: process.env.SECRET_KEY_API || '',
			TELEGRAM_BOT: process.env.TELEGRAM_BOT || '',
			NUXT_TURNSTILE_SECRET_KEY: process.env.NUXT_TURNSTILE_SECRET_KEY || '',
			// ✅ теперь clientId доступен и на клиенте, и на сервере
			googleClientId: process.env.GOOGLE_CLIENT_ID || '',
		},
	},

	// ✅ модуль Google Sign-In берёт clientId отсюда
	...(process.env.GOOGLE_CLIENT_ID && {
		googleSignIn: {
			clientId: process.env.GOOGLE_CLIENT_ID,
		},
	}),

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
