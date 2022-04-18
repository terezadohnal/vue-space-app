<template>
  <nav>
    <div class="nav">
      <div class="link">
        <router-link :to="{ name: 'home' }">Home</router-link>
      </div>
      <div class="link">
        <router-link :to="{ name: 'flights' }">Flights</router-link>
      </div>
      <div class="link">
        <router-link :to="{ name: 'user' }">User</router-link>
      </div>
      <div class="link">
        <router-link :to="{ name: 'register' }">Register</router-link>
      </div>
      <div class="link">
        <router-link :to="{ name: 'login' }">Login</router-link>
      </div>
    </div>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<script>
import "./assets/base.css";
export default {
  name: "App",
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-evenly;
  box-shadow: inset 5px #6768aa;
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
