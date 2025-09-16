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
		compressPublicAssets: true,
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
			title: 'Лучшие торговые боты для криптовалют | Автоматизированная торговля',
			titleTemplate: '%s | Crypto Trading Bot',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'format-detection', content: 'telephone=no' },
				{ name: 'robots', content: 'index, follow' },
				{ name: 'googlebot', content: 'index, follow' },
				{ name: 'author', content: 'Crypto Trading Bot' },
				{ name: 'generator', content: 'Nuxt 3' },

				// Open Graph
				{ property: 'og:type', content: 'website' },
				{ property: 'og:site_name', content: 'Crypto Trading Bot' },
				{ property: 'og:locale', content: 'ru_RU' },
				{ property: 'og:locale:alternate', content: 'en_US' },

				// Twitter Card
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:site', content: '@cryptotradingbot' },
				{ name: 'twitter:creator', content: '@cryptotradingbot' },

				// Additional SEO
				{ name: 'theme-color', content: '#00d4ff' },
				{ name: 'msapplication-TileColor', content: '#00d4ff' },
				{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
				{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
				{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
				{ rel: 'manifest', href: '/site.webmanifest' },
				{ rel: 'canonical', href: 'https://botinex.ru' },
				{ rel: 'alternate', hreflang: 'ru', href: 'https://botinex.ru' },
				{ rel: 'alternate', hreflang: 'en', href: 'https://botinex.ru/en' },
				{ rel: 'alternate', hreflang: 'x-default', href: 'https://botinex.ru' },
			],
			script: [
				{
					type: 'application/ld+json',
					innerHTML: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebSite',
						'name': 'Crypto Trading Bot',
						'description': 'Профессиональные торговые боты для автоматизации торговли криптовалютами',
						'url': 'https://botinex.ru',
						'potentialAction': {
							'@type': 'SearchAction',
							'target': 'https://botinex.ru/search?q={search_term_string}',
							'query-input': 'required name=search_term_string',
						},
					}),
				},
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
		'@nuxtjs/sitemap',
		'@nuxtjs/robots',
		...(process.env.GOOGLE_CLIENT_ID ? ['nuxt-vue3-google-signin'] : []),
	],

	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL || '',
			WS_URL: process.env.WS_URL || '',
			SECRET_KEY_API: process.env.SECRET_KEY_API || '',
			TELEGRAM_BOT: process.env.TELEGRAM_BOT || '',
			NUXT_TURNSTILE_SECRET_KEY: process.env.NUXT_TURNSTILE_SECRET_KEY || '',
			googleClientId: process.env.GOOGLE_CLIENT_ID || '',
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
		},
	},

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
				code: 'ru',
				file: 'ru.json',
				name: 'Русский',
				iso: 'ru-RU',
			},
			{
				code: 'en',
				file: 'en.json',
				name: 'English',
				iso: 'en-US',
			},
		],
		langDir: 'locales/',
		defaultLocale: 'ru',
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root',
		},
	},

	turnstile: {
		siteKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '',
	},

	// Robots configuration
	robots: {
		UserAgent: '*',
		Allow: '/',
		Sitemap: 'https://botinex.ru/sitemap.xml',
	},

	compatibilityDate: '2025-01-06',
});
