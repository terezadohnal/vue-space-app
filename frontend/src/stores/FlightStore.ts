import { defineStore } from 'pinia';
import axios from 'axios';
import config from '../../config';
import jwtDecode from 'jwt-decode';

export const useFlightStore = defineStore('flight', {
  state: () => ({
    flights: [],
    isLoading: true,
    error: null,
  }),

  getters: {
    getById: (state) => (id) => {
      const existingFlight = state.flights.find((flight) => {
        return flight.flight_id === id;
      });
      return existingFlight;
    },
  },

  actions: {
    async loadAll() {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/flight');
        this.flights = response.data;
        this.error = null;
        this.isLoading = false;
      } catch (e) {
        this.error = 'Cannot download flights!';
      }
    },
    async loadById(id) {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/flight/' + id);
        this.addOrUpdateInStore(id, response.data[0]);
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot download flights!';
      }
    },
    addOrUpdateInStore(id, flight) {
      const index = this.flights.findIndex((a) => a.flight_id === id);
      if (index !== -1) {
        this.flights[index] = flight;
      } else {
        this.flights.push(flight);
      }
    },

    async createReservation(user_id, flight_id) {
      try {
        this.isLoading = true;
        const data = {
          flight_id,
          user_id,
        };
        const response = await axios.post(
          config.backendUrl + '/flight/reservation',
          data
        );
        this.error = null;
        this.isLoading = false;
        return response.data;
      } catch {
        this.error = 'Cannot add passagers to this flight';
        console.log(this.error);
      }
    },

    clearError() {
      this.error = null;
    },
  },
});
