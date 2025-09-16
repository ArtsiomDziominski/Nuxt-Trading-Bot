<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from '~/store/user';

// Import exchange logos
import binanceLogo from '@/assets/img/exchanges/binance.svg';
import bitgetLogo from '@/assets/img/exchanges/bitget.svg';
import bybitLogo from '@/assets/img/exchanges/bybit.svg';
import gateioLogo from '@/assets/img/exchanges/gateio.svg';
import huobiLogo from '@/assets/img/exchanges/huobi.svg';
import krknLogo from '@/assets/img/exchanges/krkn.svg';
import kucoinLogo from '@/assets/img/exchanges/kucoin.svg';
import mexcLogo from '@/assets/img/exchanges/mexc.svg';
import okxLogo from '@/assets/img/exchanges/okx.svg';

const storeUser = userStore();
const { isAuthenticated } = storeToRefs(storeUser);

// Exchange logos mapping
const exchangeLogos = {
	binance: binanceLogo,
	bitget: bitgetLogo,
	bybit: bybitLogo,
	gateio: gateioLogo,
	huobi: huobiLogo,
	krkn: krknLogo,
	kucoin: kucoinLogo,
	mexc: mexcLogo,
	okx: okxLogo,
};

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

// Smooth scroll to section
const scrollToSection = (sectionId: string) => {
	const element = document.getElementById(sectionId);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	}
};

// Pricing plans data
const pricingPlans = [
	{
		id: 'basic',
		name: 'mainPage.pricing.plans.basic.name',
		price: 'mainPage.pricing.plans.basic.price',
		features: [
			'mainPage.pricing.plans.basic.features.0',
			'mainPage.pricing.plans.basic.features.1',
			'mainPage.pricing.plans.basic.features.2',
			'mainPage.pricing.plans.basic.features.3',
		],
		popular: false,
	},
	{
		id: 'pro',
		name: 'mainPage.pricing.plans.pro.name',
		price: 'mainPage.pricing.plans.pro.price',
		features: [
			'mainPage.pricing.plans.pro.features.0',
			'mainPage.pricing.plans.pro.features.1',
			'mainPage.pricing.plans.pro.features.2',
			'mainPage.pricing.plans.pro.features.3',
			'mainPage.pricing.plans.pro.features.4',
		],
		popular: true,
	},
	{
		id: 'premium',
		name: 'mainPage.pricing.plans.premium.name',
		price: 'mainPage.pricing.plans.premium.price',
		features: [
			'mainPage.pricing.plans.premium.features.0',
			'mainPage.pricing.plans.premium.features.1',
			'mainPage.pricing.plans.premium.features.2',
			'mainPage.pricing.plans.premium.features.3',
			'mainPage.pricing.plans.premium.features.4',
		],
		popular: false,
	},
];

// How it works steps
const howItWorksSteps = [
	{
		icon: 'mdi-link-variant',
		title: 'mainPage.howItWorks.steps.connect.title',
		description: 'mainPage.howItWorks.steps.connect.description',
	},
	{
		icon: 'mdi-cog',
		title: 'mainPage.howItWorks.steps.configure.title',
		description: 'mainPage.howItWorks.steps.configure.description',
	},
	{
		icon: 'mdi-rocket-launch',
		title: 'mainPage.howItWorks.steps.launch.title',
		description: 'mainPage.howItWorks.steps.launch.description',
	},
];

// About features
const aboutFeatures = [
	{
		icon: 'mdi-robot',
		title: 'mainPage.about.features.automation.title',
		description: 'mainPage.about.features.automation.description',
	},
	{
		icon: 'mdi-shield-check',
		title: 'mainPage.about.features.riskManagement.title',
		description: 'mainPage.about.features.riskManagement.description',
	},
	{
		icon: 'mdi-chart-line',
		title: 'mainPage.about.features.analytics.title',
		description: 'mainPage.about.features.analytics.description',
	},
	{
		icon: 'mdi-headset',
		title: 'mainPage.about.features.support.title',
		description: 'mainPage.about.features.support.description',
	},
];
</script>

