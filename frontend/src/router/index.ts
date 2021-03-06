import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FlightsView from '../views/FlightsView.vue';
import FlightDetailView from '../views/FlightDetailView.vue';
import UserView from '../views/UserView.vue';
import RegisterUserView from '../views/RegisterUserView.vue';
import LoginView from '../views/LoginView.vue';
import PassagersView from '../views/PassagersView.vue';
import EditFlightView from '../views/EditFlightView.vue';
import NotificationsView from '../views/NotificationsView.vue';
import ReservationView from '../views/ReservationsView.vue';
import AuthSection from '../AuthSection.vue';
import { useUserStore } from '../stores/UserStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterUserView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthSection,
      beforeEnter: checkAuthentication,
      children: [
        {
          path: '/flights',
          name: 'flights',
          component: FlightsView,
        },
        {
          path: '/flights/:id',
          name: 'flight-detail',
          component: FlightDetailView,
        },
        {
          path: '/flights/:flight_id/reservations/:reservation_id',
          name: 'passagers',
          component: PassagersView,
        },
        {
          path: '/flights/:id/edit',
          name: 'edit-flight',
          component: EditFlightView,
        },
        {
          path: '/user/:id',
          name: 'user',
          component: UserView,
        },
        {
          path: '/notifications',
          name: 'notifications',
          component: NotificationsView,
        },
        {
          path: '/reservation',
          name: 'reservation',
          component: ReservationView,
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
    store.setLoginMessage('To access this page you must log in first.');
    store.setAfterLoginRoute(to);
    next({ name: 'login' });
  }
}
export default router;
