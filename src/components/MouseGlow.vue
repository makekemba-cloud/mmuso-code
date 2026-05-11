<template>
  <canvas ref="canvas" class="pointer-events-none fixed inset-0 z-0"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

const mouse = { x: 0, y: 0 }
const circle = { x: 0, y: 0 }

const resize = () => {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

const handleMove = (e: MouseEvent) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

const draw = () => {
  if (!ctx || !canvas.value) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // smooth follow (simple, no libs)
  circle.x += (mouse.x - circle.x) * 0.1
  circle.y += (mouse.y - circle.y) * 0.1

  // transparent soft circle
  ctx.beginPath()
  ctx.arc(circle.x, circle.y, 25, 0, Math.PI * 2)

  ctx.fillStyle = 'rgba(0, 200, 255, 0.15)' // subtle transparent glow
  ctx.fill()

  requestAnimationFrame(draw)
}

onMounted(() => {
  if (!canvas.value) return

  ctx = canvas.value.getContext('2d')

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', handleMove)

  draw()
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', handleMove)
})
</script>