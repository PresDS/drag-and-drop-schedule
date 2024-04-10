<template>
  <div class="container">
    <TheHeader />


    <Sandbox />
  </div>
</template>

<script>
// import dayjs from "dayjs";
import TheHeader from "./components/TheHeader.vue";
import Sandbox from "../sandbox/Sandbox.vue";

export default {
  name: 'App',
  components: {
    TheHeader,
    Sandbox,
  },

};
</script>

<style>
</style>
