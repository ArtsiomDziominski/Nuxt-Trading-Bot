<script setup lang="ts">
// Social media links
const socialLinks = [
	{
		name: 'Telegram',
		icon: 'mdi-telegram',
		url: 'https://t.me/your_bot',
		color: '#0088cc',
	},
	{
		name: 'Discord',
		icon: 'mdi-discord',
		url: 'https://discord.gg/your_server',
		color: '#5865f2',
	},
	{
		name: 'Twitter',
		icon: 'mdi-twitter',
		url: 'https://twitter.com/your_account',
		color: '#1da1f2',
	},
	{
		name: 'GitHub',
		icon: 'mdi-github',
		url: 'https://github.com/your_repo',
		color: '#333',
	},
];

// Footer navigation links
const footerLinks = {
	product: [
		{ name: 'О боте', href: '#about' },
		{ name: 'Как работает', href: '#how-it-works' },
		{ name: 'Тарифы', href: '#pricing' },
		{ name: 'Биржи', href: '#exchanges' },
	],
	support: [
		{ name: 'Документация', href: '/docs' },
		{ name: 'Поддержка', href: '/support' },
		{ name: 'FAQ', href: '/faq' },
		{ name: 'Контакты', href: '/contact' },
	],
	legal: [
		{ name: 'Политика конфиденциальности', href: '/privacy' },
		{ name: 'Условия использования', href: '/terms' },
		{ name: 'Лицензия', href: '/license' },
	],
};

// Newsletter email
const email = ref('');

// Smooth scroll to section
const scrollToSection = (sectionId: string) => {
	const element = document.getElementById(sectionId.replace('#', ''));
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	}
};
</script>

<template>
	<footer class="modern-footer">
		<div class="footer-content">
			<div class="container">
				<div class="footer-grid">
					<!-- Brand Section -->
					<div class="footer-brand">
						<div class="brand-logo">
							<v-icon
								size="32"
								class="logo-icon"
							>
								mdi-finance
							</v-icon>
							<span class="brand-name">{{ $t('logoName') }}</span>
						</div>
						<p class="brand-description">
							Автоматизируйте торговлю криптовалютой с помощью умных торговых ботов.
							Получайте прибыль 24/7 без вашего участия.
						</p>
						<div class="social-links">
							<a
								v-for="social in socialLinks"
								:key="social.name"
								:href="social.url"
								target="_blank"
								class="social-link"
								:style="{ '--social-color': social.color }"
							>
								<v-icon>{{ social.icon }}</v-icon>
							</a>
						</div>
					</div>

					<!-- Product Links -->
					<div class="footer-section">
						<h3 class="section-title">
							Продукт
						</h3>
						<ul class="footer-links">
							<li
								v-for="link in footerLinks.product"
								:key="link.name"
							>
								<a
									:href="link.href"
									class="footer-link"
									@click.prevent="scrollToSection(link.href)"
								>
									{{ link.name }}
								</a>
							</li>
						</ul>
					</div>

					<!-- Support Links -->
					<div class="footer-section">
						<h3 class="section-title">
							Поддержка
						</h3>
						<ul class="footer-links">
							<li
								v-for="link in footerLinks.support"
								:key="link.name"
							>
								<a
									:href="link.href"
									class="footer-link"
								>
									{{ link.name }}
								</a>
							</li>
						</ul>
					</div>

					<!-- Legal Links -->
					<div class="footer-section">
						<h3 class="section-title">
							Правовая информация
						</h3>
						<ul class="footer-links">
							<li
								v-for="link in footerLinks.legal"
								:key="link.name"
							>
								<a
									:href="link.href"
									class="footer-link"
								>
									{{ link.name }}
								</a>
							</li>
						</ul>
					</div>
				</div>

				<!-- Newsletter Section -->
				<div class="newsletter-section">
					<div class="newsletter-content">
						<div class="newsletter-text">
							<h3 class="newsletter-title">
								Подпишитесь на обновления
							</h3>
							<p class="newsletter-description">
								Получайте последние новости о новых функциях и улучшениях
							</p>
						</div>
						<div class="newsletter-form">
							<v-text-field
								v-model="email"
								placeholder="Введите ваш email"
								variant="outlined"
								density="compact"
								class="newsletter-input"
							/>
							<v-btn
								class="newsletter-button"
								color="primary"
								variant="flat"
							>
								Подписаться
							</v-btn>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer Bottom -->
		<div class="footer-bottom">
			<div class="container">
				<div class="footer-bottom-content">
					<div class="copyright">
						© {{ new Date().getFullYear() }} {{ $t('logoName') }}. Все права защищены.
					</div>
					<div class="footer-bottom-links">
						<a
							href="/privacy"
							class="bottom-link"
						>Конфиденциальность</a>
						<a
							href="/terms"
							class="bottom-link"
						>Условия</a>
						<a
							href="/cookies"
							class="bottom-link"
						>Cookies</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<style scoped lang="scss">
