<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { authStore } from '~/store/auth';
import { userStore } from '~/store/user';
import { notificationStore } from '~/store/notification';

const storeAuth = authStore();
const { userLogin, errors, isLoaderLogin } = storeToRefs(storeAuth);

const storeUser = userStore();
const { isAuthenticated } = storeToRefs(storeUser);

const storeNotification = notificationStore();

provide('userLogin', userLogin);
provide('isLoaderLogin', isLoaderLogin);
provide('errors', errors);
provide('isAuthenticated', isAuthenticated);
provide('checkValidationPasswordForm', storeAuth.checkValidationPasswordForm);
provide('checkValidationMailForm', storeAuth.checkValidationMailForm);
provide('requestLoginTelegram', storeAuth.requestLoginTelegram);
provide('requestLogin', storeAuth.requestLogin);
provide('clearUserLogin', storeAuth.clearUserLogin);
provide('requestSetUser', storeUser.requestSetUser);
provide('addNotification', storeNotification.addNotification);
provide('requestLoginGoogle', storeAuth.requestLoginGoogle);
</script>

<template>
	<div class="login-page">
		<div class="login-background">
			<div class="login-particles" />
		</div>
		<div class="login-container">
			<div class="login-content">
				<div class="login-header">
					<div class="login-logo">
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
					<p class="login-subtitle">
						Добро пожаловать обратно
					</p>
				</div>
				<div class="login-form-container">
					<LoginForm />
				</div>
				<div class="login-footer">
					<p class="footer-text">
						Нет аккаунта?
						<NuxtLink
							to="/signup"
							class="footer-link"
						>
							Зарегистрироваться
						</NuxtLink>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.login-page {
  position: relative;
  min-height: calc(100vh - 81px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-background);
  overflow: hidden;

  .login-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    .login-particles {
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

  .login-container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1000px;
    padding: 0 20px;
  }

  .login-content {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: 24px;
    padding: 20px;
    backdrop-filter: blur(20px);
    box-shadow: var(--shadow-card);

    @media screen and (max-width: 768px) {
      padding: 40px 30px;
    }
  }

  .login-header {
    text-align: center;
    margin-bottom: 40px;

    .login-logo {
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

    .login-subtitle {
      font-size: 1.1rem;
      color: var(--text-secondary);
      margin: 0;
    }
  }

  .login-form-container {
    margin-bottom: 30px;
  }

  .login-footer {
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
