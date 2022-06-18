<template>
  <div class="form">
    <form @submit="addPassagers">
      <div class="buttonPosition">
        <button type="submit" @click="addNewPassagerField">Add more</button>
      </div>
      <div v-for="n in 10" :key="n">
        <PassagerInput />
      </div>
      <SubmitButton type="submit" text="Make Reservation" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SubmitButton from '../components/esentials/SubmitButton.vue';
import PassagerInput from '../components/PassagerInput.vue';
import { mapStores } from 'pinia/dist/pinia';
import { useFlightStore } from '../stores/FlightStore';

export default defineComponent({
  name: 'PassagersForm',
  components: { SubmitButton, PassagerInput },
  data() {
    return {};
  },
  computed: {
    ...mapStores(useFlightStore),
  },
  methods: {
    addNewPassagerField() {
      this.flightStore.passagers.push();
    },

    async addPassagers(event: SubmitEvent) {
      event.preventDefault();
      try {
        console.log();
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
<style scoped>
.form {
  display: flex;
  justify-content: center;
  margin: 5px;
}

.buttonPosition {
  display: flex;
  justify-content: center;
  padding: 40px;
}
</style>
