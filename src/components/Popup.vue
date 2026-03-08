<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
let timer: ReturnType<typeof setTimeout>

export interface PopupExpose {
  show: () => void
}

function show() {
  visible.value = true
  clearTimeout(timer)
  timer = setTimeout(() => { visible.value = false }, 6000)
}

function close() {
  visible.value = false
}

defineExpose({ show })
</script>

<template>
  <div
    class="popup-notification flex items-start"
    :class="{ show: visible }"
  >
    <div class="popup-icon"><i class="fas fa-check-circle"></i></div>
    <div class="flex-1">
      <h4 class="font-semibold text-white text-base">Message sent!</h4>
      <p class="text-sm text-gray-300 mt-1">
        We'll get back to you within 24h.<br>
        <span class="text-blue-400 text-xs">📬 Check spam if no reply.</span>
      </p>
    </div>
    <button @click="close" class="text-gray-400 hover:text-white ml-3 transition">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>