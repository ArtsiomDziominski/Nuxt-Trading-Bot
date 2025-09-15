<script setup lang="ts">
import { useTheme } from 'vuetify';
import { storeToRefs } from 'pinia';
import { keyTheme, themeDark, themeLight } from '~/const/theme';
import { userStore } from '~/store/user';
import { setCookie } from '~/utils/cookie';
import HeaderButtons from '~/components/layout/header/HeaderButtons.vue';
import HeaderAccount from '~/components/layout/header/HeaderAccount.vue';
import HeaderMarketPrice from '~/components/layout/header/HeaderMarketPrice.vue';

const { locale, setLocale } = useI18n();

const storeUser = userStore();
const { isAuthenticated } = storeToRefs(storeUser);

const theme = useTheme();

// Mobile menu state
const mobileMenuOpen = ref(false);

function toggleTheme() {
	const newTheme = theme.global.name.value === themeDark ? themeLight : themeDark;
	theme.global.name.value = newTheme;
	setCookie(keyTheme, newTheme);

	// Переключаем CSS переменные
	if (import.meta.client) {
		if (newTheme === themeLight) {
			document.documentElement.setAttribute('data-theme', 'light');
		}
		else {
			document.documentElement.removeAttribute('data-theme');
		}
	}
}

function toggleMobileMenu() {
	mobileMenuOpen.value = !mobileMenuOpen.value;
}

function closeMobileMenu() {
	mobileMenuOpen.value = false;
}

// Smooth scroll to section
const scrollToSection = (sectionId: string) => {
	const element = document.getElementById(sectionId);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	}
};

// Инициализация темы при загрузке
onMounted(() => {
	if (import.meta.client) {
		const currentTheme = theme.global.name.value;
		if (currentTheme === themeLight) {
			document.documentElement.setAttribute('data-theme', 'light');
		}
		else {
			document.documentElement.removeAttribute('data-theme');
		}
	}
});
</script>

