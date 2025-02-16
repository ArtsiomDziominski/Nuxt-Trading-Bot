<script setup lang="ts">
import TelegramLogin from '~/components/login/TelegramLogin.vue';
</script>

<template>
	<div>
		<client-only>
			<TelegramLogin />
		</client-only>
	</div>
</template>

<style scoped lang="scss">

</style>
