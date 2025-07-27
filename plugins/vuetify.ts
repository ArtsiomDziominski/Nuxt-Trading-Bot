import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import type { ThemeDefinition } from 'vuetify';
import { createVuetify } from 'vuetify';
import { themeLight } from '~/const/theme';

const light: ThemeDefinition = {
	dark: false,
	colors: {
		secondary: '#03DAC6',
	},
};

const dark: ThemeDefinition = {
	dark: true,
	colors: {
		secondary: '#ab03da',
	},
};

export default defineNuxtPlugin((nuxt) => {
	// Безопасное получение темы с проверкой на клиент
	let defaultTheme = themeLight;
	if (process.client && typeof localStorage !== 'undefined') {
		defaultTheme = localStorage.getItem('theme') || themeLight;
	}
	
	const vuetify = createVuetify({
		ssr: true,
		components,
		directives,
		theme: {
			defaultTheme,
			themes: {
				light,
				dark,
			},
		},
	});
	nuxt.vueApp.use(vuetify);
});
