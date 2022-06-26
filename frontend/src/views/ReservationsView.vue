<template>
  <Headline text="Reservations" />
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import { defineComponent } from 'vue';
import { useUserStore } from '../stores/UserStore';
import Headline from '../components/esentials/Headline.vue';

export default defineComponent({
  name: 'ReservationView',
  components: { Headline },
  data() {
    return {};
  },

  created() {
    this.userStore.getAllReservations();
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {},
});
</script>
<style scoped></style>
