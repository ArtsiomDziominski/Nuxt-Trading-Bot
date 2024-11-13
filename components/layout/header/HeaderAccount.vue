<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from '~/store/user';
import { headerMenuNavigation } from '~/const/headers';
import { wsStore } from '~/store/ws';

const storeWS = wsStore();
const storeUser = userStore();
const { user } = storeToRefs(storeUser);
const router = useRouter();

const menu = ref(false);

const logout = () => {
	storeWS.webSocketServerDisconnect();
	storeUser.deleteUserToken();
	router.push('/login');
};
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
						:subtitle="user?.mail"
						:title="user?.login"
					/>
				</v-list>

				<v-divider />

				<v-list>
					<v-list-item
						v-for="button in headerButtons"
						:key="button.title"
						class=" d-flex d-md-none"
					>
						<v-btn :to="button.to">
							{{ $t(button.title) }}
						</v-btn>
					</v-list-item>
					<v-list-item
						v-for="button in headerMenuNavigation"
						:key="button.title"
					>
						<v-btn :to="button.to">
							{{ $t(button.title) }}
						</v-btn>
					</v-list-item>
					<v-list-item>
						<v-btn
							color="red"
							@click="logout"
						>
							{{ $t('logout') }}
						</v-btn>
					</v-list-item>
				</v-list>
			</v-card>
		</v-menu>
	</div>
</template>

<style scoped lang="scss">

</style>
