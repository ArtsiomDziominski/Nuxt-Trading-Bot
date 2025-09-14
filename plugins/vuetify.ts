import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import type { ThemeDefinition } from 'vuetify';
import { createVuetify } from 'vuetify';
import { themeLight } from '~/const/theme';

const light: ThemeDefinition = {
	dark: false,
	colors: {
		'primary': '#1976d2',
		'secondary': '#212121',
		'accent': '#1976d2',
		'error': '#d32f2f',
		'warning': '#f57c00',
		'info': '#1976d2',
		'success': '#388e3c',
		'background': '#fafafa',
		'surface': '#ffffff',
		'on-primary': '#ffffff',
		'on-secondary': '#ffffff',
		'on-accent': '#ffffff',
		'on-error': '#ffffff',
		'on-warning': '#ffffff',
		'on-info': '#ffffff',
		'on-success': '#ffffff',
		'on-background': '#212121',
		'on-surface': '#212121',
	},
};

const dark: ThemeDefinition = {
	dark: true,
	colors: {
		'primary': '#00d4ff',
		'secondary': '#0099cc',
		'accent': '#00d4ff',
		'error': '#ff5252',
		'warning': '#ff9800',
		'info': '#00d4ff',
		'success': '#4caf50',
		'background': '#0f0f23',
		'surface': '#1a1a2e',
		'on-primary': '#ffffff',
		'on-secondary': '#ffffff',
		'on-accent': '#ffffff',
		'on-error': '#ffffff',
		'on-warning': '#000000',
		'on-info': '#ffffff',
		'on-success': '#ffffff',
		'on-background': '#ffffff',
		'on-surface': '#ffffff',
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
