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
import { useUserStore } from "../stores/UserStore";
import { mapStores } from "pinia/dist/pinia";

export default defineComponent({
  name: "LoginForm",
  components: { Input, SubmitButton },
  data() {
    return {
      user: {
        nickname: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapStores(useUserStore),
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
      try {
        await this.userStore.login(this.user.nickname, this.user.password);
        if (!this.userStore.error) {
          this.$router.push(this.userStore.afterLoginRoute ?? { name: "home" });
        }
        this.userStore.setAfterLoginRoute(null);

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
