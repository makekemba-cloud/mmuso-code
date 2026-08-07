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
      <!-- Header area -->
      <div class="border-b border-gray-800">
        <div class="flex items-center justify-between p-4">
          <img
            src="/assets/mmuso-code-logoi.png"
            alt="Logo"
            class="h-8 transition-all duration-300"
            :class="sidebarCollapsed ? 'md:mx-auto' : ''"
          />
          <button
            v-if="!sidebarCollapsed"
            @click="toggleSidebar"
            class="hidden md:block text-gray-400 hover:text-white"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <button
            @click="closeMobileMenu"
            class="md:hidden text-gray-400 hover:text-white"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
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
          class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors relative"
          :class="{
            'justify-center': sidebarCollapsed,
            'bg-gray-800': $route.path.includes(item.path)
          }"
        >
          <i :class="`fas ${item.icon} w-5 text-lg`"></i>
          <span class="ml-3" :class="{ 'md:hidden': sidebarCollapsed }">
            {{ item.label }}
          </span>
          <!-- Badge for Reviews link -->
          <span
            v-if="item.path === '/admin/reviews' && unreadCount > 0"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center"
            :class="{ 'md:hidden': sidebarCollapsed }"
          >
            {{ unreadCount > 99 ? '99+' : unreadCount }}
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
            <!-- Notification Bell -->
            <div class="relative">
              <button
                @click="toggleNotifications"
                class="text-gray-400 hover:text-white transition-colors relative"
                aria-label="Notifications"
              >
                <i class="fas fa-bell text-lg md:text-xl"></i>
                <span
                  v-if="unreadCount > 0"
                  class="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center"
                >
                  {{ unreadCount > 99 ? '99+' : unreadCount }}
                </span>
              </button>

              <!-- Dropdown – only shows unread notifications -->
              <div
                v-if="showNotifications"
                class="absolute right-0 mt-2 w-80 md:w-96 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div class="p-3 border-b border-gray-800 flex justify-between items-center">
                  <span class="text-white font-semibold text-sm">Notifications</span>
                  <div class="flex items-center gap-2">
                    <button
                      v-if="unreadCount > 0"
                      @click="markAllAsRead"
                      class="text-blue-400 hover:text-blue-300 text-xs"
                    >
                      Mark all read
                    </button>
                    <button
                      @click="showNotifications = false"
                      class="text-gray-400 hover:text-white"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div class="max-h-80 overflow-y-auto">
                  <div
                    v-if="unreadNotifications.length === 0"
                    class="p-4 text-center text-gray-500 text-sm"
                  >
                    All caught up! 🎉
                  </div>
                  <div
                    v-for="notif in unreadNotifications"
                    :key="notif._id"
                    class="p-3 border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors"
                  >
                    <div class="flex items-start gap-2">
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="font-medium text-white text-sm">{{ notif.title }}</span>
                        </div>
                        <p class="text-gray-400 text-xs">{{ notif.message }}</p>
                        <span class="text-gray-600 text-[10px]">{{ new Date(notif.createdAt).toLocaleString() }}</span>
                      </div>
                      <router-link
                        v-if="notif.link"
                        :to="notif.link"
                        class="text-blue-400 hover:text-blue-300 text-xs whitespace-nowrap"
                        @click="showNotifications = false; markAsRead(notif._id)"
                      >
                        View
                      </router-link>
                    </div>
                  </div>
                </div>
                <div class="p-2 border-t border-gray-800 text-center">
                  <router-link
                    to="/admin/reviews"
                    class="text-blue-400 hover:text-blue-300 text-sm"
                    @click="showNotifications = false"
                  >
                    View all reviews
                  </router-link>
                </div>
              </div>
            </div>

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

    <!-- Logout Modal -->
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTracker } from '../../composables/useTracker'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const sidebarCollapsed = ref(false)
const showLogoutModal = ref(false)
const isMobileMenuOpen = ref(false)

// ── Notification state ──
const notifications = ref<any[]>([])
const unreadCount = ref(0)
const showNotifications = ref(false)
let refreshInterval: number | null = null

// ── Only unread notifications for dropdown ──
const unreadNotifications = computed(() =>
  notifications.value.filter(n => !n.read)
)

// ── JWT decoder ──
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

// ── Derived user info ──
const userInfo = computed(() => {
  const token = localStorage.getItem('adminToken')
  if (!token) return null
  return decodeJWT(token)
})

const userName = computed(() => userInfo.value?.username || 'Admin')
const userRole = computed(() => userInfo.value?.role || 'viewer')

// ── Navigation ──
const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
  { path: '/admin/projects', label: 'Projects', icon: 'fa-code-branch' },
  { path: '/admin/reviews', label: 'Reviews', icon: 'fa-star' },
  { path: '/admin/users', label: 'Users', icon: 'fa-users' },
  { path: '/admin/events', label: 'Events', icon: 'fa-bolt' },
  { path: '/admin/activity', label: 'API Logs', icon: 'fa-history' },
]

const pageTitle = computed(() => {
  const item = navItems.find(i => route.path.includes(i.path))
  return item ? item.label : 'Dashboard'
})

// ── Sidebar toggle ──
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// ── Mobile menu ──
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// ── Notifications ──
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    if (!token) return

    const res = await axios.get('/api/admin/notifications', {
      headers: { Authorization: `Bearer ${token}` }
    })
    notifications.value = res.data.notifications || []
    unreadCount.value = res.data.unreadCount || 0
  } catch (err) {
    console.error('Failed to fetch notifications:', err)
  }
}

const markAsRead = async (id: string) => {
  try {
    const token = localStorage.getItem('adminToken')
    await axios.patch(`/api/admin/notifications/${id}/read`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    // Remove the notification from the list immediately
    notifications.value = notifications.value.filter(n => n._id !== id)
    unreadCount.value = Math.max(0, unreadCount.value - 1)
  } catch (err) {
    console.error('Failed to mark notification as read:', err)
  }
}

const markAllAsRead = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    await axios.patch('/api/admin/notifications/mark-all-read', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    // Remove all unread notifications from the list
    notifications.value = notifications.value.filter(n => n.read)
    unreadCount.value = 0
  } catch (err) {
    console.error('Failed to mark all as read:', err)
  }
}

// ── Clear notifications when visiting reviews page ──
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/admin/reviews') {
      // Mark all as read and clear the list
      markAllAsRead()
    }
  },
  { immediate: true }
)

// ── Logout modal ──
const openLogoutModal = () => {
  showLogoutModal.value = true
}

const closeLogoutModal = () => {
  showLogoutModal.value = false
}

const confirmLogout = async () => {
  // Track logout
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

  localStorage.removeItem('adminToken')
  closeLogoutModal()
  router.push('/admin/login')
}

// ── Lifecycle ──
onMounted(() => {
  fetchNotifications()
  refreshInterval = window.setInterval(fetchNotifications, 30000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
    refreshInterval = null
  }
})
</script>

<style scoped>
aside {
  max-height: 100vh;
  overflow-y: auto;
}
</style>