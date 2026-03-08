<script setup lang="ts">
interface ApproachItem {
  icon: string
  title: string
  description: string
}

const items: ApproachItem[] = [
  {
    icon: 'fa-lightbulb',
    title: 'Understand the Problem',
    description: 'We start by understanding the client’s idea, goals, and technical requirements before writing any code.'
  },
  {
    icon: 'fa-code',
    title: 'Build with Modern Tech',
    description: 'Using modern frameworks, clean architecture, and scalable systems to build reliable digital platforms.'
  },
  {
    icon: 'fa-shield-alt',
    title: 'Security First',
    description: 'Authentication, access control, and secure data handling are built into every system from the start.'
  }
]
</script>

<template>
  <section class="pb-20 bg-[#000000]">
    <div class="relative mb-16 flex items-center justify-center">
  
  <!-- Left Line -->
  <div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

  <!-- Label -->
  <span class="mx-6 px-4 py-1 text-xs uppercase tracking-wider text-gray-500 bg-[#000] border border-gray-800 rounded-full">
    Our Process
  </span>

  <!-- Right Line -->
  <div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

</div>
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