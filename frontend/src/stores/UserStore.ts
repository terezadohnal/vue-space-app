import { defineStore } from "pinia";
import axios from "axios";
import config from "../../config";
import jwtDecode from "jwt-decode";

export const useUserStore = defineStore("user", {
  state() {
    const oldToken = localStorage.getItem("token");
    // const userData = localStorage.getItem("user");
    const userData = {
      id: "",
      nickname: "",
      firstname: "",
      lastname: "",
      role: "",
      email: "",
    };

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
      user: null,
    };
  },

  getters: {
    isAuthenticated: (state) => state.token !== null,
    user: (state) => jwtDecode(state.token),
    error: (state) => state.error,
    afterLoginRoute: (state) => state.afterLoginRoute,
    // getUser: (state) => state.user,
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

        const userData = await this.getById(userId);

        this.user = userData;
        console.log(user);
        // this.user.id = userData.id;
        // this.user.nickname = userData.nickname;
        // this.user.firstname = userData.firstname;
        // this.user.lastname = userData.lastname;
        // this.user.role = userData.role;
        // this.user.email = userData.email;

        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        localStorage.setItem("token", token);
        // localStorage.setItem("user", JSON.stringify(user));
        this.isLoggingIn = false;
      } catch (e) {
        console.error(e);
        this.error = "Cannot log in";
      }
    },
    async getById(id) {
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
