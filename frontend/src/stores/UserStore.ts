import { defineStore } from "pinia";
import axios from "axios";
import config from "../../config";
import jwtDecode from "jwt-decode";

export const useUserStore = defineStore("user", {
  state() {
    const oldToken = localStorage.getItem("token");

    if (oldToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + oldToken;
    }
    return {
      token: oldToken,
      isLoggingIn: false,
      isRegistering: false,
      error: null,
      loginMessage: null,
      afterLoginRoute: null,
    };
  },

  getters: {
    isAuthenticated: (state) => state.token !== null,
    user: (state) => jwtDecode(state.token), // zde uchovavam data o uzivateli, posilam tokenem
    error: (state) => state.error,
    afterLoginRoute: (state) => state.afterLoginRoute,
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
        const { token, user } = response.data;
        this.token = token;
        const userId = user.id;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        localStorage.setItem("token", token);
        this.isLoggingIn = false;
      } catch (e) {
        console.error(e);
        this.error = "Cannot log in";
      }
    },
    async loadById(id) {
      try {
        const response = await axios.get(config.backendUrl + "/users/" + id);
        return response.data;
      } catch (error) {
        console.log(error);
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
      localStorage.removeItem("token");
    },

    clearError() {
      this.error = null;
    },
  },
});
