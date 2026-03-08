<script setup lang="ts">
interface Stat {
  value: string
  label: string
  icon: string
}

const stats: Stat[] = [
  { value: '3+',   label: 'Projects Delivered',   icon: 'fa-folder-open' },
  { value: '2+',   label: 'Years Experience',      icon: 'fa-calendar-alt' },
  { value: '100%', label: 'Client Satisfaction',   icon: 'fa-star' },
  { value: '24/7', label: 'Support Available',     icon: 'fa-headset' },
]
</script>

<template>
  <section class="bg-[#000000] border-y border-gray-800 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center group"
        >
          <div class="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center text-[#2563EB] text-xl mx-auto mb-3 group-hover:bg-[#2563EB]/20 transition">
            <i :class="`fas ${stat.icon}`"></i>
          </div>
          <div class="text-3xl md:text-4xl font-bold text-white mb-1">{{ stat.value }}</div>
          <div class="text-sm text-gray-400 uppercase tracking-wider">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>