<template>
  <Headline :text="this.text" />
  <div v-if="this.flight" class="infoBar">
    <div class="barItem">
      <p>Status:</p>
      <p>{{ this.status }}</p>
    </div>

    <div class="barItem">
      <p>Capacity:</p>
      <p>{{ this.numOfPassagers + '/' + this.flight.seats }}</p>
    </div>
  </div>
  <div v-if="this.flight" class="content">
    <div class="info">
      <h3>INFO</h3>
      <div class="infoText">
        <p><span> NAME OF FLIGHT:</span> {{ this.flight.name }}</p>
      </div>
      <div class="infoText">
        <p><span>AIRCRAFT:</span> {{ this.flight.aircraft }}</p>
      </div>
      <div class="infoText">
        <p><span>COMPANY:</span> {{ this.flight.company }}</p>
      </div>
      <div class="infoText">
        <p><span>DEPARTURE:</span> {{ dateFormatter }}</p>
      </div>
      <div class="infoText">
        <p><span>DESTINATION:</span> {{ this.flight.destination }}</p>
      </div>
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
        :text="ButtonTitle"
        type="button"
        :onClick="makeReservation"
        :isDisabled="this.isFlightReserved"
      />
      <div v-if="this.numOfPassagers < this.flight.seats">
        <ActionButton
          text="Add Passagers"
          :onClick="goToPassagers"
          :isDisabled="!this.isFlightReserved"
          type="button"
        />
      </div>
      <div v-else class="noSeatsContainer">
        <p>❗️No more seats available❗️</p>
      </div>
    </div>

    <div v-if="this.userStore.user.role === 'technician'">
      <h3>Flight Status</h3>

      <ActionButton
        text="Departed"
        :onClick="() => setFlighStatus('Departed')"
        :isDisabled="this.status !== 'To be departed'"
        type="button"
      />

      <Action-button
        text="In Air"
        type="button"
        :onClick="() => setFlighStatus('In air')"
        :isDisabled="this.status !== 'Departed'"
      />
      <Action-button
        text="Arrived"
        type="button"
        :onClick="() => setFlighStatus('Arrived')"
        :isDisabled="this.status !== 'In air'"
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
import { format } from 'date-fns';

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
    this.getStatus(this.id);
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
    ButtonTitle() {
      return this.isFlightReserved ? 'Reserved' : 'Create Reservation';
    },
    dateFormatter() {
      return format(new Date(this.flight.departure), 'iii dd/MM/yy kk:mm');
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
        this.flightStore.loadPassagers(this.id);
        this.numOfPassagers++;
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
        name: 'passagers',
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
        this.status = status;
      } catch (e) {
        console.log(e);
      }
    },

    async getStatus(id) {
      const stat = await this.flightStore.getFlightStatus(id);
      if (stat.flight_status_text === 'To be departed') {
        this.status = 'To be departed 🔜';
      } else if (stat.flight_status_text === 'Departed') {
        this.status = 'Departed 🛫';
      } else if (stat.flight_status_text === 'In air') {
        this.status = 'In air 🚀';
      } else {
        this.status = 'Arrived 🛬';
      }
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-evenly;
}

h3 {
  font-size: 28px;
  color: #e0bad7;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding-bottom: 10px;
}

span {
  color: #439775;
  font-weight: 700;
}

p {
  font-size: 18px;
}

.infoText {
  padding-bottom: 10px;
}

.noSeatsContainer {
  border: 1px solid rgb(219, 219, 219);
  padding: 10px;
  background-color: #e0bad7;
  border-radius: 20px;
  margin-top: 10px;
}

.infoBar {
  width: 50%;
  margin: auto;
  margin-bottom: 15px;
  margin-top: 15px;
  display: flex;
  justify-content: space-evenly;
  padding: 5px;
  border-bottom: 1px solid rgb(219, 219, 219);
  border-top: 1px solid rgb(219, 219, 219);
}

.barItem {
  display: flex;
  gap: 15px;
}
</style>
