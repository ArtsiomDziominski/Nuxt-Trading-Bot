<script setup lang="ts">
const buttons = [
	{
		title: 'Home',
		to: '/',
	},
	{
		title: 'Bots',
		to: '/bots',
	},
];
</script>

<template>
	<v-btn
		v-for="button in buttons"
		variant="outlined"
		:to="button.to"
	>
		{{ button.title }}
	</v-btn>
</template>

<style scoped lang="scss">

</style>
