<script setup lang="ts">
</script>

<template>
	<div class="telegram-bot">
		<AccountTelegramBotInfo />
		<AccountTelegramBotConnect />
		<v-card />
	</div>
</template>

<style scoped lang="scss">
.telegram-bot {
    display: grid;
    grid-template-columns: 0.8fr 1.4fr 0.8fr;
    gap: 20px;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
