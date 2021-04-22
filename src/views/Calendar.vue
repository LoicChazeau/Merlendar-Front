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
      <a class="width-100 logo2" href="http://localhost:8080/">
        <img class="logo" src="../assets/logomerlendar.png" />
      </a>
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
};
</script>

<style scoped>
.nav {
  background-color: #43444e;
  height: 6%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.burger {
  display: flex;
  justify-content: start;
  position: relative;
  top: 25%;
  left: 1.5%;
}
rect {
  fill: white;
}
.logo {
  height: 100%;
  display: flex;
  margin-left: 3%;
}
</style>
