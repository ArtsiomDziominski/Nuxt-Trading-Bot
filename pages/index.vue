<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userStore } from '~/store/user';

const storeUser = userStore();
const { isAuthenticated } = storeToRefs(storeUser);

const availableExchangesImg = [{ link: 'https://www.binance.com/activity/referral-entry/CPA/together-v4?hl=ru&ref=CPA_008Y5VJ98Z', img: 'binance' }];
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
		<ClientOnly>
			<div class="available-exchanges exchanges">
				<h2>
					{{ $t('mainPage.availableExchanges') }}
				</h2>
				<div class="exchanges__links">
					<a
						href="https://www.binance.com/activity/referral-entry/CPA/together-v4?hl=ru&ref=CPA_008Y5VJ98Z"
						target="_blank"
					>
						<img
							src="~/assets/img/exchanges/binance.svg"
							alt="binance"
						>
					</a>
				</div>
			</div>
		</ClientOnly>
		<ClientOnly>
			<div class="available-exchanges exchanges">
				<h2>
					{{ $t('mainPage.soon') }}
				</h2>
				<div class="exchanges__links">
					<a
						href="https://www.bitget.com/"
						target="_blank"
					>
						<img
							src="~/assets/img/exchanges/bitget.svg"
							alt="bitget"
						>
					</a>
					<a
						href="https://www.bybit.com/"
						target="_blank"
					>
						<img
							src="~/assets/img/exchanges/bybit.svg"
							alt="bybit"
						>
					</a>
					<a
						href="https://www.gate.io/"
						target="_blank"
					>
						<img
							src="~/assets/img/exchanges/gateio.svg"
							alt="gateio"
						>
					</a>
					<a
						href="https://www.htx.com.cm/invite/ru-ru/1f?invite_code=bnhg3223"
						target="_blank"
					>
						<img
							src="~/assets/img/exchanges/huobi.svg"
							alt="huobi"
						>
					</a>
					<a
						href="https://www.kraken.com"
						target="_blank"
					>
						<img
							src="~/assets/img/exchanges/krkn.svg"
							alt="krkn"
						>
					</a>
					<a
						href="https://www.kucoin.com"
						target="_blank"
					>
						<img
							src="~/assets/img/exchanges/kucoin.svg"
							alt="kucoin"
						>
					</a>
					<a
						href="https://www.mexc.com"
						target="_blank"
					>
						<img
							src="~/assets/img/exchanges/mexc.svg"
							alt="mexc"
						>
					</a>
					<a
						href="https://www.okx.com"
						target="_blank"
					>
						<img
							src="~/assets/img/exchanges/okx.svg"
							alt="okx"
						>
					</a>
				</div>
			</div>
		</ClientOnly>
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
    padding: 60px;
    @media screen and (max-width: 768px) {
      padding: 20px;
      text-align: center;
    }

    &__links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px 60px;
      max-width: 1200px;

      img {
        max-width: 300px;
        @media screen and (max-width: 768px) {
          max-width: 150px;
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
