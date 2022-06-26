<template>
  <div class="background">
    <div class="content">
      <Error v-if="flightStore.loginMessage" :text="flightStore.error" />
      <Headline text="FLIGHTS" />

      <div v-if="this.userStore.user.role === 'technician'">
        <div>
          <Action-button
            :text="buttonTitle"
            type="button"
            :onClick="showForm"
            :isDisabled="false"
          />
        </div>
        <div v-if="isFormShown">
          <NewFlightForm />
        </div>
      </div>

      <div v-if="flightStore.isLoading">Loading flights...</div>
      <div v-else-if="flightStore.flights.length === 0">No flights.</div>
      <div class="flight-dashboard" v-else>
        <div
          class="card"
          :key="flight.id"
          v-for="flight in flightStore.flights"
        >
          <div class="link">
            <router-link
              :to="{ name: 'flight-detail', params: { id: flight.flight_id } }"
            >
              <h3>Destination: {{ flight.destination }}</h3>
              <p>
                Departure at: <span>{{ flight.departure }}</span>
              </p>
              <p>
                Name: <span>{{ flight.name }}</span>
              </p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import { useFlightStore } from '../stores/FlightStore';
import { useUserStore } from '../stores/UserStore';
import Error from '../components/esentials/Error.vue';
import Headline from '../components/esentials/Headline.vue';
import ActionButton from '../components/esentials/ActionButton.vue';
import NewFlightForm from '../components/NewFlightForm.vue';

export default {
  name: 'Flights',
  components: { Error, Headline, ActionButton, NewFlightForm },
  data() {
    return {
      text: 'Flights',
      isFormShown: false,
    };
  },
  computed: {
    ...mapStores(useFlightStore, useUserStore),
    buttonTitle() {
      return this.isFormShown === true ? 'Cancel' : 'Add New Flight';
    },
  },
  created() {
    this.flightStore.loadAll();
  },
  methods: {
    showForm() {
      this.isFormShown === false
        ? (this.isFormShown = true)
        : (this.isFormShown = false);
    },
  },
};
</script>

<style scoped>
.background {
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1),
      rgba(0, 0, 255, 0.2)
    ),
    url('../img/stars.png');
}
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
  border: 1px solid rgb(226, 226, 226);
  cursor: pointer;
  transition: 0.5s;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
}

.card:hover {
  transform: scale(1.1);
}

.link {
  padding: 20px;
}

h3 {
  font-size: 18px;
  font-weight: 700;
  color: #cb97be;
}

p {
  font-size: 16px;
}

span {
  font-weight: 500;
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
