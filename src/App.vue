<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PageLoader  from './components/PageLoader.vue'
import Popup       from './components/Popup.vue'
import Nav         from './components/Nav.vue'
import Hero        from './components/Hero.vue'
import Stats       from './components/Stats.vue'
import About       from './components/About.vue'
import Expertise   from './components/Expertise.vue'
import Process     from './components/Process.vue'
import Approach    from './components/Approach.vue'
import Stack       from './components/Stack.vue'
import Projects    from './components/Projects.vue'
import WhyUs       from './components/WhyUs.vue'
import CTA         from './components/CTA.vue'
import Contact     from './components/Contact.vue'
import Footer      from './components/Footer.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import WhatsApp    from './components/WhatsApp.vue'

const popupRef = ref<InstanceType<typeof Popup> | null>(null)

function showPopup() {
  popupRef.value?.show()
}

// ── Scroll reveal ────────────────────────────────────
onMounted(() => {
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
})
</script>

<template>
  <div class="bg-[#0a0a0a] text-gray-200 antialiased">
    <PageLoader />
    <Popup ref="popupRef" />
    <Nav />
    <div class="reveal"><Hero /></div>
    <div class="reveal"><Stats /></div>
    <div class="reveal"><About /></div>
    <div class="reveal"><Expertise /></div>
    <div class="reveal"><Process /></div>
    <div class="reveal"><Approach /></div>
    <div class="reveal"><Stack /></div>
    <div class="reveal"><Projects /></div>
    <div class="reveal"><WhyUs /></div>
    <div class="reveal"><CTA /></div>
    <div class="reveal"><Contact @show-popup="showPopup" /></div>
    <Footer />
    <ScrollToTop />
    <WhatsApp />
  </div>
</template>

<style>
/* Scroll reveal */
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