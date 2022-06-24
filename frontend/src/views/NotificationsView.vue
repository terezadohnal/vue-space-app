<template>
  <Headline text="NOTIFICATIONS" />

  <div>
    <div
      v-for="notification in notificationStore.notifications"
      :key="notification.notification_id"
    >
      <p>🤟🏼: {{ notification.type }}</p>
      <p>{{ notification.title }}</p>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import { defineComponent } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { useNotificationStore } from '../stores/NotificationStore';
import Headline from '../components/esentials/Headline.vue';

export default defineComponent({
  name: 'Notifications',
  components: { Headline },
  data() {
    return {
      text: 'Notifications',
    };
  },

  created() {
    this.notificationStore.loadAll(this.userStore.user.id);
  },

  computed: {
    ...mapStores(useUserStore, useNotificationStore),
  },

  methods: {},
});
</script>
