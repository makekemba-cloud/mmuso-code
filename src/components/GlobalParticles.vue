<template>
  <canvas ref="particleCanvas" class="global-particles"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const particleCanvas = ref<HTMLCanvasElement | null>(null)
let particleCtx: CanvasRenderingContext2D | null = null
let animationId: number | null = null

interface Particle {
  x: number
  y: number
  radius: number
  alpha: number
  vx: number
  vy: number
}

let particles: Particle[] = []

// ---------- INIT ----------
const initParticles = () => {
  if (!particleCanvas.value) return

  const canvas = particleCanvas.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  particleCtx = canvas.getContext('2d')
  if (!particleCtx) return

  particles = []

  // 🔥 more visible + premium density
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.8 + 1.2,
      alpha: Math.random() * 0.6 + 0.25,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15
    })
  }

  animateParticles()
}

// ---------- LOOP ----------
const animateParticles = () => {
  if (!particleCtx || !particleCanvas.value) return

  const canvas = particleCanvas.value

  particleCtx.clearRect(0, 0, canvas.width, canvas.height)

  for (const p of particles) {
    // movement
    p.x += p.vx
    p.y += p.vy

    // wrap edges
    if (p.x < 0) p.x = canvas.width
    if (p.x > canvas.width) p.x = 0
    if (p.y < 0) p.y = canvas.height
    if (p.y > canvas.height) p.y = 0

    // draw glow particle
    particleCtx.beginPath()
    particleCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)

    // 🔥 glow effect
    particleCtx.shadowBlur = 14
    particleCtx.shadowColor = `rgba(59, 130, 246, ${p.alpha})`

    particleCtx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`
    particleCtx.fill()

    // reset glow
    particleCtx.shadowBlur = 0
  }

  animationId = requestAnimationFrame(animateParticles)
}

// ---------- RESIZE ----------
const resizeHandler = () => {
  if (!particleCanvas.value) return

  particleCanvas.value.width = window.innerWidth
  particleCanvas.value.height = window.innerHeight

  initParticles()
}

// ---------- LIFECYCLE ----------
onMounted(() => {
  initParticles()
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style scoped>
.global-particles {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  display: block;

  /* 🔥 helps visibility on dark UI */
  mix-blend-mode: screen;
  opacity: 0.9;
}
</style>