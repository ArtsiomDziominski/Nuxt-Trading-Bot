<template>
  <div>
    <h1>Debug Configuration</h1>
    <div>
      <h3>Runtime Config:</h3>
      <pre>{{ JSON.stringify(config.public, null, 2) }}</pre>
    </div>
    <div>
      <h3>Environment Variables:</h3>
      <pre>{{ JSON.stringify(envVars, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const envVars = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL,
  WS_URL: process.env.WS_URL,
  SECRET_KEY_API: process.env.SECRET_KEY_API,
  TELEGRAM_BOT: process.env.TELEGRAM_BOT,
  NUXT_TURNSTILE_SECRET_KEY: process.env.NUXT_TURNSTILE_SECRET_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
}

console.log('Debug config loaded')
</script> 