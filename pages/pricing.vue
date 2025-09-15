<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from '~/store/user';

const storeUser = userStore();
const { isAuthenticated } = storeToRefs(storeUser);

// Intersection Observer for scroll animations
onMounted(() => {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px',
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('animate-in');
			}
		});
	}, observerOptions);

	// Observe all sections for animation
	const sections = document.querySelectorAll('.animate-on-scroll');
	sections.forEach((section) => {
		observer.observe(section);
	});
});

// Pricing plans data with extended information
const pricingPlans = [
	{
		id: 'basic',
		name: 'mainPage.pricing.plans.basic.name',
		price: 'mainPage.pricing.plans.basic.price',
		originalPrice: null,
		features: [
			'mainPage.pricing.plans.basic.features.0',
			'mainPage.pricing.plans.basic.features.1',
			'mainPage.pricing.plans.basic.features.2',
			'mainPage.pricing.plans.basic.features.3',
		],
		popular: false,
		buttonText: 'Начать бесплатно',
		buttonAction: 'signup',
		advantages: [
			'Идеально для начинающих трейдеров',
			'Без риска - попробуйте бесплатно',
			'Быстрый старт за 5 минут',
			'Базовая поддержка через email'
		]
	},
	{
		id: 'pro',
		name: 'mainPage.pricing.plans.pro.name',
		price: 'mainPage.pricing.plans.pro.price',
		originalPrice: '39$/мес',
		features: [
			'mainPage.pricing.plans.pro.features.0',
			'mainPage.pricing.plans.pro.features.1',
			'mainPage.pricing.plans.pro.features.2',
			'mainPage.pricing.plans.pro.features.3',
			'mainPage.pricing.plans.pro.features.4',
		],
		popular: true,
		buttonText: 'Выбрать Pro',
		buttonAction: 'payment',
		advantages: [
			'Самый популярный план среди трейдеров',
			'Экономия 25% при годовой оплате',
			'Приоритетная поддержка 24/7',
			'Расширенная аналитика и отчеты',
			'Telegram уведомления о сделках'
		]
	},
	{
		id: 'premium',
		name: 'mainPage.pricing.plans.premium.name',
		price: 'mainPage.pricing.plans.premium.price',
		originalPrice: '149$/мес',
		features: [
			'mainPage.pricing.plans.premium.features.0',
			'mainPage.pricing.plans.premium.features.1',
			'mainPage.pricing.plans.premium.features.2',
			'mainPage.pricing.plans.premium.features.3',
			'mainPage.pricing.plans.premium.features.4',
		],
		popular: false,
		buttonText: 'Выбрать Premium',
		buttonAction: 'payment',
		advantages: [
			'Для профессиональных трейдеров',
			'Персональный менеджер',
			'Кастомные торговые стратегии',
			'API доступ для интеграций',
			'Белый лейбл решения'
		]
	},
];

// Benefits section data
const benefits = [
	{
		icon: 'mdi-shield-check',
		titleKey: 'pricingPage.benefits.items.security.title',
		descriptionKey: 'pricingPage.benefits.items.security.description'
	},
	{
		icon: 'mdi-speedometer',
		titleKey: 'pricingPage.benefits.items.speed.title',
		descriptionKey: 'pricingPage.benefits.items.speed.description'
	},
	{
		icon: 'mdi-chart-line',
		titleKey: 'pricingPage.benefits.items.profitability.title',
		descriptionKey: 'pricingPage.benefits.items.profitability.description'
	},
	{
		icon: 'mdi-headset',
		titleKey: 'pricingPage.benefits.items.support.title',
		descriptionKey: 'pricingPage.benefits.items.support.description'
	},
	{
		icon: 'mdi-update',
		titleKey: 'pricingPage.benefits.items.updates.title',
		descriptionKey: 'pricingPage.benefits.items.updates.description'
	},
	{
		icon: 'mdi-account-group',
		titleKey: 'pricingPage.benefits.items.community.title',
		descriptionKey: 'pricingPage.benefits.items.community.description'
	}
];

