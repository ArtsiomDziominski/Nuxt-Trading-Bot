<script setup lang="ts">
import TelegramLogin from '~/components/login/TelegramLogin.vue';
import LoginGoogle from '~/components/login/LoginGoogle.vue';
</script>

<template>
	<client-only>
		<div class="d-flex justify-space-between align-items-center">
			<TelegramLogin />
			<LoginGoogle />
		</div>
	</client-only>
</template>

<style scoped lang="scss">

</style>
