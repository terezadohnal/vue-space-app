<template>
  <!-- <div class="error">
    {{ this.text }}
    <button @click="$emit('hide')">Hide</button>
  </div> -->
  <div class="input">
    <label for="name">{{ label }}</label>
    <input
      :type="type"
      :name="name"
      :id="name"
      :value="value"
      @input="onInput"
      @change="onChange"
      :required="required"
    />
  </div>
</template>

<script>
export default {
  name: "Input",

  props: {
    // promenne z venku, neupravujeme
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    name() {
      return this.label.toLowerCase();
    },
  },
  methods: {
    onInput(event) {
      this.$emit("input", event);
    },
    onChange(event) {
      this.$emit("change", event);
    },
  },
};
</script>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  width: 16rem;
  margin-bottom: 10px;
}

input {
  background: transparent;
  border: none;
  border-bottom: 1px solid black;
  padding: 10px 10px 5px 3px;
}

input:focus {
  color: #6768aa;
  outline: none;
}
</style>
