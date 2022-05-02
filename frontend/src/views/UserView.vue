<template>
  <Headline :text="this.text" />

  <h1>{{ userStore.user.firstname }} Profile</h1>
</template>

<script lang="ts">
import { mapStores } from "pinia/dist/pinia";
import { defineComponent } from "vue";
import { useUserStore } from "../stores/UserStore";
import Headline from "../components/esentials/Headline.vue";

export default defineComponent({
  name: "User Profile",
  components: { Headline },
  data() {
    return {
      text: "Profile",
    };
  },
  computed: {
    ...mapStores(useUserStore),
    id() {
      // return parseInt(this.$route.params.id);
      return;
    },
    user() {
      // return this.userStore.getById(1);
    },
  },
});
</script>
