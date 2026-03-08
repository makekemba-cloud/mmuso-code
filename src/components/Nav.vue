<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const mobileOpen = ref(false)
const activeSection = ref('home')
const scrollProgress = ref(0)

const navItems = [
  { id: 'home',      label: 'Home' },
  { id: 'about',     label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'process',   label: 'Process' },
  { id: 'stack',     label: 'Stack' },
  { id: 'projects',  label: 'Projects' },
  { id: 'why-us',    label: 'Why Us' },
  { id: 'contact',   label: 'Contact' },
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

let observers: IntersectionObserver[] = []

onMounted(() => {
  // Scroll reveal & active section
  document.querySelectorAll('section[id]').forEach((section) => {
    section.classList.add('fade-up') // initial state

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
            entry.target.classList.add('show')
          }
        })
      },
      { threshold: 0.3 }
    )
    obs.observe(section)
    observers.push(obs)
  })

  // Scroll progress
  window.addEventListener('scroll', () => {
    scrollProgress.value =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  })
})

onUnmounted(() => {
  observers.forEach((obs) => obs.disconnect())
})
</script>

<template>
  <nav class="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
    <!-- Scroll Progress Indicator -->
    <div class="fixed left-0 top-0 w-1 h-full bg-gray-800 z-50">
      <div
        class="bg-[#2563EB] w-full transition-all duration-150"
        :style="{ height: `${scrollProgress}%` }"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between relative">
      <!-- Logo -->
      <a href="#home" class="block">
        <img
          src="/assets/Screenshot%202026-02-12%20170409.png"
          alt="Mmuso Code"
          class="logo-img transition-transform duration-300"
        >
      </a>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-8 text-gray-300 font-medium">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="nav-link relative hover:text-[#2563EB] transition"
          :class="{ active: activeSection === item.id }"
          @click="setActive(item.id)"
        >
          {{ item.label }}
          <span
            class="absolute left-0 -bottom-2 w-full h-0.5 bg-[#2563EB] scale-x-0 origin-left transition-transform duration-300"
            :class="{ 'scale-x-100': activeSection === item.id }"
          ></span>
        </a>
      </div>

      <!-- Mobile Toggle -->
      <button
        class="md:hidden text-gray-400 hover:text-white transition cursor-pointer focus:outline-none"
        @click="toggleMobile"
      >
        <i class="fas text-2xl" :class="mobileOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      class="mobile-menu md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 transition-transform duration-300"
      :class="{ 'translate-x-0': mobileOpen, 'translate-x-full': !mobileOpen }"
    >
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="`#${item.id}`"
        class="text-white text-xl font-semibold hover:text-[#2563EB] transition"
        :class="{ active: activeSection === item.id }"
        @click="setActive(item.id)"
      >
        {{ item.label }}
      </a>
    </div>
  </nav>
</template>

<style scoped>
/* Scroll reveal fade-up effect */
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-up.show {
  opacity: 1;
  transform: translateY(0);
}

/* Logo glow/scale on scroll */
nav.sticky .logo-img {
  transform: scale(1.05);
  box-shadow: 0 0 12px rgba(37, 99, 235, 0.4);
}

/* Mobile menu slide */
.mobile-menu {
  transform: translateX(100%);
}
.mobile-menu.translate-x-0 {
  transform: translateX(0);
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}
</style>