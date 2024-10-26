const messages = {};
const modules = import.meta.glob('../locales/*.json', { eager: true });

for (const path in modules) {
	const locale = path.match(/([a-z0-9]+)\.json$/i)[1];
	messages[locale] = modules[path].default || modules[path];
}

export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'en',
	messages: messages,
}));
