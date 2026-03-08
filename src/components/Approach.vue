<script setup lang="ts">
interface ApproachItem {
  icon: string
  title: string
  description: string
}

const items: ApproachItem[] = [
  { icon: 'fa-sync-alt',    title: 'Agile Methodology',   description: 'Iterative development with continuous client collaboration' },
  { icon: 'fa-code',        title: 'Technical Excellence', description: 'Clean code, best practices, and robust architecture' },
  { icon: 'fa-paint-brush', title: 'Intuitive UX',         description: 'User-centered design that delights and converts' },
]
</script>

<template>
  <section class="pb-20 bg-[#000000]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        Our <span class="text-[#2563EB]">Approach</span>
      </h2>
      <div class="grid md:grid-cols-3 gap-12">
        <div
          v-for="item in items"
          :key="item.title"
          class="text-center"
        >
          <div class="w-16 h-16 bg-[#2563EB]/10 rounded-full flex items-center justify-center text-[#2563EB] text-2xl mx-auto mb-4">
            <i :class="`fas ${item.icon}`"></i>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">{{ item.title }}</h3>
          <p class="text-gray-400">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>