.modern-footer {
	background: var(--gradient-background);
	border-top: 1px solid var(--border-color);
	margin-top: 100px;

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 40px;

		@media screen and (max-width: 768px) {
			padding: 0 20px;
		}
	}
}

.footer-content {
	padding: 80px 0 40px;
}

.footer-grid {
	display: grid;
	grid-template-columns: 2fr 1fr 1fr 1fr;
	gap: 60px;
	margin-bottom: 60px;

	@media screen and (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 40px;
	}
}

.footer-brand {
	.logo-icon {
		color: #00d4ff;
		margin-right: 12px;
	}

	.brand-logo {
		display: flex;
		align-items: center;
		margin-bottom: 20px;

		.brand-name {
			font-size: 1.5rem;
			font-weight: 700;
			color: var(--text-primary);
		}
	}

	.brand-description {
		color: var(--text-muted);
		line-height: 1.6;
		margin-bottom: 30px;
	}

	.social-links {
		display: flex;
		gap: 16px;

		.social-link {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 44px;
			height: 44px;
			background: var(--surface-color);
			border: 1px solid var(--border-color);
			border-radius: 12px;
			color: var(--text-secondary);
			transition: all 0.3s ease;
			text-decoration: none;

			&:hover {
				background: var(--social-color);
				border-color: var(--social-color);
				color: white;
			}
		}
	}
}

.footer-section {
	.section-title {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 24px;
	}

	.footer-links {
		list-style: none;
		padding: 0;
		margin: 0;

		li {
			margin-bottom: 12px;
		}

		.footer-link {
			color: var(--text-muted);
			text-decoration: none;
			transition: all 0.3s ease;
			position: relative;

			&:hover {
				color: var(--primary-color);
			}

			&::before {
				content: '';
				position: absolute;
				left: -12px;
				top: 50%;
				transform: translateY(-50%);
				width: 0;
				height: 2px;
				background: #00d4ff;
				transition: width 0.3s ease;
			}

			&:hover::before {
				width: 8px;
			}
		}
	}
}

.newsletter-section {
	background: rgba(255, 255, 255, 0.02);
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 20px;
	padding: 40px;
	backdrop-filter: blur(10px);

	.newsletter-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		align-items: center;

		@media screen and (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: 30px;
			text-align: center;
		}
	}

	.newsletter-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 12px;
	}

	.newsletter-description {
		color: var(--text-muted);
		line-height: 1.6;
	}

	.newsletter-form {
		display: flex;
		gap: 16px;

		@media screen and (max-width: 768px) {
			flex-direction: column;
		}

		.newsletter-input {
			flex: 1;
		}

		.newsletter-button {
			background: var(--gradient-primary);
			border-radius: 12px;
			font-weight: 600;
			white-space: nowrap;

			&:hover {
				/* Removed glow effect */
			}
		}
	}
}

.footer-bottom {
	background: var(--surface-color);
	border-top: 1px solid var(--border-color);
	padding: 24px 0;

	.footer-bottom-content {
		display: flex;
		justify-content: space-between;
		align-items: center;

		@media screen and (max-width: 768px) {
			flex-direction: column;
			gap: 16px;
			text-align: center;
		}
	}

	.copyright {
		color: var(--text-muted);
		font-size: 0.9rem;
	}

	.footer-bottom-links {
		display: flex;
		gap: 24px;

		.bottom-link {
			color: var(--text-muted);
			text-decoration: none;
			font-size: 0.9rem;
			transition: color 0.3s ease;

			&:hover {
				color: var(--primary-color);
			}
		}
	}
}
</style>
