<template>
  <div class="form">
    <form @submit="createNewFlight">
      <Input
        label="Name"
        type="text"
        :value="flight.name"
        @input="setName"
        @change="setName"
        required
      />
      <Input
        label="Aircraft"
        type="text"
        :value="flight.aircraft"
        @input="setAircraft"
        @change="setAircraft"
        required
      />
      <Input
        label="Company"
        type="text"
        :value="flight.company"
        @input="setCompany"
        @change="setCompany"
        required
      />

      <Input
        label="Departure"
        type="datetime-local"
        :value="flight.departure"
        @input="setDeparture"
        @change="setDeparture"
        required
      />
      <Input
        label="Destination"
        type="text"
        :value="flight.destination"
        @input="setDestination"
        @change="setDestination"
        required
      />
      <Input
        label="Seats Available"
        type="number"
        :value="flight.seats.toString()"
        @input="setSeats"
        @change="setSeats"
        required
      />
      <br />
      <SubmitButton type="submit" text="Submit" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from '../components/esentials/Input.vue';
import SubmitButton from '../components/esentials/SubmitButton.vue';
import { mapStores } from 'pinia/dist/pinia';
import { useFlightStore } from '../stores/FlightStore';
import { useUserStore } from '../stores/UserStore';

export default defineComponent({
  name: 'NewFlightForm',
  components: { Input, SubmitButton },
  data() {
    return {
      flight: {
        name: '',
        aircraft: '',
        company: '',
        departure: '',
        destination: '',
        seats: 0,
      },
    };
  },
  computed: {
    ...mapStores(useFlightStore, useUserStore),
  },
  methods: {
    setName(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.flight.name = target.value;
    },

    setAircraft(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.flight.aircraft = target.value;
    },
    setCompany(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.flight.company = target.value;
    },
    setDeparture(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.flight.departure = target.value;
    },
    setDestination(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.flight.destination = target.value;
    },
    setSeats(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.flight.seats = Number(target.value);
    },

    createNewFlight(event: SubmitEvent) {
      event.preventDefault();
      try {
        this.flightStore.createFlight(this.flight, this.userStore.user.id);

        this.resetForm();
      } catch (error) {
        console.log(error);
      }
    },

    resetForm() {
      this.flight.name = '';
      this.flight.aircraft = '';
      this.flight.company = '';
      this.flight.departure = '';
      this.flight.destination = '';
      this.flight.seats = 0;
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
</style>
