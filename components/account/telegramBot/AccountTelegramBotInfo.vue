<script setup lang="ts">
</script>

<template>
	<v-card>
		<v-card-title>
			{{ $t('account.telegramBot.infoTitle') }}
		</v-card-title>
		<v-card-item>
			{{ $t('account.telegramBot.infoDescription') }}
		</v-card-item>
	</v-card>
</template>

<style scoped lang="scss">
.telegram-bot-connect{
  &__content {
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 20px;
  }
}
</style>
