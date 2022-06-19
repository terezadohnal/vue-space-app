<template>
  <div class="inputs">
    <Input label="Name" type="text" :value="name" @input="setName" required />
    <Input
      label="Surname"
      type="text"
      :value="surname"
      @input="setSurname"
      required
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from '../components/esentials/Input.vue';

export default defineComponent({
  name: 'PassagerInput',
  components: { Input },
  props: {
    onNameChange: {
      type: Function,
      required: true,
    },
    onSurnameChange: {
      type: Function,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    setName(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.onNameChange(target.value);
    },

    setSurname(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.onSurnameChange(target.value);
    },
  },
});
</script>
<style scoped>
.inputs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  padding-bottom: 20px;
}
</style>