// FAQ data
const faq = [
	{
		questionKey: 'pricingPage.faq.items.cancel.question',
		answerKey: 'pricingPage.faq.items.cancel.answer'
	},
	{
		questionKey: 'pricingPage.faq.items.payment.question',
		answerKey: 'pricingPage.faq.items.payment.answer'
	},
	{
		questionKey: 'pricingPage.faq.items.trial.question',
		answerKey: 'pricingPage.faq.items.trial.answer'
	},
	{
		questionKey: 'pricingPage.faq.items.change.question',
		answerKey: 'pricingPage.faq.items.change.answer'
	},
	{
		questionKey: 'pricingPage.faq.items.profit.question',
		answerKey: 'pricingPage.faq.items.profit.answer'
	},
	{
		questionKey: 'pricingPage.faq.items.start.question',
		answerKey: 'pricingPage.faq.items.start.answer'
	}
];

// Handle plan selection
const selectPlan = (plan: any) => {
	if (plan.buttonAction === 'signup') {
		navigateTo('/signup');
	} else if (plan.buttonAction === 'payment') {
		// Here you would integrate with your payment system
		// For now, we'll show an alert
		alert(`Переход к оплате плана ${plan.name}. Интеграция с платежной системой будет добавлена позже.`);
	}
};

// Handle FAQ toggle
const openFaq = ref<number | null>(null);

const toggleFaq = (index: number) => {
	openFaq.value = openFaq.value === index ? null : index;
};
</script>

