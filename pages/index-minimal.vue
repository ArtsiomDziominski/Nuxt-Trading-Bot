<template>
  <div>
    <h1>Minimal Test Page</h1>
    <p>This is a minimal test page to check if the app works on Vercel</p>
    <p>Current time: {{ currentTime }}</p>
  </div>
</template>

<script setup>
const currentTime = ref(new Date().toLocaleString())

onMounted(() => {
  console.log('Minimal page mounted')
})
</script> 