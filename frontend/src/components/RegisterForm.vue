<template>
  <div class="form">
    <form @submit="registerUser">
      <Input
        label="First name"
        type="text"
        :value="user.firstname"
        @input="setFirstname"
        @change="setFirstname"
        required
      />
      <Input
        label="Last name"
        type="text"
        :value="user.lastname"
        @input="setLastname"
        @change="setLastname"
        required
      />
      <Input
        label="Nickname"
        type="text"
        :value="user.nickname"
        @input="setNickname"
        @change="setNickname"
        required
      />
      <Input
        label="E-mail"
        type="text"
        :value="user.email"
        @input="setEmail"
        @change="setEmail"
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
      <Input
        label="Password confirmation"
        type="password"
        :value="user.passwordConf"
        @input="setPasswordConf"
        @change="setPasswordConf"
        required
      />

      <br />
      <SubmitButton type="submit" text="Register" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Input from "../components/esentials/Input.vue";
import SubmitButton from "../components/esentials/SubmitButton.vue";
import { useUserStore } from "../stores/UserStore";
import { mapStores } from "pinia/dist/pinia";
import axios from "axios";
import config from "../../config";

export default defineComponent({
  name: "RegisterForm",
  components: { Input, SubmitButton },
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
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    setFirstname(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.user.firstname = target.value;
    },
    setLastname(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.user.lastname = target.value;
    },
    setNickname(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.user.nickname = target.value;
    },
    setEmail(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.user.email = target.value;
    },
    setPassword(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.user.password = target.value;
    },
    setPasswordConf(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.user.passwordConf = target.value;
    },
    async registerUser(event: SubmitEvent) {
      event.preventDefault();
      try {
        this.userStore.register(this.user);
        if (!this.userStore.error) {
          this.$router.push({ name: "login" });
        }
        this.resetForm();
      } catch (error) {
        console.log(error);
      }
    },

    resetForm() {
      this.user.firstname = "";
      this.user.lastname = "";
      this.user.nickname = "";
      this.user.email = "";
      this.user.password = "";
      this.user.passwordConf = "";
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
