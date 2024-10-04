import { defineStore } from 'pinia';

interface Notification {
	type: 'success' | 'error' | 'info' | 'warning';
	message: string;
	show: boolean;
	id: number;
}

export const notificationStore = defineStore('notificationStore', () => {
	const notifications = ref<Notification[]>([]);

	const addNotification = (type: Notification['type'], message: string) => {
		const newNotification: Notification = {
			type,
			message,
			show: true,
			id: Math.random(),
		};
		notifications.value.unshift(newNotification);
		setTimeout(() => removeNotification(newNotification.id), 5000);
	};

	const removeNotification = (id: number) => {
		notifications.value = notifications.value.filter(noti => noti.id !== id);
	};
	return {
		notifications,
		addNotification,
		removeNotification,
	};
});
