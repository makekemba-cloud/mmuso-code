<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'
import PageLoader  from './components/PageLoader.vue'
import Popup       from './components/Popup.vue'
import Nav         from './components/Nav.vue'
import Hero        from './components/Hero.vue'
import Stats       from './components/Stats.vue'
import About       from './components/About.vue'
import Expertise   from './components/Expertise.vue'
import Process     from './components/Process.vue'
import Approach    from './components/Approach.vue'
import Projects    from './components/Projects.vue'
import WhyUs       from './components/WhyUs.vue'
import CTA         from './components/CTA.vue'
import Contact     from './components/Contact.vue'
import Footer      from './components/Footer.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import WhatsApp    from './components/WhatsApp.vue'
import { useTracker } from './composables/useTracker'
import Reviews     from './components/Reviews.vue'   // ← import tracker

const popupRef = ref<InstanceType<typeof Popup> | null>(null)
const route = useRoute()

// Hide public elements on admin routes
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

function showPopup() {
  popupRef.value?.show()
}

// Scroll reveal logic
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
}

// --- Initialize tracker ---
// This will automatically track page views, clicks on data-track elements, and page duration.
useTracker();

// --- Lifecycle ---
onMounted(() => {
  if (route.path === '/') {
    initScrollReveal()
  }
})

// Watch for route changes: when we return to home, re-run scroll reveal
watch(() => route.path, (newPath) => {
  if (newPath === '/') {
    nextTick(() => {
      initScrollReveal()
    })
  }
})
</script>

<template>
  <div class="bg-[#0a0a0a] text-gray-200 antialiased">
    <PageLoader />
    <Popup ref="popupRef" />

    <!-- Public navigation – hidden on admin routes -->
    <Nav v-if="!isAdminRoute" />

    <!-- Show homepage content ONLY when on root path -->
    <div v-if="route.path === '/'">
      <div class="reveal"><Hero /></div>
      <div class="reveal"><Stats /></div>
      <div class="reveal"><About /></div>
      <div class="reveal"><Expertise /></div>
      <div class="reveal"><Process /></div>
      <div class="reveal"><Approach /></div>
      <div class="reveal"><Projects /></div>
      <div class="reveal"><WhyUs /></div>
       <div class="reveal"><Reviews /></div>
      <div class="reveal"><CTA /></div>
      <div class="reveal"><Contact @show-popup="showPopup" /></div>
    </div>

    <!-- Show legal pages, admin, and other routes here -->
    <router-view v-else @show-popup="showPopup" />

    <!-- Public footer – hidden on admin routes -->
    <Footer v-if="!isAdminRoute" />

    <!-- Floating elements – hidden on admin routes -->
    <ScrollToTop v-if="!isAdminRoute" />
    <WhatsApp v-if="!isAdminRoute" />
  </div>
</template>

<style>
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>