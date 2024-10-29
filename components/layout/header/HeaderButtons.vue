<script setup lang="ts">
import { headerButtons } from '~/const/headers';
</script>

<template>
	<v-btn
		v-for="button in headerButtons"
		:key="button.to"
		variant="outlined"
		:to="button.to"
	>
		{{ $t(button.title) }}
	</v-btn>
</template>

<style scoped lang="scss">

</style>
