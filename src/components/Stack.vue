<template>
  <section class="tech-stack-premium relative overflow-hidden bg-black py-20 border-y border-gray-800">
    <!-- Floating particles canvas -->
    <canvas ref="particleCanvas" class="absolute inset-0 pointer-events-none z-0"></canvas>

    <!-- Blur fade edges (Netflix style) -->
    <div class="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
    <div class="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>

    <!-- Header -->
    <div class="relative z-20 text-center mb-16">
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-sm text-blue-500 font-semibold">Technology Stack</span>
        </span>
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Our <span class="text-blue-500">Technology</span> Stack
      </h2>
      <p class="text-gray-400 max-w-3xl mx-auto text-lg">
        We leverage cutting-edge technologies and industry-leading tools.
      </p>
    </div>

    <!-- Rows with 3D perspective -->
    <div class="relative z-20 perspective-container">
      <!-- Row 1 - Left -->
      <div class="marquee-row-wrapper mb-8 group" data-speed="22" data-direction="left">
        <div class="marquee-track">
          <div
            v-for="(item, i) in duplicatedRow1"
            :key="`r1-${i}`"
            class="tech-card"
            :style="{ '--brand-color': getBrandColor(item.name) }"
          >
            <i :class="[item.icon, 'text-xl']" :style="{ color: getBrandColor(item.name) }"></i>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>

      <!-- Row 2 - Right -->
      <div class="marquee-row-wrapper mb-8 group" data-speed="26" data-direction="right">
        <div class="marquee-track">
          <div
            v-for="(item, i) in duplicatedRow2"
            :key="`r2-${i}`"
            class="tech-card"
            :style="{ '--brand-color': getBrandColor(item.name) }"
          >
            <i :class="[item.icon, 'text-xl']" :style="{ color: getBrandColor(item.name) }"></i>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>

      <!-- Row 3 - Left Faster -->
      <div class="marquee-row-wrapper group" data-speed="18" data-direction="left">
        <div class="marquee-track">
          <div
            v-for="(item, i) in duplicatedRow3"
            :key="`r3-${i}`"
            class="tech-card"
            :style="{ '--brand-color': getBrandColor(item.name) }"
          >
            <i :class="[item.icon, 'text-xl']" :style="{ color: getBrandColor(item.name) }"></i>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

// ---------- Brand Color Mapping ----------
const getBrandColor = (name: string): string => {
  const colors: Record<string, string> = {
    'React': '#61DAFB',
    'Next.js': '#000000',
    'Vue 3': '#42B883',
    'TypeScript': '#3178C6',
    'JavaScript': '#F7DF1E',
    'Tailwind CSS': '#38BDF8',
    'Bootstrap': '#7952B3',
    'HTML/CSS': '#E34F26',
    'ASP.NET Core': '#512BD4',
    'C#': '#239120',
    'Node.js': '#339933',
    'Express': '#000000',
    'Python': '#3776AB',
    'Java': '#007396',
    'PHP': '#777BB4',
    'Vite': '#646CFF',
    'PostgreSQL': '#4169E1',
    'MongoDB': '#47A248',
    'Docker': '#2496ED',
    'GitHub': '#181717',
    'REST APIs': '#FF6C37',
    'GraphQL': '#E10098',
    'CI/CD': '#0A5C8E',
    'VS Code': '#007ACC'
  }
  return colors[name] || '#3B82F6' // fallback blue (used rarely)
}

// ---------- Data ----------
interface TechItem {
  name: string
  icon: string
}

