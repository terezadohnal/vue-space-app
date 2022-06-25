<template>
  <Headline text="NOTIFICATIONS" />

  <div>
    <ActionButton
      text="Add new notification"
      type="button"
      :onClick="showForm"
      :isDisabled="false"
    />
  </div>
  <div v-if="isFormShown">
    <NewNotificationForm />
  </div>
  <div>
    <div
      v-for="notification in notificationStore.notifications"
      :key="notification.notification_id"
    >
      <p>
        {{ notification.type === 'success' ? '🎉' : '⚡️' }}
        {{ notification.title }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import { defineComponent } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { useNotificationStore } from '../stores/NotificationStore';
import Headline from '../components/esentials/Headline.vue';
import ActionButton from '../components/esentials/ActionButton.vue';
import NewNotificationForm from '../components/NewNotificationForm.vue';

export default defineComponent({
  name: 'Notifications',
  components: { Headline, ActionButton, NewNotificationForm },
  data() {
    return {
      text: 'Notifications',
      isFormShown: false,
    };
  },

  created() {
    this.notificationStore.loadAll(this.userStore.user.id);
  },

  computed: {
    ...mapStores(useUserStore, useNotificationStore),
  },

  methods: {
    showForm() {
      this.isFormShown === false
        ? (this.isFormShown = true)
        : (this.isFormShown = false);
    },
  },
});
</script>
