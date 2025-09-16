export interface SEOData {
	title: string;
	description: string;
	keywords?: string[];
	image?: string;
	url?: string;
	type?: 'website' | 'article' | 'product';
	author?: string;
	publishedTime?: string;
	modifiedTime?: string;
	locale?: string;
}

// Функция для получения базового URL сайта
export const getBaseUrl = (): string => {
	if (typeof window !== 'undefined' && window.location) {
		return window.location.origin;
	}

	// Fallback для серверной стороны - используем runtime config
	try {
		const config = useRuntimeConfig();
		if (config.public.siteUrl) {
			return config.public.siteUrl;
		}
	}
	catch (e) {
		// Игнорируем ошибки если useRuntimeConfig недоступен
	}

	// Последний fallback
	return 'https://botinex.ru';
};

// Функция для получения SEO переводов (принимает функцию t как параметр)
export const getSEOTranslations = (t: (key: string) => string) => {
	return {
		home: {
			title: t('seo.home.title'),
			description: t('seo.home.description'),
			keywords: t('seo.home.keywords').split(', '),
		},
		organization: {
			name: t('seo.organization.name'),
			description: t('seo.organization.description'),
		},
		website: {
			name: t('seo.website.name'),
			description: t('seo.website.description'),
		},
		product: {
			name: t('seo.product.name'),
			description: t('seo.product.description'),
		},
		faq: {
			title: t('seo.faq.title'),
			subtitle: t('seo.faq.subtitle'),
		},
	};
};

export const generateSEOTags = (data: SEOData) => {
	// Получаем базовый URL динамически
	const baseUrl = data.url || getBaseUrl();
	const defaultImage = `${baseUrl}/og-image.jpg`;
	const locale = data.locale || 'ru';

	// Определяем язык для Open Graph
	const ogLocale = locale === 'ru' ? 'ru_RU' : 'en_US';
	const alternateLocale = locale === 'ru' ? 'en_US' : 'ru_RU';
	const alternateUrl = locale === 'ru' ? `${baseUrl}/en` : baseUrl;

	return {
		title: data.title,
		meta: [
			{ name: 'description', content: data.description },
			{ name: 'keywords', content: data.keywords?.join(', ') || '' },
			{ name: 'author', content: data.author || 'Crypto Trading Bot' },
			{ name: 'robots', content: 'index, follow' },
			{ name: 'googlebot', content: 'index, follow' },
			{ name: 'language', content: locale },

			// Open Graph
			{ property: 'og:title', content: data.title },
			{ property: 'og:description', content: data.description },
			{ property: 'og:image', content: data.image || defaultImage },
			{ property: 'og:url', content: data.url || baseUrl },
			{ property: 'og:type', content: data.type || 'website' },
			{ property: 'og:site_name', content: 'Crypto Trading Bot' },
			{ property: 'og:locale', content: ogLocale },
			{ property: 'og:locale:alternate', content: alternateLocale },

			// Twitter Card
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:title', content: data.title },
			{ name: 'twitter:description', content: data.description },
			{ name: 'twitter:image', content: data.image || defaultImage },

			// Additional SEO
			{ name: 'theme-color', content: '#00d4ff' },
			{ name: 'msapplication-TileColor', content: '#00d4ff' },
			{ name: 'apple-mobile-web-app-capable', content: 'yes' },
			{ name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },

			// Article specific
			...(data.publishedTime ? [{ property: 'article:published_time', content: data.publishedTime }] : []),
			...(data.modifiedTime ? [{ property: 'article:modified_time', content: data.modifiedTime }] : []),
		],
		link: [
			{ rel: 'canonical', href: data.url || baseUrl },
			{ rel: 'alternate', hreflang: locale, href: data.url || baseUrl },
			{ rel: 'alternate', hreflang: alternateLocale === 'en_US' ? 'en' : 'ru', href: alternateUrl },
			{ rel: 'alternate', hreflang: 'x-default', href: data.url || baseUrl },
		],
	};
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		'itemListElement': items.map((item, index) => ({
			'@type': 'ListItem',
			'position': index + 1,
			'name': item.name,
			'item': item.url,
		})),
	};
};

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'mainEntity': faqs.map(faq => ({
			'@type': 'Question',
			'name': faq.question,
			'acceptedAnswer': {
				'@type': 'Answer',
				'text': faq.answer,
			},
		})),
	};
};

export const generateOrganizationSchema = (t: (key: string) => string, baseUrl?: string) => {
	const siteUrl = baseUrl || getBaseUrl();

	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'name': t('seo.organization.name'),
		'description': t('seo.organization.description'),
		'url': siteUrl,
		'logo': `${siteUrl}/logo.png`,
		'contactPoint': {
			'@type': 'ContactPoint',
			'telephone': '+7-XXX-XXX-XXXX',
			'contactType': 'customer service',
			'availableLanguage': ['Russian', 'English'],
		},
		'sameAs': [
			'https://t.me/cryptotradingbot',
			'https://twitter.com/cryptotradingbot',
		],
	};
};

export const generateWebsiteSchema = (t: (key: string) => string, baseUrl?: string) => {
	const siteUrl = baseUrl || getBaseUrl();

	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'name': t('seo.website.name'),
		'description': t('seo.website.description'),
		'url': siteUrl,
		'potentialAction': {
			'@type': 'SearchAction',
			'target': `${siteUrl}/search?q={search_term_string}`,
			'query-input': 'required name=search_term_string',
		},
	};
};

export const generateProductSchema = (t: (key: string) => string) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		'name': t('seo.product.name'),
		'description': t('seo.product.description'),
		'applicationCategory': 'FinanceApplication',
		'operatingSystem': 'Web Browser',
		'offers': {
			'@type': 'Offer',
			'price': '0',
			'priceCurrency': 'USD',
			'availability': 'https://schema.org/InStock',
		},
		'aggregateRating': {
			'@type': 'AggregateRating',
			'ratingValue': '4.8',
			'ratingCount': '1250',
		},
	};
};
