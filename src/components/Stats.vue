<script setup lang="ts">
interface Stat {
  value: string
  label: string
  icon: string
}

const stats: Stat[] = [
  { value: '6+',   label: 'Projects Delivered',   icon: 'fa-folder-open' },
  { value: '2+',   label: 'Years Experience',      icon: 'fa-calendar-alt' },
  { value: '100%', label: 'Client Satisfaction',   icon: 'fa-star' },
  { value: '24/7', label: 'Support Available',     icon: 'fa-headset' },
]
</script>

<template>
  <section class="bg-[#000000] border-y border-gray-800 py-10 md:py-12">
    <div class="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center group transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Icon container – responsive sizing -->
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center text-[#2563EB] text-base sm:text-xl mx-auto mb-2 sm:mb-3 group-hover:bg-[#2563EB]/20 group-hover:scale-110 transition-all duration-300">
            <i :class="`fas ${stat.icon}`"></i>
          </div>
          <!-- Value – responsive font size -->
          <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0.5 sm:mb-1">{{ stat.value }}</div>
          <!-- Label – responsive text and tracking -->
          <div class="text-[11px] sm:text-sm text-gray-400 uppercase tracking-wider">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: smooth transitions already applied via Tailwind */
</style>