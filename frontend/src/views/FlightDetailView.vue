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
      <p>OCCUPACY: {{ this.numOfPassagers }}</p>
    </div>
    <div class="actions">
      <h3>ACTIONS</h3>
      <Action-button
        text="Create Reservation"
        type="button"
        :onClick="makeReservation"
        :isDisabled="this.isFlightReserved"
      />

      <ActionButton
        text="Add Passagers"
        :onClick="goToPassagers"
        :isDisabled="!this.isFlightReserved"
        type="button"
      />
      <ActionButton
        text="Edit Flight"
        :onClick="goToEditingPage"
        :isDisabled="true"
        type="button"
      />

      <Action-button
        text="Delete flight"
        type="button"
        :onClick="deleteFlight"
        :isDisabled="true"
      />
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
      // reservation_id: 0,
      numOfPassagers: 0,
    };
  },
  created() {
    this.flightStore.loadById(this.id);
    this.userStore.loadReservations();
    this.getNumOfPassagers(this.id);
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
    getReservationId() {
      const res = this.userStore.getReservationById(this.id);
      return res.reservation_id;
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
        // this.reservation_id = response[0].reservation_id;
      } catch {
        this.flightStore.error = 'neco se pokazilo';
      }
    },

    async getNumOfPassagers(id) {
      const res = await this.flightStore.getNumOfPassagers(id);
      this.numOfPassagers = res.num;
    },

    goToPassagers() {
      this.$router.push({
        name: 'reservations',
        params: { flight_id: this.id, reservation_id: this.getReservationId },
      });
    },

    goToEditingPage() {
      this.$router.push({ name: 'edit-flight', params: { id: this.id } });
    },
    deleteFlight() {},
  },
};
</script>

<style>
.content {
  display: flex;
  justify-content: space-evenly;
}
</style>
