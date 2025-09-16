<template>
	<nav aria-label="Хлебные крошки" class="breadcrumbs">
		<ol class="breadcrumbs-list">
			<li
				v-for="(item, index) in items"
				:key="index"
				class="breadcrumbs-item"
				:class="{ 'breadcrumbs-item--active': index === items.length - 1 }"
			>
				<NuxtLink
					v-if="index < items.length - 1"
					:to="item.url"
					class="breadcrumbs-link"
				>
					{{ item.name }}
				</NuxtLink>
				<span
					v-else
					class="breadcrumbs-current"
					aria-current="page"
				>
					{{ item.name }}
				</span>
			</li>
		</ol>
	</nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
	name: string;
	url: string;
}

interface Props {
	items: BreadcrumbItem[];
}

const props = defineProps<Props>();

// Генерируем структурированные данные для хлебных крошек
const breadcrumbSchema = computed(() => {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: props.items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};
});

// Добавляем структурированные данные в head
useHead({
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify(breadcrumbSchema.value)
		}
	]
});
</script>

<style scoped lang="scss">
.breadcrumbs {
	margin-bottom: 20px;
}

.breadcrumbs-list {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	list-style: none;
	padding: 0;
	margin: 0;
	gap: 8px;
}

.breadcrumbs-item {
	display: flex;
	align-items: center;
	
	&:not(:last-child)::after {
		content: '/';
		margin-left: 8px;
		color: var(--text-muted);
		font-size: 0.9rem;
	}
}

.breadcrumbs-link {
	color: var(--primary-color);
	text-decoration: none;
	font-size: 0.9rem;
	transition: color 0.3s ease;
	
	&:hover {
		color: var(--primary-dark);
		text-decoration: underline;
	}
}

.breadcrumbs-current {
	color: var(--text-secondary);
	font-size: 0.9rem;
	font-weight: 500;
}

@media (max-width: 768px) {
	.breadcrumbs-list {
		font-size: 0.8rem;
	}
	
	.breadcrumbs-item:not(:last-child)::after {
		margin-left: 4px;
	}
}
</style>