<template>
	<div class="pricing-page">
		<!-- Hero Section -->
		<section class="pricing-hero">
			<div class="pricing-hero-background">
				<div class="pricing-hero-particles" />
			</div>
			<div class="container">
				<div class="pricing-hero-content">
					<h1 class="pricing-hero-title">
						{{ $t('pricingPage.hero.title') }}
					</h1>
					<p class="pricing-hero-subtitle">
						{{ $t('pricingPage.hero.subtitle') }}
					</p>
					<div class="pricing-hero-badges">
						<div class="pricing-badge">
							<v-icon>mdi-shield-check</v-icon>
							{{ $t('pricingPage.hero.badges.secure') }}
						</div>
						<div class="pricing-badge">
							<v-icon>mdi-rocket-launch</v-icon>
							{{ $t('pricingPage.hero.badges.fastStart') }}
						</div>
						<div class="pricing-badge">
							<v-icon>mdi-headset</v-icon>
							{{ $t('pricingPage.hero.badges.support') }}
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Pricing Plans Section -->
		<section class="pricing-plans-section">
			<div class="container">
				<div class="section-header">
					<h2 class="section-title">
						{{ $t('mainPage.pricing.title') }}
					</h2>
					<p class="section-subtitle">
						{{ $t('mainPage.pricing.subtitle') }}
					</p>
				</div>
				
				<div class="pricing-grid">
					<div
						v-for="(plan, index) in pricingPlans"
						:key="plan.id"
						class="pricing-card animate-on-scroll"
						:class="{ popular: plan.popular }"
						:style="{ 'animation-delay': `${index * 0.15}s` }"
					>
						<div
							v-if="plan.popular"
							class="popular-badge"
						>
							Популярный
						</div>
						
						<div class="plan-header">
							<h3 class="plan-name">
								{{ $t(plan.name) }}
							</h3>
							<div class="plan-price-container">
								<div class="plan-price">
									{{ $t(plan.price) }}
								</div>
								<div
									v-if="plan.originalPrice"
									class="plan-original-price"
								>
									{{ plan.originalPrice }}
								</div>
							</div>
						</div>
						
						<ul class="plan-features">
							<li
								v-for="(feature, featureIndex) in plan.features"
								:key="featureIndex"
								class="feature-item"
							>
								<v-icon
									size="20"
									class="check-icon"
								>
									mdi-check
								</v-icon>
								{{ $t(feature) }}
							</li>
						</ul>
						
						<div class="plan-advantages">
							<h4 class="advantages-title">Преимущества:</h4>
							<ul class="advantages-list">
								<li
									v-for="(advantage, advantageIndex) in plan.advantages"
									:key="advantageIndex"
									class="advantage-item"
								>
									<v-icon
										size="16"
										class="advantage-icon"
									>
										mdi-star
									</v-icon>
									{{ advantage }}
								</li>
							</ul>
						</div>
						
						<v-btn
							class="plan-button"
							:class="{ primary: plan.popular }"
							:variant="plan.popular ? 'flat' : 'outlined'"
							block
							size="large"
							@click="selectPlan(plan)"
						>
							{{ plan.buttonText }}
						</v-btn>
					</div>
				</div>
			</div>
		</section>

		<!-- Benefits Section -->
		<section class="benefits-section">
			<div class="container">
				<div class="section-header">
					<h2 class="section-title">
						{{ $t('pricingPage.benefits.title') }}
					</h2>
					<p class="section-subtitle">
						{{ $t('pricingPage.benefits.subtitle') }}
					</p>
				</div>
				
				<div class="benefits-grid">
					<div
						v-for="(benefit, index) in benefits"
						:key="index"
						class="benefit-card animate-on-scroll"
						:style="{ 'animation-delay': `${index * 0.1}s` }"
					>
						<div class="benefit-icon">
							<v-icon size="48">
								{{ benefit.icon }}
							</v-icon>
						</div>
						<h3 class="benefit-title">
							{{ $t(benefit.titleKey) }}
						</h3>
						<p class="benefit-description">
							{{ $t(benefit.descriptionKey) }}
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- FAQ Section -->
		<section class="faq-section">
			<div class="container">
				<div class="section-header">
					<h2 class="section-title">
						{{ $t('pricingPage.faq.title') }}
					</h2>
					<p class="section-subtitle">
						{{ $t('pricingPage.faq.subtitle') }}
					</p>
				</div>
				
				<div class="faq-container">
					<div
						v-for="(item, index) in faq"
						:key="index"
						class="faq-item animate-on-scroll"
						:style="{ 'animation-delay': `${index * 0.1}s` }"
					>
						<div
							class="faq-question"
							@click="toggleFaq(index)"
						>
							<h3 class="faq-question-text">
								{{ $t(item.questionKey) }}
							</h3>
							<v-icon
								class="faq-icon"
								:class="{ 'faq-icon--open': openFaq === index }"
							>
								mdi-chevron-down
							</v-icon>
						</div>
						<div
							class="faq-answer"
							:class="{ 'faq-answer--open': openFaq === index }"
						>
							<p class="faq-answer-text">
								{{ $t(item.answerKey) }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="cta-section">
			<div class="container">
				<div class="cta-content animate-on-scroll">
					<h2 class="cta-title">
						{{ $t('pricingPage.cta.title') }}
					</h2>
					<p class="cta-subtitle">
						{{ $t('pricingPage.cta.subtitle') }}
					</p>
					<div class="cta-buttons">
						<v-btn
							v-if="!isAuthenticated"
							class="cta-btn primary"
							size="large"
							to="/signup"
						>
							<v-icon start>
								mdi-rocket-launch
							</v-icon>
							{{ $t('pricingPage.cta.buttons.startFree') }}
						</v-btn>
						<v-btn
							v-if="isAuthenticated"
							class="cta-btn primary"
							size="large"
							to="/bots"
						>
							<v-icon start>
								mdi-robot
							</v-icon>
							{{ $t('pricingPage.cta.buttons.manageBots') }}
						</v-btn>
						<v-btn
							class="cta-btn secondary"
							size="large"
							to="/#about"
						>
							<v-icon start>
								mdi-information
							</v-icon>
							{{ $t('pricingPage.cta.buttons.learnMore') }}
						</v-btn>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped lang="scss">
.pricing-page {
  min-height: 100vh;
  background: var(--gradient-background);
  color: var(--text-primary);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
}

// Hero Section
.pricing-hero {
  position: relative;
  padding: 120px 0 80px;
  background: var(--gradient-background);
  overflow: hidden;

  .pricing-hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    .pricing-hero-particles {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image:
        radial-gradient(2px 2px at 20px 30px, #00d4ff, transparent),
        radial-gradient(2px 2px at 40px 70px, #00d4ff, transparent),
        radial-gradient(1px 1px at 90px 40px, #00d4ff, transparent),
        radial-gradient(1px 1px at 130px 80px, #00d4ff, transparent),
        radial-gradient(2px 2px at 160px 30px, #00d4ff, transparent);
      background-repeat: repeat;
      background-size: 200px 100px;
      animation: float 20s ease-in-out infinite;
    }
  }

  .pricing-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;

    .pricing-hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 24px;
      background: var(--gradient-text);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;

      @media screen and (max-width: 768px) {
        font-size: 2.5rem;
      }
    }

    .pricing-hero-subtitle {
      font-size: 1.25rem;
      line-height: 1.6;
      margin-bottom: 40px;
      color: var(--text-secondary);
    }

    .pricing-hero-badges {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;

      .pricing-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        background: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        padding: 8px 16px;
        color: var(--text-secondary);
        font-size: 0.9rem;
        font-weight: 500;
        backdrop-filter: blur(10px);

        .v-icon {
          color: var(--primary-color);
        }
      }
    }
  }
}

// Section Styles
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

// Pricing Plans Section
.pricing-plans-section {
  padding: 100px 0;
  background: var(--background-secondary);

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .pricing-card {
      position: relative;
      background: var(--surface-color);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 40px 30px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);

      &.popular {
        border-color: var(--primary-color);
        transform: scale(1.05);
        box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3);

        .popular-badge {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gradient-primary);
          color: white;
          padding: 8px 24px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }
      }

      &:hover {
        border-color: var(--border-hover);
        transform: translateY(-5px);
      }

      .plan-header {
        text-align: center;
        margin-bottom: 30px;

        .plan-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .plan-price-container {
          .plan-price {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 4px;
          }

          .plan-original-price {
            font-size: 1.2rem;
            color: var(--text-muted);
            text-decoration: line-through;
          }
        }
      }

      .plan-features {
        list-style: none;
        padding: 0;
        margin-bottom: 30px;

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          color: var(--text-secondary);

          .check-icon {
            color: var(--primary-color);
          }
        }
      }

      .plan-advantages {
        margin-bottom: 30px;
        padding: 20px;
        background: var(--surface-hover);
        border-radius: 12px;
        border: 1px solid var(--border-color);

        .advantages-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .advantages-list {
          list-style: none;
          padding: 0;
          margin: 0;

          .advantage-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 0;
            color: var(--text-secondary);
            font-size: 0.9rem;

            .advantage-icon {
              color: var(--primary-color);
            }
          }
        }
      }

      .plan-button {
        border-radius: 12px;
        font-weight: 600;
        transition: all 0.3s ease;

        &.primary {
          background: var(--gradient-primary);
          color: white;

          &:hover {
            transform: translateY(-2px);
          }
        }
      }
    }
  }
}

