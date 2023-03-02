import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "@/router";
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export interface State {
  isLogin: boolean;
  accessToken: string | null;
  userEmail: string | null;
  userPwd: string | null;
}

export default new Vuex.Store<State>({
  state: {
    userEmail: '',
    userPwd: '',
    accessToken: '',
    isLogin: false
  },
  getters: {
    getAccessToken: state => {
      return state.accessToken;
    },
    login: status => {
      return status.isLogin;
    },

  },
  mutations: {
    // memberId를 설정
    setMemberId(state, userEmail){
      state.userEmail = userEmail;
    },
    getAccessToken(state, accessToken){
      state.accessToken = accessToken;
    },
    reset(state){
      state.userEmail = '';
      state.accessToken = '';
    },
    login(state, { accessToken,userEmail, userPwd}){
      console.log(accessToken)
      state.userEmail = userEmail;
      state.userPwd = userPwd;
      state.accessToken = accessToken;
      state.isLogin = true;
    },
    logout(state){
      state.userEmail = '';
      state.userPwd = '';
      state.accessToken = '';
      state.isLogin = false;
    },
  },
  actions: {
    replaceUrl({ getters }, url: string) {
      if (getters.getAccessToken)
        return url.replace(/\[TOKEN]/gi, getters.getAccessToken);
      return url;
    },

     async login({commit,dispatch},payload ){
       try {
         const { redirectUrl } = payload;
         const { data } = await axios.post('api/user/login', payload);
         const { result, token: accessToken, userEmail } = data;

         // commit("login", { accessToken });
         if(result && data){
          commit('login',{
            accessToken,
            userEmail
          });
         }
         if (redirectUrl) {
           const url = await dispatch('replaceUrl', redirectUrl);
           window.location.href = `${url}`;
           return;
         }

         await router.push('/');
       }
       catch (e){
         console.log(e);
       }
     },

    async verify({ commit }) {
      try {
        const { data } = await Vue.axios({
          url: `/user/verify`,
          method: 'GET',
        });
        const { result, token,userEmail, userPwd } = data;
        if (result && token) {
          commit('login', {
            token,
            userEmail,
            userPwd,
          });
        } else if (!result) commit('logout');
        return { result };
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {
  },
  plugins: [
    persistedState({
      paths: ['accessToken']
    })
  ]
})
