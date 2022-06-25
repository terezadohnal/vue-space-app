import { defineStore } from 'pinia';
import axios from 'axios';
import config from '../../config';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async loadAll(user_id) {
      try {
        this.isLoading = true;
        const response = await axios.get(
          config.backendUrl + '/notifications/' + user_id
        );
        this.notifications = response.data;
        this.error = null;
        this.isLoading = false;
      } catch (e) {
        this.error = 'Cannot download notifications!';
      }
    },
    async create(notification, user_id) {
      try {
        this.isLoading = true;
        const data = {
          ...notification,
          user_id,
        };
        const response = await axios.post(
          config.backendUrl + '/notifications',
          data
        );
        console.log(response);
        this.error = null;
        this.isLoading = false;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
