import axios, { AxiosInstance } from "axios";
import Vue from "vue";
const baseURL = process.env.NODE_ENV === "development" ? "/api" : "/api";
axios.defaults.withCredentials = true;

const instance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300000,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    const { data } = response;
    Vue.$toast.open({
      message: data.message,
      type: "error",
      duration: 5000,
    });
    return response;
  }
);

export const ins = instance;