<template>
	<div class="home-page">
		<!-- Hero Section -->
		<section
			id="hero"
			class="hero-section"
		>
			<div class="hero-background">
				<div class="hero-particles" />
			</div>
			<div class="hero-content">
				<div class="hero-text">
					<h1 class="hero-title">
						{{ $t('mainPage.hero.title') }}
					</h1>
					<p class="hero-subtitle">
						{{ $t('mainPage.hero.subtitle') }}
					</p>
					<div class="hero-buttons">
						<v-btn
							v-if="!isAuthenticated"
							class="hero-btn primary"
							size="large"
							to="/signup"
						>
							<v-icon start>
								mdi-rocket-launch
							</v-icon>
							{{ $t('mainPage.hero.startButton') }}
						</v-btn>
						<v-btn
							v-if="!isAuthenticated"
							class="hero-btn secondary"
							size="large"
							@click="scrollToSection('about')"
						>
							<v-icon start>
								mdi-information
							</v-icon>
							{{ $t('mainPage.hero.learnMoreButton') }}
						</v-btn>
						<v-btn
							v-if="isAuthenticated"
							class="hero-btn primary"
							size="large"
							to="/bots"
						>
							<v-icon start>
								mdi-robot
							</v-icon>
							Управление ботами
						</v-btn>
						<v-btn
							v-if="isAuthenticated"
							class="hero-btn secondary"
							size="large"
							to="/games/clicker"
						>
							<v-icon start>
								mdi-gamepad-variant
							</v-icon>
							Игра-кликер
						</v-btn>
					</div>
				</div>
				<div class="hero-visual">
					<div class="trading-animation">
						<v-icon
							size="200"
							class="robot-icon"
						>
							mdi-robot-happy-outline
						</v-icon>
						<div class="chart-lines">
							<div class="line line-1" />
							<div class="line line-2" />
							<div class="line line-3" />
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- About Section -->
		<section
			id="about"
			class="about-section animate-on-scroll"
		>
			<div class="container">
				<div class="section-header">
					<h2 class="section-title">
						{{ $t('mainPage.about.title') }}
					</h2>
					<p class="section-subtitle">
						{{ $t('mainPage.about.subtitle') }}
					</p>
				</div>
				<div class="features-grid">
					<div
						v-for="(feature, index) in aboutFeatures"
						:key="index"
						class="feature-card animate-on-scroll"
						:style="{ 'animation-delay': `${index * 0.1}s` }"
					>
						<div class="feature-icon">
							<v-icon size="48">
								{{ feature.icon }}
							</v-icon>
						</div>
						<h3 class="feature-title">
							{{ $t(feature.title) }}
						</h3>
						<p class="feature-description">
							{{ $t(feature.description) }}
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- How It Works Section -->
		<section
			id="how-it-works"
			class="how-it-works-section animate-on-scroll"
		>
			<div class="container">
				<div class="section-header">
					<h2 class="section-title">
						{{ $t('mainPage.howItWorks.title') }}
					</h2>
					<p class="section-subtitle">
						{{ $t('mainPage.howItWorks.subtitle') }}
					</p>
				</div>
				<div class="steps-container">
					<div
						v-for="(step, index) in howItWorksSteps"
						:key="index"
						class="step-card animate-on-scroll"
						:style="{ 'animation-delay': `${index * 0.2}s` }"
					>
						<div class="step-number">
							{{ index + 1 }}
						</div>
						<div class="step-icon">
							<v-icon size="40">
								{{ step.icon }}
							</v-icon>
						</div>
						<h3 class="step-title">
							{{ $t(step.title) }}
						</h3>
						<p class="step-description">
							{{ $t(step.description) }}
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Pricing Section -->
		<section
			id="pricing"
			class="pricing-section animate-on-scroll"
		>
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
							<div class="plan-price">
								{{ $t(plan.price) }}
							</div>
						</div>
						<ul class="plan-features">
							<li
								v-for="(feature, index) in plan.features"
								:key="index"
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
						<v-btn
							class="plan-button"
							:class="{ primary: plan.popular }"
							:variant="plan.popular ? 'flat' : 'outlined'"
							block
							size="large"
							:to="plan.id === 'basic' ? '/signup' : '/pricing'"
						>
							{{ plan.id === 'basic' ? 'Начать бесплатно' : 'Выбрать план' }}
						</v-btn>
					</div>
				</div>
			</div>
		</section>

		<!-- Exchanges Section -->
		<section
			id="exchanges"
			class="exchanges-section animate-on-scroll"
		>
			<div class="container">
				<div class="section-header">
					<h2 class="section-title">
						{{ $t('mainPage.availableExchanges') }}
					</h2>
					<p class="section-subtitle">
						Поддерживаемые криптовалютные биржи
					</p>
				</div>
				<div class="exchanges-grid">
					<div class="exchange-category animate-on-scroll">
						<h3 class="category-title">
							Доступно сейчас
						</h3>
						<div class="exchange-links">
							<a
								href="https://www.binance.com/activity/referral-entry/CPA/together-v4?hl=ru&ref=CPA_008Y5VJ98Z"
								target="_blank"
								class="exchange-link"
							>
								<img
									:src="exchangeLogos.binance"
									alt="Binance"
									class="exchange-logo"
								>
							</a>
						</div>
					</div>
					<div
						class="exchange-category animate-on-scroll"
						style="animation-delay: 0.2s;"
					>
						<h3 class="category-title">
							{{ $t('mainPage.soon') }}
						</h3>
						<div class="exchange-links">
							<a
								v-for="(exchange, index) in [
									{ name: 'Bybit', url: 'https://www.bybit.com/', logoKey: 'bybit' },
									{ name: 'OKX', url: 'https://www.okx.com', logoKey: 'okx' },
									{ name: 'Bitget', url: 'https://www.bitget.com/', logoKey: 'bitget' },
									{ name: 'Gate.io', url: 'https://www.gate.io/', logoKey: 'gateio' },
									{ name: 'Huobi', url: 'https://www.htx.com.cm/invite/ru-ru/1f?invite_code=bnhg3223', logoKey: 'huobi' },
									{ name: 'Kraken', url: 'https://www.kraken.com', logoKey: 'krkn' },
									{ name: 'KuCoin', url: 'https://www.kucoin.com', logoKey: 'kucoin' },
									{ name: 'MEXC', url: 'https://www.mexc.com', logoKey: 'mexc' },
								]"
								:key="exchange.name"
								:href="exchange.url"
								target="_blank"
								class="exchange-link coming-soon animate-on-scroll"
								:style="{ 'animation-delay': `${0.3 + index * 0.05}s` }"
							>
								<img
									:src="exchangeLogos[exchange.logoKey]"
									:alt="exchange.name"
									class="exchange-logo"
								>
								<div class="coming-soon-overlay">Скоро</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped lang="scss">
