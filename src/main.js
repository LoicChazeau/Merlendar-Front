import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { domain, clientId } from "../auth_config.json";
import { Auth0Plugin } from "./auth";
import "./assets/styles.css";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import VueTextareaAutosize from "vue-textarea-autosize";

Vue.use(VueTextareaAutosize);

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
});

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyDVa2J8zEeHuADUpzP4zG09zLMwEX4trUk",
  authDomain: "merlendar.firebaseapp.com",
  projectId: "merlendar",
  storageBucket: "merlendar.appspot.com",
  messagingSenderId: "735927001298",
  appId: "1:735927001298:web:118e4d4511e321084a0d0b",
  measurementId: "G-RZ16GTFB3K"
});

export const db = firebase.firestore();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
