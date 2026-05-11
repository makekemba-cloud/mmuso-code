<script setup lang="ts">
interface ExpertiseItem {
  icon: string
  title: string
  description: string
}

const items: ExpertiseItem[] = [
  { 
    icon: 'fa-globe',
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built for performance and scalability.'
  },
  { 
    icon: 'fa-server',
    title: 'Backend Systems & APIs',
    description: 'Secure and scalable backend systems with clean architecture and reliable API design.'
  },
  { 
    icon: 'fa-database',
    title: 'Database Design',
    description: 'Efficient and structured database solutions for reliable and scalable data management.'
  },
  { 
    icon: 'fa-mobile-alt',
    title: 'Mobile App Development',
    description: 'Cross-platform mobile applications designed for Android and iOS using modern frameworks.'
  },
  { 
    icon: 'fa-shield-alt',
    title: 'Security & Authentication',
    description: 'Secure login systems, role-based access control, and protection for modern applications.'
  },
  { 
    icon: 'fa-cloud',
    title: 'Deployment & Cloud Hosting',
    description: 'Fast and reliable deployment using modern cloud platforms and CI/CD workflows.'
  },
  { 
    icon: 'fa-chart-line',
    title: 'Performance Optimization',
    description: 'Speed optimization, SEO improvements, and Core Web Vitals tuning for better user experience.'
  },
]
</script>

<template>
  <section id="expertise" class="relative py-16 md:py-20 bg-gradient-to-b from-black via-[#050816] to-black overflow-hidden">
    
    <!-- Floating glowing orbs – reduced opacity on mobile for performance -->
    <div class="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>
    <div class="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>
    
    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      
      <!-- Badge -->
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-xs sm:text-sm text-[#2563EB] font-semibold">Core Competencies</span>
        </span>
      </div>
      
      <!-- Title -->
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-4">
        What We <span class="text-[#2563EB]">Build</span>
      </h2>
      
      <!-- Intro paragraph -->
      <p class="text-center text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16 text-sm sm:text-base md:text-lg">
        A full‑stack development studio specializing in modern web, mobile, cloud, and AI‑driven solutions.
      </p>

      <!-- Expertise flex container – centered, wrap, with responsive card widths -->
      <div class="flex flex-wrap justify-center -mx-2 md:-mx-3">
        <div
          v-for="item in items"
          :key="item.title"
          class="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] mx-2 md:mx-3 mb-5 md:mb-8"
        >
          <div class="bg-[#0a0a0a] p-5 md:p-6 rounded-2xl border border-gray-800 transition-all duration-500 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.12)] h-full">
            <div class="w-10 h-10 md:w-12 md:h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center text-[#2563EB] text-xl md:text-2xl mb-3 md:mb-4">
              <i :class="`fas ${item.icon}`"></i>
            </div>
            <h3 class="text-lg md:text-xl font-semibold text-white mb-2">{{ item.title }}</h3>
            <p class="text-sm md:text-base text-gray-400 leading-relaxed">{{ item.description }}</p>
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