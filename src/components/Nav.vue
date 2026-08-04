<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const mobileOpen = ref(false)
const activeSection = ref('home')
const scrollProgress = ref(0)

const navItems = [
  { id: 'home', label: 'Home', icon: 'fa-home' },
  { id: 'about', label: 'About', icon: 'fa-user' },
  { id: 'expertise', label: 'Expertise', icon: 'fa-lightbulb' },
  { id: 'process', label: 'Process', icon: 'fa-diagram-project' },
  { id: 'projects', label: 'Projects', icon: 'fa-code' },
  { id: 'why-us', label: 'Why Us', icon: 'fa-star' },
  { id: 'contact', label: 'Contact', icon: 'fa-envelope' },
]

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

function closeMobile() {
  mobileOpen.value = false
}

function setActive(id: string) {
  activeSection.value = id
  closeMobile()
}

function navigateToSection(id: string) {
  closeMobile()
  
  if (route.path === '/') {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.pushState(null, '', `#${id}`)
      setActive(id)
    }
  } else {
    router.push({ path: '/', hash: `#${id}` })
  }
}

// ---------- Scroll Progress ----------
function updateScrollProgress() {
  if (route.path !== '/') return
  const scrollY = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0
}

// ---------- Active Section Detection (scroll-based) ----------
let ticking = false

function updateActiveSection() {
  if (route.path !== '/') return

  // If at the very top, force 'home'
  if (window.scrollY < 20) {
    if (activeSection.value !== 'home') {
      activeSection.value = 'home'
    }
    return
  }

  const sections = document.querySelectorAll('section[id]')
  if (!sections.length) return

  const navBar = document.querySelector('nav')
  const navHeight = navBar ? navBar.offsetHeight : 80

  let bestSection = null
  let bestScore = Infinity

  for (const section of sections) {
    const rect = section.getBoundingClientRect()
    // Skip sections that have completely scrolled past the navbar
    if (rect.bottom < navHeight) continue

    const distance = rect.top - navHeight
    // Prefer non‑negative distances (section below navbar)
    const score = distance >= 0 ? distance : 10000 + distance

    if (score < bestScore) {
      bestScore = score
      bestSection = section.id
    }
  }

  // Fallback: if no visible section, pick the closest one (even if above)
  if (!bestSection) {
    let closestDist = Infinity
    for (const section of sections) {
      const rect = section.getBoundingClientRect()
      const distance = rect.top - navHeight
      if (Math.abs(distance) < Math.abs(closestDist)) {
        closestDist = distance
        bestSection = section.id
      }
    }
  }

  if (!bestSection) {
    const first = sections[0]
    if (first) bestSection = first.id
  }

  if (!bestSection) bestSection = 'home'

  if (activeSection.value !== bestSection) {
    activeSection.value = bestSection
  }
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveSection()   // ← navbar highlight
      updateScrollProgress()  // ← progress bar (FIXED!)
      ticking = false
    })
    ticking = true
  }
}

// ---------- Click outside handler ----------
function handleClickOutside(e: MouseEvent) {
  const nav = document.querySelector('nav')
  if (mobileOpen.value && nav && !nav.contains(e.target as Node)) {
    mobileOpen.value = false
  }
}

// ---------- Route watcher ----------
watch(() => route.path, async (newPath) => {
  if (newPath !== '/') {
    activeSection.value = 'home'
  } else {
    await nextTick()
    setTimeout(() => {
      updateActiveSection()
      updateScrollProgress()
    }, 100)
  }
})

// ---------- Hash handling ----------
function handleHashOnHome() {
  if (route.path === '/' && route.hash) {
    const id = route.hash.slice(1)
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setActive(id)
        history.pushState(null, '', '/')
      }
    }, 150)
  }
}

