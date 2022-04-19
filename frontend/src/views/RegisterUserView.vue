<template>
  <div class="content">
    <div class="headline">
      <h1>Registration</h1>
    </div>
    <RegisterForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegisterForm from "@/components/RegisterForm.vue";

export default defineComponent({
  components: { RegisterForm },
  name: "RegisterUserView",
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
  padding-top: 2em;
}
</style>
