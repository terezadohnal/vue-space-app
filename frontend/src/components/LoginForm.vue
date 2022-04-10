<template>
  <form @submit="loginUser">
    <label for="nickname">Nickname</label>
    <input type="text" v-model="user.nickname" id="nickname" required />
    <br />

    <label for="password">Password</label>
    <input type="password" v-model="user.password" id="password" required />

    <br />
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import config from "../../config";

export default defineComponent({
  name: "LoginForm",
  data() {
    return {
      user: {
        nickname: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser(event: SubmitEvent) {
      event.preventDefault();

      try {
        const response = await axios.post(
          config.backendUrl + "/users/login",
          this.user
        );
        const { data } = response;

        this.resetForm();
      } catch (error) {
        console.log(error);
      }
    },

    resetForm() {
      this.user.nickname = "";
      this.user.password = "";
    },
  },
});
</script>
