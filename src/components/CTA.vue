<template>
  <section class="py-24 bg-[#000000] border-t border-gray-800 relative overflow-hidden">

    <!-- Background glow -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl"></div>
    </div>

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

      <div class="flex justify-center mb-6">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-sm text-[#2563EB] font-semibold">Let's Work Together</span>
        </span>
      </div>

      <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
        Ready to Build Your Next <br>
        <span class="text-[#2563EB]">Software Solution?</span>
      </h2>

      <p class="text-xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed">
        We help startups and businesses turn ideas into scalable web platforms, mobile apps, and digital systems.
      </p>
      <p class="text-lg text-gray-500 mb-10">
        Every project is unique — contact us for a custom quote tailored to your business.
      </p>

      <!-- Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <a
          href="#contact"
          class="bg-[#2563EB] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1d4ed8] transition shadow-lg shadow-[#2563EB]/30 hover:shadow-[#2563EB]/50 flex items-center justify-center gap-2 hover-lift text-lg"
        >
          <i class="fas fa-paper-plane"></i> Start Your Project
        </a>
        <a
          href="tel:+27729473009"
          class="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-[#2563EB] hover:text-white hover:bg-[#2563EB]/5 transition hover-glow flex items-center justify-center gap-2 text-lg"
        >
          <i class="fas fa-phone-alt"></i> Book a Consultation
        </a>
      </div>

      <!-- Quote note -->
      <div class="inline-flex items-center gap-3 bg-[#0a0a0a] border border-gray-800 rounded-xl px-6 py-4">
        <i class="fas fa-tag text-[#2563EB]"></i>
        <p class="text-gray-400 text-sm">
          We design custom digital solutions tailored to your business.
          <a href="#contact" class="text-[#2563EB] hover:underline ml-1 font-medium">Get a Quote →</a>
        </p>
      </div>

    </div>
  </section>
</template>