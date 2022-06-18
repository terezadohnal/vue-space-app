import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FlightsView from "../views/FlightsView.vue";
import FlightDetailView from "../views/FlightDetailView.vue";
import UserView from "../views/UserView.vue";
import RegisterUserView from "../views/RegisterUserView.vue";
import LoginView from "../views/LoginView.vue";
import ReservationView from "../views/ReservationView.vue";
import EditFlightView from "../views/EditFlightView.vue";
import AuthSection from "../AuthSection.vue";
import { useUserStore } from "../stores/UserStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterUserView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthSection,
      beforeEnter: checkAuthentication,
      children: [
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
          path: "/flights/:id/reservation",
          name: "reservation",
          component: ReservationView,
        },
        {
          path: "/flights/:id/edit",
          name: "edit-flight",
          component: EditFlightView,
        },
        {
          path: "/user/:id",
          name: "user",
          component: UserView,
        },
      ],
    },
  ],
});

function checkAuthentication(to, from, next) {
  const store = useUserStore();
  if (store.isAuthenticated) {
    next();
  } else {
    store.setLoginMessage("To access this page you must log in first.");
    store.setAfterLoginRoute(to);
    next({ name: "login" });
  }
}
export default router;
