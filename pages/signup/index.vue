<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { authStore } from '~/store/auth';

const storeAuth = authStore();
const { userSignup, isLoaderSignup, errors } = storeToRefs(storeAuth);

provide('userSignup', userSignup);
provide('isLoaderSignup', isLoaderSignup);
provide('errors', errors);
provide('checkValidationLoginForm', storeAuth.checkValidationLoginForm);
provide('checkValidationMailForm', storeAuth.checkValidationMailForm);
provide('checkValidationPasswordForm', storeAuth.checkValidationPasswordForm);
</script>

<template>
	<div class="signup-page">
		<div class="signup-background">
			<div class="signup-particles" />
		</div>
		<div class="signup-container">
			<div class="signup-content">
				<div class="signup-header">
					<div class="signup-logo">
						<v-icon
							size="48"
							class="logo-icon"
						>
							mdi-finance
						</v-icon>
						<h1 class="logo-text">
							{{ $t('logoName') }}
						</h1>
					</div>
					<p class="signup-subtitle">
						Создайте свой аккаунт
					</p>
				</div>
				<div class="signup-form-container">
					<SignupMailSignUpMailForm />
				</div>
				<div class="signup-footer">
					<p class="footer-text">
						Уже есть аккаунт?
						<NuxtLink
							to="/login"
							class="footer-link"
						>
							Войти
						</NuxtLink>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.signup-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-background);
  overflow: hidden;

  .signup-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    .signup-particles {
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

  .signup-container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 500px;
    padding: 0 20px;
  }

  .signup-content {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: 24px;
    padding: 60px 40px;
    backdrop-filter: blur(20px);
    box-shadow: var(--shadow-card);

    @media screen and (max-width: 768px) {
      padding: 40px 30px;
    }
  }

  .signup-header {
    text-align: center;
    margin-bottom: 40px;

    .signup-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 20px;

      .logo-icon {
        color: var(--primary-color);
        filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.5));
      }

      .logo-text {
        font-size: 2rem;
        font-weight: 700;
        background: var(--gradient-text);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0;
      }
    }

    .signup-subtitle {
      font-size: 1.1rem;
      color: var(--text-secondary);
      margin: 0;
    }
  }

  .signup-form-container {
    margin-bottom: 30px;
  }

  .signup-footer {
    text-align: center;

    .footer-text {
      color: var(--text-muted);
      margin: 0;
      font-size: 0.95rem;

      .footer-link {
        color: var(--primary-color);
        font-weight: 600;
        transition: all 0.3s ease;

        &:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }
      }
    }
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
</style>
