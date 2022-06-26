<template>
  <div class="form">
    <form @submit="addPassagers">
      <div v-for="(passager, index) in this.passagers" :key="index">
        <PassagerInput
          :onNameChange="(newName) => setPassagerName(newName, index)"
          :onSurnameChange="
            (newSurname) => setPassagerSurname(newSurname, index)
          "
          :name="passager.name"
          :surname="passager.surname"
        />
      </div>
      <SubmitButton type="submit" text="Add Passagers" />
    </form>
    <div>
      <ActionButton
        :onClick="handleAddInputClick"
        text="Add Passager"
        type="button"
        :isDisabled="!(this.maxSeats > passagerslength)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SubmitButton from '../components/esentials/SubmitButton.vue';
import ActionButton from '../components/esentials/ActionButton.vue';
import PassagerInput from '../components/PassagerInput.vue';
import { mapStores } from 'pinia/dist/pinia';
import { useFlightStore } from '../stores/FlightStore';
import { useUserStore } from '../stores/UserStore';

export default defineComponent({
  name: 'PassagersForm',
  components: { SubmitButton, PassagerInput, ActionButton },
  props: {
    flight_id: {
      type: Number,
      required: true,
    },
    reservation_id: {
      type: Number,
      required: true,
    },
    maxSeats: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      passagers: [
        {
          name: '',
          surname: '',
        },
      ],
    };
  },
  computed: {
    ...mapStores(useFlightStore, useUserStore),
    passagerslength() {
      return this.passagers.length ? this.passagers.length : 0;
    },
  },
  methods: {
    async addPassagers(event) {
      event.preventDefault();
      this.flightStore.addPassagers(
        this.reservation_id,
        this.userStore.user.id,
        this.passagers
      );
      this.$router.push({
        name: 'flight-detail',
        params: { id: this.flight_id },
      });
    },
    handleAddInputClick() {
      this.passagers.push({
        name: '',
        surname: '',
      });
    },
    setPassagerName(newName, index) {
      this.passagers[index].name = newName;
    },
    setPassagerSurname(newSurname, index) {
      this.passagers[index].surname = newSurname;
    },
  },
});
</script>
<style scoped>
.form {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.buttonPosition {
  display: flex;
  justify-content: center;
  padding: 40px;
}
</style>
