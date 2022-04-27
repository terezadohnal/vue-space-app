<template>
  <div class="content">
    <Warning v-if="userStore.loginMessage" :text="userStore.loginMessage" />
    <Headline :text="this.text" />
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "@/components/LoginForm.vue";
import { useUserStore } from "../stores/UserStore";
import { mapStores } from "pinia/dist/pinia";
import Warning from "../components/esentials/Warning.vue";
import Headline from "../components/esentials/Headline.vue";

export default defineComponent({
  components: { LoginForm, Warning, Headline },
  name: "LoginView",
  data() {
    return {
      text: "Login",
    };
  },
  computed: {
    ...mapStores(useUserStore),
  },
});
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5em;
}
</style>
