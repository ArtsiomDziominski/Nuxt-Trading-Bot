<script setup lang="ts">

</script>

<template>
	<div class="profile">
		<v-card />
		<AccountProfile />
		<v-card />
	</div>
</template>

<style scoped lang="scss">
.profile {
  display: grid;
  grid-template-columns: 0.8fr 1.4fr 0.8fr;
  gap: 20px;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
