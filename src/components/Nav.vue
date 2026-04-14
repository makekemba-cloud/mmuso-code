<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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

let observers: IntersectionObserver[] = []

function handleScroll() {
  scrollProgress.value =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
}

function handleClickOutside(e: MouseEvent) {
  const nav = document.querySelector('nav')
  if (mobileOpen.value && nav && !nav.contains(e.target as Node)) {
    mobileOpen.value = false
  }
}

onMounted(() => {
  document.querySelectorAll('section[id]').forEach((section) => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activeSection.value = entry.target.id
        })
      },
      { threshold: 0.3 }
    )
    obs.observe(section)
    observers.push(obs)
  })

  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  observers.forEach((obs) => obs.disconnect())
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <!-- Scroll Progress -->
  <div class="fixed left-0 top-0 w-1 h-full bg-gray-800 z-[60]">
    <div
      class="bg-[#2563EB] w-full transition-all duration-150"
      :style="{ height: `${scrollProgress}%` }"
    ></div>
  </div>

  <!-- NAV -->
  <nav class="border-b border-gray-800 bg-black/90 backdrop-blur-sm sticky top-0 z-50 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

      <!-- Logo -->
      <a href="#home" class="block">
        <img
          src="/assets/Screenshot%202026-02-12%20170409.png"
          alt="Mmuso Code"
          class="logo-img"
        >
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8 text-gray-300 font-medium">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="relative hover:text-[#2563EB] transition"
          :class="{ 'text-[#2563EB]': activeSection === item.id }"
          @click="setActive(item.id)"
        >
          {{ item.label }}

          <span
            class="absolute left-0 -bottom-2 w-full h-0.5 bg-[#2563EB] transition-transform duration-300 origin-left"
            :class="activeSection === item.id ? 'scale-x-100' : 'scale-x-0'"
          ></span>
        </a>
      </div>

      <!-- Mobile Toggle -->
      <button
        class="md:hidden text-gray-400 hover:text-white transition"
        @click="toggleMobile"
        aria-label="Toggle menu"
      >
        <i class="fas text-2xl" :class="mobileOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>

    </div>

    <!-- Mobile Dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div v-if="mobileOpen" class="md:hidden absolute right-4 top-full mt-2 z-50">

        <div class="bg-black/80 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden min-w-[210px] shadow-2xl shadow-black/60">

          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="flex items-center gap-3 px-5 py-3 text-gray-300 font-medium border-b border-gray-800/60 last:border-0 hover:bg-gray-900 hover:text-[#2563EB] transition active:scale-[0.97]"
            :class="{ 'text-[#2563EB] bg-gray-900/50': activeSection === item.id }"
            @click="setActive(item.id)"
          >

            <i :class="`fas ${item.icon} text-xs opacity-70`"></i>

            <span
              class="w-1.5 h-1.5 rounded-full bg-[#2563EB] transition-opacity"
              :class="activeSection === item.id ? 'opacity-100' : 'opacity-0'"
            ></span>

            {{ item.label }}

          </a>

        </div>

      </div>
    </Transition>

  </nav>
</template>