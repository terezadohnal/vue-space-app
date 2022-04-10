<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'flights' }">Flights</router-link>
    <router-link :to="{ name: 'user' }">User</router-link>
    <router-link :to="{ name: 'register' }">Register</router-link>
    <router-link :to="{ name: 'login' }">Login</router-link>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<script>
export default {
  name: "App",
};
</script>
