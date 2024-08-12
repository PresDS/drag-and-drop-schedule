<template>
  <div class="container">
    <TheHeader />
    <WeeklySchedule />
  </div>
</template>

<script>

import TheHeader from "./components/TheHeader.vue";
import WeeklySchedule from "./components/WeeklySchedule.vue";

export default {
  name: 'App',
  components: {
    TheHeader,
    WeeklySchedule,
  },

};
</script>

<style>
</style>
