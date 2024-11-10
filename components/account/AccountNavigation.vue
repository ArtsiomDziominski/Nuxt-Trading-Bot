<script setup lang="ts">
import { accountNavigation } from '~/const/headers';
</script>

<template>
	<v-layout
		class="overflow-visible"
		style="height: 56px;"
	>
		<v-bottom-navigation
			color="primary"
			active
		>
			<v-btn
				v-for="button in accountNavigation"
				:key="button.title"
				:to="button.to"
			>
				<v-icon>{{ button.icon }}</v-icon>

				<span>{{ $t(button.title) }}</span>
			</v-btn>
		</v-bottom-navigation>
	</v-layout>
</template>

<style scoped lang="scss">

</style>
