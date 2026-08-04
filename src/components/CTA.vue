<template>
  <section id="cta" class="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-black via-[#050816] to-black border-t border-gray-800 overflow-hidden">

    <!-- Floating glowing orbs -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="w-[600px] h-[600px] bg-[#2563EB]/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]"></div>
      <div class="absolute top-1/3 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
    </div>

    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

      <!-- Badge (your slogan) -->
      <div class="flex justify-center mb-4 sm:mb-6">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-xs sm:text-sm text-[#2563EB] font-semibold">Let's Build The Future Together</span>
        </span>
      </div>

      <!-- Title (responsive) -->
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
        Your Technology Partner<br>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">Starts Here</span>
      </h2>

      <!-- Description (responsive text) -->
      <p class="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
        Whether you need a professional website, custom software, managed IT services, or business technology solutions, MMUSO CODE is ready to help bring your ideas to life.
      </p>
      <p class="text-sm sm:text-base md:text-lg text-gray-500 mt-2 mb-6 sm:mb-10">
        Tell us about your project, and we'll recommend the right solution for your business.
      </p>

      <!-- Buttons – stack on mobile, row on larger screens -->
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-12">
        <!-- Primary CTA -->
        <a
          href="#contact"
          class="group relative bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 overflow-hidden text-base sm:text-lg w-full sm:w-auto"
        >
          <span class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          <span class="relative"><i class="fas fa-paper-plane mr-2"></i>Start Your Project</span>
        </a>

        <!-- Phone consultation -->
        <a
          href="tel:+27791189866"
          class="group border border-blue-400/30 text-blue-200 bg-black/30 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:border-blue-400/60 hover:bg-blue-500/10 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 text-base sm:text-lg w-full sm:w-auto"
        >
          <i class="fas fa-phone-alt"></i> Book a Consultation
        </a>

        <!-- Pricing button (restored) -->
        <router-link
          to="/pricing"
          class="group border border-gray-700 text-gray-300 bg-black/30 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 text-base sm:text-lg w-full sm:w-auto"
        >
          <i class="fas fa-tag"></i> View Pricing
        </router-link>
      </div>

      <!-- Quote card (responsive) -->
      <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-[#0a0a0a]/80 backdrop-blur-sm border border-gray-700 rounded-2xl px-4 sm:px-6 py-4 sm:py-5 transition-all duration-300 hover:border-[#2563EB]/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)] max-w-4xl mx-auto">
        <div class="flex items-center gap-3 text-center sm:text-left">
          <i class="fas fa-comment-dots text-[#2563EB] text-lg sm:text-xl"></i>
          <p class="text-gray-300 text-sm sm:text-base">
            <span class="font-medium text-white">Not sure where to start?</span>
            <span class="block sm:inline"> We'll help you choose the right solution for your business with no obligation.</span>
          </p>
        </div>
        <a
          href="#contact"
          class="text-[#2563EB] hover:text-blue-400 font-semibold text-sm sm:text-base transition flex items-center gap-1 whitespace-nowrap border-t sm:border-t-0 sm:border-l border-gray-700 pt-2 sm:pt-0 sm:pl-4 sm:ml-2"
        >
          Request Your Free Quote <i class="fas fa-arrow-right text-xs"></i>
        </a>
      </div>

      <!-- Reassurance badges (responsive) -->
      <div class="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 text-xs sm:text-sm text-gray-400">
        <span class="flex items-center gap-1.5">
          <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> Free Consultation
        </span>
        <span class="w-px h-4 bg-gray-700 hidden sm:block"></span>
        <span class="flex items-center gap-1.5">
          <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> No Obligation Quote
        </span>
        <span class="w-px h-4 bg-gray-700 hidden sm:block"></span>
        <span class="flex items-center gap-1.5">
          <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> Tailored Solutions
        </span>
        <span class="w-px h-4 bg-gray-700 hidden sm:block"></span>
        <span class="flex items-center gap-1.5">
          <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> Ongoing Support
        </span>
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