<template>
	<header class="modern-header">
		<div class="header-container">
			<!-- Logo Section -->
			<div class="logo-section">
				<a
					href="/"
					class="logo-link"
				>
					<div class="logo-icon">
						<v-icon size="32">mdi-finance</v-icon>
					</div>
					<span class="logo-text">{{ $t('logoName') }}</span>
				</a>
			</div>

			<!-- Navigation Section -->
			<nav class="navigation-section d-none d-md-flex">
				<header-buttons v-if="isAuthenticated" />
				<div
					v-else
					class="main-navigation"
				>
					<nuxt-link
						to="/#about"
						class="nav-link"
						@click.prevent="scrollToSection('about')"
					>О боте</nuxt-link>
					<nuxt-link
						to="/#how-it-works"
						class="nav-link"
						@click.prevent="scrollToSection('how-it-works')"
					>Как работает</nuxt-link>
					<nuxt-link
						to="/pricing"
						class="nav-link"
					>Тарифы</nuxt-link>
					<nuxt-link
						to="/#exchanges"
						class="nav-link"
						@click.prevent="scrollToSection('exchanges')"
					>Биржи</nuxt-link>
					<nuxt-link
						to="/games/clicker"
						class="nav-link"
					>Игра</nuxt-link>
				</div>
			</nav>

			<!-- Market Price Ticker -->
			<!--			<div class="market-ticker d-none d-lg-flex"> -->
			<!--				<HeaderMarketPrice /> -->
			<!--			</div> -->

			<!-- Actions Section -->
			<div class="actions-section">
				<!-- Language Selector -->
				<div class="language-selector">
					<v-select
						:model-value="locale"
						:items="[
							{ title: 'RU', value: 'ru' },
							{ title: 'EN', value: 'en' },
						]"
						variant="outlined"
						density="compact"
						hide-details
						class="language-select"
						@update:model-value="setLocale($event)"
					/>
				</div>

				<!-- Theme Toggle -->
				<v-btn
					class="theme-toggle"
					icon=""
					variant="text"
					:title="theme.global.name.value === themeDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'"
					@click="toggleTheme"
				>
					<v-icon size="20">
						{{ theme.global.name.value === themeDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
					</v-icon>
				</v-btn>

				<!-- User Actions -->
				<div class="user-actions">
					<header-account
						v-if="isAuthenticated"
						class="account"
					/>
					<v-btn
						v-if="!isAuthenticated"
						class="login-btn"
						to="/login"
						variant="outlined"
					>
						{{ $t('singIn.title') }}
					</v-btn>
					<v-btn
						v-if="!isAuthenticated"
						class="signup-btn"
						to="/signup"
						variant="flat"
					>
						{{ $t('singUp.title') }}
					</v-btn>
				</div>
			</div>
		</div>

		<!-- Mobile Menu -->
		<div
			v-if="mobileMenuOpen"
			class="mobile-menu d-md-none"
		>
			<div class="mobile-menu-content">
				<nav class="mobile-navigation">
					<a
						href="#about"
						class="mobile-nav-link"
						@click.prevent="scrollToSection('about'); closeMobileMenu()"
					>О боте</a>
					<a
						href="#how-it-works"
						class="mobile-nav-link"
						@click.prevent="scrollToSection('how-it-works'); closeMobileMenu()"
					>Как работает</a>
					<nuxt-link
						to="/pricing"
						class="mobile-nav-link"
						@click="closeMobileMenu()"
					>Тарифы</nuxt-link>
					<a
						href="#exchanges"
						class="mobile-nav-link"
						@click.prevent="scrollToSection('exchanges'); closeMobileMenu()"
					>Биржи</a>
					<nuxt-link
						to="/games/clicker"
						class="mobile-nav-link"
						@click="closeMobileMenu()"
					>Игра</nuxt-link>
				</nav>
				<div class="mobile-actions">
					<!-- Mobile Theme Toggle -->
					<v-btn
						class="mobile-theme-toggle"
						variant="outlined"
						block
						@click="toggleTheme"
					>
						<v-icon start>
							{{ theme.global.name.value === themeDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
						</v-icon>
						{{ theme.global.name.value === themeDark ? 'Светлая тема' : 'Темная тема' }}
					</v-btn>

					<v-btn
						class="mobile-login-btn"
						to="/login"
						variant="outlined"
						block
					>
						{{ $t('singIn.title') }}
					</v-btn>
					<v-btn
						class="mobile-signup-btn"
						to="/signup"
						variant="flat"
						block
					>
						{{ $t('singUp.title') }}
					</v-btn>
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped lang="scss">
.modern-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s ease;

  .header-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;

    @media screen and (max-width: 768px) {
      padding: 0 20px;
      height: 70px;
    }
  }

  // Light theme styles
  [data-theme="light"] & {
    background: rgba(255, 255, 255, 0.95);
    border-bottom: 1px solid var(--border-color);
  }

  .logo-section {
    .logo-link {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        // Removed transform effect
      }

      .logo-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
        border-radius: 12px;
        color: white;
        box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
      }

      .logo-text {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
        background: var(--gradient-text);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;

        @media screen and (max-width: 1200px) {
          display: none;
        }
      }
    }
  }

  .navigation-section {
    flex: 1;
    display: flex;
    justify-content: center;
    margin: 0 60px;
    gap: 16px;

    .main-navigation {
      display: flex;
      gap: 40px;
      align-items: center;

      .nav-link {
        color: var(--text-secondary);
        text-decoration: none;
        font-weight: 500;
        font-size: 1rem;
        transition: all 0.3s ease;
        position: relative;
        padding: 8px 0;

        &:hover {
          color: var(--primary-color);
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient-primary);
          transition: width 0.3s ease;
        }

        &:hover::after {
          width: 100%;
        }
      }
    }
  }

  .market-ticker {
    flex: 0 0 auto;
    margin-right: 40px;
  }

  .actions-section {
    display: flex;
    align-items: center;
    gap: 20px;

    .language-selector {
      .language-select {
        min-width: 80px;
      }
    }

    .theme-toggle {
      color: var(--text-secondary);
      transition: all 0.3s ease;

      &:hover {
        color: var(--primary-color);
      }
    }

    .user-actions {
      display: flex;
      align-items: center;
      gap: 12px;

      .login-btn {
        border-color: var(--border-color);
        color: var(--primary-color);
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
          border-color: #00d4ff;
          color: #00d4ff;
        }
      }

      .signup-btn {
        background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
        color: white;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
        transition: all 0.3s ease;

        &:hover {
          /* Removed glow effect */
        }
      }
    }

    .mobile-menu-btn {
      color: var(--text-secondary);
      transition: all 0.3s ease;

      &:hover {
        color: var(--primary-color);
      }
    }
  }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--background-primary);
    backdrop-filter: blur(25px);
    border-bottom: 1px solid var(--border-color);
    animation: slideDown 0.3s ease;

    .mobile-menu-content {
      padding: 30px 20px;
      max-width: 1600px;
      margin: 0 auto;

      .mobile-navigation {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 30px;

        .mobile-nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-color);
          transition: all 0.3s ease;

          &:hover {
            color: var(--primary-color);
            padding-left: 10px;
          }
        }
      }

      .mobile-actions {
        display: flex;
        flex-direction: column;
        gap: 12px;

        .mobile-theme-toggle {
          border-color: var(--border-color);
          color: var(--text-secondary);
          border-radius: 8px;
          font-weight: 500;
        }

        .mobile-login-btn {
          border-color: var(--border-color);
          color: var(--text-secondary);
          border-radius: 8px;
          font-weight: 500;
        }

        .mobile-signup-btn {
          background: var(--gradient-primary);
          color: white;
          border-radius: 8px;
          font-weight: 600;
        }
      }
    }
  }
}

// Animations
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Responsive adjustments
@media screen and (max-width: 1200px) {
  .modern-header {
    .header-container {
      .navigation-section {
        margin: 0 40px;
      }

      .market-ticker {
        margin-right: 20px;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .modern-header {
    .header-container {
      .navigation-section {
        margin: 0 20px;
      }

      .market-ticker {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .modern-header {
    .header-container {
      .navigation-section {
        display: none;
      }

      .actions-section {
        gap: 12px;

        .user-actions {
          display: none;
        }
      }
    }
  }
}
</style>
