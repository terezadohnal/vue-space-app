<template>
  <div class="warning">
    {{ text }}
    <button @click="onHideClick">Hide</button>
  </div>
</template>

<script>
export default {
  name: "Warning",

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
.warning {
  background: lightgoldenrodyellow;
  color: rgb(129, 129, 129);
  padding: 2em;
  width: fit-content;
  margin-bottom: 1em;
}

.warning button {
  background: transparent;
  border: none;
  color: rgb(129, 129, 129);
  font-weight: 600;
  cursor: pointer;
}

.warning button:hover {
  text-decoration: underline;
}
</style>
