<template>
	<component
		:is="'script'"
		type="application/ld+json"
		v-html="structuredData"
	/>
</template>

<script setup lang="ts">
import { generateWebsiteSchema, generateOrganizationSchema, generateProductSchema, generateFAQSchema, generateBreadcrumbSchema, getBaseUrl } from '~/utils/seo';

interface Props {
	type: 'website' | 'organization' | 'product' | 'article' | 'faq' | 'breadcrumb';
	data?: any;
	locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
	locale: 'ru',
});

const { locale, t } = useI18n();

const structuredData = computed(() => {
	const currentLocale = props.locale || locale.value;
	// Получаем базовый URL динамически
	const baseUrl = getBaseUrl();

	switch (props.type) {
		case 'website':
			return JSON.stringify(generateWebsiteSchema(t, baseUrl));

		case 'organization':
			return JSON.stringify(generateOrganizationSchema(t, baseUrl));

		case 'product':
			return JSON.stringify(generateProductSchema(t));

		case 'faq':
			return JSON.stringify(generateFAQSchema(props.data || []));

		case 'breadcrumb':
			return JSON.stringify(generateBreadcrumbSchema(props.data || []));

		default:
			return '{}';
	}
});
</script>
