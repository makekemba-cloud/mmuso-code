<script setup lang="ts">
interface ProcessStep {
  number: string
  icon: string
  title: string
  description: string
}

const steps: ProcessStep[] = [
  {
    number: '01',
    icon: 'fa-search',
    title: 'Discovery',
    description: 'Understand the client\'s idea, business goals, and requirements. We listen first, then plan.',
  },
  {
    number: '02',
    icon: 'fa-pencil-ruler',
    title: 'Design',
    description: 'Create wireframes, architecture, and technical planning to set a solid foundation.',
  },
  {
    number: '03',
    icon: 'fa-code',
    title: 'Development',
    description: 'Build the platform using modern technologies, clean code, and best practices.',
  },
  {
    number: '04',
    icon: 'fa-rocket',
    title: 'Launch & Support',
    description: 'Deploy the product with full infrastructure setup and provide ongoing improvements.',
  },
]
</script>

<template>
  <section id="process" class="py-20 bg-[#000000] border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-sm text-[#2563EB] font-semibold">How We Work</span>
        </span>
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-center text-white mb-4">
        Our <span class="text-[#2563EB]">Process</span>
      </h2>
      <p class="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
        A clear, structured workflow that takes your idea from concept to a live, production-ready product.
      </p>

      <!-- Steps -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

        <!-- Connector line (desktop only) -->
        <div class="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent z-0"></div>

        <div
          v-for="(step, index) in steps"
          :key="step.title"
          class="relative z-10 bg-[#0a0a0a] p-6 rounded-2xl border border-gray-800 hover-lift text-center"
        >
          <!-- Step number badge -->
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-xs font-bold px-3 py-1 rounded-full">
            {{ step.number }}
          </div>

          <div class="w-14 h-14 bg-[#2563EB]/10 rounded-full flex items-center justify-center text-[#2563EB] text-2xl mx-auto mt-4 mb-4">
            <i :class="`fas ${step.icon}`"></i>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">{{ step.title }}</h3>
          <p class="text-gray-400 text-sm leading-relaxed">{{ step.description }}</p>

          <!-- Arrow between steps (desktop) -->
          <div
            v-if="index < steps.length - 1"
            class="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#0a0a0a] border border-[#2563EB]/30 rounded-full items-center justify-center text-[#2563EB] text-xs"
          >
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>