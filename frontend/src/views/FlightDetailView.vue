<template>
  <Headline :text="this.text" />
  <div v-if="this.flight" class="content">
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
      <div v-if="!this.isFlightReserved">
        <Action-button
          text="Create Reservation"
          type="button"
          :onClick="makeReservation"
        />
      </div>
      <div>
        <router-link :to="{ name: 'reservation', params: { id: this.id } }"
          >Add Passagers</router-link
        >
      </div>
      <br />
      <router-link :to="{ name: 'edit-flight', params: { id: this.id } }"
        >Edit Flight</router-link
      >

      <Action-button text="Delete flight" type="button" />
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import { useFlightStore } from '@/stores/FlightStore';
import { useUserStore } from '@/stores/UserStore';
import Headline from '../components/esentials/Headline.vue';
import ActionButton from '../components/esentials/ActionButton.vue';

export default {
  name: 'Flight detail',
  components: { Headline, ActionButton },
  data() {
    return {
      text: 'Flight Detail',
      reservation: 0,
    };
  },
  created() {
    this.flightStore.loadById(this.id);
    this.userStore.loadReservations();
  },
  computed: {
    ...mapStores(useFlightStore, useUserStore),
    id() {
      const id = parseInt(this.$route.params.id);
      return id;
    },
    flight() {
      const flight = this.flightStore.getById(this.id);
      return flight;
    },
    isFlightReserved() {
      const res = this.userStore.getReservationById(this.id) ? true : false;
      return res;
    },
  },

  methods: {
    async makeReservation() {
      try {
        const response = await this.flightStore.createReservation(
          this.userStore.user.id,
          this.id
        );
        this.userStore.addReservation(response[0].reservation_id, response[0]);
      } catch {
        this.flightStore.error = 'neco se pokazilo';
      }
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
