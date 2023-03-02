<template>
  <v-container class="mx-auto" min-width="100%" min-height="100vh">
    <v-card tile>
      <v-toolbar flat color="primary">
        <v-toolbar-title class="font-weight-bold"> 로그인 </v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent="submit">
        <v-container class="justify-center py-6 px-10">
          <div>
            <v-text-field
              v-model="userEmail"
              label="E-mail"
              required
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              v-model="userPwd"
              :counter="10"
              label="Pwd"
              required
            ></v-text-field>
          </div>
        </v-container>
        <v-container class="ml-6 mb-5">
          <v-btn
            class="ml-3"
            @click="submit"
          >
            submit
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class login extends Vue {
  userEmail:string;
  userPwd:string;
  redirectUrl: string | undefined = undefined;

  constructor() {
  super();
  this.userEmail = '';
  this.userPwd = '' ;
}

  async created() {
    const { getAccessToken } = this.$store.getters;
    const { url } = this.$route.query;
    this.redirectUrl = url as string;
    console.log(getAccessToken)

    if (getAccessToken) {
      try {
        const { result } = await this.$store.dispatch('verify');
        console.log(result)
        if (!result) {
          console.log( this.redirectUrl)
          if (this.redirectUrl) {
            const url = await this.$store.dispatch(
                'replaceUrl',
                this.redirectUrl,
            );
            window.location.href = url;
          } else {
            await new Promise(resolve => setTimeout(resolve, 3e2));
            await this.$router.push('/');
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

  }

  async submit() {
    if (this.userEmail === '') {
      return this.$toast.open({
        message: '아이디를 입력하세요.',
        type: 'error',
        duration: 5000,
      });
    }

    if (this.userPwd === '') {
      return this.$toast.open({
        message: '비밀번호를 입력하세요.',
        type: 'error',
        duration: 5000,
      });
    }

    try {
      const payload:{
        userEmail:string,
        userPwd:string,
        redirectUrl?: string;
      }={
        userEmail: this.userEmail,
        userPwd: this.userPwd,
      }
      if (this.redirectUrl) payload.redirectUrl = this.redirectUrl;
      await this.$store.dispatch('login',payload);
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped></style>
