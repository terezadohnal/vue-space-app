import { defineStore } from "pinia";
import axios from "axios";
import config from "../../config";
import jwtDecode from "jwt-decode";

export const useUserStore = defineStore("user", {
  state() {
    const oldToken = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

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
      id: userData?.id || null,
      nickname: userData?.nickname || null,
      firstname: userData?.firstname || null,
      lastname: userData?.lastname || null,
      role: userData?.role || null,
      email: userData?.email || null,
    };
  },

  getters: {
    isAuthenticated: (state) => state.token !== null,
    decodedToken: (state) => jwtDecode(state.token),
    error: (state) => state.error,
    afterLoginRoute: (state) => state.afterLoginRoute,
    user: (state) => ({
      id: state.id,
      nickname: state.nickname,
      firstname: state.firstname,
      lastname: state.lastname,
      role: state.role,
      email: state.email,
    }),
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

        console.log(response);

        const { token, user } = response.data;

        this.token = token;
        this.id = user.id;
        this.nickname = user.nickname;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.role = user.role;
        this.email = user.email;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
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
      localStorage.removeItem("token");
    },

    clearError() {
      this.error = null;
    },
  },
});
