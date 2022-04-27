<template>
  <div class="headline">
    <h1>{{ text }}</h1>
  </div>
</template>

<script>
export default {
  name: "Headline",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
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
</style>
