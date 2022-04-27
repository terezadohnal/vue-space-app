<template>
  <div class="submit-button">
    <button type="{{this.type}}">
      {{ this.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ActionButton",

  props: {
    type: {
      type: String,
      required: false,
      default: "submit",
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
