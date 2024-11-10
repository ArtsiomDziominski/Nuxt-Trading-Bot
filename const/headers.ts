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
}

export const headerMenuNavigation = [
	// {
	// 	title: 'apiKeys',
	// 	to: MenuNavigation.apiKey,
	// },
	{
		title: 'telegramBot',
		to: MenuNavigation.telegramBot,
	},
];

export const accountNavigation = [
	// {
	// 	title: 'account.profile.title',
	// 	icon: 'mdi-api',
	// 	to: MenuNavigation.apiKey,
	// },
	{
		title: 'account.telegramBot.title',
		icon: 'mdi-robot-excited-outline',
		to: MenuNavigation.telegramBot,
	},
];
