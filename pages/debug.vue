<template>
	<div>
		<h1>Debug Configuration</h1>
		<pre>{{ config }}</pre>
	</div>
</template>

<script setup>
const config = useRuntimeConfig();

const envVars = {
	API_URL: config.public.API_URL,
	WS_URL: config.public.WS_URL,
	SECRET_KEY_API: config.public.SECRET_KEY_API,
	TELEGRAM_BOT: config.public.TELEGRAM_BOT,
	NUXT_TURNSTILE_SECRET_KEY: config.public.NUXT_TURNSTILE_SECRET_KEY,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
};

console.log('Environment variables:', envVars);
</script>
