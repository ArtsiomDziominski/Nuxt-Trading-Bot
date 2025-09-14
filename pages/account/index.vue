<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from '~/store/user';

const storeUser = userStore();
const { user } = storeToRefs(storeUser);
provide('user', user);
provide('requestSetUser', storeUser.requestSetUser);
</script>

<template>
	<div class="account-page">
		<div class="account-container">
			<div class="account-layout">
				<aside class="account-sidebar">
					<AccountNavigation />
				</aside>
				<main class="account-content">
					<NuxtPage />
				</main>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.account-page {
  min-height: 100vh;
  background: var(--gradient-background);
  padding: 40px 0;

  .account-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;

    @media screen and (max-width: 768px) {
      padding: 0 20px;
    }
  }

  .account-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 40px;
    min-height: calc(100vh - 160px);

    @media screen and (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .account-sidebar {
      .account-navigation {
        background: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        backdrop-filter: blur(10px);
        padding: 30px;
        position: sticky;
        top: 120px;

        @media screen and (max-width: 1024px) {
          position: static;
          top: auto;
        }
      }
    }

    .account-content {
      background: var(--surface-color);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      backdrop-filter: blur(10px);
      padding: 40px;
      min-height: 600px;

      @media screen and (max-width: 768px) {
        padding: 30px 20px;
      }
    }
  }
}
</style>
