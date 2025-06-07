<script setup lang="ts">
const balance = defineModel({
	type: Number,
	default: 0,
});
</script>

<template>
	<div
		class="create-bot-metrics-balance"
	>
		<span
			:title="String('metric')"
			class="text-grey"
		>
			{{ $t(`createBot.walletBalance`) }} (USDT):
		</span>
		<v-slider
			v-model="balance"
			min="100"
			max="3000"
			thumb-label="always"
			step="1"
			hide-details
			thumb-color="orange"
			track-fill-color="orange"
			tick-size="1px"
			:ripple="false"
			rounded="0"
		/>
	</div>
</template>

<style scoped lang="scss">
  .create-bot-metrics-balance {
      display: flex;
      flex-direction: row;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 30px 20px 10px 0;
  }
</style>
