<template>
  <div class="error">
    {{ text }}
    <button @click="onHideClick">Hide</button>
  </div>
</template>

<script>
export default {
  name: "Error",

  props: {
    text: {
      type: String,
      required: true,
    },
  },

  methods: {
    onHideClick() {
      this.$emit("hide");
    },
  },
};
</script>

<style>
.error {
  background: lightcoral;
  color: rgb(129, 129, 129);
  padding: 2em;
  width: fit-content;
  margin-bottom: 1em;
}

.error button {
  background: transparent;
  border: none;
  color: rgb(129, 129, 129);
  font-weight: 600;
  cursor: pointer;
}

.error button:hover {
  text-decoration: underline;
}
</style>
