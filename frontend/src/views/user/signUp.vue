<template>
  <v-container class="mx-auto signUpContainer" min-width="100%" min-height="100vh">
    <v-card  class="text-center py-16 rounded-xl"  >
      <v-card-title  class="font-weight-bold justify-center"> 회원가입 </v-card-title>
      <v-form @submit.prevent="submit">
        <v-container class="justify-center py-6 px-10">
          <div>
            <v-text-field
                v-model="userInfo.userId"
                :counter="10"
                label="ID"
                required
            ></v-text-field>
          </div>
          <div>
            <v-text-field
                v-model="userInfo.userPwd"
                :counter="10"
                label="Pwd"
                required
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              v-model="userInfo.userName"
              :counter="10"
              label="UserName"
              required
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              v-model="userInfo.userEmail"
              label="E-mail"
              required
            ></v-text-field>
          </div>
          <div>
           <vue-daum-postcode/>
          </div>
        </v-container>
        <v-container class="ml-6 mb-5">
          <v-btn type="submit" @click="clear"> clear </v-btn>
          <v-btn
            class="ml-3"
            @click="submit"
            :class="`${formSubmit ? 'form-submit1' : 'form-submit2'}`"
            :disabled="!formSubmit"
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


@Component({
  components: {}
})
export default class signUp extends Vue {
  $refs!: {
    userName: HTMLFormElement;
    userEmail: HTMLFormElement;
    userPwd: HTMLFormElement;
  };

  private userInfo: {
    userName: string;
    userEmail: string;
    userPwd: string;    userId: string;
  } = {
    userName: "",
    userEmail: "",
    userPwd: "",   userId: "",
  };

  clear() {
    this.userInfo.userName = "";
    this.userInfo.userEmail = "";
    this.userInfo.userPwd = ""; this.userInfo.userId = "";
  }

  get formSubmit() {
    return (
      this.userInfo.userName !== "" &&
      this.userInfo.userEmail !== "" &&
      this.userInfo.userPwd !== ""&&
      this.userInfo.userId !== ""
    );
  }

  async submit() {
    try {
      const { data } = await this.axios({
        url: "user/sign-up",
        method: "post",
        data: this.userInfo,
      });
      console.log(data);
      const { result } = data;
      if (result) {
        this.$toast.open({
          message: "회원가입이 완료되었습니다.",
          type: "success",
          duration: 5000,
        });
        await this.$router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style scoped>
.signUpContainer{
  min-height: 850px;
  align-items: center;
  padding: 160px 0;
  width:600px;
}

</style>
