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
    <div>
      <h3>Passagers</h3>
      <div v-for="passager in flightStore.passagers" :key="passager.name">
        <p>{{ passager.name }} {{ passager.surname }}</p>
      </div>
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
        text="Departed"
        :onClick="() => setFlighStatus('departed')"
        :isDisabled="false"
        type="button"
      />

      <Action-button
        text="In Air"
        type="button"
        :onClick="() => setFlighStatus('inAir')"
        :isDisabled="false"
      />
      <Action-button
        text="Arrived"
        type="button"
        :onClick="() => setFlighStatus('arrived')"
        :isDisabled="false"
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
      numOfPassagers: 0,
      status: '',
    };
  },
  created() {
    this.flightStore.loadById(this.id);
    this.userStore.loadReservations();
    this.getNumOfPassagers(this.id);
    this.flightStore.loadPassagers(this.id);
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
        this.userStore.addReservation(response.reservation_id, response);
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

    setFlighStatus(status) {
      try {
        this.flightStore.setFlightStatus(
          status,
          this.id,
          this.userStore.user.id
        );
      } catch (e) {
        console.log(e);
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
