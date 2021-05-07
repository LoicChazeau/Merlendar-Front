<template>
  <div class="height-100">
    <div class="nav">
      <div class="burgerBtn1">
        <svg
          viewBox="0 0 100 80"
          width="40"
          height="40"
          @click="burger"
          class="burgerBtn2"
        >
          <rect width="80" height="10"></rect>
          <rect y="25" width="80" height="10"></rect>
          <rect y="50" width="80" height="10"></rect>
        </svg>
      </div>
      <img class="logo" @click="logo" src="../assets/logomerlendar.png" />
      <button class="btnToday my" @click="setToday">Aujourd'hui</button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        class="my left"
        @click="prev"
      >
        <path
          d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        class="my right"
        @click="next"
      >
        <path
          d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
        />
      </svg>
      <!-- <p class="date my">{{ $refs.calendar.title }}</p> -->

      <select v-model="type" class="type my arrow">
        <option value="day">Jour</option>
        <option value="week">Semaine</option>
        <option value="month">Mois</option>
      </select>

      <div class="navLogo my">
        <Tache />
        <Note />
        <Rappel />
        <Notification />
        <Settings />
      </div>
    </div>

    <div class="redLinex"></div>

    <v-sheet height="94%" class="rowx">
      <div class="burger width-20" id="burger">
        <div class="create">
          <div class="rowx createBtn">
            <img
              src="../assets/plus.png"
              alt="Button create event"
              class="imgCreateBtn"
            />
            <p class="textCreateBtn">Créer</p>
          </div>
        </div>
        <div class="width-100 picker">
          <v-date-picker
            readonly
            locale="fr"
            no-title
            color="#e77c76"
            dark
            first-day-of-week="1"
          ></v-date-picker>
        </div>
        <div class="containerFlag width-100">
          <img :src="this.flag[this.random].flag" class="imgFlag" />
          <p class="textFlag invisible" id="response">
            {{ this.flag[this.random].translations.fr }}
          </p>
        </div>
        <div class="rowx btnFlag width-100">
          <button class="responseBtn" @click="showResponse">Réponse</button>
          <button class="nextBtn" @click="nextFlag">Suivant</button>
        </div>
      </div>
      <div class="redLiney"></div>
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import Tache from "../components/Tache.vue";
import Note from "../components/Note.vue";
import Rappel from "../components/Rappel.vue";
import Notification from "../components/Notification.vue";
import Settings from "../components/Settings.vue";

export default {
  name: "calendar",
  components: {
    Tache,
    Note,
    Rappel,
    Notification,
    Settings,
  },
  data: () => {
    return {
      type: "month",
      types: ["month", "week", "day", "4day"],
      flag: "",
      random: "",
    };
  },
  mounted() {
    this.getFlag();
    this.random = Math.floor(Math.random() * 50);
  },
  methods: {
    logo() {
      window.location = "http://localhost:8080/";
    },
    burger() {
      var burger = document.getElementById("burger");
      if (burger.style.display === "none") {
        burger.style.display = "block";
      } else {
        burger.style.display = "none";
      }
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    getFlag() {
      var myHeaders = new Headers();
      myHeaders.append(
        "Cookie",
        "__cfduid=df2769b74e4b3be73f1888745f78eb5511620310028"
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("https://restcountries.eu/rest/v2/all", requestOptions)
        .then((response) => response.text())
        .then((result) => (this.flag = JSON.parse(result)))
        .catch((error) => console.log("error", error));
    },
    showResponse() {
      var response = document.getElementById("response");
      response.style.display = "block";
    },
    nextFlag() {
      var response = document.getElementById("response");
      response.style.display = "none";
      this.random = Math.floor(Math.random() * 250);
    },
  },
};
</script>

<style scoped>
.nav {
  background-color: #43444e;
  height: 60px;
  display: flex;
  /* flex-direction: row; */
}
.burgerBtn1 {
  position: relative;
  top: 25%;
  margin-left: 1.2%;
  margin-right: 1%;
}
.burgerBtn2:hover {
  opacity: 0.8;
  cursor: pointer;
}
.burger {
  background-color: #43444e;
  display: flex;
  flex-direction: column;
  align-items: center;
}
rect {
  fill: white;
}
.logo {
  height: 100%;
}
.logo:hover {
  opacity: 0.7;
  cursor: pointer;
}
.btnToday {
  background-color: #a173d2;
  color: white;
  padding: 0.45% 18px;
  font-size: 14px;
  border-radius: 5px;
  margin-left: 1.9%;
  outline: none;
}
.btnToday:hover {
  opacity: 0.9;
  cursor: pointer;
}
path {
  fill: white;
}
.left {
  margin-left: 5%;
  width: 2%;
}
.left:hover {
  opacity: 0.8;
  cursor: pointer;
}
.right {
  margin-left: 1%;
  width: 2%;
}
.right:hover {
  opacity: 0.8;
  cursor: pointer;
}
.date {
  color: white;
  font-size: 20px;
  width: 8%;
}
.type {
  background-color: #a173d2;
  color: white;
  padding-top: 0.45%;
  padding-bottom: 0.45%;
  padding-right: 1%;
  padding-left: 1%;
  font-size: 14px;
  text-align-last: center;
  border-radius: 5px;
  margin-left: 25%;
  outline: none;
  border: none;
}
.type:hover {
  opacity: 0.9;
  cursor: pointer;
}
.navLogo {
  margin-left: 5%;
  margin-right: 5%;
  width: 20%;
  display: flex;
  justify-content: space-between;
}
.redLinex {
  background-color: #e77c76;
  height: 0.1%;
}
.redLiney {
  background-color: #e77c76;
  width: 0.1%;
}
.create {
  background-color: #3e779f;
  border-radius: 18px;
  width: 110px;
  margin-top: 40px;
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.4);
  padding: 10px;
}
.create:hover {
  opacity: 0.8;
  cursor: pointer;
}
.createBtn {
  color: white;
  justify-content: space-evenly;
}
.textCreateBtn {
  font-size: 17px;
}
.imgCreateBtn {
  height: 100%;
}
.theme--dark.v-card {
  background-color: #43444e;
  color: #ffffff;
}
.picker {
  margin-top: 15%;
}
.containerFlag {
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.imgFlag {
  height: auto;
  width: 70%;
}
.textFlag {
  color: white;
  margin-top: 7%;
}
.btnFlag {
  justify-content: space-evenly;
  margin-top: 7%;
}
.responseBtn {
  background-color: #a173d2;
  color: white;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 5px;
  margin-left: 1.9%;
  outline: none;
}
.responseBtn:hover {
  opacity: 0.9;
}
.nextBtn {
  background-color: #a173d2;
  color: white;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 5px;
  margin-left: 1.9%;
  outline: none;
}
.nextBtn:hover {
  opacity: 0.9;
}
</style>
