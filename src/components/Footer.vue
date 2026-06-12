<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Navigation links
const navLinks = [
  { href: '#home',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#process',   label: 'Process' },
  { href: '#projects', label: 'Projects' },
  { href: '#why-us',   label: 'Why Us' },
  { href: '#contact',  label: 'Contact' },
]

// Social links
const socials = [
   { icon: 'fab fa-linkedin-in', href: 'https://linkedin.com/company/mmusocode', label: 'LinkedIn',  color: 'hover:text-blue-400 hover:border-blue-400' },
  { icon: 'fab fa-whatsapp',    href: 'https://wa.me/27791189866',                 label: 'WhatsApp',  color: 'hover:text-green-400 hover:border-green-400' },
  { icon: 'fab fa-facebook-f',  href: 'https://www.facebook.com/mmusocode',          label: 'Facebook',  color: 'hover:text-blue-500 hover:border-blue-500' },
  { icon: 'fab fa-instagram',   href: 'https://www.instagram.com/mmusocode/',        label: 'Instagram', color: 'hover:text-pink-400 hover:border-pink-400' },

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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative bg-gradient-to-b from-black via-[#050816] to-black border-t border-gray-800 py-8 md:py-10 overflow-hidden">
    
    <!-- Floating glowing orbs (reduced opacity on mobile for performance) -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]"></div>
      <div class="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>
    </div>

    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      
      <!-- Top row: Logo + Nav + Socials - improved stacking on mobile -->
      <div class="flex flex-col items-center gap-8 md:flex-row md:justify-between md:items-center md:gap-6">
        <!-- Logo - larger touch area on mobile -->
        <a href="#home" class="block transition-transform duration-300 hover:scale-105 active:scale-95">
          <img src="/assets/mmuso-code-logoi.png" alt="Mmuso Code" class="logo-img max-h-12 md:max-h-12 w-auto">
        </a>

        <!-- Navigation links - better wrapping and spacing on mobile -->
        <div class="flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs sm:text-sm">
          <a 
            v-for="link in navLinks" 
            :key="link.href" 
            :href="link.href"
            class="text-gray-400 transition-all duration-300 hover:text-[#2563EB] hover:-translate-y-0.5 active:text-[#2563EB]"
          >
            {{ link.label }}
          </a>
        </div>

        <!-- Social icons - responsive sizing and touch-friendly -->
        <div class="flex items-center gap-3">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            :aria-label="social.label"
            target="_blank"
            rel="noopener noreferrer"
            class="w-8 h-8 sm:w-9 sm:h-9 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 hover:text-[#2563EB] hover:border-[#2563EB] hover:scale-110 active:scale-95 hover:shadow-[0_0_10px_rgba(37,99,235,0.5)]"
          >
            <i :class="`${social.icon} text-sm sm:text-base`"></i>
          </a>
        </div>
      </div>

      <!-- Mini CTA - readable on mobile -->
      <div class="text-center mt-8 text-gray-400 text-sm sm:text-base">
        Ready to build your next project? 
        <a href="#contact" class="text-[#2563EB] font-semibold transition-all duration-300 hover:text-blue-400 hover:underline active:text-blue-300">Get in touch</a>
      </div>

      <!-- Row 1: Copyright + Legal Links + Built With - stacked on mobile -->
      <div class="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p class="text-xs sm:text-sm text-gray-400">© {{ new Date().getFullYear() }} Mmuso Code (Pty) Ltd. All rights reserved.</p>

        <!-- Legal links - better touch spacing -->
        <div class="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs">
          <router-link to="/privacy-policy" class="text-gray-500 transition-all duration-300 hover:text-[#2563EB] hover:-translate-y-0.5 active:text-[#2563EB]">Privacy Policy</router-link>
          <span class="text-gray-600">•</span>
          <router-link to="/terms-conditions" class="text-gray-500 transition-all duration-300 hover:text-[#2563EB] hover:-translate-y-0.5 active:text-[#2563EB]">Terms & Conditions</router-link>
          <span class="text-gray-600">•</span>
          <router-link to="/registration" class="text-gray-500 transition-all duration-300 hover:text-[#2563EB] hover:-translate-y-0.5 active:text-[#2563EB]">Registration</router-link>
        </div>

        <!-- Built with tech stack – each "+" is a link to admin login -->
        <p class="text-[11px] sm:text-xs text-gray-600">
          Built with Vue 3
          <router-link to="/admin/login" class="admin-login-link">+</router-link>
          TypeScript
          <router-link to="/admin/login" class="admin-login-link">+</router-link>
          Tailwind CSS
        </p>
      </div>

      <!-- Row 2: Founder credit + Registration number - mobile responsive -->
      <div class="flex flex-col md:flex-row justify-center items-center mt-6 text-xs">
        <!-- Centered credit -->
        <div class="text-gray-500 text-center">
          Let’s Build The Future <span class="text-[#2563EB]">Together</span> &gt; 
          <a 
            href="https://makekembavhutali.co.za" 
            target="_blank" 
            rel="noopener" 
            class="transition-all duration-300 hover:text-[#2563EB] hover:underline active:text-[#2563EB]"
          >
            Makekemba Vhutali
          </a> &lt;
        </div>
        <!-- Registration number on desktop (right-aligned) and mobile (below) -->
        <div class="hidden md:block text-gray-500 ml-auto">
          Reg. No: 2026/372467/07
        </div>
        <div class="block md:hidden text-gray-500 text-center mt-2">
          Reg. No: 2026/372467/07
        </div>
      </div>

      <!-- Scroll to top button - larger touch target on mobile -->
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-5 right-5 z-50 bg-[#2563EB] text-white w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <i class="fas fa-arrow-up text-sm sm:text-base"></i>
      </button>
    </div>
  </footer>
</template>

<style scoped>
/* Logo image - responsive */
.logo-img {
  max-height: 48px;
  width: auto;
}

/* Improve tap highlights on mobile */
@media (max-width: 768px) {
  a, button {
    -webkit-tap-highlight-color: rgba(37, 99, 235, 0.2);
  }
}
</style>