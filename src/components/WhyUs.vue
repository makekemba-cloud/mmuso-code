<script setup lang="ts">
interface Advantage {
  icon: string
  title: string
  description: string
}

const advantages: Advantage[] = [
  {
    icon: 'fa-rocket',
    title: 'Modern Technologies',
    description: 'Our solutions are built with modern technologies that ensure speed, reliability, security, and long-term scalability.',
  },
 {
    icon: 'fa-shield-alt',
    title: 'Security First',
    description: 'We prioritise security with protected authentication, role-based access control, and reliable data management to keep your platform safe and trustworthy.',
  },
  {
    icon: 'fa-bolt',
    title: 'Fast & Scalable',
    description: 'Our systems are designed for speed, performance, and scalability — allowing your business to grow without limitations.',
  },
  {
    icon: 'fa-handshake',
    title: 'Client-Focused Partnership',
    description: 'We work closely with you from concept to launch, delivering transparent communication, reliable support, and long-term value.',
  },
]

const industries = [
  { icon: 'fa-lightbulb',    label: 'Startups' },
  { icon: 'fa-store',        label: 'Small Businesses' },
  { icon: 'fa-running',      label: 'Sports Clubs' },
  { icon: 'fa-graduation-cap', label: 'Educational Platforms' },
]
</script>

<template>
  <section id="why-us" class="relative py-16 md:py-20 bg-gradient-to-b from-black via-[#050816] to-black border-t border-gray-800 overflow-hidden">
    
    <!-- Floating glowing orbs (reduced opacity on mobile) -->
    <div class="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>
    <div class="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>
    
    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

      <!-- Badge (responsive text) -->
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-xs sm:text-sm text-[#2563EB] font-semibold">Why Us</span>
        </span>
      </div>

      <!-- Title (responsive) -->
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-4">
        Why Choose <span class="text-[#2563EB]">Mmuso Code</span>
      </h2>

      <!-- Intro paragraph (responsive) -->
      <p class="text-center text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16 text-sm sm:text-base md:text-lg">
        We combine modern engineering, ironclad security, and a ruthless focus on results — so your digital product not only works, but wins.
      </p>

      <!-- Advantages grid – responsive columns and gaps -->
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

      <!-- Elegant divider (responsive) -->
      <div class="relative mb-12 md:mb-16 flex items-center justify-center">
        <div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        <span class="mx-4 sm:mx-6 px-2 sm:px-4 py-1 text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 bg-[#050816] border border-gray-700 rounded-full backdrop-blur-sm whitespace-nowrap">
          Industries We Serve
        </span>
        <div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </div>

      <!-- Industries – responsive gap and padding -->
      <div class="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 md:mb-16">
        <div
          v-for="ind in industries"
          :key="ind.label"
          class="flex items-center gap-2 sm:gap-3 bg-[#0a0a0a] border border-gray-800 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)]"
        >
          <i :class="`fas ${ind.icon} text-[#2563EB] text-base sm:text-xl`"></i>
          <span class="text-white font-medium text-sm sm:text-base">{{ ind.label }}</span>
        </div>
      </div>

      <!-- Trusted By – responsive text and flex wrap -->
      <div class="text-center">
        <p class="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mb-6">Trusted By</p>
        <div class="flex flex-wrap justify-center gap-4 sm:gap-6 items-center">
          <a href="https://www.bigsmallinsights.co.za/" target="_blank" rel="noopener noreferrer" class="text-gray-400 font-semibold text-sm sm:text-lg hover:text-[#2563EB] transition">Big Small Insights</a>
          <div class="w-px h-4 sm:h-6 bg-gray-700 hidden sm:block"></div>
          <a href="https://sibalekananiac.co.za" target="_blank" rel="noopener noreferrer" class="text-gray-400 font-semibold text-sm sm:text-lg hover:text-[#2563EB] transition">SNAC Athletics Club</a>
          <div class="w-px h-4 sm:h-6 bg-gray-700 hidden sm:block"></div>
          <a href="https://letusheal.co.za/" target="_blank" rel="noopener noreferrer" class="text-gray-400 font-semibold text-sm sm:text-lg hover:text-[#2563EB] transition">Let Us Heal</a>
          <div class="w-px h-4 sm:h-6 bg-gray-700 hidden sm:block"></div>
          <div class="text-gray-400 font-semibold text-sm sm:text-lg cursor-default">Sizofakulwazi Foundation</div>
          <div class="w-px h-4 sm:h-6 bg-gray-700 hidden sm:block"></div>
          <div class="text-gray-400 font-semibold text-sm sm:text-lg cursor-default">Startups Across South Africa</div>
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