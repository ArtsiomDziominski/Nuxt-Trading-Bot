<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from '~/store/user';

const storeUser = userStore();
const { user } = storeToRefs(storeUser);

const menu = ref(false);
</script>

<template>
	<div class="text-center">
		<v-menu
			v-model="menu"
			:close-on-content-click="false"
			location="bottom"
		>
			<template #activator="{ props }">
				<v-btn
					v-bind="props"
					icon=""
					border
				>
					{{ user?.login.slice(0, 2) }}
				</v-btn>
			</template>

			<v-card min-width="300">
				<v-list>
					<v-list-item
						prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
						:subtitle="user?.mail"
						:title="user?.login"
					/>
				</v-list>

				<v-divider />

				<v-list>
					<v-list-item>
						<v-btn>
							Api ключи
						</v-btn>
					</v-list-item>
				</v-list>
			</v-card>
		</v-menu>
	</div>
</template>

<style scoped lang="scss">

</style>
