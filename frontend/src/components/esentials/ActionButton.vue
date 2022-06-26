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
.action-button {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
}
button {
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid lightgray;
  padding: 10px;
  width: fit-content;
  transition: all 0.5s ease-out;
  font-size: 16px;
  font-weight: 600;
}

button:hover {
  background-color: #6768aa;
  transform: scale(1.1);
  cursor: pointer;
  color: white;
}
</style>
