<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from '~/store/user';
import { useClickerGameStore } from '~/store/clickerGame';
import GameHeader from '~/components/games/clicker/GameHeader.vue';
import StatsPanel from '~/components/games/clicker/StatsPanel.vue';
import AchievementsPanel from '~/components/games/clicker/AchievementsPanel.vue';
import MainGame from '~/components/games/clicker/MainGame.vue';
import UpgradesPanel from '~/components/games/clicker/UpgradesPanel.vue';
import RewardsPanel from '~/components/games/clicker/RewardsPanel.vue';
import RewardModal from '~/components/games/clicker/RewardModal.vue';
import GameNotification from '~/components/games/clicker/GameNotification.vue';

definePageMeta({
	middleware: 'auth',
});

const storeUser = userStore();
const { isAuthenticated } = storeToRefs(storeUser);

const gameStore = useClickerGameStore();
const {
	score,
	clicks,
	level,
	coinsPerClick,
	autoClickerLevel,
	autoClickerCost,
	multiplierLevel,
	multiplierCost,
	achievements,
	unlockedRewards,
	isAutoClickerActive,
	achievementList,
	rewardTypes,
	nextLevelScore,
	progressToNextLevel,
	canBuyAutoClicker,
	canBuyMultiplier,
} = storeToRefs(gameStore);

// Функции из store (не реактивные)
const { formatNumber } = gameStore;

// UI state
const showRewardModal = ref(false);
const currentReward = ref(null);
const currentAchievement = ref(null);
const notifications = ref([]);

// Game functions
const handleClick = () => {
	const levelUp = gameStore.handleClick();
	if (levelUp) {
		showNotification(`Уровень ${level.value}!`, 'success');
	}

	const newAchievements = gameStore.checkAchievements();
	newAchievements.forEach((achievement) => {
		showNotification(`Достижение разблокировано: ${achievement.name}!`, 'success');
		openRewardModal(achievement);
	});
};

const buyAutoClicker = () => {
	const success = gameStore.buyAutoClicker();
	if (success) {
		showNotification('Автокликер улучшен!', 'info');
	}
};

const buyMultiplier = () => {
	const success = gameStore.buyMultiplier();
	if (success) {
		showNotification('Множитель улучшен!', 'info');
	}
};

const showNotification = (message: string, type: string) => {
	const notification = {
		id: Date.now(),
		message,
		type,
		isVisible: true,
	};
	notifications.value.push(notification);

	// Auto remove after 3 seconds
	setTimeout(() => {
		removeNotification(notification.id);
	}, 3000);
};

const removeNotification = (id: number) => {
	const index = notifications.value.findIndex(n => n.id === id);
	if (index > -1) {
		notifications.value.splice(index, 1);
	}
};

const openRewardModal = (achievement: any) => {
	currentAchievement.value = achievement;
	currentReward.value = rewardTypes.value[achievement.reward];
	showRewardModal.value = true;
};

const closeRewardModal = () => {
	showRewardModal.value = false;
	currentReward.value = null;
	currentAchievement.value = null;
};

const claimReward = async () => {
	try {
		if (currentReward.value) {
			await gameStore.claimReward(currentReward.value.name);
			showNotification('Награда получена! Проверьте свой аккаунт.', 'success');
		}
		closeRewardModal();
	}
	catch (error) {
		showNotification('Ошибка при получении награды. Попробуйте позже.', 'error');
		console.error('Error claiming reward:', error);
	}
};

// Lifecycle
onMounted(async () => {
	await gameStore.loadGame();
});

onUnmounted(async () => {
	await gameStore.saveGame();
});

// Инициализация store при создании компонента
await gameStore.loadGame();
</script>

<template>
	<div class="clicker-game">
		<!-- Header -->
		<GameHeader :on-reset-game="() => gameStore.resetGame()" />

		<!-- Main Game Area -->
		<div class="game-container">
			<div class="container">
				<div class="game-grid">
					<!-- Left Panel - Stats & Achievements -->
					<div class="left-panel">
						<StatsPanel
							:score="score"
							:clicks="clicks"
							:level="level"
							:coins-per-click="coinsPerClick"
							:next-level-score="nextLevelScore"
							:progress-to-next-level="progressToNextLevel"
							:format-number="formatNumber"
						/>
						<AchievementsPanel
							:achievements="achievements"
							:achievement-list="achievementList"
						/>
					</div>

					<!-- Center Panel - Main Game & Upgrades -->
					<div class="center-panel">
						<MainGame
							:coins-per-click="coinsPerClick"
							:is-auto-clicker-active="isAutoClickerActive"
							:auto-clicker-level="autoClickerLevel"
							:on-handle-click="handleClick"
						/>
						<UpgradesPanel
							:multiplier-level="multiplierLevel"
							:multiplier-cost="multiplierCost"
							:auto-clicker-level="autoClickerLevel"
							:auto-clicker-cost="autoClickerCost"
							:can-buy-multiplier="canBuyMultiplier"
							:can-buy-auto-clicker="canBuyAutoClicker"
							:format-number="formatNumber"
							:on-buy-multiplier="buyMultiplier"
							:on-buy-auto-clicker="buyAutoClicker"
						/>
					</div>

					<!-- Right Panel - Rewards -->
					<div class="right-panel">
						<RewardsPanel
							:unlocked-rewards="unlockedRewards"
							:reward-types="rewardTypes"
							:is-authenticated="isAuthenticated"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- Reward Modal -->
		<RewardModal
			:is-open="showRewardModal"
			:achievement="currentAchievement"
			:reward="currentReward"
			@close="closeRewardModal"
			@claim="claimReward"
		/>

		<!-- Notifications -->
		<div class="notifications-container">
			<GameNotification
				v-for="notification in notifications"
				:key="notification.id"
				:message="notification.message"
				:type="notification.type"
				:is-visible="notification.isVisible"
				@close="removeNotification(notification.id)"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.clicker-game {
  min-height: 100vh;
  background: var(--gradient-background);
  color: var(--text-primary);
  padding-top: 20px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.game-container {
  .game-grid {
    display: grid;
    grid-template-columns: 300px 1fr 300px;
    gap: 24px;
    align-items: start;

    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
}

.left-panel, .center-panel, .right-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.notifications-container {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
}

// Responsive Design
@media screen and (max-width: 768px) {
  .game-container {
    .game-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
