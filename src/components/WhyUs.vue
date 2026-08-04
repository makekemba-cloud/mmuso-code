<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Advantage {
  icon: string
  title: string
  description: string
}

const advantages: Advantage[] = [
  {
    icon: 'fa-rocket',
    title: 'Innovative Solutions',
    description: 'We leverage modern technologies and industry best practices to deliver reliable, scalable, and future-ready solutions tailored to your business.',
  },
  {
    icon: 'fa-shield-alt',
    title: 'Secure & Reliable',
    description: 'From secure authentication to data protection and system reliability, we build solutions you can trust.',
  },
  {
    icon: 'fa-bolt',
    title: 'Fast & Scalable',
    description: 'Our solutions are designed to perform today while remaining flexible enough to support your business as it grows.',
  },
  {
    icon: 'fa-handshake',
    title: 'Client-Focused Partnership',
    description: 'We believe in long-term partnerships built on communication, transparency, and ongoing support—because your success is our success.',
  },
]

const industries = [
  { icon: 'fa-lightbulb', label: 'Startups' },
  { icon: 'fa-store', label: 'Small & Medium Businesses' },
  { icon: 'fa-building', label: 'Corporate Companies' },
  { icon: 'fa-heart', label: 'NGOs & NPOs' },
  { icon: 'fa-gavel', label: 'Law Firms' },
  { icon: 'fa-heartbeat', label: 'Healthcare' },
  { icon: 'fa-shopping-cart', label: 'Retail & eCommerce' },
  { icon: 'fa-hard-hat', label: 'Construction' },
  { icon: 'fa-running', label: 'Sports Clubs' },
  { icon: 'fa-graduation-cap', label: 'Schools & Educational Institutions' },
]

// Split into two rows
const firstRow = industries.slice(0, Math.ceil(industries.length / 2))
const secondRow = industries.slice(Math.ceil(industries.length / 2))

// For mobile marquee: duplicate each row for seamless loop
const firstRowMarquee = [...firstRow, ...firstRow]
const secondRowMarquee = [...secondRow, ...secondRow]

const clients = [
  { name: 'Big Small Insights', url: 'https://www.bigsmallinsights.co.za/' },
  { name: 'Sibaleka Nani Athletics Club', url: 'https://sibalekananiac.co.za' },
  { name: 'Let Us Heal', url: 'https://letusheal.co.za/' },
  { name: 'Sizofakulwazi Foundation', url: 'https://www.sizofakulwazifoundation.org.za/' },
  { name: 'Mathinyani Plumbing Services', url: 'https://www.mathinyaniplumbing.co.za/' },
  { name: 'Startups Across South Africa', url: null },
]

// Reactive mobile detection
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// Clients arrays (duplicated for mobile marquee)
const clientsForMobile = [...clients, ...clients]
const clientsForDesktop = clients
</script>

