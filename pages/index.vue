<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from '~/store/user';

const storeUser = userStore();
const { isAuthenticated } = storeToRefs(storeUser);
</script>

<template>
	<div class="page-main">
		<div class="main">
			<v-icon
				size="150"
				class="main__icon"
			>
				mdi-robot-happy-outline
			</v-icon>
			<h1 class="main__title">
				{{ $t('mainPage.title') }}
			</h1>
			<p class="main__subtitle">
				{{ $t('mainPage.subtitle') }}
			</p>
			<v-btn
				v-if="!isAuthenticated"
				class="main__login"
				to="/login"
			>
				{{ $t('singIn.title') }}
			</v-btn>
			<v-btn
				v-if="!isAuthenticated"
				class="main__reg"
				to="/signup"
			>
				{{ $t('singUp.title') }}
			</v-btn>
		</div>
		<div class="available-exchanges exchanges">
			<h2>
				{{ $t('mainPage.availableExchanges') }}
			</h2>
			<div
				class="exchanges-img"
			>
				<a
					href="https://www.binance.com/activity/referral-entry/CPA/together-v4?hl=ru&ref=CPA_008Y5VJ98Z"
					target="_blank"
				>
					<img
						src="~/assets/img/exchange/binance.svg"
						alt="binance"
					>
				</a>
			</div>
		</div>
		<div class="soon-exchanges exchanges">
			<h2>
				{{ $t('mainPage.soon') }}
			</h2>
			<div
				class="exchanges-img"
			>
				<img
					src="~/assets/img/exchange/bitget.svg"
					alt="bitget"
				>
				<img
					src="~/assets/img/exchange/bybit.svg"
					alt="bybit"
				>
				<img
					src="~/assets/img/exchange/gateio.svg"
					alt="gateio"
				>
				<img
					src="~/assets/img/exchange/huobi.svg"
					alt="huobi"
				>
				<img
					src="~/assets/img/exchange/krkn-logo.svg"
					alt="krkn"
				>
				<img
					src="~/assets/img/exchange/mexc.svg"
					alt="mexc"
				>
				<img
					src="~/assets/img/exchange/okx.svg"
					alt="okx"
				>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.page-main {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .main {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: repeat(2, min-content);
    align-items: center;
    align-content: center;
    max-width: 1000px;
    margin: auto;
    gap: 10px 40px;
    height: calc(100vh - 180px);
    min-height: 300px;

    @media screen and (max-width: 768px) {
      gap: 10px 0;
      height: 100%;
      min-height: 100%;
    }

    &__icon {
      grid-area: 1/1/3/2;
      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    &__title {
      grid-area: 1/2/2/3;
      word-break: break-all;
      @media screen and (max-width: 768px) {
        font-size: 36px;
      }
    }

    &__subtitle {
      grid-area: 2/2/2/3;
    }

    &__reg {
      grid-area: 3/2/4/3;
      width: 400px;
      margin-top: 10px;
      @media screen and (max-width: 768px) {
        grid-area: 5/2/6/3;
        width: 100%;
      }
    }

    &__login {
      grid-area: 3/1/4/1;
      margin-top: 10px;
      @media screen and (max-width: 768px) {
        grid-area: 4/2/5/3;
      }
    }
  }

  .exchanges {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;

    .exchanges-img {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 10px 40px;
      max-width: 1200px;
      width: 100%;

      img {
        max-width: 300px;
        @media screen and (max-width: 768px) {
          max-width: 100px;
        }
      }
    }
  }

  .available-exchanges {
    grid-area: 3/1/4/3;
  }

  .soon-exchanges {
    grid-area: 4/1/5/3;
  }
}
</style>