.home-page {
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
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--gradient-background);
  overflow: hidden;

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    .hero-particles {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(2px 2px at 20px 30px, #00d4ff, transparent),
      radial-gradient(2px 2px at 40px 70px, #00d4ff, transparent),
      radial-gradient(1px 1px at 90px 40px, #00d4ff, transparent),
      radial-gradient(1px 1px at 130px 80px, #00d4ff, transparent),
      radial-gradient(2px 2px at 160px 30px, #00d4ff, transparent);
      background-repeat: repeat;
      background-size: 200px 100px;
      animation: float 20s ease-in-out infinite;
    }
  }

  .hero-content {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
    width: 100%;

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 40px;
      text-align: center;
      padding: 0 20px;
    }
  }

  .hero-text {
    .hero-title {
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

    .hero-subtitle {
      font-size: 1.25rem;
      line-height: 1.6;
      margin-bottom: 40px;
      color: var(--text-secondary);
    }

    .hero-buttons {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;

      @media screen and (max-width: 768px) {
        justify-content: center;
      }

      .hero-btn {
        padding: 0 32px;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 12px;
        transition: all 0.3s ease;

        &.primary {
          background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
          color: white;
          box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);

          &:hover {
            /* Removed glow effect */
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

  .hero-visual {
    display: flex;
    justify-content: center;
    align-items: center;

    .trading-animation {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .robot-icon {
        color: #00d4ff;
        animation: pulse 2s ease-in-out infinite;
        filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.5));
      }

      .chart-lines {
        position: absolute;
        width: 300px;
        height: 200px;

        .line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00d4ff, transparent);
          animation: drawLine 3s ease-in-out infinite;

          &.line-1 {
            top: 20%;
            left: 10%;
            width: 80%;
            animation-delay: 0s;
          }

          &.line-2 {
            top: 50%;
            left: 20%;
            width: 60%;
            animation-delay: 1s;
          }

          &.line-3 {
            top: 80%;
            left: 5%;
            width: 90%;
            animation-delay: 2s;
          }
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

// About Section
.about-section {
  padding: 100px 0;
  background: var(--background-secondary);

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;

    .feature-card {
      background: var(--surface-color);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 40px 30px;
      text-align: center;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);

      &:hover {
        border-color: var(--border-hover);
      }

      .feature-icon {
        margin-bottom: 24px;
        color: var(--primary-color);
      }

      .feature-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 16px;
        color: var(--text-primary);
      }

      .feature-description {
        color: var(--text-muted);
        line-height: 1.6;
      }
    }
  }
}

// How It Works Section
.how-it-works-section {
  padding: 100px 0;
  background: var(--gradient-background);

  .steps-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 60px;
    position: relative;
    max-width: 1200px;
    margin: 0 auto;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #00d4ff, transparent);
      z-index: 1;

      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    .step-card {
      position: relative;
      z-index: 2;
      background: var(--surface-color);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 40px 30px;
      text-align: center;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);

      &:hover {
        border-color: var(--border-hover);
      }

      .step-number {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 40px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: white;
        font-size: 1.2rem;
      }

      .step-icon {
        margin: 20px 0 24px;
        color: var(--primary-color);
      }

      .step-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 16px;
        color: var(--text-primary);
      }

      .step-description {
        color: var(--text-muted);
        line-height: 1.6;
      }
    }
  }
}

// Pricing Section
.pricing-section {
  padding: 100px 0;
  background: var(--background-secondary);

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;

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

        .plan-price {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-color);
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

      .plan-button {
        border-radius: 12px;
        font-weight: 600;
        transition: all 0.3s ease;

        &.primary {
          background: var(--gradient-primary);
          color: white;

          &:hover {
            /* Removed glow effect */
          }
        }
      }
    }
  }
}

