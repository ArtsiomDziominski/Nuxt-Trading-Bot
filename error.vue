<template>
  <div class="error-page">
    <h1>{{ error.statusCode }}</h1>
  </div>
</template>

<script setup>

const handleError = () => {
</script>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}

button {
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 