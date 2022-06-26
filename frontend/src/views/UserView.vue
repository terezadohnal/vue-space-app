<template>
  <Headline text="Profile" />

  <div class="body">
    <div class="content">
      <div class="upperContent">
        <div class="info">
          <h3>USER INFORMATION</h3>
          <div class="infoText">
            <p><span>Firstname:</span> {{ userStore.user.firstname }}</p>
          </div>
          <div class="infoText">
            <p><span>Lastname:</span> {{ userStore.user.lastname }}</p>
          </div>
          <div class="infoText">
            <p><span>Nickname:</span> {{ userStore.user.nickname }}</p>
          </div>
          <div class="infoText">
            <p><span>Role:</span> {{ userStore.user.role }}</p>
          </div>
          <div class="infoText">
            <p><span>Email:</span> {{ userStore.user.email }}</p>
          </div>
        </div>
        <div class="image">
          <img src="../img/My_universe.png" alt="My universe" />
        </div>
      </div>

      <div class="table">
        <h3>Your Reservations</h3>
        <table>
          <tr>
            <th colspan="4">Name</th>
            <th colspan="4">Destination</th>
            <th colspan="5">At</th>
            <th colspan="8">Actions</th>
            <th colspan="3">Status</th>
          </tr>
          <tr
            v-for="reservation in userStore.reservations"
            :key="reservation.reservation_id"
          >
            <td colspan="4">{{ reservation.name }}</td>
            <td colspan="4">{{ reservation.destination }}</td>
            <td colspan="5">
              {{ format(new Date(reservation.departure), 'dd/MM/yy kk:mm') }}
            </td>

            <td colspan="8">
              <div class="buttons">
                <ActionButton
                  text="See detail"
                  type="button"
                  :onClick="() => seeDetail(reservation.flight_id)"
                />
                <ActionButton
                  text="Delete reservation"
                  type="button"
                  :onClick="() => deleteReservation(reservation.reservation_id)"
                />
              </div>
            </td>
            <td colspan="3"><div class="status">Departed</div></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import { defineComponent } from 'vue';
import { useUserStore } from '../stores/UserStore';
import Headline from '../components/esentials/Headline.vue';
import ActionButton from '../components/esentials/ActionButton.vue';
import { format } from 'date-fns';

export default defineComponent({
  name: 'User Profile',
  components: { Headline, ActionButton },
  data() {
    return {
      text: 'Profile',
      format,
    };
  },

  created() {
    this.userStore.loadReservations();
  },

  computed: {
    ...mapStores(useUserStore),
    id() {
      return parseInt(this.$route.params.id);
    },
  },

  methods: {
    deleteReservation(id) {
      this.userStore.deleteReservation(id, this.id);
    },
    seeDetail(id) {
      this.$router.push({ name: 'flight-detail', params: { id } });
    },
  },
});
</script>
<style scoped>
.body {
  height: 100vh;
}

h3 {
  font-size: 28px;
  color: #e0bad7;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding-bottom: 10px;
  text-align: center;
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

.content {
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: 60px;
}

.upperContent {
  display: flex;
  justify-content: center;
}

.image {
  width: 50%;
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
