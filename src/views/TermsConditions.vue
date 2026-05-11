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
          Terms and Conditions
        </h1>
        <p class="text-gray-500 text-sm sm:text-base mt-4">Last Updated: 11 May 2026</p>
      </div>

      <!-- Glass card content -->
      <div class="bg-[#0a0a0a] backdrop-blur-sm rounded-2xl border border-gray-800 p-6 sm:p-8 md:p-10 space-y-6 md:space-y-8 transition-all duration-300 hover:border-[#2563EB]/30">
        
        <!-- 12 Sections (same content, updated styling) -->
        <section>
          <h2 class="text-lg sm:text-xl font-semibold text-blue-400 mb-2">1. Company Information</h2>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
            MMUSO CODE (PTY) LTD<br>
            Registration Number: 2026/372467/07<br>
            Phone: <a href="tel:+27791189866" class="text-blue-400 hover:underline">+27 79 118 9866</a><br>
            Email: <a href="mailto:info@mmusocode.co.za" class="text-blue-400 hover:underline">info@mmusocode.co.za</a><br>
            Website: <a href="https://mmusocode.co.za" class="text-blue-400 hover:underline">https://mmusocode.co.za</a>
          </p>
        </section>

        <section>
          <h2 class="text-lg sm:text-xl font-semibold text-blue-400 mb-2">2. Services</h2>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed">MMUSO CODE (PTY) LTD provides software development, web development, digital solutions, technical consulting, and related services. Service details, timelines, and pricing may vary depending on client agreements.</p>
        </section>

        <section>
          <h2 class="text-lg sm:text-xl font-semibold text-blue-400 mb-2">3. Website Use</h2>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed">Users agree not to:</p>
          <ul class="list-disc list-inside text-gray-300 mt-2 space-y-1 ml-2 sm:ml-4 text-sm sm:text-base">
            <li>Use the website unlawfully</li>
            <li>Attempt unauthorized access to systems or data</li>
            <li>Distribute malicious software or harmful content</li>
            <li>Misrepresent identity or information</li>
          </ul>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed mt-2">We reserve the right to restrict access for misuse.</p>
        </section>

        <section>
          <h2 class="text-lg sm:text-xl font-semibold text-blue-400 mb-2">4. Intellectual Property</h2>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed">All website content including branding, text, graphics, code, logos, and designs are owned by or licensed to MMUSO CODE (PTY) LTD unless otherwise stated. Users may not reproduce or distribute content without written permission.</p>
        </section>

        <section>
          <h2 class="text-lg sm:text-xl font-semibold text-blue-400 mb-2">5. Client Projects and Deliverables</h2>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed">Project requirements, timelines, pricing, revisions, and ownership terms will be governed by separate agreements or quotations where applicable.</p>
        </section>

        <section>
          <h2 class="text-lg sm:text-xl font-semibold text-blue-400 mb-2">6. Limitation of Liability</h2>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed">MMUSO CODE (PTY) LTD shall not be liable for:</p>
          <ul class="list-disc list-inside text-gray-300 mt-2 space-y-1 ml-2 sm:ml-4 text-sm sm:text-base">
            <li>Indirect or consequential damages</li>
            <li>Business interruption</li>
            <li>Data loss</li>
            <li>Third-party service failures</li>
            <li>Temporary website unavailability</li>
          </ul>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed mt-2">Use of the website and services is at the user's own risk.</p>
        </section>

        <section>
          <h2 class="text-lg sm:text-xl font-semibold text-blue-400 mb-2">7. Third-Party Links</h2>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed">This website may contain links to third-party websites or services. We are not responsible for their content, privacy practices, or operations.</p>
        </section>

        <section>
          <h2 class="text-lg sm:text-xl font-semibold text-blue-400 mb-2">8. Privacy</h2>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed">Use of this website is also governed by our <router-link to="/privacy-policy" class="text-blue-400 hover:underline transition">Privacy Policy</router-link>.</p>
        </section>

        <section>
          <h2 class="text-lg sm:text-xl font-semibold text-blue-400 mb-2">9. Governing Law and ECTA Compliance</h2>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed">These Terms and Conditions are governed by the laws of the Republic of South Africa, including the <strong class="text-blue-300">Electronic Communications and Transactions Act (ECTA)</strong>. Where applicable, electronic agreements formed through this website shall be valid and enforceable under ECTA.</p>
        </section>

        <section>
          <h2 class="text-lg sm:text-xl font-semibold text-blue-400 mb-2">10. Changes to Terms</h2>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed">We may update these Terms and Conditions at any time without prior notice. Continued use of the website constitutes acceptance of updated terms.</p>
        </section>

        <section>
          <h2 class="text-lg sm:text-xl font-semibold text-blue-400 mb-2">11. Contact Information</h2>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed">
            MMUSO CODE (PTY) LTD<br>
            Registration Number: 2026/372467/07<br>
            Email: <a href="mailto:info@mmusocode.co.za" class="text-blue-400 hover:underline">info@mmusocode.co.za</a><br>
            Phone: <a href="tel:+27791189866" class="text-blue-400 hover:underline">+27 79 118 9866</a><br>
            Website: <a href="https://mmusocode.co.za" class="text-blue-400 hover:underline">https://mmusocode.co.za</a>
          </p>
        </section>

        <section>
          <h2 class="text-lg sm:text-xl font-semibold text-blue-400 mb-2">12. Disclaimer</h2>
          <p class="text-gray-300 text-sm sm:text-base leading-relaxed">The information provided on this website is for general informational purposes only. While MMUSO CODE (PTY) LTD aims to keep information accurate and up to date, we make no guarantees regarding completeness, reliability, or accuracy. MMUSO CODE (PTY) LTD shall not be liable for any loss or damage arising from use of this website or reliance on information provided.</p>
        </section>

        <!-- Back to home link -->
        <div class="text-center pt-4 border-t border-gray-800">
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
// Terms & Conditions page – static content, restyled
</script>

<style scoped>
/* No custom styles needed – uses Tailwind utilities */
</style>