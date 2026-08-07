<template>
  <!-- Startup Message -->
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-6 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-6 scale-95"
  >
    <div
      v-if="showStartupMessage"
      class="fixed bottom-24 right-5 sm:bottom-28 sm:right-5 z-50 w-[280px] sm:w-[320px] max-w-[calc(100vw-2rem)] bg-gradient-to-br from-[#0a0a0a] to-[#050816] border border-gray-700 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-3 py-2 border-b border-gray-800">
        <div class="flex items-center gap-1.5">
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-green-500"
            ></span>
          </span>

          <span class="text-white font-medium text-[10px]">
            MMUSOCODE
          </span>

          <span class="text-[9px] text-green-400">
            Online
          </span>
        </div>

        <button
          @click="dismissStartupMessage"
          class="text-gray-500 hover:text-white transition text-xs"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Content -->
      <div class="p-3">

        <h3 class="text-white text-sm font-semibold mb-1">
          Need a Technology Solution?
        </h3>

        <p class="text-gray-400 text-[11px] leading-4 mb-2">
          Websites • Software • IT Support • Business Solutions
        </p>

        <!-- Condensed checklist (single line) -->
        <p class="text-[10px] text-gray-400 flex items-center gap-1.5 mb-2.5">
          <i class="fas fa-check-circle text-[#2563EB] text-[10px]"></i>
          Free Consultation
          <span class="text-gray-600">•</span>
          <i class="fas fa-check-circle text-[#2563EB] text-[10px]"></i>
          No Obligation Quote
          <span class="text-gray-600">•</span>
          <i class="fas fa-check-circle text-[#2563EB] text-[10px]"></i>
          Fast Response
        </p>

        <!-- Buttons (smaller) -->
        <div class="grid grid-cols-2 gap-2 mb-2">

          <a
            :href="websiteQuoteLink"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-[#2563EB] hover:bg-blue-600 text-white rounded-lg py-1.5 text-[10px] font-medium text-center transition"
          >
            🌐 Website
          </a>

          <a
            :href="itSupportLink"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-[#111827] hover:bg-gray-800 text-white rounded-lg py-1.5 text-[10px] font-medium text-center transition"
          >
            💻 IT Support
          </a>

        </div>

        <a
          :href="generalWhatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-1.5 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-lg py-2 text-[11px] font-medium transition"
        >
          <i class="fab fa-whatsapp text-sm"></i>
          Chat on WhatsApp
        </a>

      </div>
    </div>
  </Transition>

  <!-- Floating WhatsApp Button -->
  <a
    :href="generalWhatsappLink"
    target="_blank"
    rel="noopener noreferrer"
    class="group fixed bottom-5 right-5 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] rounded-full shadow-xl shadow-[#25D366]/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
  >
    <i class="fab fa-whatsapp text-white text-2xl"></i>

    <span
      class="absolute right-full mr-3 whitespace-nowrap bg-black text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
    >
      Need help?
    </span>
  </a>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const showStartupMessage = ref(false)

const phone = '27791189866'

const generalWhatsappLink = computed(() => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(
    `Hi MMUSOCODE! 👋

I'm interested in your services and would like to discuss my project.

Please contact me when you're available.`
  )}`
})

const websiteQuoteLink = computed(() => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(
    `Hi MMUSOCODE! 👋

I'd like to request a quotation for a website.

Business Name:
Type of Website:
Additional Information:`
  )}`
})

const itSupportLink = computed(() => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(
    `Hi MMUSOCODE! 👋

I'm interested in your Managed IT Services.

Please tell me more about your IT Support solutions.`
  )}`
})

function dismissStartupMessage() {
  showStartupMessage.value = false
  sessionStorage.setItem('mmusocode-popup-dismissed', 'true')
}

onMounted(() => {

  if (sessionStorage.getItem('mmusocode-popup-dismissed') === 'true')
    return

  // Wait 2 seconds before showing
  setTimeout(() => {
    showStartupMessage.value = true
  }, 2000)

  // Auto hide after 12 seconds
  setTimeout(() => {
    if (showStartupMessage.value) {
      dismissStartupMessage()
    }
  }, 14000)
})
</script>

<style scoped>
</style>