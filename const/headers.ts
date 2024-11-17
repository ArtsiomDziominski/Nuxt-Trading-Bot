export const headerNavigation = [
	{
		title: 'Home',
		to: '/',
	},
	{
		title: 'Bots',
		to: '/bots',
	},
];

export enum MenuNavigation {
	apiKey = '/account/api-key',
	telegramBot = '/account/telegram-bot',
	changePassword = '/account/change-password',
	profile = '/account/profile',
}

export const accountNavigation = [
	{
		title: 'account.profile.title',
		icon: 'mdi-account-cowboy-hat-outline',
		to: MenuNavigation.profile,
	},
	{
		title: 'account.changePassword.titleBtn',
		icon: 'mdi-lock-outline',
		to: MenuNavigation.changePassword,
	},
	{
		title: 'account.telegramBot.title',
		icon: 'mdi-robot-excited-outline',
		to: MenuNavigation.telegramBot,
	},
];

export const accountNavigationMenu = [
	{
		title: 'account.profile.title',
		icon: 'mdi-account-cowboy-hat-outline',
		to: MenuNavigation.profile,
	},
	{
		title: 'account.telegramBot.title',
		icon: 'mdi-robot-excited-outline',
		to: MenuNavigation.telegramBot,
	},
];
