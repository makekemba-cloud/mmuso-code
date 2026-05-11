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
    icon: 'fa-lightbulb',
    title: 'Strategy & Discovery',
    description:
      'We explore your vision, goals, and technical requirements to create a clear roadmap for success.',
  },
  {
    number: '02',
    icon: 'fa-layer-group',
    title: 'Design & Architecture',
    description:
      'Crafting intuitive user experiences, scalable system architecture, and modern interface designs.',
  },
  {
    number: '03',
    icon: 'fa-code',
    title: 'Development',
    description:
      'Building secure, high-performance digital solutions using modern technologies and clean engineering practices.',
  },
  {
    number: '04',
    icon: 'fa-rocket',
    title: 'Launch & Growth',
    description:
      'Deploying production-ready platforms with continuous support, performance optimization, security updates, and future scalability built-in.',
  },
]
</script>

<template>
  <section id="process" class="relative py-16 md:py-20 bg-gradient-to-b from-black via-[#050816] to-black border-t border-gray-800 overflow-hidden">
    
    <!-- Floating glowing orbs – reduced opacity on mobile -->
    <div class="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#2563EB]/10 blur-[120px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>
    <div class="absolute bottom-10 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

      <!-- Badge (responsive text) -->
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-xs sm:text-sm text-[#2563EB] font-semibold">From Vision to Reality</span>
        </span>
      </div>

      <!-- Title (responsive) -->
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-4">
        How We Bring <span class="text-[#2563EB]">Ideas To Life</span>
      </h2>

      <!-- Intro paragraph (responsive) -->
      <p class="text-center text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16 text-sm sm:text-base md:text-lg">
        A streamlined development process designed to transform ideas into scalable, high-performance digital experiences.
      </p>

      <!-- Steps grid – responsive columns -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">

        <!-- Connector line (desktop only, hidden on mobile & tablet) -->
        <div class="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent z-0"></div>

        <div
          v-for="(step, index) in steps"
          :key="step.title"
          class="relative z-10 bg-[#0a0a0a] p-5 md:p-6 rounded-2xl border border-gray-800 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
        >
          <!-- Step number badge – responsive size -->
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
            {{ step.number }}
          </div>

          <!-- Icon container – responsive -->
          <div class="w-12 h-12 md:w-14 md:h-14 bg-[#2563EB]/10 rounded-full flex items-center justify-center text-[#2563EB] text-xl md:text-2xl mx-auto mt-4 mb-3 md:mb-4">
            <i :class="`fas ${step.icon}`"></i>
          </div>
          
          <h3 class="text-base md:text-lg font-semibold text-white mb-2">{{ step.title }}</h3>
          <p class="text-gray-400 text-xs sm:text-sm leading-relaxed">{{ step.description }}</p>

          <!-- Arrow between steps (desktop only) -->
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

<style scoped>
.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(37, 99, 235, 0.1);
  backdrop-filter: blur(4px);
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(37, 99, 235, 0.3);
}

.pulse-dot {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #3b82f6;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}
</style>