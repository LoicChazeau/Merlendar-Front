<template>
  <div class="height-100">
    <div class="nav">
      <div class="width-100">
        <img class="logo" src="../assets/logomerlendar.png" />
      </div>
      <div class="width-10">
        <button
          v-if="$auth.isAuthenticated"
          onclick="window.location.href='/calendar'"
          class="calendar height-100 width-100"
        >
          Calendar
        </button>
      </div>
      <div v-if="!$auth.loading" class="width-10">
        <button
          v-if="!$auth.isAuthenticated"
          @click="login"
          class="login height-100 width-100"
        >
          Log In
        </button>
        <button
          v-if="$auth.isAuthenticated"
          @click="logout"
          class="login height-100 width-100"
        >
          Log Out
        </button>
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
.tv {
  height: 93%;
}
.nav {
  height: 7%;
  background-color: #2a2e39;
  display: flex;
  flex-direction: row;
}
.logo {
  height: 100%;
  margin-left: 10%;
}
.login {
  background-color: #a173d2;
  border: none;
  color: white;
  text-align: center;
  font-size: 1.3vw;
  cursor: pointer;
  outline: none;
}
.login:hover {
  opacity: 0.9;
}
.calendar {
  background-color: #e77c76;
  border: none;
  color: white;
  text-align: center;
  font-size: 1.3vw;
  cursor: pointer;
  outline: none;
}
.calendar:hover {
  opacity: 0.9;
}
</style>