// Exchanges Section
.exchanges-section {
  padding: 100px 0;
  background: var(--gradient-background);

  .exchanges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 80px;
    max-width: 1200px;
    margin: 0 auto;

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .exchange-category {
      .category-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 30px;
        color: white;
        text-align: center;
      }

      .exchange-links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;

        .exchange-link {
          position: relative;
          display: block;
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);

          &:hover {
            border-color: var(--border-hover);
          }

          &.coming-soon {
            opacity: 0.6;
            position: relative;

            .coming-soon-overlay {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: rgba(0, 0, 0, 0.8);
              color: #00d4ff;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 0.9rem;
              font-weight: 600;
            }
          }

          .exchange-logo {
            height: 60px;
            width: auto;
            filter: brightness(0.8);
            transition: filter 0.3s ease;

            &:hover {
              filter: brightness(1);
            }
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
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes drawLine {
  0% {
    width: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    width: 100%;
    opacity: 0;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// Large screens optimization
@media screen and (min-width: 1400px) {
  .hero-section {
    .hero-content {
      max-width: 1600px;
      gap: 100px;
    }
  }

  .container {
    max-width: 1600px;
  }

  .features-grid,
  .steps-container,
  .pricing-grid,
  .exchanges-grid {
    max-width: 1400px;
  }
}

// Responsive Design
@media screen and (max-width: 768px) {
  .hero-section {
    .hero-content {
      padding: 0 16px;
    }

    .hero-text {
      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }

      .hero-buttons {
        .hero-btn {
          width: 100%;
        }
      }
    }
  }

  .section-header {
    .section-title {
      font-size: 1.8rem;
    }

    .section-subtitle {
      font-size: 1rem;
    }
  }

  .features-grid,
  .steps-container,
  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .pricing-card.popular {
    transform: none;
  }
}
</style>
