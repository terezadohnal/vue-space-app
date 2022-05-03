<template>
  <Headline :text="this.text" />

  <h1>{{ userStore.user.nickname }} Profile</h1>
  <div class="card">
    <p>name: {{ userStore.user.nickname }}</p>
  </div>
</template>

<script>
import { mapStores } from "pinia/dist/pinia";
import { defineComponent } from "vue";
import { useUserStore } from "../stores/UserStore";
import Headline from "../components/esentials/Headline.vue";

export default defineComponent({
  name: "User Profile",
  components: { Headline },
  data() {
    return {
      text: Profile,
    };
  },
  created() {
    this.userStore.loadById(this.id);
  },
  computed: {
    ...mapStores(useUserStore),
    id() {
      return parseInt(this.$route.params.id);
    },
    user() {
      return this.userStore.getById(this.id);
    },
  },
});
</script>
