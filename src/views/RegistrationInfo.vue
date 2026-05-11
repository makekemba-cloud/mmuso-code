<template>
  <div class="relative bg-gradient-to-b from-black via-[#050816] to-black overflow-hidden min-h-screen">
    
    <!-- Floating glowing orbs (futuristic atmosphere) -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px]"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

    <div class="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24">
      
      <!-- Simple top divider line -->
      <div class="w-full border-t border-gray-800 mb-10"></div>

      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
          Company Registration
        </h1>
        <p class="text-gray-500 text-sm sm:text-base mt-4">Official registration information of MMUSO CODE (PTY) LTD</p>
      </div>

      <!-- Glass card content -->
      <div class="bg-[#0a0a0a] backdrop-blur-sm rounded-2xl border border-gray-800 p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-[#2563EB]/30">
        
        <!-- Company Name -->
        <div class="mb-8 text-center">
          <h2 class="text-2xl sm:text-3xl font-bold text-white">MMUSO CODE (PTY) LTD</h2>
          <p class="text-blue-400 text-sm sm:text-base mt-2">Software Development & Digital Solutions</p>
        </div>

        <!-- Registration Details Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-800 pt-6">
          <div>
            <h3 class="text-xs sm:text-sm uppercase tracking-wider text-gray-500">Registration Number</h3>
            <p class="text-base sm:text-lg font-mono text-white mt-1">2026/372467/07</p>
          </div>
          <div>
            <h3 class="text-xs sm:text-sm uppercase tracking-wider text-gray-500">Legal Status</h3>
            <p class="text-base sm:text-lg text-white mt-1">Private Company (PTY) LTD</p>
          </div>
          <div>
            <h3 class="text-xs sm:text-sm uppercase tracking-wider text-gray-500">Country of Registration</h3>
            <p class="text-base sm:text-lg text-white mt-1">Republic of South Africa</p>
          </div>
          <div>
            <h3 class="text-xs sm:text-sm uppercase tracking-wider text-gray-500">Registration Date</h3>
            <p class="text-base sm:text-lg text-white mt-1">2026</p>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="mt-8 border-t border-gray-800 pt-6">
          <h3 class="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mb-3">Official Contact</h3>
          <div class="space-y-2 text-gray-300 text-sm sm:text-base">
            <p><span class="text-gray-500 w-24 inline-block">Email:</span> <a href="mailto:info@mmusocode.co.za" class="text-blue-400 hover:underline">info@mmusocode.co.za</a></p>
            <p><span class="text-gray-500 w-24 inline-block">Phone:</span> <a href="tel:+27791189866" class="text-blue-400 hover:underline">+27 79 118 9866</a></p>
            <p><span class="text-gray-500 w-24 inline-block">Website:</span> <a href="https://mmusocode.co.za" class="text-blue-400 hover:underline">https://mmusocode.co.za</a></p>
          </div>
        </div>

        <!-- Registered Address -->
        <div class="mt-8 border-t border-gray-800 pt-6">
          <h3 class="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mb-3">Registered Address</h3>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
            341 Makekemba<br>Masia<br>0944<br>Republic of South Africa
          </p>
          <p class="text-xs text-gray-600 mt-2">* For privacy, the full address is available upon request.</p>
        </div>

        <!-- Verification Note -->
        <div class="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <p class="text-sm text-blue-300 flex items-start gap-2">
            <i class="fas fa-check-circle mt-0.5"></i>
            <span>This company is registered with the Companies and Intellectual Property Commission (CIPC) of South Africa. Registration number can be verified through the CIPC database.</span>
          </p>
        </div>

        <!-- Back to home link with glass style -->
        <div class="text-center pt-6 border-t border-gray-800 mt-6">
          <router-link 
            to="/" 
            class="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-all duration-300 text-sm sm:text-base hover:gap-3"
          >
            <i class="fas fa-arrow-left text-xs"></i> Back to Home
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Company registration information page – static content
</script>

<style scoped>
/* No custom styles needed – uses Tailwind utilities */
</style>