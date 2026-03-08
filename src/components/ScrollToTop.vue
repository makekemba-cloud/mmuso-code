<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="fade-up">
    <button
      v-if="visible"
      @click="scrollToTop"
      class="fixed bottom-24 right-5 z-50 w-11 h-11 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-full shadow-lg shadow-[#2563EB]/30 flex items-center justify-center transition-all hover:scale-110 hover:shadow-[#2563EB]/50"
      aria-label="Scroll to top"
    >
      <i class="fas fa-chevron-up text-sm"></i>
    </button>
  </Transition>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>