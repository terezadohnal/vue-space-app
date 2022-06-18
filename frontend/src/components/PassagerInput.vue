<template>
  <div class="inputs">
    <Input
      label="Name"
      type="text"
      :value="passager.name"
      @input="setName"
      @change="setName"
      required
    />
    <Input
      label="Surname"
      type="text"
      :value="passager.surname"
      @input="setSurname"
      @change="setSurname"
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
  data() {
    return {
      passager: {
        name: '',
        surname: '',
      },
    };
  },
  computed: {},
  methods: {
    setName(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.passager.name = target.value;
    },

    setPassword(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.passager.surname = target.value;
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
