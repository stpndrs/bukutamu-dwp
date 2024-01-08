import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/AttendancesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/attendances',
      name: 'attendances',
      component: HomeView
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/FormView.vue')
    },
    {
      path: '/',
      name: 'welcome',
      component: () => import('../views/WelcomeView.vue')
    },
  ]
})

export default router
