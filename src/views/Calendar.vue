<template>
  <div class="height-100">
    <div class="nav">
      <div class="burger">
        <svg viewBox="0 0 100 80" width="40" height="40">
          <rect width="80" height="10"></rect>
          <rect y="25" width="80" height="10"></rect>
          <rect y="50" width="80" height="10"></rect>
        </svg>
      </div>
      <img class="logo" @click="logo" src="../assets/logomerlendar.png" />
      <button class="btnToday my">Aujourd'hui</button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        class="my left"
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
      >
        <path
          d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
        />
      </svg>
      <p class="date my">Avril 2021</p>
    </div>

    <v-sheet height="94%">
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
export default {
  name: "calendar",
  methods: {
    logo() {
      window.location = "http://localhost:8080/";
    },
  },
};
</script>

<style scoped>
.nav {
  background-color: #43444e;
  height: 6%;
  display: flex;
  flex-direction: row;
}
.burger {
  position: relative;
  top: 25%;
  margin-left: 1.2%;
  margin-right: 1%;
}
rect {
  fill: white;
}
.logo {
  height: 100%;
}
.logo:hover {
  opacity: 0.9;
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
}
path {
  fill: white;
}
.left {
  margin-left: 4%;
}
.right {
  margin-left: 1.5%;
}
.date {
  color: white;
  font-size: 20px;
  margin-left: 1.2%;
}
</style>
