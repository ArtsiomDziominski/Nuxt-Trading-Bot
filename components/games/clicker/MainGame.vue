<script setup lang="ts">
interface Props {
	coinsPerClick: number;
	isAutoClickerActive: boolean;
	autoClickerLevel: number;
	onHandleClick: () => void;
}

defineProps<Props>();
</script>

<template>
	<v-card class="main-game-card">
		<v-card-text class="main-game-content">
			<!-- Click Button -->
			<div class="click-area">
				<v-btn
					class="click-button"
					size="x-large"
					@click="onHandleClick"
				>
					<v-icon
						size="60"
						class="click-icon"
					>
						mdi-cursor-default-click
					</v-icon>
					<div class="click-text">
						<div class="click-label">
							КЛИК!
						</div>
						<div class="click-value">
							+{{ coinsPerClick }} монет
						</div>
					</div>
				</v-btn>
			</div>

			<!-- Auto Clicker Status -->
			<div
				v-if="isAutoClickerActive"
				class="auto-clicker-status"
			>
				<v-icon color="success">
					mdi-robot
				</v-icon>
				<span>Автокликер: +{{ autoClickerLevel }} монет/сек</span>
			</div>
		</v-card-text>
	</v-card>
</template>

<style scoped lang="scss">
.main-game-card {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  backdrop-filter: blur(10px);

  .main-game-content {
    text-align: center;
    padding: 40px;

    .click-area {
      margin-bottom: 30px;

      .click-button {
        background: var(--gradient-primary);
        color: white;
        border-radius: 20px;
        padding: 40px;
        min-width: 300px;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-primary);

        &:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-hover);
        }

        &:active {
          transform: scale(0.95);
        }

        .click-icon {
          animation: pulse 2s ease-in-out infinite;
        }

        .click-text {
          .click-label {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 4px;
          }

          .click-value {
            font-size: 1rem;
            opacity: 0.9;
          }
        }
      }
    }

    .auto-clicker-status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: var(--success-color);
      font-weight: 500;
    }
  }
}

// Animations
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

// Responsive
@media screen and (max-width: 768px) {
  .main-game-card {
    .main-game-content {
      padding: 20px;

      .click-area {
        .click-button {
          min-width: 250px;
          min-height: 150px;
          padding: 30px;
        }
      }
    }
  }
}
</style>
