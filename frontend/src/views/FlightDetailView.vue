<template>
  <Headline :text="this.text" />
  <div class="content">
    <div class="info">
      <h3>INFO</h3>
      <p>{{ this.flight.name }}</p>
      <p>{{ this.flight.aircraft }}</p>
      <p>{{ this.flight.departure }}</p>
      <p>{{ this.flight.destination }}</p>
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
      text: `Flight no. ${this.id}`,
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
