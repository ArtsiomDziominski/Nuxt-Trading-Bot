<script setup lang="ts">
interface Props {
	isOpen: boolean;
	achievement: any;
	reward: any;
}

interface Emits {
	(e: 'close'): void;
	(e: 'claim'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleClaim = () => {
	emit('claim');
	emit('close');
};

const handleClose = () => {
	emit('close');
};
</script>

<template>
	<v-dialog
		:model-value="isOpen"
		max-width="500"
		@update:model-value="handleClose"
	>
		<v-card class="reward-modal">
			<v-card-title class="reward-modal-header">
				<div class="reward-icon">
					<v-icon
						size="48"
						color="warning"
					>
						mdi-trophy
					</v-icon>
				</div>
				<h2 class="reward-title">
					Достижение разблокировано!
				</h2>
			</v-card-title>

			<v-card-text class="reward-modal-content">
				<div class="achievement-info">
					<h3 class="achievement-name">
						{{ achievement?.name }}
					</h3>
					<p class="achievement-description">
						{{ achievement?.description }}
					</p>
				</div>

				<div class="reward-info">
					<div class="reward-badge">
						<v-icon
							size="32"
							:color="reward?.color || 'primary'"
						>
							mdi-gift
						</v-icon>
						<div class="reward-details">
							<h4 class="reward-name">
								{{ reward?.name }}
							</h4>
							<p class="reward-description">
								{{ reward?.description }}
							</p>
						</div>
					</div>
				</div>

				<div class="reward-actions">
					<v-btn
						variant="outlined"
						@click="handleClose"
					>
						Закрыть
					</v-btn>
					<v-btn
						color="primary"
						variant="flat"
						@click="handleClaim"
					>
						Получить награду
					</v-btn>
				</div>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<style scoped lang="scss">
.reward-modal {
  background: var(--background-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  backdrop-filter: blur(20px);

  .reward-modal-header {
    text-align: center;
    padding: 30px 30px 20px;
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%);
    border-radius: 20px 20px 0 0;

    .reward-icon {
      margin-bottom: 16px;
      animation: bounce 1s ease-in-out infinite;
    }

    .reward-title {
      color: var(--text-primary);
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }
  }

  .reward-modal-content {
    padding: 30px;

    .achievement-info {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border-color);

      .achievement-name {
        color: var(--primary-color);
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .achievement-description {
        color: var(--text-secondary);
        margin: 0;
      }
    }

    .reward-info {
      margin-bottom: 30px;

      .reward-badge {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px;
        background: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: 12px;

        .reward-details {
          flex: 1;

          .reward-name {
            color: var(--text-primary);
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 4px;
          }

          .reward-description {
            color: var(--text-secondary);
            margin: 0;
          }
        }
      }
    }

    .reward-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
