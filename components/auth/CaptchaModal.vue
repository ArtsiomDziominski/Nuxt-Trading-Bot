<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { authStore } from '~/store/auth';

const storeAuth = authStore();
const { captchaToken, pendingAuthData } = storeToRefs(storeAuth);

const router = useRouter();

const isModalOpen = ref(false);
const isProcessing = ref(false);

onMounted(() => {
	if (pendingAuthData.value) openModal();
});

watch(pendingAuthData, (newValue) => {
	if (newValue) openModal();
}, { immediate: true });

const openModal = () => {
	isModalOpen.value = true;
};

const closeModal = () => {
	isModalOpen.value = false;
	captchaToken.value = '';
	storeAuth.clearPendingAuthData();
};

const confirmCaptcha = async () => {
	if (!captchaToken.value) return;

	isProcessing.value = true;

	try {
		const success = await storeAuth.confirmCaptcha();
		if (success) {
			await router.push('/bots');
			closeModal();
		}
	}
	catch (error) {
		console.error('Ошибка подтверждения капчи:', error);
	}
	finally {
		isProcessing.value = false;
	}
};

defineExpose({
	openModal,
	closeModal,
});
</script>

<template>
	<v-dialog
		v-model="isModalOpen"
		max-width="500"
		persistent
	>
		<v-card>
			<v-card-title class="text-h5 text-center pa-6">
				{{ $t('captcha.title', 'Подтверждение безопасности') }}
			</v-card-title>

			<v-card-text class="text-center pa-6">
				<p class="mb-4">
					{{ $t('captcha.description', 'Для завершения входа необходимо подтвердить, что вы не робот') }}
				</p>

				<NuxtTurnstile
					v-model="captchaToken"
					class="d-flex justify-center"
				/>
			</v-card-text>

			<v-card-actions class="pa-6 pt-0">
				<v-spacer />
				<v-btn
					color="primary"
					:disabled="!captchaToken || isProcessing"
					:loading="isProcessing"
					@click="confirmCaptcha"
				>
					{{ $t('captcha.confirm', 'Подтвердить') }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<style scoped lang="scss">
.v-card {
  border-radius: 12px;
}
</style>
