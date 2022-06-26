<template>
  <nav>
    <div class="nav">
      <div class="link">
        <router-link :to="{ name: 'home' }">Home</router-link>
      </div>
      <div class="link">
        <router-link :to="{ name: 'flights' }">Flights</router-link>
      </div>
      <div v-if="userStore.isAuthenticated" class="link">
        <router-link :to="{ name: 'user', params: { id: userStore.user.id } }"
          >User</router-link
        >
      </div>
      <div class="link">
        <router-link :to="{ name: 'notifications' }">Notifications</router-link>
      </div>
      <div v-if="!userStore.isAuthenticated" class="link">
        <router-link :to="{ name: 'register' }">Register</router-link>
      </div>
      <div v-if="!userStore.isAuthenticated" class="link">
        <router-link :to="{ name: 'login' }">Login</router-link>
      </div>
      <div v-else class="link">
        <router-link :to="{ name: 'home' }" @click="logout">Logout</router-link>
      </div>
    </div>
  </nav>
  <main>
    <router-view />
  </main>
  <footer></footer>
</template>

<script>
import './assets/base.css';
import { mapStores } from 'pinia/dist/pinia';
import { useUserStore } from './stores/UserStore';

export default {
  name: 'App',
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    logout() {
      this.userStore.logout();
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-evenly;
  box-shadow: inset 5px #6768aa;
  flex-wrap: wrap;
}

.nav .link {
  padding: 1em 2em;
}
.link a {
  color: #6768aa;
  font-size: 1.5em;
  text-decoration: none;
  width: fit-content;
  transition: 0.3s;
}

.link a:hover {
  color: #474878;
}
</style>
