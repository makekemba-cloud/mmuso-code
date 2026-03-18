<template>
  <section
    id="home"
    class="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-start md:items-center overflow-hidden"
    style="background-image: url('/assets/Futuristic workspace in a digital world.png');"
  >
    <!-- Premium Overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#0a1a2f]/50 via-[#0b1e33]/50 to-[#1e3a8a]/50"></div>
    <!-- Noise texture -->
    <div class="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E');"></div>

    <!-- Content – added pt-20 md:pt-24 to clear the sticky header -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8 md:pb-16 w-full text-center">
      
      <div class="max-w-4xl mx-auto space-y-6 opacity-0 translate-y-6 animate-fade-in-up">

        <!-- Premium Badge with hover -->
        <div class="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-gray-200 px-4 py-1.5 rounded-full text-sm shadow-lg shadow-black/20 transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-400/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-default">
          <span class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          🚀 Building the Future with Code
        </div>

        <!-- Heading -->
        <h1 class="text-4xl md:text-6xl font-semibold text-white leading-tight text-shadow">
          Innovative Software <span class="text-[#2563EB]">Solutions</span>
        </h1>

        <!-- Hook Line -->
        <p class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100 font-medium text-lg tracking-wide">
          We don’t just build websites — we build digital experiences.
        </p>

        <!-- Subtitle -->
        <p class="text-lg md:text-xl text-gray-100/90 max-w-3xl mx-auto text-shadow">
          At Mmuso Code, we build cutting-edge web platforms, cloud-based solutions, and IoT integrations that transform businesses.
        </p>

        <!-- Mini Features with hover -->
        <div class="flex flex-wrap justify-center gap-3 pt-4">
          <span class="bg-white/5 backdrop-blur-sm border border-white/10 text-gray-200 px-4 py-1.5 rounded-full text-sm shadow-sm transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-400/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-default">⚡ Fast & Scalable</span>
          <span class="bg-white/5 backdrop-blur-sm border border-white/10 text-gray-200 px-4 py-1.5 rounded-full text-sm shadow-sm transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-400/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-default">☁️ Cloud Ready</span>
          <span class="bg-white/5 backdrop-blur-sm border border-white/10 text-gray-200 px-4 py-1.5 rounded-full text-sm shadow-sm transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-400/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-default">🔒 Secure Systems</span>
          <span class="bg-white/5 backdrop-blur-sm border border-white/10 text-gray-200 px-4 py-1.5 rounded-full text-sm shadow-sm transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-400/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-default">📱 Mobile Friendly</span>
        </div>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <a
            href="#contact"
            class="group relative bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/50 overflow-hidden"
          >
            <span class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <span class="relative">Get Started</span>
            <i class="fas fa-arrow-right text-sm relative transition-transform group-hover:translate-x-1"></i>
          </a>

          <a
            href="#stack"
            class="group border border-white/20 text-white bg-black/20 backdrop-blur-md px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white/5 text-shadow"
          >
            Our Technologies
            <i class="fas fa-chevron-right text-xs opacity-70 group-hover:opacity-100 transition-opacity"></i>
          </a>
        </div>

        <!-- CTA line -->
        <div class="relative pt-6">
          <div class="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          <p class="text-gray-300/70 text-sm italic">
            Start your project today — no commitment required
          </p>
        </div>

      </div>
    </div>

    <!-- Scroll Down Arrow -->
    <a
      href="#about"
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-center group transition-all duration-300 hover:-translate-y-2"
    >
      <div class="animate-bounce">
        <i class="fas fa-chevron-down text-white/80 text-2xl text-shadow transition-colors group-hover:text-blue-300"></i>
      </div>
      <p class="text-gray-300/50 text-xs mt-1 tracking-wider transition-colors group-hover:text-blue-300/70">SCROLL TO EXPLORE</p>
    </a>
  </section>
</template>

<script setup lang="ts">
// No logic needed
</script>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(1.5rem); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease forwards;
}

.text-shadow {
  text-shadow: 
    0 2px 4px rgba(0,0,0,0.5),
    0 8px 20px rgba(0,0,0,0.3);
}
</style>