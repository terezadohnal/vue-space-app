import { defineStore } from "pinia";
import axios from "axios";
import config from "../../config";
import jwtDecode from "jwt-decode";

export const useFlightStore = defineStore("flight", {
  state: () => ({
    flights: [],
    isLoading: true,
    error: null,
  }),

  getters: {
    getById: (state) => (id) =>
      state.flights.find((flight) => flight.id === id),
  },

  actions: {
    async loadAll() {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + "/flight");
        this.flights = response.data;
        this.error = null;
        this.isLoading = false;
      } catch (e) {
        this.error = "Cannot download flights!";
      }
    },
    async loadById() {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + "/flight/" + id);
        this.addOrUpdateInStore(id, response.data);
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = "Cannot download article!";
      }
    },
    addOrUpdateInStore(id, flight) {
      const index = this.flights.findIndex((a) => a.id === id);
      if (index !== -1) {
        this.flights[index] = flight;
      } else {
        this.flights.push(flight);
      }
    },

    clearError() {
      this.error = null;
    },
  },
});
