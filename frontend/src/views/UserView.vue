<template>
  <Headline text="Profile" />

  <div class="card">
    <h2>USER INFORMATION</h2>
    <p>Firstname: {{ userStore.user.firstname }}</p>
    <p>Lastname: {{ userStore.user.lastname }}</p>
    <p>Nickname: {{ userStore.user.nickname }}</p>
    <p>Role: {{ userStore.user.role }}</p>
    <p>Email: {{ userStore.user.email }}</p>
  </div>

  <div class="card">
    <h2>Reservations</h2>
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>To</th>
          <th>At</th>
          <th>Actions</th>
        </tr>
        <tr
          v-for="reservation in userStore.reservations"
          :key="reservation.reservation_id"
        >
          <td>{{ reservation.name }}</td>
          <td>{{ reservation.destination }}</td>
          <td>{{ reservation.departure }}</td>
          <td>
            <ActionButton
              text="Delete reservation"
              type="button"
              :onClick="() => deleteReservation(reservation.reservation_id)"
            />
            <ActionButton
              text="See detail"
              type="button"
              :onClick="seeDetail"
            />
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
import ActionButton from '../components/esentials/ActionButton.vue';

export default defineComponent({
  name: 'User Profile',
  components: { Headline, ActionButton },
  data() {
    return {
      text: 'Profile',
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
      this.userStore.deleteReservation(id);
    },
    seeDetail() {},
  },
});
</script>
