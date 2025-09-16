import { defineStore } from 'pinia';

export const useClickerGameStore = defineStore('clickerGame', () => {
	// Game state
	const score = ref(0);
	const clicks = ref(0);
	const level = ref(1);
	const coinsPerClick = ref(1);
	const autoClickerLevel = ref(0);
	const autoClickerCost = ref(10);
	const multiplierLevel = ref(0);
	const multiplierCost = ref(50);
	const achievements = ref([]);
	const unlockedRewards = ref([]);

	// Game settings
	const autoClickerInterval = ref(null);
	const isAutoClickerActive = ref(false);

	// Achievement system
	const achievementList = [
		{ id: 'first_click', name: 'Первый клик', description: 'Сделайте первый клик', requirement: 1, reward: 'basic_subscription', icon: 'mdi-cursor-default-click' },
		{ id: 'hundred_clicks', name: 'Сотня кликов', description: 'Сделайте 100 кликов', requirement: 100, reward: 'basic_subscription', icon: 'mdi-numeric-100' },
		{ id: 'thousand_clicks', name: 'Тысяча кликов', description: 'Сделайте 1000 кликов', requirement: 1000, reward: 'pro_subscription', icon: 'mdi-numeric-1000' },
		{ id: 'ten_thousand_clicks', name: 'Десять тысяч', description: 'Сделайте 10000 кликов', requirement: 10000, reward: 'premium_subscription', icon: 'mdi-numeric-10000' },
		{ id: 'hundred_thousand_clicks', name: 'Сто тысяч', description: 'Сделайте 100000 кликов', requirement: 100000, reward: 'premium_subscription', icon: 'mdi-numeric-100000' },
		{ id: 'million_clicks', name: 'Миллионер', description: 'Сделайте 1000000 кликов', requirement: 1000000, reward: 'lifetime_subscription', icon: 'mdi-trophy' },
		{ id: 'level_10', name: 'Уровень 10', description: 'Достигните 10 уровня', requirement: 10, reward: 'pro_subscription', icon: 'mdi-star' },
		{ id: 'level_25', name: 'Уровень 25', description: 'Достигните 25 уровня', requirement: 25, reward: 'premium_subscription', icon: 'mdi-star-circle' },
		{ id: 'level_50', name: 'Уровень 50', description: 'Достигните 50 уровня', requirement: 50, reward: 'lifetime_subscription', icon: 'mdi-crown' },
	];

	// Reward system
	const rewardTypes = {
		basic_subscription: { name: 'Базовая подписка', description: '1 месяц бесплатно', duration: 30, color: '#4caf50' },
		pro_subscription: { name: 'Pro подписка', description: '3 месяца бесплатно', duration: 90, color: '#2196f3' },
		premium_subscription: { name: 'Premium подписка', description: '6 месяцев бесплатно', duration: 180, color: '#9c27b0' },
		lifetime_subscription: { name: 'Пожизненная подписка', description: 'Бесплатно навсегда!', duration: -1, color: '#ff9800' },
	};

	// Game functions
	const handleClick = () => {
		clicks.value++;
		score.value += coinsPerClick.value;
		checkLevelUp();
		checkAchievements();
	};

	const checkLevelUp = () => {
		const newLevel = Math.floor(score.value / 1000) + 1;
		if (newLevel > level.value) {
			level.value = newLevel;
			return true; // Level up occurred
		}
		return false;
	};

	const checkAchievements = () => {
		const newAchievements = [];

		achievementList.forEach((achievement) => {
			if (!achievements.value.find(a => a.id === achievement.id)) {
				let requirementMet = false;

				if (achievement.id.includes('click')) {
					requirementMet = clicks.value >= achievement.requirement;
				}
				else if (achievement.id.includes('level')) {
					requirementMet = level.value >= achievement.requirement;
				}

				if (requirementMet) {
					achievements.value.push(achievement);
					unlockedRewards.value.push(achievement.reward);
					newAchievements.push(achievement);
				}
			}
		});

		return newAchievements;
	};

	const buyAutoClicker = () => {
		if (score.value >= autoClickerCost.value) {
			score.value -= autoClickerCost.value;
			autoClickerLevel.value++;
			autoClickerCost.value = Math.floor(autoClickerCost.value * 1.5);

			if (!isAutoClickerActive.value) {
				startAutoClicker();
			}

			return true;
		}
		return false;
	};

	const buyMultiplier = () => {
		if (score.value >= multiplierCost.value) {
			score.value -= multiplierCost.value;
			multiplierLevel.value++;
			coinsPerClick.value = Math.floor(coinsPerClick.value * 1.2);
			multiplierCost.value = Math.floor(multiplierCost.value * 2);

			return true;
		}
		return false;
	};

	const startAutoClicker = () => {
		if (autoClickerLevel.value > 0 && !isAutoClickerActive.value) {
			isAutoClickerActive.value = true;
			autoClickerInterval.value = setInterval(() => {
				score.value += autoClickerLevel.value;
				checkLevelUp();
			}, 1000);
		}
	};

	const stopAutoClicker = () => {
		if (autoClickerInterval.value) {
			clearInterval(autoClickerInterval.value);
			autoClickerInterval.value = null;
			isAutoClickerActive.value = false;
		}
	};

	// Save/Load functions for backend integration
	const saveGame = async () => {
		try {
			const gameData = {
				score: score.value,
				clicks: clicks.value,
				level: level.value,
				coinsPerClick: coinsPerClick.value,
				autoClickerLevel: autoClickerLevel.value,
				autoClickerCost: autoClickerCost.value,
				multiplierLevel: multiplierLevel.value,
				multiplierCost: multiplierCost.value,
				achievements: achievements.value,
				unlockedRewards: unlockedRewards.value,
			};

			// TODO: Заменить на реальный API endpoint
			// const response = await $fetch('/api/clicker-game/save', {
			//   method: 'POST',
			//   body: gameData
			// });

			console.log('Game data ready for backend:', gameData);
		}
		catch (error) {
			console.error('Error saving game data:', error);
		}
	};

	const loadGame = async () => {
		try {
			// TODO: Заменить на реальный API endpoint
			// const data = await $fetch('/api/clicker-game/load');

			// Пока используем пустые значения для демонстрации
			const data = {
				score: 0,
				clicks: 0,
				level: 1,
				coinsPerClick: 1,
				autoClickerLevel: 0,
				autoClickerCost: 10,
				multiplierLevel: 0,
				multiplierCost: 50,
				achievements: [],
				unlockedRewards: [],
			};

			score.value = data.score || 0;
			clicks.value = data.clicks || 0;
			level.value = data.level || 1;
			coinsPerClick.value = data.coinsPerClick || 1;
			autoClickerLevel.value = data.autoClickerLevel || 0;
			autoClickerCost.value = data.autoClickerCost || 10;
			multiplierLevel.value = data.multiplierLevel || 0;
			multiplierCost.value = data.multiplierCost || 50;
			achievements.value = data.achievements || [];
			unlockedRewards.value = data.unlockedRewards || [];

			if (autoClickerLevel.value > 0) {
				startAutoClicker();
			}
		}
		catch (error) {
			console.error('Error loading game data:', error);
		}
	};

	const resetGame = async () => {
		score.value = 0;
		clicks.value = 0;
		level.value = 1;
		coinsPerClick.value = 1;
		autoClickerLevel.value = 0;
		autoClickerCost.value = 10;
		multiplierLevel.value = 0;
		multiplierCost.value = 50;
		achievements.value = [];
		unlockedRewards.value = [];
		stopAutoClicker();
		await saveGame();
	};

	// Функция для выдачи наград через бэкенд
	const claimReward = async (rewardType: string) => {
		try {
			// TODO: Заменить на реальный API endpoint
			// const response = await $fetch('/api/clicker-game/claim-reward', {
			//   method: 'POST',
			//   body: { rewardType }
			// });

			console.log('Claiming reward:', rewardType);
			// return response;
		}
		catch (error) {
			console.error('Error claiming reward:', error);
			throw error;
		}
	};

	// Computed
	const nextLevelScore = computed(() => level.value * 1000);
	const progressToNextLevel = computed(() => {
		const currentLevelScore = (level.value - 1) * 1000;
		const progress = score.value - currentLevelScore;
		return Math.min((progress / 1000) * 100, 100);
	});

	const canBuyAutoClicker = computed(() => score.value >= autoClickerCost.value);
	const canBuyMultiplier = computed(() => score.value >= multiplierCost.value);

	// Format numbers
	const formatNumber = (num: number) => {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + 'M';
		}
		else if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toString();
	};

	return {
		// State
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

		// Data
		achievementList,
		rewardTypes,

		// Actions
		handleClick,
		checkLevelUp,
		checkAchievements,
		buyAutoClicker,
		buyMultiplier,
		startAutoClicker,
		stopAutoClicker,
		saveGame,
		loadGame,
		resetGame,
		claimReward,

		// Computed
		nextLevelScore,
		progressToNextLevel,
		canBuyAutoClicker,
		canBuyMultiplier,
		formatNumber,
	};
});
