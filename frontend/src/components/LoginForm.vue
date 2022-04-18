<template>
  <div class="form">
    <form @submit="loginUser">
      <Input
        label="Nickname"
        type="text"
        :value="user.nickname"
        @input="setName"
        @change="setName"
        required
      />
      <Input
        label="Password"
        type="password"
        :value="user.password"
        @input="setPassword"
        @change="setPassword"
        required
      />
      <br />
      <!-- <div class="submit-button">
        <button>Submit</button>
      </div> -->
      <SubmitButton type="submit" text="Submit" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import config from "../../config";
import Input from "../components/esentials/Input.vue";
import SubmitButton from "../components/esentials/SubmitButton.vue";

export default defineComponent({
  components: { Input, SubmitButton },
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
    setName(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.user.nickname = target.value;
    },

    setPassword(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.user.password = target.value;
    },

    async loginUser(event: SubmitEvent) {
      event.preventDefault();

      console.log("user:", this.user);

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

<style scoped>
.form {
  display: flex;
  justify-content: center;
  margin: 5px;
}
</style>
