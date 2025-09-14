<script setup lang="ts">

</script>

<template>
	<v-app>
		<div class="app">
			<LayoutHeader />
			<main class="page">
				<slot />
			</main>
			<LayoutFooter />
		</div>
	</v-app>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;

  .page {
    flex: 1;
    width: 100%;
    padding-top: 80px; // Account for fixed header

    @media screen and (max-width: 768px) {
      padding-top: 70px;
    }
  }
}
</style>
