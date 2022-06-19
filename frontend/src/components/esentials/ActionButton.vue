<template>
  <div class="action-button">
    <button
      @click.prevent="onClick"
      type="{{this.type}}"
      :disabled="this.isDisabled"
    >
      {{ this.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ActionButton',

  props: {
    type: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style scoped>
button {
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid lightgray;
  padding: 10px;
}

button:hover {
  background-color: #6768aa;
  color: white;
}
</style>
