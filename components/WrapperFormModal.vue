<script setup lang="ts">
defineProps({
	title: String,
	maxWidth: {
		type: String,
		default: '500',
	},
});
</script>

<template>
	<v-dialog :max-width="maxWidth">
		<v-card
			class="pa-6"
			:title="title"
		>
			<v-form @click.prevent>
				<slot name="body" />

				<v-spacer />

				<div class="actions">
					<slot name="actions" />
				</div>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<style scoped lang="scss">
.actions {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-end;
}
</style>
