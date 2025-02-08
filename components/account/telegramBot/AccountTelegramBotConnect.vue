<script setup lang="ts">
import QrcodeVue from 'qrcode.vue';
import { useTheme } from 'vuetify';
import { href } from '@/const/href';
import { userStore } from '~/store/user';

const theme = useTheme();
const { user } = userStore();

const backgroundQrCode = computed((): string => {
	return theme.current.value.dark ? 'rgb(33, 33, 33)' : '#fff';
});

const tgId = computed(() => user?.tgId);
const title = computed((): string => tgId.value ? 'account.telegramBot.connectedTitle' : 'account.telegramBot.connectTitle');
const description = computed((): string => tgId.value ? '' : 'account.telegramBot.connectDescription');
</script>

<template>
	<v-card>
		<v-card-title
			class="text-center"
			:class="{ 'text-green': tgId }"
		>
			{{ $t(title) }}
		</v-card-title>
		<v-card-text class="text-center d-none d-md-block">
			{{ $t(description, { name: href().telegramBotName }) }}
		</v-card-text>
		<v-card-item>
			<v-card
				elevation="2"
				class="mx-auto mb-6"
				max-width="400"
			>
				<v-card-text
					class="text-center"
				>
					<QrcodeVue
						class="d-none d-md-inline"
						:value="href().telegramBot"
						:size="260"
						foreground="#0088cc"
						:background="backgroundQrCode"
					/>
					<p class="ma-3 d-none d-md-block">
						{{ $t('account.telegramBot.connectToLinkBot') }}
					</p>
					<v-btn
						color="#0088cc"
						:href="href().telegramBot"
						target="_blank"
					>
						{{ href().telegramBotName }}
					</v-btn>
				</v-card-text>
			</v-card>
		</v-card-item>
	</v-card>
</template>

<style scoped lang="scss">

</style>
