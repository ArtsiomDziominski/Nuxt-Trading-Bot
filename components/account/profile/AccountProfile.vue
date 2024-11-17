<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from '~/store/user';

const storeUser = userStore();
const { user } = storeToRefs(storeUser);

const userInfo = computed(() => {
	return [
		{ title: 'account.profile.login', value: user.value?.login },
		{ title: 'account.profile.mail', value: user.value?.mail },
		{ title: 'account.profile.apiKeysLength', value: user.value?.apiKeys?.length || 0 },
		{ title: 'account.profile.subscribe', value: user.value?.untilSubscription || 'account.profile.notSubscribe' },
	];
});
</script>

<template>
	<v-card>
		<v-card-title class="text-center">
			{{ $t('account.profile.title') }}
		</v-card-title>
		<v-card-item>
			<div class="profile-card-items">
				<div
					v-for="info in userInfo"
					:key="info.title"
					class="profile-card-items__item"
				>
					<span class="text-grey">{{ $t(info.title) }}</span>
					<span>{{ $t(info.value) }}</span>
				</div>
			</div>
		</v-card-item>
	</v-card>
</template>

<style scoped lang="scss">
.profile-card-items {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__item {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
}
</style>
