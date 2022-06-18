<template>
  <div class="content">
    <Headline :text="this.text" />
    <div class="description">
      <p>You can add more passagers to your reservation</p>
    </div>
    <PassagersForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PassagersForm from '../components/PassagersForm.vue';
import Headline from '../components/esentials/Headline.vue';

export default defineComponent({
  components: {
    PassagersForm,
    Headline,
  },
  name: 'ReservationView',
  data() {
    return {
      text: 'Reservation Detail',
    };
  },
});
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.description {
  display: flex;
  justify-content: center;
}
</style>
