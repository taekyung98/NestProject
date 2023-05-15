<template>
  <v-container>
    <v-row class="text-center">
      <router-link to="login">login</router-link>
      <b-btn @click="logout">logout</b-btn>

    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Header extends Vue {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
</script>
