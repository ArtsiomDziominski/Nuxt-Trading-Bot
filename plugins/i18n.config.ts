const messages = {};
const modules: Record<string, string> = import.meta.glob('../locales/*.json', { eager: true });

for (const path in modules) {
	const locale = path.match(/([a-z0-9]+)\.json$/i)[1];
	messages[locale] = modules[path].default || modules[path];
}

function getLocaleCode(): string {
	if (!import.meta.client) return 'en';
	const localStorageLocal = getCookie('i18n');
	return localStorageLocal || navigator.language.split('-')?.[0] || 'en';
}

export default defineI18nConfig(() => ({
	fallbackLocale: 'en',
	locale: getLocaleCode(),
	messages: messages,
	lazy: true,
}));
