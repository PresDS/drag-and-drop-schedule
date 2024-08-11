<template>
  <div class="container">
    <TheHeader />

    <WeeklySchedule />
  </div>
</template>

<script>
// import dayjs from "dayjs";
import TheHeader from "./components/TheHeader.vue";
import WeeklySchedule from "./components/WeeklySchedule.vue";
// import Sandbox from "../sandbox/Sandbox.vue";

export default {
  name: 'App',
  components: {
    TheHeader,
    // Sandbox,
    WeeklySchedule,
  },

};
</script>

<style>
</style>
