<script setup lang="ts">
defineProps({
	bots: {
		type: Object as PropType<BOTS.ActiveBots>,
		required: true,
	},
});
</script>

<template>
	<div class="api-wrapper">
		<div class="title">
			<p>{{ bots.api.name }}</p>
			<v-divider />
		</div>
		<div class="position-risk">
			<bots-action-card-style-second
				v-for="positionRisk in bots.positionsRisk"
				:key="positionRisk.positionRisk.symbol"
				:position="positionRisk"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.api-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    margin: 40px 0 20px 0
  }
}

.position-risk {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 60px;
}
</style>
