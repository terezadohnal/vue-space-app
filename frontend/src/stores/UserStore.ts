import { defineStore } from "pinia";
import axios from "axios";
import config from "../../config";
import jwtDecode from "jwt-decode";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    isLoggingIn: false,
    isRegistering: false,
    error: null,
    loginMessage: null,
    afterLoginRoute: null,
  }),

  getters: {
    isAuthenticated: (state) => state.token !== null,
    user: (state) => jwtDecode(state.token),
  },

  actions: {
    async login(nickname, password) {
      try {
        this.isLoggingIn = true;
        const data = { nickname, password };
        const response = await axios.post(
          config.backendUrl + "/users/login",
          data
        );
        this.token = response.data.token;
        axios.defaults.headers.common["Authorization"] = "Bearer" + this.token; // globalne do celeho axiosu to prida token
        this.error = null;
        this.isLoggingIn = false;
      } catch (e) {
        console.error(e);
        this.error = "Cannot log in";
      }
    },

    async register(user) {
      try {
        this.isRegistering = true;
        const data = user;
        const response = await axios.post(
          config.backendUrl + "/users/register",
          data
        );
        this.error = null;
        this.isRegistering = false;
      } catch (e) {
        console.log(e);
        this.error = "Cannot register";
      }
    },

    setLoginMessage(message) {
      this.loginMessage = message;
    },

    setAfterLoginRoute(route) {
      this.afterLoginRoute = route;
    },

    logout() {
      this.token = null;
      delete axios.defaults.headers.common["Authorization"];
    },

    clearError() {
      this.error = null;
    },
  },
});
