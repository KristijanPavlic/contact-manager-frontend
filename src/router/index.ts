import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/',
      name: 'početna',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/partneri',
      name: 'partneri',
      component: () => import('../views/PartnersView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/kontakti',
      name: 'kontakti',
      component: () => import('../views/ContactsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/postavke',
      name: 'postavke',
      component: () => import('../views/SettingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/postavke/djelatnici',
      name: 'djelatnici',
      component: () => import('../views/EmployeesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/postavke/tagovi',
      name: 'tagovi',
      component: () => import('../views/TagsView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
