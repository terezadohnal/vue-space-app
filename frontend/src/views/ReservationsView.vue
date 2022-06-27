<template>
  <Headline text="Reservations" />
  <div class="content">
    <div class="table">
      <h3>All Reservations</h3>
      <table>
        <tr>
          <th colspan="4">Name</th>
          <th colspan="4">Destination</th>
          <th colspan="5">At</th>
          <th colspan="8">Created By</th>
          <th colspan="3">Status</th>
        </tr>
        <tr
          v-for="reservation in this.reservations"
          :key="reservation.reservation_id"
        >
          <td colspan="4">{{ reservation.name }}</td>
          <td colspan="4">{{ reservation.destination }}</td>
          <td colspan="5">
            {{ format(new Date(reservation.departure), 'dd/MM/yy kk:mm') }}
          </td>

          <td colspan="8">
            {{ reservation.firstname + ' ' + reservation.lastname }}
          </td>
          <td colspan="3">
            <div class="status">{{ reservation.flight_status_text }}</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import { defineComponent } from 'vue';
import { useUserStore } from '../stores/UserStore';
import Headline from '../components/esentials/Headline.vue';
import { format } from 'date-fns';

export default defineComponent({
  name: 'ReservationView',
  components: { Headline },
  data() {
    return {
      reservations: [],
      format,
    };
  },

  created() {
    this.getReservations();
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    async getReservations() {
      this.reservations = await this.userStore.getAllReservations();
      console.log(this.reservations);
    },
  },
});
</script>
<style scoped>
.content {
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: 60px;
}
h3 {
  font-size: 28px;
  color: #e0bad7;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding-bottom: 10px;
  text-align: center;
  margin-bottom: 30px;
}

.status {
  background-color: #f3f9d2;
  color: #3d0b37;
  font-weight: 700;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  max-width: 140px;
}

table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 3px solid #6768aa;
  text-align: center;
  margin-bottom: 150px;
}

thead th:nth-child(1) {
  width: 30%;
}

thead th:nth-child(2) {
  width: 20%;
}

thead th:nth-child(3) {
  width: 15%;
}

thead th:nth-child(4) {
  width: 35%;
}

th,
td {
  padding: 20px;
  font-size: 18px;
}
.table {
  min-width: 800px;
  margin-top: 30px;
}

.buttons {
  display: flex;
  flex-direction: row;
}

tr {
  border-bottom: 1px solid rgb(216, 216, 216);
}

th {
  font-weight: 600;
}
</style>
