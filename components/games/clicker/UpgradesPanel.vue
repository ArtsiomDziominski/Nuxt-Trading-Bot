<script setup lang="ts">
interface Props {
	multiplierLevel: number;
	multiplierCost: number;
	autoClickerLevel: number;
	autoClickerCost: number;
	canBuyMultiplier: boolean;
	canBuyAutoClicker: boolean;
	formatNumber: (num: number) => string;
	onBuyMultiplier: () => void;
	onBuyAutoClicker: () => void;
}

defineProps<Props>();
</script>

<template>
	<v-card class="upgrades-card">
		<v-card-title class="upgrades-title">
			<v-icon>mdi-upgrade</v-icon>
			Улучшения
		</v-card-title>
		<v-card-text class="upgrades-content">
			<div class="upgrade-item">
				<div class="upgrade-info">
					<div class="upgrade-name">
						<v-icon>mdi-cursor-default-click</v-icon>
						Множитель кликов
					</div>
					<div class="upgrade-desc">
						Увеличивает монеты за клик на 20%
					</div>
					<div class="upgrade-level">
						Уровень: {{ multiplierLevel }}
					</div>
				</div>
				<v-btn
					:disabled="!canBuyMultiplier"
					:color="canBuyMultiplier ? 'primary' : 'grey'"
					@click="onBuyMultiplier"
				>
					Купить за {{ formatNumber(multiplierCost) }}
				</v-btn>
			</div>

			<div class="upgrade-item">
				<div class="upgrade-info">
					<div class="upgrade-name">
						<v-icon>mdi-robot</v-icon>
						Автокликер
					</div>
					<div class="upgrade-desc">
						Автоматически кликает каждую секунду
					</div>
					<div class="upgrade-level">
						Уровень: {{ autoClickerLevel }}
					</div>
				</div>
				<v-btn
					:disabled="!canBuyAutoClicker"
					:color="canBuyAutoClicker ? 'primary' : 'grey'"
					@click="onBuyAutoClicker"
				>
					Купить за {{ formatNumber(autoClickerCost) }}
				</v-btn>
			</div>
		</v-card-text>
	</v-card>
</template>

<style scoped lang="scss">
.upgrades-card {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  backdrop-filter: blur(10px);

  .upgrades-title {
    color: var(--text-primary);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .upgrades-content {
    .upgrade-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid var(--border-color);

      &:last-child {
        border-bottom: none;
      }

      .upgrade-info {
        flex: 1;

        .upgrade-name {
          color: var(--text-primary);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .upgrade-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 4px;
        }

        .upgrade-level {
          color: var(--primary-color);
          font-size: 0.8rem;
          font-weight: 500;
        }
      }
    }
  }
}

// Responsive
@media screen and (max-width: 768px) {
  .upgrades-content {
    .upgrade-item {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
      text-align: center;
    }
  }
}
</style>
