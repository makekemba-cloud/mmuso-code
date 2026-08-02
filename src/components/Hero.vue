<template>
  <section
    id="home"
    class="relative min-h-screen flex items-start md:items-center overflow-hidden"
  >
    <!-- Dark Grey/Black Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]"></div>

    <!-- Watermark Shapes (abstract geometric shapes) -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Large faded circles -->
      <div class="absolute top-20 left-10 w-72 h-72 border border-white/5 rounded-full"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 border border-white/5 rounded-full"></div>
      <div class="absolute top-1/2 left-1/3 w-48 h-48 border border-white/5 rounded-full"></div>
      
      <!-- SQUARE watermark shapes (replaced diagonal lines) -->
      <div class="absolute top-32 right-20 w-32 h-32 border border-white/5 rotate-12"></div>
      <div class="absolute bottom-40 left-20 w-24 h-24 border border-white/5 -rotate-6"></div>
      <div class="absolute top-1/2 right-1/4 w-40 h-40 border border-white/5 rotate-45"></div>
      <div class="absolute bottom-1/3 left-1/2 w-20 h-20 border border-white/5 rotate-12"></div>
      <div class="absolute top-3/4 right-10 w-28 h-28 border border-white/5 -rotate-12"></div>
      <div class="absolute top-10 right-1/3 w-16 h-16 border border-white/5 rotate-45"></div>

      <!-- Grid watermark (retained) -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <!-- Abstract triangle watermark -->
      <div class="absolute bottom-0 left-0 w-64 h-64 text-white/5" style="clip-path: polygon(0% 100%, 100% 100%, 0% 0%); background: rgba(59,130,246,0.05);"></div>
      <div class="absolute top-0 right-0 w-80 h-80 text-white/5" style="clip-path: polygon(100% 0%, 0% 0%, 100% 100%); background: rgba(59,130,246,0.05);"></div>
    </div>

    <!-- Subtle noise overlay -->
    <div class="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E');"></div>

    <!-- Main Content (reduced top padding) -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-16 pb-8 md:pb-16 w-full text-center">
      
      <div class="max-w-4xl mx-auto space-y-6 opacity-0 translate-y-6 animate-fade-in-up">

        <!-- Tiny Accent Text (clean blue glass) -->
        <div class="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-md border border-blue-400/30 text-blue-300 px-5 py-2 rounded-full text-sm shadow-lg shadow-black/20 transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-400/60 hover:scale-105 cursor-default">
          <span class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          Let’s Build The Future Together
        </div>

        <!-- BIG TEXT: Building The Future Through Technology (Through Technology = solid blue) -->
        <h1 class="text-5xl md:text-7xl font-bold text-white leading-tight text-shadow">
          Building The Future<br>
          <span class="text-blue-500">Through Technology</span>
        </h1>

        <!-- Smaller Description (includes mobile apps) -->
        <p class="text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto text-shadow">
          Modern websites, software, mobile applications, and digital experiences crafted for the next generation.
        </p>

        <!-- Mini Features with Mobile Apps Highlight (blue glass style) -->
        <div class="flex flex-wrap justify-center gap-3 pt-4">
          <span class="bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 text-blue-200 px-4 py-1.5 rounded-full text-sm shadow-sm transition-all duration-300 hover:bg-blue-500/30 hover:border-blue-400/50 hover:scale-105 cursor-default">⚡ Fast & Scalable</span>
          <span class="bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 text-blue-200 px-4 py-1.5 rounded-full text-sm shadow-sm transition-all duration-300 hover:bg-blue-500/30 hover:border-blue-400/50 hover:scale-105 cursor-default">☁️ Cloud Ready</span>
          <span class="bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 text-blue-200 px-4 py-1.5 rounded-full text-sm shadow-sm transition-all duration-300 hover:bg-blue-500/30 hover:border-blue-400/50 hover:scale-105 cursor-default">🔒 Secure Systems</span>
          <span class="bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 text-blue-200 px-4 py-1.5 rounded-full text-sm shadow-sm transition-all duration-300 hover:bg-blue-500/30 hover:border-blue-400/50 hover:scale-105 cursor-default">📱 Native & Cross-Platform Apps</span>
          <span class="bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 text-blue-200 px-4 py-1.5 rounded-full text-sm shadow-sm transition-all duration-300 hover:bg-blue-500/30 hover:border-blue-400/50 hover:scale-105 cursor-default">📲 iOS • Android • PWA</span>
        </div>

        <!-- Buttons (clean blue theme) -->
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
            href="/pricing"
            class="group border border-blue-400/30 text-blue-200 bg-black/30 backdrop-blur-md px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:bg-blue-500/10 text-shadow"
          >
            Our pricing
            <i class="fas fa-chevron-right text-xs opacity-70 group-hover:opacity-100 transition-opacity"></i>
          </a>
        </div>

        <!-- CTA line -->
        <div class="relative pt-6">
          <div class="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          <p class="text-blue-300/60 text-sm italic">
           
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
        <i class="fas fa-chevron-down text-blue-300/70 text-2xl text-shadow transition-colors group-hover:text-blue-400"></i>
      </div>
      <p class="text-blue-300/40 text-xs mt-1 tracking-wider transition-colors group-hover:text-blue-400/70">SCROLL TO EXPLORE</p>
    </a>
  </section>
</template>

<script setup lang="ts">
// Hero section with dark gradient, square watermarks, solid blue "Through Technology", reduced top padding
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