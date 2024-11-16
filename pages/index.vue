<script setup lang="ts">
</script>

<template>
	<div class="page-main">
		<div class="main">
			<v-icon
				size="150"
				class="main__icon"
			>
				mdi-robot-happy-outline
			</v-icon>
			<h1 class="main__title">
				Эффективные боты для автоматизированной торговли криптовалютой
			</h1>
			<p class="main__subtitle">
				Торговые боты для криптовалюты автоматизируют сделки, снижая риски и повышая эффективность трейдинга. С их
				помощью трейдеры могут быстро и точно обрабатывать операции, что делает ботов полезным инструментом для всех
				участников рынка.
			</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
.page-main {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .main {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: repeat(2, min-content);
    align-items: center;
    max-width: 1000px;
    margin: auto;
    gap: 10px 40px;
    @media screen and (max-width: 768px) {
      gap: 10px 0;
    }

    &__icon {
      grid-area: 1/1/3/2;
      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    &__title {
      grid-area: 1/2/2/3;
    }

    &__subtitle {
      grid-area: 2/2/2/3;
    }
  }
}
</style>
