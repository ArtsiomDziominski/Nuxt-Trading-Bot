<template>
	<section class="faq-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title">
					{{ title || t('seo.faq.title') }}
				</h2>
				<p class="section-subtitle">
					{{ subtitle || t('seo.faq.subtitle') }}
				</p>
			</div>

			<div class="faq-container">
				<div
					v-for="(item, index) in faqs"
					:key="index"
					class="faq-item"
					:class="{ 'faq-item--open': openFaq === index }"
				>
					<button
						class="faq-question"
						:aria-expanded="openFaq === index"
						:aria-controls="`faq-answer-${index}`"
						@click="toggleFaq(index)"
					>
						<h3 class="faq-question-text">
							{{ item.question }}
						</h3>
						<v-icon
							class="faq-icon"
							:class="{ 'faq-icon--open': openFaq === index }"
						>
							mdi-chevron-down
						</v-icon>
					</button>
					<div
						:id="`faq-answer-${index}`"
						class="faq-answer"
						:class="{ 'faq-answer--open': openFaq === index }"
					>
						<div class="faq-answer-content">
							<p class="faq-answer-text">
								{{ item.answer }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
interface FAQItem {
	question: string;
	answer: string;
}

interface Props {
	title?: string;
	subtitle?: string;
	faqs: FAQItem[];
}

const props = withDefaults(defineProps<Props>(), {
	title: '',
	subtitle: ''
});

const { t } = useI18n();

const openFaq = ref<number | null>(null);

const toggleFaq = (index: number) => {
	openFaq.value = openFaq.value === index ? null : index;
};

// Генерируем структурированные данные для FAQ
const faqSchema = computed(() => {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'mainEntity': props.faqs.map(faq => ({
			'@type': 'Question',
			'name': faq.question,
			'acceptedAnswer': {
				'@type': 'Answer',
				'text': faq.answer,
			},
		})),
	};
});

// Добавляем структурированные данные в head
useHead({
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify(faqSchema.value),
		},
	],
});
</script>

<style scoped lang="scss">
.faq-section {
	padding: 100px 0;
	background: var(--background-secondary);
}

.container {
	max-width: 1400px;
	margin: 0 auto;
	padding: 0 40px;

	@media screen and (max-width: 768px) {
		padding: 0 20px;
	}
}

.section-header {
	text-align: center;
	margin-bottom: 60px;

	.section-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 16px;
		background: var(--gradient-text);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;

		@media screen and (max-width: 768px) {
			font-size: 2rem;
		}
	}

	.section-subtitle {
		font-size: 1.2rem;
		color: rgba(255, 255, 255, 0.7);
		max-width: 600px;
		margin: 0 auto;
	}
}

.faq-container {
	max-width: 800px;
	margin: 0 auto;
}

.faq-item {
	background: var(--surface-color);
	border: 1px solid var(--border-color);
	border-radius: 12px;
	margin-bottom: 16px;
	overflow: hidden;
	transition: all 0.3s ease;
	backdrop-filter: blur(10px);

	&:hover {
		border-color: var(--border-hover);
	}

	&--open {
		border-color: var(--primary-color);
	}
}

.faq-question {
	width: 100%;
	padding: 24px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: all 0.3s ease;
	background: none;
	border: none;
	text-align: left;

	&:hover {
		background: var(--surface-hover);
	}

	&:focus {
		outline: 2px solid var(--primary-color);
		outline-offset: -2px;
	}
}

.faq-question-text {
	font-size: 1.1rem;
	font-weight: 600;
	color: var(--text-primary);
	margin: 0;
	flex: 1;
	padding-right: 16px;
}

.faq-icon {
	color: var(--primary-color);
	transition: transform 0.3s ease;
	flex-shrink: 0;

	&--open {
		transform: rotate(180deg);
	}
}

.faq-answer {
	max-height: 0;
	overflow: hidden;
	transition: max-height 0.3s ease;

	&--open {
		max-height: 200px;
	}
}

.faq-answer-content {
	padding: 0 24px 24px;
}

.faq-answer-text {
	color: var(--text-secondary);
	line-height: 1.6;
	margin: 0;
}

@media (max-width: 768px) {
	.faq-section {
		padding: 60px 0;
	}

	.faq-question {
		padding: 20px;
	}

	.faq-question-text {
		font-size: 1rem;
	}

	.faq-answer-content {
		padding: 0 20px 20px;
	}
}
</style>
