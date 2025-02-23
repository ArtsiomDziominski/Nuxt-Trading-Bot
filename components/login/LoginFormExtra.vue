<script setup lang="ts">
import TelegramLogin from '~/components/login/TelegramLogin.vue';
import LoginGoogle from '~/components/login/LoginGoogle.vue';

defineProps({
	type: {
		type: String,
		default: '',
	},
});
</script>

<template>
	<client-only>
		<div class="d-flex justify-space-between align-items-center">
			<TelegramLogin />
			<LoginGoogle :type="type" />
		</div>
	</client-only>
</template>

<style scoped lang="scss">

</style>
