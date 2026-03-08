<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => { loading.value = false }, 1200)
})
</script>

<template>
  <Transition name="loader-fade">
    <div
      v-if="loading"
      class="fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-center gap-6"
    >
      <!-- Logo / brand mark -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[#2563EB]/10 border border-[#2563EB]/40 rounded-xl flex items-center justify-center">
          <i class="fas fa-code text-[#2563EB] text-lg"></i>
        </div>
        <span class="text-white font-bold text-xl tracking-tight">Mmuso Code</span>
      </div>

      <!-- Progress bar -->
      <div class="w-48 h-0.5 bg-gray-800 rounded-full overflow-hidden">
        <div class="h-full bg-[#2563EB] rounded-full animate-progress"></div>
      </div>

      <p class="text-gray-500 text-xs tracking-widest uppercase">Loading...</p>
    </div>
  </Transition>
</template>

<style scoped>
.loader-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.loader-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@keyframes progress {
  from { width: 0%; }
  to   { width: 100%; }
}
.animate-progress {
  animation: progress 1s ease-out forwards;
}
</style>