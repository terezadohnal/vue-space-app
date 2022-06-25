<template>
  <div class="form">
    <form @submit="createNewNotification">
      <label for="type">Type</label>
      <select name="type" id="type" @change="setType">
        <option value="">Choose</option>
        <option value="success">Success</option>
        <option value="error">Error</option>
        <option value="warning">Warning</option>
      </select>

      <!-- <vSelect
        name="type"
        id="type"
        :value="notification.type"
        :options="['success', 'error', 'warning']"
        @input="setType"
        @change="setType"
      ></vSelect> -->
      <Input
        label="Title"
        type="text"
        :value="notification.title"
        @input="setTitle"
        @change="setTitle"
        required
      />

      <br />
      <SubmitButton type="submit" text="Submit" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from '../components/esentials/Input.vue';
import SubmitButton from '../components/esentials/SubmitButton.vue';
import { mapStores } from 'pinia/dist/pinia';
import { useUserStore } from '../stores/UserStore';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { useNotificationStore } from '../stores/NotificationStore';

export default defineComponent({
  name: 'NewNotificationForm',
  components: { Input, SubmitButton, vSelect },
  data() {
    return {
      notification: {
        title: '',
        type: '',
      },
    };
  },
  computed: {
    ...mapStores(useUserStore, useNotificationStore),
  },
  methods: {
    setTitle(event: Event) {
      const target = <HTMLInputElement>event.target;
      this.notification.title = target.value;
    },

    setType(event: Event) {
      const target = <HTMLSelectElement>event.target;
      this.notification.type = target.value;
    },

    createNewNotification(event: SubmitEvent) {
      event.preventDefault();
      try {
        this.notificationStore.create(
          this.notification,
          this.userStore.user.id
        );
        this.resetForm;
      } catch (error) {
        console.log(error);
      }
    },

    resetForm() {
      this.notification.title = '';
      this.notification.type = '';
    },
  },
});
</script>

<style scoped>
.form {
  display: flex;
  justify-content: center;
  margin: 5px;
}
</style>
