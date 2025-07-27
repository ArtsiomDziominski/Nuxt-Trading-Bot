<template>
  <div>
    <h1>Test Page</h1>
    <p>Если вы видите эту страницу, значит приложение работает!</p>
    <p>Время: {{ currentTime }}</p>
  </div>
</template>

<script setup>
const currentTime = ref(new Date().toLocaleString())

onMounted(() => {
  console.log('Test page mounted successfully')
})
</script> 