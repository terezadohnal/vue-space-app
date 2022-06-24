<template></template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Notifications',
  data() {
    return {
      text: 'Notifications',
    };
  },

  created() {
    // this.userStore.loadReservations();
  },

  computed: {},

  methods: {},
});
</script>
