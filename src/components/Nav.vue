<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const mobileOpen = ref(false)
const activeSection = ref('home')

const navItems = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'stack',    label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact' },
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
  document.querySelectorAll('section[id]').forEach((section) => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) activeSection.value = e.target.id
      })
    }, { threshold: 0.4 })
    obs.observe(section)
    observers.push(obs)
  })
})

onUnmounted(() => {
  observers.forEach((obs) => obs.disconnect())
})
</script>

<template>
  <nav class="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between relative">
      <a href="#home" class="block">
        <img src="/assets/Screenshot%202026-02-12%20170409.png" alt="Mmuso Code" class="logo-img">
      </a>
      <div class="hidden md:flex items-center space-x-8 text-gray-300 font-medium">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="nav-link hover:text-[#2563EB] transition"
          :class="{ active: activeSection === item.id }"
          @click="setActive(item.id)"
        >{{ item.label }}</a>
      </div>
      <button
        class="md:hidden text-gray-400 hover:text-white transition cursor-pointer focus:outline-none"
        @click="toggleMobile"
      >
        <i class="fas text-2xl" :class="mobileOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu md:hidden" :class="{ show: mobileOpen }">
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="`#${item.id}`"
        class="nav-link"
        :class="{ active: activeSection === item.id }"
        @click="setActive(item.id)"
      >{{ item.label }}</a>
    </div>
  </nav>
</template>