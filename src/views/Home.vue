<template>
  <div class="home">
    <div class="nav">
      <div v-if="!$auth.loading">
        <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
        <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
      </div>
    </div>

    <VueTradingView
      class="tv"
      :options="{
        autosize: 'true',
        symbol: 'BINANCE:BTCUSDT',
        interval: '240',
        timezone: 'Europe/Paris',
        theme: 'dark',
        style: '1',
        locale: 'fr',
        withdateranges: 'true',
        hide_side_toolbar: 'false',
        allow_symbol_change: 'true',
        watchlist: ['BINANCE:AVAXUSDT'],
      }"
    />
  </div>
</template>

<script>
import VueTradingView from "vue-trading-view";

export default {
  name: "home",
  components: {
    VueTradingView,
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
}
.tv {
  height: 93%;
}
.nav {
  height: 7%;
}
</style>
