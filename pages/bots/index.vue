<script setup lang="ts">
import {storeToRefs} from "pinia";
import {botsStore} from "~/store/bots";

definePageMeta({
	middleware: 'auth',
});

const storeBots = botsStore();
const { activeBots } = storeToRefs(storeBots);

onMounted(() => {
  storeBots.requestActiveBots();
})
</script>

<template>
  <div>
    <template v-if="activeBots && activeBots.length"></template>
    <bots-api-wrapper v-for="bot in activeBots" :key="bot.api.id" :bots="bot" />
  </div>
</template>

<style scoped lang="scss">

</style>
