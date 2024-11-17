<template>
	<div class="change-password">
		<v-card />
		<AccountChangePassword />
		<v-card />
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.change-password {
  display: grid;
  grid-template-columns: 0.8fr 1.4fr 0.8fr;
  gap: 20px;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