<template>
  <section id="why-us" class="relative py-16 md:py-20 bg-gradient-to-b from-black via-[#050816] to-black border-t border-gray-800 overflow-hidden">
    
    <!-- Floating glowing orbs -->
    <div class="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>
    <div class="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>
    
    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

      <!-- Badge -->
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-xs sm:text-sm text-[#2563EB] font-semibold">Why Us</span>
        </span>
      </div>

      <!-- Title -->
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-4">
        Why Choose <span class="text-[#2563EB]">Mmuso Code</span>
      </h2>

      <!-- Intro paragraph -->
      <p class="text-center text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16 text-sm sm:text-base md:text-lg">
        We combine innovation, reliability, and business-focused thinking to deliver technology solutions that help businesses grow, operate more efficiently, and succeed in the digital world.
      </p>

      <!-- Advantages grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 mb-16 md:mb-20">
        <div
          v-for="item in advantages"
          :key="item.title"
          class="bg-[#0a0a0a] p-5 md:p-6 rounded-2xl border border-gray-800 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.12)]"
        >
          <i :class="`fas ${item.icon} text-[#2563EB] text-2xl md:text-3xl mb-3 md:mb-4 block`"></i>
          <h3 class="text-base md:text-lg font-semibold text-white mb-2">{{ item.title }}</h3>
          <p class="text-gray-400 text-xs sm:text-sm leading-relaxed">{{ item.description }}</p>
        </div>
      </div>

      <!-- Industries divider -->
      <div class="relative mb-12 md:mb-16 flex items-center justify-center">
        <div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        <span class="mx-4 sm:mx-6 px-2 sm:px-4 py-1 text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 bg-[#050816] border border-gray-700 rounded-full backdrop-blur-sm whitespace-nowrap">
          Industries We Serve
        </span>
        <div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </div>

      <!-- Industries – Mobile: two marquee rows, Desktop: two static rows -->
      <!-- Mobile -->
      <div v-if="isMobile" class="flex flex-col gap-3 sm:gap-4 mb-12 md:mb-16 overflow-hidden">
        <!-- Row 1 marquee (moves left) -->
        <div class="relative overflow-hidden mask-gradient">
          <div class="marquee-track flex gap-3 sm:gap-4 animate-scroll">
            <div
              v-for="(ind, index) in firstRowMarquee"
              :key="'row1-' + index"
              class="flex items-center gap-2 sm:gap-3 bg-[#0a0a0a] border border-gray-800 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)] flex-shrink-0"
            >
              <i :class="`fas ${ind.icon} text-[#2563EB] text-base sm:text-xl`"></i>
              <span class="text-white font-medium text-sm sm:text-base whitespace-nowrap">{{ ind.label }}</span>
            </div>
          </div>
        </div>
        <!-- Row 2 marquee (moves right) -->
        <div class="relative overflow-hidden mask-gradient">
          <div class="marquee-track flex gap-3 sm:gap-4 animate-scroll-reverse">
            <div
              v-for="(ind, index) in secondRowMarquee"
              :key="'row2-' + index"
              class="flex items-center gap-2 sm:gap-3 bg-[#0a0a0a] border border-gray-800 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)] flex-shrink-0"
            >
              <i :class="`fas ${ind.icon} text-[#2563EB] text-base sm:text-xl`"></i>
              <span class="text-white font-medium text-sm sm:text-base whitespace-nowrap">{{ ind.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop (two rows, static) -->
      <div v-else class="flex flex-col gap-3 sm:gap-4 mb-12 md:mb-16 overflow-hidden">
        <!-- Row 1 -->
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
          <div
            v-for="ind in firstRow"
            :key="ind.label"
            class="flex items-center gap-2 sm:gap-3 bg-[#0a0a0a] border border-gray-800 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)]"
          >
            <i :class="`fas ${ind.icon} text-[#2563EB] text-base sm:text-xl`"></i>
            <span class="text-white font-medium text-sm sm:text-base">{{ ind.label }}</span>
          </div>
        </div>
        <!-- Row 2 -->
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
          <div
            v-for="ind in secondRow"
            :key="ind.label"
            class="flex items-center gap-2 sm:gap-3 bg-[#0a0a0a] border border-gray-800 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)]"
          >
            <i :class="`fas ${ind.icon} text-[#2563EB] text-base sm:text-xl`"></i>
            <span class="text-white font-medium text-sm sm:text-base">{{ ind.label }}</span>
          </div>
        </div>
      </div>

      <!-- Two-part Trust section -->
      <div class="space-y-10 md:space-y-12">
        <!-- Trusted by Businesses & Organizations -->
        <div>
          <p class="text-xs sm:text-sm uppercase tracking-widest text-gray-500 text-center mb-6">
            Trusted by Businesses & Organizations
          </p>
          <!-- Mobile: marquee, Desktop: static flex wrap -->
          <div class="relative overflow-hidden mask-gradient md:mask-none">
            <div class="marquee-track flex gap-4 sm:gap-6 items-center animate-scroll md:animate-none md:flex-wrap md:justify-center">
              <template v-for="(client, index) in (isMobile ? clientsForMobile : clientsForDesktop)" :key="index">
                <a
                  v-if="client.url"
                  :href="client.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 font-semibold text-sm sm:text-lg hover:text-[#2563EB] transition flex-shrink-0"
                >
                  {{ client.name }}
                </a>
                <span
                  v-else
                  class="text-gray-400 font-semibold text-sm sm:text-lg cursor-default flex-shrink-0"
                >
                  {{ client.name }}
                </span>
                <span
                  v-if="index < (isMobile ? clientsForMobile.length - 1 : clientsForDesktop.length - 1)"
                  class="w-px h-4 sm:h-6 bg-gray-700 flex-shrink-0"
                ></span>
              </template>
            </div>
          </div>
        </div>

        <!-- Technology Partners (static) -->
        <div>
          <p class="text-xs sm:text-sm uppercase tracking-widest text-gray-500 text-center mb-6">
            Technology Partners
          </p>
          <div class="flex flex-wrap justify-center gap-4 sm:gap-6 items-center">
            <a href="https://khubasitsolutions.co.za/" target="_blank" rel="noopener noreferrer" class="text-gray-400 font-semibold text-sm sm:text-lg hover:text-[#2563EB] transition">Khubas IT Solutions</a>
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

/* Marquee styles */
.mask-gradient {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.md\:mask-none {
  mask-image: none !important;
  -webkit-mask-image: none !important;
}

.marquee-track {
  display: flex;
  width: max-content;
}

/* Row 1: moves left (0 → -50%) */
.animate-scroll {
  animation: scroll-left 35s linear infinite;
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Row 2: moves right (-50% → 0) */
.animate-scroll-reverse {
  animation: scroll-right 35s linear infinite;
}

@keyframes scroll-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

/* Hover pause for both */
.animate-scroll:hover,
.animate-scroll-reverse:hover {
  animation-play-state: paused;
}

/* Disable on desktop */
@media (min-width: 768px) {
  .animate-scroll,
  .animate-scroll-reverse {
    animation: none !important;
    transform: translateX(0) !important;
  }
  .marquee-track {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>