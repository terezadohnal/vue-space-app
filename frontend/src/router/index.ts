import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FlightsView from "../views/FlightsView.vue";
import FlightDetailView from "../views/FlightDetailView.vue";
import UserView from "../views/UserView.vue";
import RegisterUserView from "../views/RegisterUserView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/flights",
      name: "flights",
      component: FlightsView,
    },
    {
      path: "/flights/:id",
      name: "flight-detail",
      component: FlightDetailView,
    },
    {
      path: "/",
      name: "user",
      component: UserView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterUserView,
    },
  ],
});

export default router;
