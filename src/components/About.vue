<template>
  <section id="about" class="relative bg-[#000000] py-16 md:py-20 border-y border-gray-800 overflow-hidden">
    
    <!-- Subtle glowing orbs & grid -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]"></div>
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      <!-- Decorative abstract shape (visual element) -->
      <div class="absolute top-1/3 left-5 w-48 h-48 border-2 border-blue-500/10 rounded-full rotate-45 blur-sm"></div>
      <div class="absolute bottom-1/4 right-10 w-32 h-32 border-2 border-indigo-500/10 rounded-full blur-sm"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

      <!-- Centered Badge & Title -->
      <div class="text-center mb-8 md:mb-10">
        <div class="flex justify-center mb-4">
          <span class="section-badge">
            <span class="pulse-dot"></span>
            <span class="text-xs sm:text-sm text-[#2563EB] font-semibold">About Us</span>
          </span>
        </div>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          About <span class="text-[#2563EB]">Mmuso Code</span>
        </h2>
      </div>

      <!-- Two‑column layout: left text, right Mission & Vision -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        <!-- Left Column: Main Text -->
        <div class="space-y-4 sm:space-y-6 text-left">
          <h3 class="text-xl sm:text-2xl font-semibold text-[#2563EB]">
            Empowering Businesses Through Technology
          </h3>

          <p class="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
            MMUSO CODE is a South African technology solutions company dedicated to helping businesses establish, grow, and succeed in today's digital world. We provide innovative technology services that simplify operations, strengthen online presence, and support long-term business growth.
          </p>

          <p class="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
            Whether you're starting a new business, building your online presence, developing custom software, or looking for reliable IT support, we deliver practical solutions tailored to your unique needs.
          </p>

          <p class="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
            We believe technology should do more than solve problems it should create opportunities. That's why we combine modern design, reliable technologies, and business-focused thinking to deliver solutions that are secure, scalable, and built to grow with you.
          </p>

          <p class="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
            At MMUSO CODE, we're committed to building lasting relationships through quality workmanship, professional service, and continuous innovation.
          </p>
        </div>

        <!-- Right Column: Mission & Vision Cards -->
        <div class="space-y-6">
          <!-- Mission -->
          <div class="bg-[#0a0a0a] border border-gray-700 rounded-2xl p-6 hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.08)] hover:-translate-y-1">
            <div class="flex items-center gap-3 mb-3">
              <i class="fas fa-rocket text-[#2563EB] text-xl"></i>
              <h4 class="text-lg font-semibold text-white">Our Mission</h4>
            </div>
            <p class="text-sm sm:text-base text-gray-400 leading-relaxed">
              To empower businesses with innovative, reliable, and affordable technology solutions that drive growth, improve efficiency, and create lasting value.
            </p>
          </div>

          <!-- Vision -->
          <div class="bg-[#0a0a0a] border border-gray-700 rounded-2xl p-6 hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.08)] hover:-translate-y-1">
            <div class="flex items-center gap-3 mb-3">
              <i class="fas fa-compass text-[#2563EB] text-xl"></i>
              <h4 class="text-lg font-semibold text-white">Our Vision</h4>
            </div>
            <p class="text-sm sm:text-base text-gray-400 leading-relaxed">
              To become a trusted technology partner, helping businesses embrace digital transformation through innovation, quality, and exceptional service.
            </p>
          </div>

          <div class="mt-4 rounded-2xl overflow-hidden border border-gray-700 hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.08)] hover:-translate-y-1">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center"
            alt="Team collaboration at MMUSOCODE"
            class="w-full h-70 object-cover"
            loading="lazy"
          />
        </div>
        </div>
      </div>

      <!-- Company registration (below columns) -->
      <div class="text-center mt-10">
        <p class="text-xs sm:text-sm text-gray-500 tracking-wide">
          MMUSO CODE (PTY) LTD • Reg No. 2026/372467/07
        </p>
      </div>

      <!-- Divider with slogan -->
      <div class="relative mt-8 sm:mt-12">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-700"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="bg-[#000000] px-4 sm:px-6 text-xs sm:text-sm uppercase tracking-wider text-[#2563EB] font-semibold">
            Let's Build The Future Together
          </span>
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