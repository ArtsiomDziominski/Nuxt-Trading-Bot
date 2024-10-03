<script setup lang="ts">

</script>

<template>
	<v-dialog max-width="500">
		<v-card class="pa-6">
			<slot name="body" />

			<v-spacer />

			<template #actions>
				<slot name="actions" />
			</template>
		</v-card>
	</v-dialog>
</template>

<style scoped lang="scss">

</style>
