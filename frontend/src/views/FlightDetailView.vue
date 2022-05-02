<template>
  <Headline :text="this.text" />
  <div class="content">
    <div class="info">
      <h3>INFO</h3>
      <p>NAME OF FLIGHT: {{ this.flight.name }}</p>
      <p>AIRCRAFT: {{ this.flight.aircraft }}</p>
      <p>COMPANY: {{ this.flight.company }}</p>
      <p>DATE: {{ this.flight.date }}</p>
      <p>DEPARTURE: {{ this.flight.departure }}</p>
      <p>DESTINATION: {{ this.flight.destination }}</p>
      <p>NUM. OF SEATS: {{ this.flight.seats }}</p>
    </div>
    <div class="actions">
      <h3>ACTIONS</h3>
      <Action-button text="Make Reservation" />
      <Action-button text="Edit Flight" />
      <Action-button text="Delete flight" />
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia/dist/pinia";
import { useFlightStore } from "@/stores/FlightStore";
import Headline from "../components/esentials/Headline.vue";
import ActionButton from "../components/esentials/ActionButton.vue";

export default {
  name: "Flight detail",
  components: { Headline, ActionButton },
  data() {
    return {
      text: `Flight Detail`,
    };
  },
  created() {
    this.flightStore.loadById(this.id);
  },
  computed: {
    ...mapStores(useFlightStore),
    id() {
      return parseInt(this.$route.params.id);
    },

    flight() {
      return this.flightStore.getById(this.id);
    },
  },
};
</script>

<style>
.content {
  display: flex;
  justify-content: space-evenly;
}
</style>
