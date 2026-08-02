<template>
  <div class="min-h-screen bg-black">
    <!-- Mobile Hamburger Button -->
    <button
      v-if="!isMobileMenuOpen"
      @click="toggleMobileMenu"
      class="fixed top-4 left-4 z-50 md:hidden text-gray-400 hover:text-white transition-colors"
      aria-label="Toggle menu"
    >
      <i class="fas fa-bars text-2xl"></i>
    </button>

    <!-- Mobile Overlay Backdrop -->
    <div
      v-if="isMobileMenuOpen"
      @click="closeMobileMenu"
      class="fixed inset-0 bg-black/70 z-40 md:hidden"
    />

    <!-- Sidebar -->
    <aside
      class="fixed left-0 top-0 z-40 h-screen transition-all duration-300 bg-gray-900/95 backdrop-blur border-r border-gray-800
             flex flex-col overflow-y-auto
             w-64
             transform
             -translate-x-full
             md:transform-none
             md:translate-x-0"
      :class="[
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
        sidebarCollapsed ? 'md:w-20' : 'md:w-64'
      ]"
    >
      <!-- Header area: logo + (optional) collapse button on the right -->
      <div class="border-b border-gray-800">
        <div class="flex items-center justify-between p-4">
          <img
            src="/assets/mmuso-code-logoi.png"
            alt="Logo"
            class="h-8 transition-all duration-300"
            :class="sidebarCollapsed ? 'md:mx-auto' : ''"
          />
          <!-- Collapse button when expanded (right of logo) -->
          <button
            v-if="!sidebarCollapsed"
            @click="toggleSidebar"
            class="hidden md:block text-gray-400 hover:text-white"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <!-- Mobile close button -->
          <button
            @click="closeMobileMenu"
            class="md:hidden text-gray-400 hover:text-white"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <!-- Collapse button when collapsed (below logo, centered) -->
        <div v-if="sidebarCollapsed" class="hidden md:block pb-4 flex text-center justify-center">
          <button
            @click="toggleSidebar"
            class="text-gray-400 hover:text-white transition-colors"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <!-- Navigation links -->
      <nav class="flex-1 py-6">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="closeMobileMenu"
          class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors"
          :class="{
            'justify-center': sidebarCollapsed,
            'bg-gray-800': $route.path.includes(item.path)
          }"
        >
          <i :class="`fas ${item.icon} w-5 text-lg`"></i>
          <span class="ml-3" :class="{ 'md:hidden': sidebarCollapsed }">
            {{ item.label }}
          </span>
        </router-link>
      </nav>

      <!-- Logout button -->
      <div class="p-4 border-t border-gray-800">
        <button
          @click="openLogoutModal"
          class="flex items-center w-full text-gray-400 hover:text-red-500 transition-colors"
          :class="{ 'justify-center': sidebarCollapsed }"
        >
          <i class="fas fa-sign-out-alt w-5"></i>
          <span class="ml-3" :class="{ 'md:hidden': sidebarCollapsed }">
            Logout
          </span>
        </button>
      </div>
    </aside>

    <!-- Main content area -->
    <div
      class="transition-all duration-300 flex flex-col min-h-screen"
      :class="{
        'md:ml-64': !sidebarCollapsed,
        'md:ml-20': sidebarCollapsed
      }"
    >
      <!-- Top navigation bar -->
      <header class="sticky top-0 z-30 bg-black/80 backdrop-blur border-b border-gray-800">
        <div class="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <h1 class="text-lg md:text-xl font-semibold text-white truncate pl-10 md:pl-0">
            {{ pageTitle }}
          </h1>
          <div class="flex items-center gap-3 md:gap-4">
            <span class="text-gray-400 text-xs md:text-sm hidden sm:inline">
              Welcome, <span class="text-white font-medium">{{ userName }}</span>
            </span>
            <span class="text-gray-400 text-xs sm:hidden">{{ userName }}</span>
            <div class="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <i class="fas fa-user text-white text-xs md:text-sm"></i>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-4 md:p-6">
        <router-view />
      </main>

      <!-- Footer -->
      <footer class="border-t border-gray-800 bg-black/40 px-4 py-2 md:px-6 md:py-3 text-gray-500 text-[10px] md:text-xs text-center">
        Mmuso Code Admin Panel v1.0 &bull; &copy; {{ new Date().getFullYear() }} All rights reserved
      </footer>
    </div>

    <!-- Logout Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="showLogoutModal"
        class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-gray-900 rounded-xl max-w-sm w-full p-6 border border-gray-800 shadow-2xl">
          <div class="text-center">
            <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-sign-out-alt text-red-400 text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Confirm Logout</h3>
            <p class="text-gray-400 text-sm mb-6">Are you sure you want to log out of the admin panel?</p>
            <div class="flex gap-3">
              <button
                @click="confirmLogout"
                class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
              >
                Yes, Logout
              </button>
              <button
                @click="closeLogoutModal"
                class="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTracker } from '../../composables/useTracker'

const router = useRouter()
const route = useRoute()
const sidebarCollapsed = ref(false)
const showLogoutModal = ref(false)
const isMobileMenuOpen = ref(false)

// --- JWT decoder ---
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

// --- Derived user info from token ---
const userInfo = computed(() => {
  const token = localStorage.getItem('adminToken')
  if (!token) return null
  return decodeJWT(token)
})

const userName = computed(() => userInfo.value?.username || 'Admin')
const userRole = computed(() => userInfo.value?.role || 'viewer')

// --- Navigation ---
const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: 'fa-chart-line', roles: ['admin'] },
  { path: '/admin/projects', label: 'Projects', icon: 'fa-code-branch', roles: ['admin'] },
  { path: '/admin/reviews', label: 'Reviews', icon: 'fa-star', roles: ['admin'] },
  { path: '/admin/users', label: 'Users', icon: 'fa-users', roles: ['admin'] },
  { path: '/admin/events', label: 'Events', icon: 'fa-bolt', roles: ['admin'] },
  { path: '/admin/activity', label: 'API Logs', icon: 'fa-history', roles: ['admin'] },
]

const pageTitle = computed(() => {
  const item = navItems.find(i => route.path.includes(i.path))
  return item ? item.label : 'Dashboard'
})

// --- Sidebar toggle (desktop) ---
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// --- Mobile menu toggle ---
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// --- Logout modal ---
const openLogoutModal = () => {
  showLogoutModal.value = true
}

const closeLogoutModal = () => {
  showLogoutModal.value = false
}

const confirmLogout = async () => {
  // Track logout event
  try {
    const { trackEvent } = useTracker()
    await trackEvent({
      event: 'logout',
      category: 'admin',
      metadata: {
        username: userName.value,
        role: userRole.value
      }
    })
  } catch (_) {
    // Fallback direct fetch
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId: localStorage.getItem('visitorId') || 'unknown',
          sessionId: 'admin-session',
          event: 'logout',
          category: 'admin',
          element: 'Logout Button',
          url: window.location.href,
          referrer: document.referrer,
          metadata: {
            username: userName.value,
            role: userRole.value
          }
        })
      })
    } catch (_) { /* ignore */ }
  }

  // Clear token and redirect
  localStorage.removeItem('adminToken')
  closeLogoutModal()
  router.push('/admin/login')
}
</script>

<style scoped>
aside {
  max-height: 100vh;
  overflow-y: auto;
}
</style>