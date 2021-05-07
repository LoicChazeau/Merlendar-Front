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
      <p class="date my">{{ title }}</p>

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
            color="#a173d2"
            dark
            first-day-of-week="1"
          ></v-date-picker>
        </div>
        <div class="containerFlag width-100">
          <img
            :src="this.flag[this.random0].flag"
            class="imgFlag"
            v-if="this.correct === 0"
          />
          <img
            :src="this.flag[this.random1].flag"
            class="imgFlag"
            v-else-if="this.correct === 1"
          />
          <img
            :src="this.flag[this.random2].flag"
            class="imgFlag"
            v-else-if="this.correct === 2"
          />
          <div class="response">
            <p class="textFlag">
              • {{ this.flag[this.random0].translations.fr }}
            </p>
            <p class="textFlag">
              • {{ this.flag[this.random1].translations.fr }}
            </p>
            <p class="textFlag">
              • {{ this.flag[this.random2].translations.fr }}
            </p>
          </div>
        </div>
        <div class="rowx btnFlag width-100">
          <button class="responseBtn" @click="showResponse">Réponse</button>
          <button class="nextBtn" @click="nextFlag">Suivant</button>
        </div>
        <p class="textFlagResponse invisible" id="response0">
          ✔️ {{ this.flag[this.random0].translations.fr }}
        </p>
        <p class="textFlagResponse invisible" id="response1">
          ✔️ {{ this.flag[this.random1].translations.fr }}
        </p>
        <p class="textFlagResponse invisible" id="response2">
          ✔️ {{ this.flag[this.random2].translations.fr }}
        </p>
      </div>
      <div class="redLiney"></div>
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="#a173d2"
        :weekdays="weekday"
        :events="events"
        :event-color="getEventColor"
        :event-margin-bottom="3"
        :now="today"
        :type="type"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="setDialogDate"
        @change="updateRange"
        dark
        locale="fr"
        class="calendar"
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

import { db } from "@/main";

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
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      type: "month",
      types: ["month", "week", "day"],
      weekday: [1, 2, 3, 4, 5, 6, 0],
      name: null,
      details: null,
      start: null,
      end: null,
      color: "#1976D2", // default event color
      currentlyEditing: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      dialog: false,
      dialogDate: false,
      flag: "",
      random0: "",
      random1: "",
      random2: "",
      random3: "",
      correct: "",
    };
  },
  mounted() {
    this.getEvents();
    this.getFlag();
    this.correct = Math.floor(Math.random() * 3);
    this.random0 = Math.floor(Math.random() * 250);
    this.random1 = Math.floor(Math.random() * 250);
    this.random2 = Math.floor(Math.random() * 250);
  },
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }
      const startMonth = this.monthFormatter(start);
      const startYear = start.year;
      const startDay = start.day;
      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "day":
          return `${startDay} ${startMonth} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long",
      });
    },
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
    async getEvents() {
      let snapshot = await db.collection("calEvent").get();
      const events = [];
      snapshot.forEach((doc) => {
        let appData = doc.data();
        appData.id = doc.id;
        events.push(appData);
      });
      this.events = events;
    },
    setDialogDate({ date }) {
      this.dialogDate = true;
      this.focus = date;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
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
    async addEvent() {
      if (this.name && this.start && this.end) {
        await db.collection("calEvent").add({
          name: this.name,
          details: this.details,
          start: this.start,
          end: this.end,
          color: this.color,
        });
        this.getEvents();
        (this.name = ""),
          (this.details = ""),
          (this.start = ""),
          (this.end = ""),
          (this.color = "");
      } else {
        alert("You must enter event name, start, and end time");
      }
    },
    editEvent(ev) {
      this.currentlyEditing = ev.id;
    },
    async updateEvent(ev) {
      await db.collection("calEvent").doc(this.currentlyEditing).update({
        details: ev.details,
      });
      (this.selectedOpen = false), (this.currentlyEditing = null);
    },
    async deleteEvent(ev) {
      await db.collection("calEvent").doc(ev).delete();
      (this.selectedOpen = false), this.getEvents();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
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
      var response = document.getElementById("response" + this.correct);
      response.style.display = "block";
    },
    nextFlag() {
      var response = document.getElementById("response" + this.correct);
      response.style.display = "none";
      this.correct = Math.floor(Math.random() * 3);
      this.random0 = Math.floor(Math.random() * 250);
      this.random1 = Math.floor(Math.random() * 250);
      this.random2 = Math.floor(Math.random() * 250);
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
  width: 15%;
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
  height: 1px;
}
.redLiney {
  background-color: #e77c76;
  width: 1px;
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
  margin-bottom: 5%;
}
.textFlag {
  color: white;
  margin-top: 10%;
}
.textFlagResponse {
  color: #6FB672;
  margin-top: 10%;
}
.response {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.btnFlag {
  justify-content: space-evenly;
  margin-top: 10%;
}
.responseBtn {
  background-color: #6FB672;
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
  background-color: #3e779f;
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