// Benefits Section
.benefits-section {
  padding: 100px 0;
  background: var(--gradient-background);

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;

    .benefit-card {
      background: var(--surface-color);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 40px 30px;
      text-align: center;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);

      &:hover {
        border-color: var(--border-hover);
        transform: translateY(-5px);
      }

      .benefit-icon {
        margin-bottom: 24px;
        color: var(--primary-color);
      }

      .benefit-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 16px;
        color: var(--text-primary);
      }

      .benefit-description {
        color: var(--text-muted);
        line-height: 1.6;
      }
    }
  }
}

// FAQ Section
.faq-section {
  padding: 100px 0;
  background: var(--background-secondary);

  .faq-container {
    max-width: 800px;
    margin: 0 auto;

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

      .faq-question {
        padding: 24px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;

        &:hover {
          background: var(--surface-hover);
        }

        .faq-question-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .faq-icon {
          color: var(--primary-color);
          transition: transform 0.3s ease;

          &.faq-icon--open {
            transform: rotate(180deg);
          }
        }
      }

      .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;

        &.faq-answer--open {
          max-height: 200px;
        }

        .faq-answer-text {
          padding: 0 24px 24px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
      }
    }
  }
}

// CTA Section
.cta-section {
  padding: 100px 0;
  background: var(--gradient-background);

  .cta-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;

    .cta-title {
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

    .cta-subtitle {
      font-size: 1.2rem;
      color: var(--text-secondary);
      margin-bottom: 40px;
      line-height: 1.6;
    }

    .cta-buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;

      @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }

      .cta-btn {
        padding: 16px 32px;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 12px;
        transition: all 0.3s ease;

        &.primary {
          background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
          color: white;
          box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);

          &:hover {
            transform: translateY(-2px);
          }
        }

        &.secondary {
          background: transparent;
          border: 2px solid #00d4ff;
          color: #00d4ff;

          &:hover {
            background: #00d4ff;
            color: white;
          }
        }
      }
    }
  }
}

// Scroll Animation Classes
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

// Animations
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

// Responsive Design
@media screen and (max-width: 768px) {
  .pricing-hero {
    padding: 100px 0 60px;

    .pricing-hero-content {
      .pricing-hero-badges {
        flex-direction: column;
        align-items: center;
      }
    }
  }

  .pricing-plans-section {
    padding: 60px 0;

    .pricing-grid {
      .pricing-card {
        &.popular {
          transform: none;
        }
      }
    }
  }

  .benefits-section,
  .faq-section,
  .cta-section {
    padding: 60px 0;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>
