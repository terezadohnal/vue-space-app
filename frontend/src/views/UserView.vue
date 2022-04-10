<template>
  <main>
    <h1>User Profile</h1>
    <p>User's booking</p>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // type inference enabled
  props: {
    name: String,
  },
  data() {
    return {
      count: 1,
    };
  },
  mounted() {
    this.name; // type: string | undefined
    this.count; // type: number
  },
});
</script>
