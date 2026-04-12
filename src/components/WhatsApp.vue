<!-- FloatingActions.vue -->
<template>
  <!-- WhatsApp Button -->
  <a
    href="https://wa.me/27791189866"
    target="_blank"
    rel="noopener noreferrer"
    class="group fixed bottom-5 right-5 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-lg shadow-[#25D366]/30 flex items-center justify-center transition-all hover:scale-110 hover:shadow-[#25D366]/50"
    aria-label="Chat on WhatsApp"
  >
    <i class="fab fa-whatsapp text-2xl"></i>

    <!-- Horizontal Tooltip -->
    <span
      class="absolute right-full mr-2 flex items-center justify-center whitespace-nowrap bg-black/80 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-all"
    >
      Chat with us
    </span>
  </a>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showScroll = ref(false)

const handleScroll = () => {
  showScroll.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
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