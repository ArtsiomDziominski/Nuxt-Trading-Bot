<script setup lang="ts">

</script>

<template>
	<v-app>
		<div class="app">
			<LayoutHeader class="header" />
			<main class="page">
				<slot />
			</main>
			<LayoutFooter class="footer" />
		</div>
	</v-app>
</template>

<style scoped lang="scss">
.app {
  max-width: 1920px;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin: 64px 30px 0 30px;

  .page {
    margin: 50px 0 50px 0;
    min-height: calc(100vh - 280px);
  }
}
</style>
