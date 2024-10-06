<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { botsStore } from '~/store/bots';

definePageMeta({
	middleware: 'auth',
});

const storeBots = botsStore();
const { activeBots, isLoadingActiveBots } = storeToRefs(storeBots);

onMounted(() => {
	storeBots.requestActiveBots();
});
</script>

<template>
	<div>
		<bots-actions-bar />
		<!--		<template " /> -->
		<loader-box v-if="isLoadingActiveBots" />
		<template v-else-if="!activeBots && activeBots.length">
			<bots-api-wrapper
				v-for="bot in activeBots"
				:key="bot.api.id"
				:bots="bot"
			/>
		</template>
		<div
			v-else
			class="empty"
		>
			<v-icon size="100">
				mdi-robot-off-outline
			</v-icon>
			<p>
				Нет активных ботов
			</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  gap: 30px;
  font-size: 40px;
}
</style>
