<template>
  <v-app class="mainContainer">
    <nav-header></nav-header>
    <v-main class="loginContainer">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import NavHeader from "@/components/nav-header.vue";

export default Vue.extend({
  name: 'App',
  components: {NavHeader},
  data: () => ({
    //
  }),
});
</script>
<style scoped>
v-app{
  font-family: "Roboto", sans-serif;
}
.mainContainer{
  width: 1185px;
}
.loginContainer{
  background-color: #f9fafb;
}

</style>
