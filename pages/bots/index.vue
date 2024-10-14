<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { botsStore } from '~/store/bots';

definePageMeta({
	middleware: 'auth',
});

const storeBots = botsStore();
const { activeBots } = storeToRefs(storeBots);

const loadingBots = ref(true);

onMounted(async () => {
	loadingBots.value = true;
	await storeBots.requestActiveBots();
	loadingBots.value = false;
});
</script>

<template>
	<div class="page-bots">
		<bots-actions-bar />
		<global-loading
			v-if="loadingBots"
			class="page-bots__loading"
		/>
		<template v-else-if="activeBots && activeBots.length">
			<bots-api-wrapper
				v-for="bot in activeBots"
				:key="bot.api.id"
				:bots="bot"
			/>
		</template>
		<div
			v-else
			class="page-bots__empty"
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
.page-bots {
  height: 100%;

  &__loading {
    display: flex;
  }

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 70vh;
    gap: 30px;
    font-size: 40px;
  }
}
</style>
