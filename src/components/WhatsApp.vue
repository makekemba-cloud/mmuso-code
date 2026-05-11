<!-- FloatingActions.vue -->
<template>
  <!-- Startup Message Toast – opens WhatsApp with pre‑filled message -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-4 scale-95"
  >
    <a
      v-if="showStartupMessage"
      :href="whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-24 right-5 sm:bottom-28 sm:right-5 z-50 max-w-xs sm:max-w-sm bg-gradient-to-r from-[#0a0a0a] to-[#050816] backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-4 cursor-pointer hover:border-[#2563EB]/50 transition-all duration-300 group/message"
    >
      <div class="flex items-start gap-3">
        <!-- Icon -->
        <div class="flex-shrink-0 w-10 h-10 bg-[#2563EB]/20 rounded-full flex items-center justify-center group-hover/message:bg-[#2563EB]/30 transition">
          <i class="fab fa-whatsapp text-[#25D366] text-lg"></i>
        </div>
        <!-- Message -->
        <div class="flex-1">
          <h4 class="text-white font-semibold text-sm sm:text-base">Let’s Chat on WhatsApp 💬</h4>
          <p class="text-gray-400 text-xs sm:text-sm mt-1">
            Click here to start a conversation – we’d love to hear about your project!
          </p>
          <p class="text-gray-500 text-[10px] sm:text-xs mt-2 flex items-center gap-1">
            <i class="fas fa-external-link-alt text-gray-600 text-[9px]"></i> Opens WhatsApp
          </p>
        </div>
        <!-- Close button (stops propagation so clicking it only dismisses, doesn't open WhatsApp) -->
        <button
          @click.stop="dismissStartupMessage"
          class="text-gray-500 hover:text-gray-300 transition"
          aria-label="Close message"
        >
          <i class="fas fa-times text-sm"></i>
        </button>
      </div>
    </a>
  </Transition>

  <!-- WhatsApp Button (same as before) -->
  <a
    href="https://wa.me/27791189866"
    target="_blank"
    rel="noopener noreferrer"
    class="group fixed bottom-5 right-5 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-lg shadow-[#25D366]/30 flex items-center justify-center transition-all hover:scale-110 hover:shadow-[#25D366]/50"
    aria-label="Chat on WhatsApp"
  >
    <i class="fab fa-whatsapp text-2xl"></i>
    <span class="absolute right-full mr-2 flex items-center justify-center whitespace-nowrap bg-black/80 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
      Chat with us
    </span>
  </a>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const showStartupMessage = ref(true)
const showScroll = ref(false)

// Pre‑filled WhatsApp message
const whatsappMessage = encodeURIComponent(
  "Hi Mmuso Code! 👋\n\nI saw your startup message and I'd love to discuss a project. Can you tell me more about your services?"
)

// Full WhatsApp URL with pre‑filled text
const whatsappLink = computed(() => `https://wa.me/27791189866?text=${whatsappMessage}`)

const handleScroll = () => {
  showScroll.value = window.scrollY > 300
}

const dismissStartupMessage = () => {
  showStartupMessage.value = false
  sessionStorage.setItem('mmusocode_startup_dismissed', 'true')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  const dismissed = sessionStorage.getItem('mmusocode_startup_dismissed')
  if (dismissed === 'true') {
    showStartupMessage.value = false
  } else {
    // Auto‑dismiss after 6 seconds
    setTimeout(() => {
      if (showStartupMessage.value) {
        showStartupMessage.value = false
        sessionStorage.setItem('mmusocode_startup_dismissed', 'true')
      }
    }, 6000)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
.group:hover i {
  animation: pulse 2s infinite;
}
</style>