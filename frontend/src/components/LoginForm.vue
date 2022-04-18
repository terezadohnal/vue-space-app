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
      <div class="submit-button">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import config from "../../config";
import Input from "../components/esentials/Input.vue";

export default defineComponent({
  components: { Input },
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
      console.log(target.value);
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

.submit-button {
  display: flex;
  justify-content: center;
  margin: 15px;
}

button {
  font-size: 16px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 13px 20px 13px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

button:after {
  content: "";
  background-color: #ffe54c;
  width: 100%;
  z-index: -1;
  position: absolute;
  height: 100%;
  top: 7px;
  left: 7px;
  transition: 0.2s;
}

button:hover:after {
  top: 0px;
  left: 0px;
}

@media (min-width: 768px) {
  button {
    padding: 13px 50px 13px;
  }
}
</style>
