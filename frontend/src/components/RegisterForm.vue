<template>
  <form @submit="registerUser">
    <label for="firstname">Firstname</label>
    <input type="text" v-model="user.firstname" id="firstname" required />
    <br />
    <label for="lastname">Lastname</label>
    <input type="text" v-model="user.lastname" id="lastname" required />
    <br />
    <label for="nickname">Nickname</label>
    <input type="text" v-model="user.nickname" id="nickname" required />
    <br />
    <label for="email">E-mail</label>
    <input type="email" v-model="user.email" id="email" />
    <br />
    <label for="password">Password</label>
    <input type="password" v-model="user.password" id="password" required />
    <br />
    <label for="passwordConf">Password confirmation</label>
    <input
      type="password"
      v-model="user.passwordConf"
      id="passwordConf"
      required
    />
    <br />
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import config from "../../config";

export default defineComponent({
  name: "RegisterForm",
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        nickname: "",
        email: "",
        password: "",
        passwordConf: "",
      },
    };
  },
  methods: {
    async registerUser(event: SubmitEvent) {
      event.preventDefault();

      try {
        const response = await axios.post(
          config.backendUrl + "/users/register",
          this.user
        );
        const { data } = response;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
