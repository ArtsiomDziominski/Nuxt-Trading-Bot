<template>
	<div id="telegram" />
</template>

<script setup>
import { onMounted } from 'vue';
import { useCookie, useRuntimeConfig } from '#app';

const props = defineProps({
	mode: {
		type: String,
		default: 'callback',
	},
	redirectUrl: {
		type: String,
		default: '',
	},
	requestAccess: {
		type: String,
		default: 'write',
	},
	size: {
		type: String,
		default: 'medium',
	},
	userpic: {
		type: Boolean,
		default: true,
	},
	radius: {
		default: '0',
		type: String,
	},
});

const emit = defineEmits(['callback', 'loaded']);

const userCookie = useCookie('tg_user', {
	maxAge: 60 * 60 * 24,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax',
});

const setCookie = (payload) => {
	userCookie.value = btoa(JSON.stringify(payload));
};

function onTelegramAuth(payload) {
	setCookie(payload);
	// Если fetchSession() не определена, либо импортируйте её, либо удалите этот вызов
	// fetchSession();
	emit('callback', payload);
}

onMounted(() => {
	if (import.meta.client) {
		// Используем значение из пропсов telegramLogin
		const botUsername = useRuntimeConfig().public.TELEGRAM_BOT;
		console.log(botUsername);

		const script = document.createElement('script');
		script.async = true;
		// Используем актуальную версию виджета, например ?15 или ?22 (убедитесь, что версия актуальна)
		script.src = 'https://telegram.org/js/telegram-widget.js?22';

		script.setAttribute('data-telegram-login', botUsername);
		script.setAttribute('data-request-access', props.requestAccess);
		script.setAttribute('data-size', props.size);

		if (props.radius) {
			script.setAttribute('data-radius', props.radius);
		}

		if (props.mode === 'callback') {
			window.onTelegramAuth = onTelegramAuth;
			// Используем правильный атрибут data-callback (без передачи аргумента)
			script.setAttribute('data-callback', 'onTelegramAuth');
		}
		else {
			script.setAttribute('data-auth-url', props.redirectUrl);
		}

		const telegramEl = document.querySelector('#telegram');
		if (telegramEl) {
			telegramEl.appendChild(script);
		}
		emit('loaded');
	}
});
</script>
