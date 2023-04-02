import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'current',
      component: HomeView
    },
    {
      path: '/daily',
      name: 'daily',
      component: () => import('../views/DailyView.vue')
    },
    {
      path: '/hourly',
      name: 'hourly',
      component: () => import('../views/HourlyView.vue')
    }
  ]
})

export default router
