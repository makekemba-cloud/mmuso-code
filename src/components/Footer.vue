<script setup lang="ts">
const navLinks = [
  { href: '#home',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#stack',    label: 'Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact' },
]
</script>

<template>
  <footer class="bg-black border-t border-gray-800 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <a href="#home" class="block mb-4 md:mb-0">
          <img src="/assets/Screenshot%202026-02-12%20170354.png" alt="Mmuso Code" class="logo-img">
        </a>
        <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="hover:text-[#2563EB] transition"
          >{{ link.label }}</a>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-gray-400">© 2025 Mmuso Code. All rights reserved.</p>
      </div>
      <div class="text-center mt-6 text-gray-500 text-xs">
        Innovative Software <span class="text-[#2563EB]">Solutions</span> &gt; Makekemba Vhutali
      </div>
    </div>
  </footer>
</template>