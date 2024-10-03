// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: [
		'vuetify/lib/styles/main.sass',
		'@mdi/font/css/materialdesignicons.min.css',
	],
	build: {
		transpile: ['vuetify'],
	},
	modules: [
		// ...
		'@pinia/nuxt',
		'@nuxt/eslint',
	],
	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL,
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
});
