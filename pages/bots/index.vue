<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { botsStore } from '~/store/bots';
import { createBotsStore } from '~/store/createBots';

definePageMeta({
	middleware: 'auth',
});

const storeBots = botsStore();
const { activeBots } = storeToRefs(storeBots);

const storeCreateBots = createBotsStore();
const { isModalSelectBots } = storeToRefs(storeCreateBots);

const loadingBots = ref(true);

onMounted(async () => {
	loadingBots.value = true;
	await storeBots.requestActiveBots();
	loadingBots.value = false;
});

provide('activeBots', activeBots);

const openSelectModal = (): void => {
	isModalSelectBots.value = true;
};
</script>

<template>
	<div class="bots-page">
		<div class="bots-container">
			<div class="bots-content">
				<bots-actions-bar class="actions-bar" />

				<div class="bots-grid">
					<global-loading
						v-if="loadingBots"
						class="loading-container"
					/>
					<template v-else-if="activeBots && activeBots.length">
						<bots-api-wrapper
							v-for="bot in activeBots"
							:key="bot.api.id"
							:bots="bot"
							class="bot-card"
						/>
					</template>
					<div
						v-else
						class="empty-state"
					>
						<div class="empty-content">
							<div class="empty-icon">
								<v-icon
									size="120"
									class="robot-icon"
								>
									mdi-robot-off-outline
								</v-icon>
								<div class="icon-glow" />
							</div>
							<h2 class="empty-title">
								{{ $t('bots.emptyTitle') }}
							</h2>
							<p class="empty-description">
								{{ $t('bots.emptyDescription') }}
							</p>
							<v-btn
								class="create-bot-btn"
								color="primary"
								size="large"
								@click="openSelectModal"
							>
								<v-icon start>
									mdi-plus
								</v-icon>
								{{ $t('bots.createBot') }}
							</v-btn>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.bots-page {
  min-height: 100vh;
  background: var(--gradient-background);
  padding: 40px 0;

  .bots-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;

    @media screen and (max-width: 768px) {
      padding: 0 20px;
    }
  }

  .bots-content {
    .actions-bar {
      margin-bottom: 30px;
    }

    .bots-grid {
      display: flex;
      flex-direction: column;
      gap: 30px;

      @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .loading-container {
        grid-column: 1 / -1;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
      }

      .bot-card {
        background: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        padding: 16px;

        &:hover {
          border-color: var(--border-hover);
        }
      }

      .empty-state {
        grid-column: 1 / -1;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 60vh;

        .empty-content {
          text-align: center;
          max-width: 500px;
          padding: 60px 40px;
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          backdrop-filter: blur(10px);

          .empty-icon {
            position: relative;
            margin-bottom: 30px;

            .robot-icon {
              color: var(--text-muted);
              transition: all 0.3s ease;
            }

            .icon-glow {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 140px;
              height: 140px;
              background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
              border-radius: 50%;
              animation: pulse 2s ease-in-out infinite;
            }
          }

          .empty-title {
            font-size: 1.8rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 16px;
          }

          .empty-description {
            font-size: 1.1rem;
            color: var(--text-muted);
            line-height: 1.6;
            margin-bottom: 30px;
          }

          .create-bot-btn {
            background: var(--gradient-primary);
            border-radius: 12px;
            font-weight: 600;
            box-shadow: var(--shadow-primary);
            transition: all 0.3s ease;

            &:hover {
              /* Removed glow effect */
            }
          }
        }
      }
    }
  }
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.8;
  }
}
</style>
