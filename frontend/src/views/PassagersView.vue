<template>
  <div v-if="this.flight" class="content">
    <Headline :text="this.text" />
    <div class="description">
      <p>You can add more passagers to your reservation</p>
    </div>
    <PassagersForm
      :flight_id="this.flight_id"
      :reservation_id="this.reservation_id"
      :maxSeats="this.flight.seats - this.numOfPassagers"
    />
  </div>
</template>

<script>
import PassagersForm from '../components/PassagersForm.vue';
import Headline from '../components/esentials/Headline.vue';
import { useFlightStore } from '../stores/FlightStore';
import { useUserStore } from '../stores/UserStore';
import { mapStores } from 'pinia/dist/pinia';

export default {
  name: 'PassagersView',
  components: {
    PassagersForm,
    Headline,
  },
  data() {
    return {
      text: 'Passagers Detail',
      reservation: 0,
      numOfPassagers: 0,
    };
  },
  created() {
    this.flightStore.loadById(this.flight_id);
    this.userStore.loadReservations();
    this.getNumOfPassagers(this.flight_id);
  },
  computed: {
    ...mapStores(useFlightStore, useUserStore),
    flight_id() {
      const queryId = this.$route.params.flight_id;
      const id = typeof queryId === 'string' ? parseInt(queryId) : 0;
      return id;
    },
    reservation_id() {
      const queryId = this.$route.params.reservation_id;
      const id = typeof queryId === 'string' ? parseInt(queryId) : 0;
      return id;
    },
    flight() {
      const flight = this.flightStore.getById(this.flight_id);
      return flight;
    },
  },

  methods: {
    async getNumOfPassagers(id) {
      const res = await this.flightStore.getNumOfPassagers(id);
      console.log(res.num);
      this.numOfPassagers = res.num;
    },
  },
};
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.description {
  display: flex;
  justify-content: center;
}
</style>
