<template>
  <div>
    <h1>Главная страница</h1>
    <p>Добро пожаловать в Trading Bot</p>
    <p>Статус аутентификации: {{ isAuthenticated ? 'Авторизован' : 'Не авторизован' }}</p>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { userStore } from '~/store/user';

const storeUser = userStore();
const { isAuthenticated } = storeToRefs(storeUser);
</script> 