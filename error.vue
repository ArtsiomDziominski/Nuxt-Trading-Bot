<template>
	<div class="error-page">
		<div class="error-content">
			<h1>{{ error.statusCode }}</h1>
			<h2>{{ error.statusMessage }}</h2>
			<p>{{ error.message || 'Что-то пошло не так' }}</p>
			<button @click="handleError">
				Вернуться на главную
			</button>
		</div>
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
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
}

.error-content {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
  font-size: 4rem;
  color: #e74c3c;
  margin: 0;
}

h2 {
  color: #2c3e50;
  margin: 1rem 0;
}

button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background: #2980b9;
}
</style>
