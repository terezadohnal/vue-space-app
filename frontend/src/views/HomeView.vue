<template>
  <main>
    <div class="header">
      <div class="header-text">
        <div class="headline">
          <h1>Welcome to the land of astronauts</h1>
        </div>
        <div class="headline-caption">
          <p>Book your flight today! You can fly to the moon with us</p>
        </div>
        <div class="button">
          <ActionButton
            :text="buttonTitle"
            :onClick="() => goTo()"
            :isDisabled="false"
            type="button"
          />
        </div>
      </div>
      <div class="header-image">
        <img :src="image" alt="To the moon" />
      </div>
    </div>
  </main>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia';
import ActionButton from '../components/esentials/ActionButton.vue';
import { useUserStore } from '../stores/UserStore';
import image from '../img/Outer_space.png';

export default {
  name: 'home',
  components: { ActionButton },
  data() {
    return {
      image: image,
    };
  },
  computed: {
    ...mapStores(useUserStore),
    buttonTitle() {
      return this.userStore.isAuthenticated ? 'Browse Flights' : 'Sign Up here';
    },
  },
  methods: {
    goTo() {
      if (this.userStore.isAuthenticated) {
        this.$router.push({ name: 'flights' });
      } else {
        this.$router.push({ name: 'register' });
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header-text {
  margin-left: 2em;
}

.header-image img {
  width: 100%;
}

.headline h1 {
  font-size: 5em;
  font-weight: 600;
}

.headline-caption p {
  font-size: 3em;
}

.button {
  margin: 20px 0;
}
</style>
