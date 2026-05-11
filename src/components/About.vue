<template>
  <section id="about" class="relative bg-[#000000] py-16 md:py-20 border-y border-gray-800 overflow-hidden">
    
    <!-- Subtle glowing orbs & grid (futuristic, no image) -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]"></div>
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">

      <!-- Badge -->
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-xs sm:text-sm text-[#2563EB] font-semibold">About Us</span>
        </span>
      </div>

      <!-- Title - responsive font sizes -->
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
        About <span class="text-[#2563EB]">Mmuso Code</span>
      </h2>

      <!-- Refreshed, bold, future-focused content - responsive text sizes and spacing -->
      <div class="space-y-4 sm:space-y-6">

        <h3 class="text-xl sm:text-2xl font-semibold text-[#2563EB]">
          Engineering The Digital Future
        </h3>

        <p class="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
          Mmuso Code is a modern software development company focused on building
          powerful digital experiences for businesses, startups, and modern brands.
          We create scalable websites, applications, and systems designed for
          performance, security, and long-term growth.
        </p>

        <p class="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
          Combining clean design with modern technologies, we transform ideas into
          functional digital products that feel fast, professional, and future-ready.
          From custom websites to full-stack platforms, every solution is crafted
          with precision and innovation in mind.
        </p>

        <p class="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
          At Mmuso Code, we believe technology should not only solve problems —
          it should inspire growth, create opportunity, and help shape the future.
        </p>

      </div>

      <!-- Company registration - responsive text -->
      <p class="text-xs sm:text-sm text-gray-500 mt-6 sm:mt-8 tracking-wide">
        MMUSO CODE (PTY) LTD • Reg No. 2026/372467/07
      </p>

      <!-- Divider - responsive spacing and background -->
      <div class="relative mt-8 sm:mt-12">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-700"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="bg-[#000000] px-4 sm:px-6 text-xs sm:text-sm uppercase tracking-wider text-gray-500">
            A Fresh Start • Built for the Future
          </span>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Your existing badge styles (if not globally defined) */
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