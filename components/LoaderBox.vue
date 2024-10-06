<template>
	<div
		class="loader"
		:class="{ 'is-show': true, 'is-red': false }"
	>
		<div
			id="sq1"
			class="square"
		/>
		<div
			id="sq2"
			class="square"
		/>
		<div
			id="sq3"
			class="square"
		/>
		<div
			id="sq4"
			class="square"
		/>
		<div
			id="sq5"
			class="square"
		/>
		<div
			id="sq6"
			class="square"
		/>
		<div
			id="sq7"
			class="square"
		/>
		<div
			id="sq8"
			class="square"
		/>
		<div
			id="sq9"
			class="square"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	isRedColor: Boolean,
});
</script>

<style scoped lang="scss">
@keyframes loader_5191 {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: rgba(133, 203, 47, 0.2);
  backdrop-filter: blur(5px);
  transition: all 0.3s;
  opacity: 0;
  z-index: -1;

  &.is-show {
    opacity: 1;
    z-index: 1;
  }

  .square {
    background: green;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -5px;
    margin-left: -5px;
  }

  &.is-red {
    background-color: rgba(235, 68, 90, 0.2);

    .square {
      background: var(--red);
    }
  }

  #sq1 {
    margin-top: -25px;
    margin-left: -25px;
    animation: loader_5191 675ms ease-in-out 0s infinite alternate;
  }

  #sq2 {
    margin-top: -25px;
    animation: loader_5191 675ms ease-in-out 75ms infinite alternate;
  }

  #sq3 {
    margin-top: -25px;
    margin-left: 15px;
    animation: loader_5191 675ms ease-in-out 150ms infinite;
  }

  #sq4 {
    margin-left: -25px;
    animation: loader_5191 675ms ease-in-out 225ms infinite;
  }

  #sq5 {
    animation: loader_5191 675ms ease-in-out 300ms infinite;
  }

  #sq6 {
    margin-left: 15px;
    animation: loader_5191 675ms ease-in-out 375ms infinite;
  }

  #sq7 {
    margin-top: 15px;
    margin-left: -25px;
    animation: loader_5191 675ms ease-in-out 450ms infinite;
  }

  #sq8 {
    margin-top: 15px;
    animation: loader_5191 675ms ease-in-out 525ms infinite;
  }

  #sq9 {
    margin-top: 15px;
    margin-left: 15px;
    animation: loader_5191 675ms ease-in-out 600ms infinite;
  }
}
</style>
