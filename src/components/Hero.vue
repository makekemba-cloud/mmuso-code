<template>
  <section
    id="home"
    class="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center"
    style="background-image: url('/assets/MIT-Evaluating-Performance_0.jpg');"
  >
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div class="text-center">
        <div class="max-w-4xl mx-auto space-y-8 opacity-0 translate-y-6 animate-fade-in-up">
          <!-- Heading -->
          <h1 class="text-4xl md:text-6xl font-bold text-white leading-tight">
            Innovative Software <span class="text-[#2563EB]">Solutions</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            At Mmuso Code, we build cutting‑edge web platforms, cloud-based solutions, and IoT integrations that transform businesses.
          </p>

          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#contact"
              class="bg-[#2563EB] text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-[#2563EB]/30 flex items-center justify-center gap-2 transition transform hover:-translate-y-1 hover:scale-105 hover:bg-[#1d4ed8] hover:shadow-[#2563EB]/50"
            >
              Get Started <i class="fas fa-arrow-right text-sm"></i>
            </a>
            <a
              href="#stack"
              class="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition transform hover:-translate-y-1 hover:scale-105 hover:border-[#2563EB] hover:text-white hover:bg-[#2563EB]/5"
            >
              Our Technologies
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Down Arrow -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <i class="fas fa-chevron-down text-white text-2xl"></i>
    </div>
  </section>
</template>

<script setup lang="ts">
// No additional logic needed for the Hero section yet
</script>

<style scoped>
/* Fade-in-up animation for a premium feel */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(1.5rem); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 1s ease forwards;
}
</style>