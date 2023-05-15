<template>
  <div>
    <v-toolbar
        :elevation="0"
        color="transparent"
        class="nav"
    >
      <v-toolbar-title>JIDO</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn color="transparent" :elevation="0" variant="text" @click="login">login</v-btn>
        <v-btn color="transparent"  :elevation="0" variant="text" @click="logout">logout</v-btn>
    </v-toolbar>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class navHeader extends Vue {

  logout() {
    this.$store.dispatch('logout');
    this.$router.push('/');
  }

  login() {
    this.$router.push('/login');
  }


}
</script>

<style scoped>
.nav{
padding: 0px 60px;
}
</style>