<template>
  <div class="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6 relative">
    <!-- Home Button (larger touch target on mobile) -->
    <router-link
      to="/"
      class="absolute top-4 left-4 z-10 text-gray-400 hover:text-white transition-colors flex items-center gap-2 p-2 -ml-2"
    >
      <i class="fas fa-home text-base sm:text-lg"></i>
      <span class="text-sm hidden sm:inline">Home</span>
    </router-link>

    <div class="bg-gray-900 p-6 sm:p-8 rounded-2xl w-full max-w-md border border-gray-800 shadow-2xl">
      <div class="text-center mb-6 sm:mb-8">
        <img src="/assets/mmuso-code-logoi.png" alt="Mmuso Code" class="h-10 sm:h-12 mx-auto mb-3 sm:mb-4">
        <h2 class="text-xl sm:text-2xl font-bold text-white">Admin Login</h2>
        <p class="text-gray-400 text-xs sm:text-sm mt-1">Secure access only</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2">Username</label>
          <input
            v-model="username"
            type="text"
            class="w-full px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            autocomplete="username"
          />
        </div>

        <div class="mb-6">
          <label class="block text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2">Password</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
              required
              autocomplete="current-password"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
              tabindex="-1"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <p v-if="error" class="text-red-500 text-xs sm:text-sm mt-4 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

// --- Helpers ---

function getVisitorId(): string {
  let id = localStorage.getItem('visitorId')
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36)
    localStorage.setItem('visitorId', id)
  }
  return id
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

// Simple JWT payload decoder (works without external lib)
function decodeJWT(token: string): any {
  if (!token) return null
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const base64Url = parts[1]
    if (!base64Url) return null
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (_) {
    return null
  }
}

// Log an event (fallback if tracker isn't available)
async function logEvent(event: string, category: string, element?: string, metadata?: Record<string, any>) {
  try {
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        sessionId: 'login-attempt',
        event,
        category,
        element: element || '',
        url: window.location.href,
        referrer: document.referrer || '',
        metadata: metadata || {},
        device: 'desktop',
        browser: '',
        os: ''
      })
    })
  } catch (_) { /* ignore */ }
}

// --- Login handler ---

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await logEvent('login_attempt', 'admin', 'Login Form', { username: username.value })

    const response = await axios.post('/api/admin/auth/login', {
      username: username.value,
      password: password.value
    })

    const token = response.data.token
    const decoded = decodeJWT(token)

    await logEvent('login_success', 'admin', 'Login Form', {
      username: decoded?.username || username.value,
      role: decoded?.role || 'unknown'
    })

    localStorage.setItem('adminToken', token)

    router.push('/admin/dashboard')
  } catch (err: any) {
    const msg = err.response?.data?.message || 'Login failed'
    error.value = msg

    await logEvent('login_failed', 'admin', 'Login Form', {
      username: username.value,
      reason: msg
    })
  } finally {
    loading.value = false
  }
}
</script>