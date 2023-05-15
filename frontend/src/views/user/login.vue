<template>
  <v-container class="mx-auto loginContainer" min-width="100%" min-height="100vh">
    <v-card  class="text-center py-16 rounded-xl"  >
      <v-card-title  class="font-weight-bold justify-center"> 로그인 </v-card-title>
      <v-form @submit.prevent="submit">
        <v-container class="justify-center py-6 px-16">
          <div>
            <v-text-field
              v-model="userId"
              label="ID"
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
          <v-btn
              elevation="0"
              @click="submit"
              class="submitBtn mt-7"
          >
            submitS
          </v-btn>
        </v-container>
       <div>
         <div class="d-flex justify-center moveToLink">
           <router-link class="chgIdLink" to="/sign-up"> 아이디 찾기</router-link>
           <div>|</div>
           <router-link class="chgPwdLink" to="/sign-up"> 비밀번호 찾기</router-link>
           <div>|</div>
           <router-link class="signLink" to="/sign-up"> 회원가입 </router-link>
         </div>
       </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class login extends Vue {
  userId:string;
  userPwd:string;
  redirectUrl: string | undefined = undefined;

  constructor() {
  super();
  this.userId = '';
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
    if (this.userId === '') {
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
        userId:string,
        userPwd:string,
        redirectUrl?: string;
      }={
        userId: this.userId,
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

<style scoped>
.loginContainer{
  min-height: 850px;
  align-items: center;
  padding: 160px 0;
  width:600px;
}

.submitBtn{
  width: 100%;
}

.moveToLink{
  gap: 10px;
  padding: 16px;
}

.chgIdLink{
  text-decoration-line: none;
  color:black;
}

.chgPwdLink{
  text-decoration-line: none;
  color:black;
}

.signLink{
  text-decoration-line: none;
  color:black;
}

</style>
