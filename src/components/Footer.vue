<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Navigation links
const navLinks = [
  { href: '#home',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#stack',    label: 'Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact' },
]

// Social links
const socials = [
  { icon: 'fab fa-github',      href: 'https://github.com/makekemba-cloud',        label: 'GitHub' },
  { icon: 'fab fa-linkedin-in', href: 'https://linkedin.com/in/makekemba-vhutali', label: 'LinkedIn' },
  { icon: 'fab fa-twitter',     href: 'https://x.com/Makekembavhutal',             label: 'Twitter' },
  { icon: 'fab fa-instagram',   href: 'https://www.instagram.com/mmuso.0/',        label: 'Instagram' },
  { icon: 'fab fa-facebook-f',  href: 'https://www.facebook.com/mmusocode',          label: 'Facebook' },
]

// Scroll-to-top logic
const showScrollTop = ref(false)

function handleScroll() {
  showScrollTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <footer class="bg-black border-t border-gray-800 py-10 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <!-- Logo -->
        <a href="#home" class="block">
          <img src="/assets/Screenshot%202026-02-12%20170354.png" alt="Mmuso Code" class="logo-img">
        </a>

        <!-- Navigation -->
        <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
          <a v-for="link in navLinks" :key="link.href" :href="link.href"
            class="hover:text-[#2563EB] transition">{{ link.label }}</a>
        </div>

        <!-- Social Icons -->
        <div class="flex items-center gap-3">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            :aria-label="social.label"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon w-9 h-9 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 transition-all hover:text-[#2563EB] hover:border-[#2563EB] hover:scale-110 hover:shadow-md"
          >
            <i :class="social.icon"></i>
          </a>
        </div>
      </div>

      <!-- Mini CTA -->
      <div class="text-center mt-6 text-gray-400">
        Ready to build your next project? 
        <a href="#contact" class="text-[#2563EB] font-semibold hover:underline">Get in touch</a>
      </div>

      <!-- Copyright & Built With -->
      <div class="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <p class="text-sm text-gray-400">© {{ new Date().getFullYear() }} Mmuso Code. All rights reserved.</p>
        <p class="text-xs text-gray-600">Built with Vue 3 + TypeScript + Tailwind CSS</p>
      </div>

      <!-- ===== UPDATED: Founder credit with link ===== -->
      <div class="text-center mt-4 text-gray-500 text-xs">
        Innovative Software <span class="text-[#2563EB]">Solutions</span> &gt; 
        <a 
          href="https://makekembavhutali.co.za" 
          target="_blank" 
          rel="noopener" 
          class="hover:text-[#2563EB] underline"
        >
          Makekemba Vhutali
        </a> &lt;
      </div>
      <!-- ===== End update ===== -->

    </div>
  </footer>
</template>

<style scoped>
/* Animate social icons */
.social-icon {
  transition: all 0.3s ease;
}
</style>