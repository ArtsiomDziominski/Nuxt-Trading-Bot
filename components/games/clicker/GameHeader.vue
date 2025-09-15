<script setup lang="ts">
interface Props {
	onResetGame: () => void;
}

defineProps<Props>();
</script>

<template>
	<div class="game-header">
		<div class="container">
			<h1 class="game-title">
				<v-icon
					size="40"
					class="title-icon"
				>
					mdi-gamepad-variant
				</v-icon>
				Крипто Кликер
			</h1>
			<p class="game-subtitle">
				Кликайте и зарабатывайте подписки!
			</p>
			<div class="game-actions">
				<v-btn
					variant="outlined"
					color="error"
					size="small"
					@click="onResetGame"
				>
					<v-icon start>
						mdi-refresh
					</v-icon>
					Сбросить игру
				</v-btn>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.game-header {
  text-align: center;
  margin-bottom: 40px;

  .game-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 16px;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    .title-icon {
      color: var(--primary-color);
    }
  }

  .game-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin-bottom: 20px;
  }

  .game-actions {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

// Responsive
@media screen and (max-width: 768px) {
  .game-header {
    .game-title {
      font-size: 2rem;
      flex-direction: column;
      gap: 8px;
    }
  }
}
</style>
