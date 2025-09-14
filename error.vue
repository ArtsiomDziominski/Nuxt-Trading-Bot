<template>
	<div class="error-page">
		<h1>{{ error.statusCode }}</h1>
		<p>{{ error.message || 'Что-то пошло не так' }}</p>
		<button @click="handleError">
			На главную
		</button>
	</div>
</template>

<script setup>
const error = useError();

const handleError = () => {
	clearError({ redirect: '/' });
};
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
