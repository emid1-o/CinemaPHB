import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/homePage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/loginPage.vue')
    },
    {
      path:'/sessoes',
      name: 'sessoes',
      component: () => import('@/views/sessoesPage.vue')
    }
  ],
})

export default router




