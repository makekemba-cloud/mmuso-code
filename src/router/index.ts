import { createRouter, createWebHistory } from 'vue-router'
import Home from '../App.vue'
import NotFound from '../components/NotFound.vue'

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
    // PRICING PAGE (add this)
    {
      path: '/pricing',
      name: 'Pricing',
      component: () => import('../components/pricing.vue'),   // adjust path if needed
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

export default router