<template>
  <main>
    <h1>Flights</h1>
    <p>List Of Flights</p>
    <ul>
      <li :key="flight.id" v-for="flight in flights">
        <router-link :to="{ name: 'flight-detail', params: { id: flight.id } }"
          >{{ flight.name }}
        </router-link>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  data() {
    return {
      name: "flights",
      flights: [
        {
          id: 1,
          name: "SX60433",
          aircraft: "Falcon 9",
          departure: "2021-12-13 07:00:00",
          destination: "Moon",
        },
        {
          id: 2,
          name: "SX60433",
          aircraft: "Falcon 9",
          departure: "2021-12-13 07:00:00",
          destination: "Moon",
        },
        {
          name: "SX60433",
          aircraft: "Falcon 9",
          departure: "2021-12-13 07:00:00",
          destination: "Moon",
        },
      ],
    };
  },
};
</script>
