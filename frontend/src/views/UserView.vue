<template>
  <Headline text="Profile" />

  <div class="card">
    <h2>USER INFORMATION</h2>
    <p>Firstname: {{ userStore.user.firstname }}</p>
    <p>Lastname: {{ userStore.user.lastname }}</p>
    <p>Nickname: {{ userStore.user.nickname }}</p>
    <p>Role: {{ userStore.user.role }}</p>
    <p>Email: {{ userStore.user.email }}</p>
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
      text: "Profile",
    };
  },
  // created() {
  //   this.userStore.loadById(this.id);
  // },
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
