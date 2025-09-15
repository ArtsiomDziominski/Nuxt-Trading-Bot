<script setup lang="ts">
interface Props {
	message: string;
	type: 'success' | 'info' | 'warning' | 'error';
	isVisible: boolean;
	duration?: number;
}

interface Emits {
	(e: 'close'): void;
}

const props = withDefaults(defineProps<Props>(), {
	duration: 3000,
});

const emit = defineEmits<Emits>();

const notificationRef = ref<HTMLElement>();

onMounted(() => {
	if (props.isVisible) {
		// Auto close after duration
		setTimeout(() => {
			emit('close');
		}, props.duration);
	}
});

const getIcon = () => {
	switch (props.type) {
		case 'success':
			return 'mdi-check-circle';
		case 'info':
			return 'mdi-information';
		case 'warning':
			return 'mdi-alert';
		case 'error':
			return 'mdi-alert-circle';
		default:
			return 'mdi-information';
	}
};

const getColor = () => {
	switch (props.type) {
		case 'success':
			return '#4caf50';
		case 'info':
			return '#2196f3';
		case 'warning':
			return '#ff9800';
		case 'error':
			return '#f44336';
		default:
			return '#2196f3';
	}
};
</script>

<template>
	<Transition name="notification">
		<div
			v-if="isVisible"
			ref="notificationRef"
			class="game-notification"
			:class="[`notification--${type}`]"
		>
			<div class="notification-content">
				<v-icon
					:color="getColor()"
					size="24"
					class="notification-icon"
				>
					{{ getIcon() }}
				</v-icon>
				<span class="notification-message">{{ message }}</span>
				<v-btn
					icon
					size="small"
					variant="text"
					@click="emit('close')"
				>
					<v-icon size="16">
						mdi-close
					</v-icon>
				</v-btn>
			</div>
		</div>
	</Transition>
</template>

<style scoped lang="scss">
.game-notification {
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 1001;
  background: var(--background-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 16px 20px;
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-primary);
  max-width: 400px;
  min-width: 300px;

  .notification-content {
    display: flex;
    align-items: center;
    gap: 12px;

    .notification-icon {
      flex-shrink: 0;
    }

    .notification-message {
      flex: 1;
      color: var(--text-primary);
      font-weight: 500;
      font-size: 0.9rem;
    }
  }

  &.notification--success {
    border-color: #4caf50;
    background: rgba(76, 175, 80, 0.1);
  }

  &.notification--info {
    border-color: #2196f3;
    background: rgba(33, 150, 243, 0.1);
  }

  &.notification--warning {
    border-color: #ff9800;
    background: rgba(255, 152, 0, 0.1);
  }

  &.notification--error {
    border-color: #f44336;
    background: rgba(244, 67, 54, 0.1);
  }
}

// Animations
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

// Responsive
@media screen and (max-width: 768px) {
  .game-notification {
    right: 10px;
    left: 10px;
    max-width: none;
    min-width: auto;
  }
}
</style>