const row1Items: TechItem[] = [
  { name: 'React', icon: 'fa-brands fa-react' },
  { name: 'Next.js', icon: 'fa-solid fa-n' },
  { name: 'Vue 3', icon: 'fa-brands fa-vuejs' },
  { name: 'TypeScript', icon: 'fa-solid fa-code' },
  { name: 'JavaScript', icon: 'fa-brands fa-js' },
  { name: 'Tailwind CSS', icon: 'fa-solid fa-wind' },
  { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap' },
  { name: 'HTML/CSS', icon: 'fa-solid fa-code' },
]

const row2Items: TechItem[] = [
  { name: 'ASP.NET Core', icon: 'fa-solid fa-code' },
  { name: 'C#', icon: 'fa-solid fa-hashtag' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js' },
  { name: 'Express', icon: 'fa-solid fa-server' },
  { name: 'Python', icon: 'fa-brands fa-python' },
  { name: 'Java', icon: 'fa-brands fa-java' },
  { name: 'PHP', icon: 'fa-brands fa-php' },
  { name: 'Vite', icon: 'fa-solid fa-bolt' },
]

const row3Items: TechItem[] = [
  { name: 'PostgreSQL', icon: 'fa-solid fa-database' },
  { name: 'MongoDB', icon: 'fa-solid fa-leaf' },
  { name: 'Docker', icon: 'fa-brands fa-docker' },
  { name: 'GitHub', icon: 'fa-brands fa-github' },
  { name: 'REST APIs', icon: 'fa-solid fa-plug' },
  { name: 'GraphQL', icon: 'fa-solid fa-diagram-project' },
  { name: 'CI/CD', icon: 'fa-solid fa-gears' },
  { name: 'VS Code', icon: 'fa-solid fa-code' },
]

const duplicatedRow1 = [...row1Items, ...row1Items]
const duplicatedRow2 = [...row2Items, ...row2Items]
const duplicatedRow3 = [...row3Items, ...row3Items]

// ---------- GSAP Animations ----------
let animations: gsap.core.Tween[] = []

const initMarqueeAnimations = () => {
  animations.forEach(anim => anim.kill())
  animations = []

  const wrappers = document.querySelectorAll('.marquee-row-wrapper')
  wrappers.forEach((wrapper) => {
    const track = wrapper.querySelector('.marquee-track') as HTMLElement
    if (!track) return

    const speed = parseFloat((wrapper as HTMLElement).dataset.speed || '20')
    const direction = (wrapper as HTMLElement).dataset.direction || 'left'
    
    const trackWidth = track.scrollWidth / 2
    const distance = trackWidth

    let startX: number, endX: number
    if (direction === 'left') {
      startX = 0
      endX = -distance
    } else {
      startX = -distance
      endX = 0
    }

    gsap.set(track, { x: startX })
    
    const tween = gsap.to(track, {
      x: endX,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          let val = parseFloat(x)
          if (direction === 'left') {
            if (val <= -distance) val += distance
            if (val >= 0) val -= distance
          } else {
            if (val >= 0) val -= distance
            if (val <= -distance) val += distance
          }
          return val + 'px'
        }
      }
    })
    
    animations.push(tween)

    wrapper.addEventListener('mouseenter', () => tween.pause())
    wrapper.addEventListener('mouseleave', () => tween.resume())
  })
}

// ---------- Floating Particles ----------
const particleCanvas = ref<HTMLCanvasElement | null>(null)
let particleCtx: CanvasRenderingContext2D | null = null
let particleAnimationId: number | null = null
let particles: { x: number; y: number; radius: number; alpha: number; vx: number; vy: number }[] = []

const initParticles = () => {
  if (!particleCanvas.value) return
  const canvas = particleCanvas.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  particleCtx = canvas.getContext('2d')
  
  particles = []
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2
    })
  }
  animateParticles()
}

const animateParticles = () => {
  if (!particleCtx || !particleCanvas.value) return
  const canvas = particleCanvas.value
  particleCtx.clearRect(0, 0, canvas.width, canvas.height)
  
  for (let p of particles) {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0) p.x = canvas.width
    if (p.x > canvas.width) p.x = 0
    if (p.y < 0) p.y = canvas.height
    if (p.y > canvas.height) p.y = 0
    
    particleCtx.beginPath()
    particleCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    particleCtx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`
    particleCtx.fill()
  }
  particleAnimationId = requestAnimationFrame(animateParticles)
}

const resizeParticles = () => {
  if (!particleCanvas.value) return
  particleCanvas.value.width = window.innerWidth
  particleCanvas.value.height = window.innerHeight
  initParticles()
}

// ---------- Lifecycle ----------
onMounted(() => {
  initMarqueeAnimations()
  initParticles()
  window.addEventListener('resize', () => {
    resizeParticles()
    initMarqueeAnimations()
  })
})

onUnmounted(() => {
  animations.forEach(anim => anim.kill())
  if (particleAnimationId) cancelAnimationFrame(particleAnimationId)
  window.removeEventListener('resize', resizeParticles)
})
</script>

<style scoped>
.perspective-container {
  perspective: 800px;
  transform-style: preserve-3d;
}

.marquee-row-wrapper {
  transform: rotateX(2deg) translateZ(10px);
  transition: transform 0.3s ease;
}

.marquee-row-wrapper:hover {
  transform: rotateX(0deg) translateZ(20px);
}

.marquee-track {
  display: flex;
  gap: 1.5rem;
  width: max-content;
  will-change: transform;
  backface-visibility: hidden;
}

/* Tech card - uses CSS custom property for brand color */
.tech-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.8rem;
  background: rgba(10, 10, 15, 0.7);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 3rem;
  color: #e2e8f0;
  font-weight: 500;
  font-size: 0.95rem;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: default;
}

/* Hover effect using the per-card brand color (CSS variable) */
.tech-card:hover {
  transform: scale(1.05);
  background: rgba(20, 25, 40, 0.9);
  border-color: var(--brand-color, #3b82f6);
  box-shadow: 0 0 20px var(--brand-color, #3b82f6);
  color: white;
}

/* Icon hover glow matches brand color */
.tech-card:hover i {
  filter: drop-shadow(0 0 6px var(--brand-color, #3b82f6));
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(59, 130, 246, 0.1);
  padding: 0.3rem 1rem;
  border-radius: 2rem;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  display: inline-block;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

@media (max-width: 768px) {
  .tech-card {
    padding: 0.5rem 1.2rem;
    font-size: 0.8rem;
    gap: 0.5rem;
  }
  .tech-card i {
    font-size: 1rem;
  }
}
</style>