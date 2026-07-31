import { createRouter, createWebHistory } from 'vue-router'
import Home from '../App.vue'
import NotFound from '../components/NotFound.vue'

// Admin views (lazy loaded)
const AdminLogin = () => import('../views/admin/AdminLogin.vue')
const AdminLayout = () => import('../views/admin/AdminLayout.vue')
const AdminDashboard = () => import('../views/admin/AdminDashboard.vue')
const AdminProjects = () => import('../views/admin/AdminProjects.vue')
const AdminActivity = () => import('../views/admin/AdminActivity.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    // Legal pages
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: () => import('../views/PrivacyPolicy.vue'),
    },
    {
      path: '/terms-conditions',
      name: 'TermsConditions',
      component: () => import('../views/TermsConditions.vue'),
    },
    {
      path: '/registration',
      name: 'RegistrationInfo',
      component: () => import('../views/RegistrationInfo.vue'),
    },
    // PRICING PAGE
    {
      path: '/pricing',
      name: 'Pricing',
      component: () => import('../components/pricing.vue'),
    },
    // Admin routes
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin,
      meta: { guestOnly: true }
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAdmin: true },
      children: [
        { path: '', redirect: '/admin/dashboard' },
        { path: 'dashboard', name: 'AdminDashboard', component: AdminDashboard },
        { path: 'projects', name: 'AdminProjects', component: AdminProjects },
        { path: 'users', name: 'AdminUsers', component: () => import('../views/admin/AdminUsers.vue') },
        {
          path: 'events',
          name: 'AdminEvents',
          component: () => import('../views/admin/AdminEvents.vue'),
        },
        { path: 'activity', name: 'AdminActivity', component: AdminActivity },
      ]
    },
    // 404 catch-all
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

// Navigation guard for admin routes
router.beforeEach((to, _from, next) => {  // ← underscore for unused param
  const token = localStorage.getItem('adminToken')
  const isAdminRoute = to.matched.some(record => record.meta.requiresAdmin)
  const isGuestOnly = to.matched.some(record => record.meta.guestOnly)

  if (isAdminRoute && !token) {
    next('/admin/login')
  } else if (isGuestOnly && token) {
    next('/admin/dashboard')
  } else {
    next()
  }
})

export default router