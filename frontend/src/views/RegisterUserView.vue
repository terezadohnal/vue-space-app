<template>
  <div class="content">
    <Headline :text="this.text" />
    <RegisterForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegisterForm from "@/components/RegisterForm.vue";
import Headline from "../components/esentials/Headline.vue";

export default defineComponent({
  components: { RegisterForm, Headline },
  name: "RegisterUserView",
  data() {
    return {
      text: "Registration",
    };
  },
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
