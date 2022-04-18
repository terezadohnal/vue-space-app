<template>
  <div class="content">
    <div class="headline">
      <h1>Login</h1>
    </div>
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "@/components/LoginForm.vue";

export default defineComponent({
  components: { LoginForm },
  name: "LoginView",
});
</script>

<style scoped>
.headline {
  display: flex;
  justify-content: center;
  padding: 2em;
}

h1 {
  font-size: 3em;
  text-transform: uppercase;
  letter-spacing: 0.5em;
}

.content {
  display: flex;
  flex-direction: column;
  padding-top: 5em;
}
</style>
