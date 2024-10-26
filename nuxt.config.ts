// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: [
		'vuetify/lib/styles/main.sass',
		'@mdi/font/css/materialdesignicons.min.css',
		'~/assets/css/global.css',
	],

	build: {
		transpile: ['vuetify'],
	},

	modules: [
		// ...
		'@pinia/nuxt',
		'@nuxt/eslint',
		'@nuxtjs/i18n',
	],

	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL,
			WS_URL: process.env.WS_URL,
			SECRET_KEY_API: process.env.SECRET_KEY_API,
		},
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
		vueI18n: './plugins/i18n.config.ts',
	},
});
