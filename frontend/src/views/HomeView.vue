<template>
  <main>
    <div class="header">
      <div class="header-text">
        <div class="headline">
          <h1>Welcome to the land of astronauts</h1>
        </div>
        <div class="headline-caption">
          <p>Book your flight today!</p>
        </div>
      </div>
      <div class="header-image">
        <img :src="image" alt="To the moon" />
      </div>
    </div>
  </main>
</template>

<script>
import image from "../img/Outer_space.png";

export default {
  name: "home",
  data() {
    return {
      image: image,
    };
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
</style>
