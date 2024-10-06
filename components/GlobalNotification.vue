<template>
	<v-container class="notifications">
		<v-alert
			v-for="(notification, index) in notifications"
			:key="index"
			v-model="notification.show"
			:type="notification.type"
			prominent
			elevation="5"
			dismissible
			@input="storeNotification.removeNotification(index)"
		>
			{{ notification.message }}
		</v-alert>
	</v-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { notificationStore } from '~/store/notification';

const storeNotification = notificationStore();
const { notifications } = storeToRefs(storeNotification);
</script>

<style scoped>
.notifications {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000000;
}
</style>
