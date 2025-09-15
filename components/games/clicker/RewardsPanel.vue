<script setup lang="ts">
interface RewardType {
	name: string;
	description: string;
	duration: number;
	color: string;
}

interface Props {
	unlockedRewards: string[];
	rewardTypes: Record<string, RewardType>;
	isAuthenticated: boolean;
}

defineProps<Props>();
</script>

<template>
	<div class="rewards-panel">
		<v-card class="rewards-card">
			<v-card-title class="rewards-title">
				<v-icon>mdi-gift</v-icon>
				Ваши награды
			</v-card-title>
			<v-card-text class="rewards-content">
				<div
					v-if="!unlockedRewards || unlockedRewards.length === 0"
					class="no-rewards"
				>
					<v-icon
						size="48"
						color="grey"
					>
						mdi-gift-outline
					</v-icon>
					<p>Пока нет наград</p>
					<p class="rewards-hint">
						Достигайте целей, чтобы получить подписки!
					</p>
				</div>
				<div
					v-else-if="unlockedRewards && unlockedRewards.length > 0"
					class="rewards-list"
				>
					<div
						v-for="(reward, index) in (unlockedRewards || [])"
						:key="index"
						class="reward-item"
					>
						<v-icon
							:color="rewardTypes[reward]?.color || 'primary'"
							size="24"
						>
							mdi-crown
						</v-icon>
						<div class="reward-info">
							<div class="reward-name">
								{{ rewardTypes[reward]?.name }}
							</div>
							<div class="reward-desc">
								{{ rewardTypes[reward]?.description }}
							</div>
						</div>
					</div>
				</div>
			</v-card-text>
		</v-card>

		<!-- Login Prompt -->
		<v-card
			v-if="!isAuthenticated"
			class="login-prompt-card"
		>
			<v-card-title class="login-prompt-title">
				<v-icon>mdi-account</v-icon>
				Войдите в аккаунт
			</v-card-title>
			<v-card-text class="login-prompt-content">
				<p>Чтобы получить награды, войдите в свой аккаунт</p>
				<div class="login-buttons">
					<v-btn
						to="/login"
						variant="outlined"
						block
						class="mb-2"
					>
						Войти
					</v-btn>
					<v-btn
						to="/signup"
						variant="flat"
						block
					>
						Регистрация
					</v-btn>
				</div>
			</v-card-text>
		</v-card>
	</div>
</template>

<style scoped lang="scss">
.rewards-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.rewards-card, .login-prompt-card {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  backdrop-filter: blur(10px);

  .rewards-title, .login-prompt-title {
    color: var(--text-primary);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rewards-content {
    .no-rewards {
      text-align: center;
      padding: 20px;
      color: var(--text-secondary);

      .rewards-hint {
        font-size: 0.9rem;
        margin-top: 8px;
      }
    }

    .rewards-list {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .reward-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 8px;
        background: var(--surface-hover);
        border: 1px solid var(--border-color);

        .reward-info {
          flex: 1;

          .reward-name {
            color: var(--text-primary);
            font-weight: 600;
            font-size: 0.9rem;
          }

          .reward-desc {
            color: var(--text-secondary);
            font-size: 0.8rem;
          }
        }
      }
    }
  }
}

.login-prompt-content {
  text-align: center;

  p {
    color: var(--text-secondary);
    margin-bottom: 20px;
  }

  .login-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
