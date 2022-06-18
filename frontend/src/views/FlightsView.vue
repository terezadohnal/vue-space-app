<template>
  <div class="content">
    <Error v-if="flightStore.loginMessage" :text="flightStore.error" />
    <Headline text="FLIGHTS" />

    <div v-if="flightStore.isLoading">Loading flights...</div>
    <div v-else-if="flightStore.flights.length === 0">No flights.</div>
    <div class="flight-dashboard" v-else>
      <div class="card" :key="flight.id" v-for="flight in flightStore.flights">
        <div class="link">
          <router-link
            :to="{ name: 'flight-detail', params: { id: flight.flight_id } }"
          >
            <h3>Flight {{ flight.name }}</h3>
            <p>Departure at: {{ flight.departure }}</p>
            <p>Destination: {{ flight.destination }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import { useFlightStore } from '../stores/FlightStore';
import Error from '../components/esentials/Error.vue';
import Headline from '../components/esentials/Headline.vue';

export default {
  name: 'Flights',
  components: { Error, Headline },
  data() {
    return {
      text: 'Flights',
    };
  },
  computed: {
    ...mapStores(useFlightStore),
  },
  created() {
    this.flightStore.loadAll();
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 1020px;
  width: 100%;
  padding: 20px;
  margin: auto;
}

h1 {
  font-size: 3em;
  text-transform: uppercase;
  letter-spacing: 0.5em;
}

.card {
  border: 1px solid black;
  cursor: pointer;
  transition: 0.5s;
}

.card:hover {
  transform: scale(1.1);
}

.link {
  padding: 20px;
}

h3 {
  font-weight: 600;
}

.link a {
  text-decoration: none;
}

.flight-dashboard {
  margin-top: 3em;
  display: flex;
  gap: 12px;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}
</style>
