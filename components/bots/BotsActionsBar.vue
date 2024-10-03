<script setup lang="ts">
import {apiKeysStore} from "~/store/apiKeys";
import {storeToRefs} from "pinia";

const storeApiKeysStore = apiKeysStore();
const { isModalCreateApiKey } = storeToRefs(storeApiKeysStore);

const openCreateApiModal = (): void => {
  isModalCreateApiKey.value = true;
}
</script>

<template>
  <div class="bots-actions-bar">
    <v-card class="pa-3 bots-actions-bar__card" outlined>
      <v-icon color="green">mdi-robot</v-icon>
      <div>Активные</div>
    </v-card>

    <v-card class="pa-3 bots-actions-bar__card" outlined>
      <v-icon color="red">mdi-robot-off</v-icon>
      <div>Приостановленные</div>
    </v-card>

    <div class="bots-actions-bar__buttons">
      <v-btn color="primary" @click="createNewBot">
        <div class="bots-actions-bar__button">
          <v-icon left>mdi-plus</v-icon>
          Создать нового бота
        </div>
      </v-btn>

      <v-btn color="secondary" @click="openCreateApiModal">
        <div class="bots-actions-bar__button">
          <v-icon left>mdi-key</v-icon>
          Добавить API ключ
        </div>
      </v-btn>
    </div>

    <api-keys-create-modal />

  </div>
</template>

<style scoped lang="scss">
.bots-actions-bar {
  display: grid;
  grid-template-columns: min-content min-content 1fr;
  gap: 20px;

  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__card {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    width: 280px;
  }

  &__button {
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: center;
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 26px;
    align-items: center;
    justify-self: flex-end;
  }
}
</style>