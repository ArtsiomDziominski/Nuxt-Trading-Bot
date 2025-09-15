<script setup lang="ts">
interface Props {
	score: number;
	clicks: number;
	level: number;
	coinsPerClick: number;
	nextLevelScore: number;
	progressToNextLevel: number;
	formatNumber: (num: number) => string;
}

defineProps<Props>();
</script>

<template>
	<v-card class="stats-card">
		<v-card-title class="stats-title">
			<v-icon>mdi-chart-line</v-icon>
			Статистика
		</v-card-title>
		<v-card-text class="stats-content">
			<div class="stat-item">
				<span class="stat-label">Монеты:</span>
				<span class="stat-value">{{ formatNumber(score) }}</span>
			</div>
			<div class="stat-item">
				<span class="stat-label">Клики:</span>
				<span class="stat-value">{{ formatNumber(clicks) }}</span>
			</div>
			<div class="stat-item">
				<span class="stat-label">Уровень:</span>
				<span class="stat-value">{{ level }}</span>
			</div>
			<div class="stat-item">
				<span class="stat-label">Монет за клик:</span>
				<span class="stat-value">{{ coinsPerClick }}</span>
			</div>

			<!-- Progress Bar -->
			<div class="level-progress">
				<div class="progress-label">
					Прогресс до уровня {{ level + 1 }}
				</div>
				<v-progress-linear
					:model-value="progressToNextLevel"
					color="primary"
					height="8"
					rounded
					class="progress-bar"
				/>
				<div class="progress-text">
					{{ formatNumber(score) }} / {{ formatNumber(nextLevelScore) }}
				</div>
			</div>
		</v-card-text>
	</v-card>
</template>

<style scoped lang="scss">
.stats-card {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  backdrop-filter: blur(10px);

  .stats-title {
    color: var(--text-primary);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .stats-content {
    .stat-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid var(--border-color);

      &:last-child {
        border-bottom: none;
      }

      .stat-label {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }

      .stat-value {
        color: var(--primary-color);
        font-weight: 600;
        font-size: 1.1rem;
      }
    }

    .level-progress {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid var(--border-color);

      .progress-label {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-bottom: 8px;
      }

      .progress-bar {
        margin-bottom: 8px;
      }

      .progress-text {
        color: var(--text-primary);
        font-size: 0.9rem;
        text-align: center;
      }
    }
  }
}
</style>
