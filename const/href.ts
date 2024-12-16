export const href = () => {
	const telegramBot = useRuntimeConfig().public.TELEGRAM_BOT;

	return {
		telegramBotName: `@${telegramBot}`,
		telegramBot: `http://t.me/${telegramBot}`,
	};
};
