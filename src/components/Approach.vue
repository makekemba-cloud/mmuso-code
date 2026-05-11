<script setup lang="ts">
interface ApproachItem {
  icon: string
  title: string
  description: string
}

const items: ApproachItem[] = [
  {
    icon: 'fa-lightbulb',
    title: 'Discover & Align',
    description: 'We dive deep into your vision, goals, and technical needs before a single line of code is written.'
  },
  {
    icon: 'fa-code',
    title: 'Engineer with Excellence',
    description: 'Modern frameworks, clean architecture, and scalable systems power every digital solution we build.'
  },
  {
    icon: 'fa-shield-alt',
    title: 'Trust by Default',
    description: 'Authentication, access control, and secure data handling are baked in from day one.'
  }
]
</script>

<template>
  <section class="relative py-16 md:py-20 bg-gradient-to-b from-black via-[#050816] to-black overflow-hidden">
    
    <!-- Floating glowing orbs – reduced opacity on mobile -->
    <div class="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>
    <div class="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>
    
    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      
      <!-- Elegant divider – responsive margins -->
      <div class="relative mb-10 md:mb-16 flex items-center justify-center">
        <div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        <span class="mx-4 sm:mx-6 px-3 sm:px-4 py-1 text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 bg-[#050816] border border-gray-700 rounded-full backdrop-blur-sm whitespace-nowrap">
          Our Philosophy
        </span>
        <div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </div>

      <!-- Title – responsive -->
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-4">
        How We <span class="text-[#2563EB]">Think</span>
      </h2>
      
      <!-- Intro paragraph – responsive -->
      <p class="text-center text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16 text-sm sm:text-base md:text-lg">
        Beyond the workflow — these are the principles that guide every decision, every line of code, and every client partnership.
      </p>

      <!-- Approach grid – responsive: 1 column on mobile, 3 columns on desktop -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="item in items"
          :key="item.title"
          class="bg-[#0a0a0a] p-5 md:p-6 rounded-2xl border border-gray-800 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.12)]"
        >
          <!-- Icon container – responsive -->
          <div class="w-14 h-14 md:w-16 md:h-16 bg-[#2563EB]/10 rounded-full flex items-center justify-center text-[#2563EB] text-xl md:text-2xl mx-auto mb-3 md:mb-4">
            <i :class="`fas ${item.icon}`"></i>
          </div>
          <h3 class="text-lg md:text-xl font-semibold text-white mb-2">{{ item.title }}</h3>
          <p class="text-sm md:text-base text-gray-400 leading-relaxed">{{ item.description }}</p>
        </div>
      </div>
      
    </div>
  </section>
</template>

<style scoped>
/* No custom styles needed – uses Tailwind utilities */
</style>