// ---------- Lifecycle ----------
onMounted(() => {
  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', () => {
    // Update both on resize
    updateActiveSection()
    updateScrollProgress()
  })
  document.addEventListener('click', handleClickOutside)

  updateScrollProgress()
  handleHashOnHome()

  // Initial calculation after DOM ready
  setTimeout(() => {
    updateActiveSection()
    updateScrollProgress()
  }, 250)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <!-- Vertical Scroll Progress Bar (only on homepage) -->
  <div v-if="route.path === '/'" class="fixed left-0 top-0 w-1 h-full bg-gray-800 z-[60]">
    <div
      class="bg-gradient-to-b from-blue-500 to-blue-600 w-full transition-all duration-150"
      :style="{ height: `${scrollProgress}%` }"
    ></div>
  </div>

  <!-- Floating Cylinder Navigation Bar -->
  <nav class="floating-nav sticky top-4 mx-auto w-[calc(100%-2rem)] max-w-7xl z-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
    <div class="w-full flex items-center justify-between px-5 py-1.5 md:px-6">
      <a 
        href="#"
        class="block transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
        @click.prevent="navigateToSection('home')"
      >
        <img
          src="/assets/mmuso-code-logoi.png"
          alt="Mmuso Code"
          class="logo-img"
        >
      </a>

      <div class="hidden md:flex items-center space-x-8 text-gray-300 font-medium">
        <a
          v-for="item in navItems"
          :key="item.id"
          href="#"
          class="nav-link relative hover:text-[#2563EB] transition-all duration-300"
          :class="{ 
            'text-[#2563EB]': activeSection === item.id && route.path === '/',
            'active': activeSection === item.id && route.path === '/'
          }"
          @click.prevent="navigateToSection(item.id)"
        >
          {{ item.label }}
          <span
            v-if="route.path === '/'"
            class="absolute left-0 -bottom-2 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transition-transform duration-300 origin-left"
            :class="activeSection === item.id ? 'scale-x-100' : 'scale-x-0'"
          ></span>
        </a>
      </div>

      <button
        class="md:hidden text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
        @click="toggleMobile"
        aria-label="Toggle menu"
      >
        <i class="fas text-2xl" :class="mobileOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div v-if="mobileOpen" class="md:hidden absolute right-4 top-full mt-2 z-50">
        <div class="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden min-w-[220px] shadow-2xl shadow-black/60">
          <a
            v-for="item in navItems"
            :key="item.id"
            href="#"
            class="flex items-center gap-3 px-5 py-3 text-gray-300 font-medium border-b border-gray-800/50 last:border-0 hover:bg-gray-900/70 hover:text-[#2563EB] transition-all duration-200 active:scale-[0.98]"
            :class="{ 'text-[#2563EB] bg-gray-900/50': activeSection === item.id && route.path === '/' }"
            @click.prevent="navigateToSection(item.id)"
          >
            <i :class="`fas ${item.icon} text-xs opacity-70`"></i>
            <span
              class="w-1.5 h-1.5 rounded-full bg-[#2563EB] transition-opacity duration-200"
              :class="activeSection === item.id && route.path === '/' ? 'opacity-100' : 'opacity-0'"
            ></span>
            {{ item.label }}
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.logo-img {
  max-height: 40px;
  width: auto;
  transition: transform 0.2s ease;
}

.floating-nav {
  background: linear-gradient(105deg, 
    rgba(10, 10, 15, 0.92) 0%,
    rgba(20, 20, 30, 0.92) 20%,
    rgba(30, 30, 45, 0.92) 50%,
    rgba(20, 20, 30, 0.92) 80%,
    rgba(10, 10, 15, 0.92) 100%
  );
  backdrop-filter: blur(16px);
  border-radius: 80px;
  box-shadow: inset 30px 0 30px -20px rgba(0, 0, 0, 0.7),
              inset -30px 0 30px -20px rgba(0, 0, 0, 0.7),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.floating-nav:hover {
  box-shadow: inset 25px 0 25px -18px rgba(0, 0, 0, 0.5),
              inset -25px 0 25px -18px rgba(0, 0, 0, 0.5),
              0 0 0 2px rgba(37, 99, 235, 0.8);
  background: linear-gradient(105deg, 
    rgba(15, 15, 22, 0.98) 0%,
    rgba(25, 25, 38, 0.98) 20%,
    rgba(35, 35, 52, 0.98) 50%,
    rgba(25, 25, 38, 0.98) 80%,
    rgba(15, 15, 22, 0.98) 100%
  );
  border-color: rgba(37, 99, 235, 0.3);
}

.nav-link {
  position: relative;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  transform: translateY(-1px);
  text-shadow: 0 0 8px rgba(37, 99, 235, 0.5);
}

.nav-link.active {
  text-shadow: 0 0 6px rgba(37, 99, 235, 0.4);
}

button:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .floating-nav {
    border-radius: 60px;
  }
  .logo-img {
    max-height: 32px;
  }
}

.md\:hidden .rounded-2xl {
  backdrop-filter: blur(20px);
}
</style>