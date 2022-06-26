<template>
  <Headline text="NOTIFICATIONS" />

  <div class="content">
    <div class="notForm" v-if="whoCanSeeThis()">
      <ActionButton
        :text="buttonTitle"
        type="button"
        :onClick="showForm"
        :isDisabled="false"
      />
      <div v-if="isFormShown">
        <NewNotificationForm />
      </div>
    </div>

    <div class="notifications">
      <div
        v-for="notification in notificationStore.notifications"
        :key="notification.notification_id"
        class="notification"
      >
        <p>
          {{ notificationType(notification.type) }}
          {{ notification.title }}
        </p>
      </div>
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
    buttonTitle() {
      return this.isFormShown === true ? 'Cancel' : 'Add New Notification';
    },
  },

  methods: {
    showForm() {
      this.isFormShown === false
        ? (this.isFormShown = true)
        : (this.isFormShown = false);
    },
    notificationType(type) {
      if (type == 'success') return '🎉';
      else if (type === 'warning') return '❗️';
      else return '⚡️';
    },
    whoCanSeeThis() {
      if (
        this.userStore.user.role === 'secretary' ||
        this.userStore.user.role === 'technician' ||
        this.userStore.user.role === 'admin'
      )
        return true;
      else return false;
    },
  },
});
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5em;
}
.notForm {
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.notifications {
  display: flex;
  justify-content: left;
  flex-direction: column;
  gap: 10px;
}

p {
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 600;
}
</style>
