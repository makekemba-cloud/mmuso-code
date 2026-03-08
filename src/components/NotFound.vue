<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface ConfettiPiece {
  id: number; x: number; y: number; color: string
  size: number; speed: number; rotation: number; shape: 'circle' | 'square'
}
interface Notification {
  id: number; type: 'success' | 'warning' | 'info'; message: string
}

const mouseX = ref(0)
const mouseY = ref(0)
const isGlitching = ref(false)
const isSearching = ref(false)
const notifications = ref<Notification[]>([])
const confetti = ref<ConfettiPiece[]>([])
const searchText = ref('Search all pages and routes...')

const devMessages = [
  "Looks like this route doesn't exist. Maybe it's in another branch? 🌿",
  "HTTP 404 — The page you requested could not be resolved. 🔍",
  "Oops! Looks like this commit never made it to production. 📦",
  "This endpoint returned nothing. Classic undefined behaviour. 😅",
  "Page not found. Did you forget to push? 🚀",
  "404: Even the console can't find this one. 🖥️",
  "Null pointer exception... just kidding. Page not found. 😄",
  "This URL has left the building. Let's debug and get back. 🐛",
]

const devFacts = [
  "💡 Did you know? The 404 status code has existed since HTTP/1.0 in 1992.",
  "💡 Fun fact: Google's 404 page is one of the most visited pages on the internet.",
  "💡 The average website has 3–5% of its pages returning 404 errors.",
  "💡 HTTP 404 was introduced alongside the World Wide Web itself.",
  "💡 Some companies hire designers specifically to make 404 pages memorable.",
]

const currentMessage = ref(devMessages[0])

// ── Notifications ──────────────────────────────────
function addNotification(type: 'success' | 'warning' | 'info', message: string) {
  const id = Date.now()
  notifications.value.push({ id, type, message })
  setTimeout(() => removeNotification(id), 5000)
}
function removeNotification(id: number) {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

// ── Mouse parallax ─────────────────────────────────
function onMouseMove(e: MouseEvent) {
  mouseX.value = (e.clientX / window.innerWidth) * 2 - 1
  mouseY.value = (e.clientY / window.innerHeight) * 2 - 1
}

// ── Confetti ───────────────────────────────────────
function createConfetti() {
  const colors = ['#2563EB','#3B82F6','#60A5FA','#93C5FD','#1D4ED8','#BFDBFE','#F9FAFB']
  confetti.value = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * -20,
    color: colors[Math.floor(Math.random() * colors.length)] as string,
    size: Math.random() * 12 + 6,
    speed: Math.random() * 3 + 2,
    rotation: Math.random() * 360,
    shape: (Math.random() > 0.5 ? 'circle' : 'square') as 'circle' | 'square',
  }))
  setTimeout(() => { confetti.value = [] }, 3500)
}

// ── Search simulation ──────────────────────────────
function handleSearch() {
  if (isSearching.value) return
  isSearching.value = true
  addNotification('info', '🔍 Scanning all routes...')
  searchText.value = ''
  const text = 'Scanning routes... checking components... querying database...'
  let i = 0
  const type = () => {
    if (i < text.length) {
      searchText.value += text[i++]
      setTimeout(type, 45)
    } else {
      setTimeout(() => {
        searchText.value = 'Route not found in any branch. 🕵️‍♂️'
        addNotification('warning', '⚠️ No matching route found.')
        setTimeout(() => {
          isSearching.value = false
          searchText.value = 'Search all pages and routes...'
          addNotification('success', '✅ Scan complete. Try navigating home.')
        }, 1500)
      }, 800)
    }
  }
  type()
}

function handleFunFact() {
  addNotification('info', devFacts[Math.floor(Math.random() * devFacts.length)] as string)
}

// ── Intervals ──────────────────────────────────────
let glitchTimer: ReturnType<typeof setInterval>
let messageTimer: ReturnType<typeof setInterval>

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  glitchTimer = setInterval(() => {
    isGlitching.value = true
    setTimeout(() => { isGlitching.value = false }, 120)
  }, 4000)
  messageTimer = setInterval(() => {
    currentMessage.value = devMessages[Math.floor(Math.random() * devMessages.length)]
  }, 5000)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  clearInterval(glitchTimer)
  clearInterval(messageTimer)
})

const parallaxStyle = () => ({ transform: `translate(${mouseX.value * 15}px, ${mouseY.value * 15}px)` })
const parallaxReverse = () => ({ transform: `translate(${-mouseX.value * 20}px, ${-mouseY.value * 20}px)` })
</script>

<template>
  <div class="min-h-screen bg-[#000000] text-white overflow-hidden relative">

    <!-- Notifications -->
    <div class="fixed top-4 right-4 z-50 max-w-sm space-y-2">
      <TransitionGroup name="slide-in">
        <div
          v-for="n in notifications" :key="n.id"
          @click="removeNotification(n.id)"
          :class="`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm
            ${n.type === 'success' ? 'bg-[#052e16]/80 border-[#166534]/50' :
              n.type === 'warning' ? 'bg-[#1c1002]/80 border-[#92400e]/50' :
              'bg-[#0c1a3a]/80 border-[#1e40af]/50'}`"
        >
          <div :class="`w-8 h-8 rounded-full flex items-center justify-center shrink-0
            ${n.type === 'success' ? 'bg-[#16a34a]' : n.type === 'warning' ? 'bg-[#d97706]' : 'bg-[#2563EB]'}`">
            <i :class="`fas text-white text-xs ${n.type === 'success' ? 'fa-check' : n.type === 'warning' ? 'fa-exclamation' : 'fa-info'}`"></i>
          </div>
          <p class="text-sm text-gray-200 flex-1">{{ n.message }}</p>
          <button @click.stop="removeNotification(n.id)" class="text-gray-500 hover:text-white transition">
            <i class="fas fa-times text-xs"></i>
          </button>
        </div>
      </TransitionGroup>
    </div>

    <!-- Branding -->
    <a href="/" class="absolute top-8 left-8 flex items-center gap-3 group z-50">
      <div class="w-11 h-11 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/30 flex items-center justify-center group-hover:border-[#2563EB] transition-all duration-300">
        <i class="fas fa-code text-[#3B82F6] text-lg"></i>
      </div>
      <div>
        <div class="text-base font-bold text-gray-100 group-hover:text-[#3B82F6] transition-colors">Mmuso Code</div>
        <div class="text-xs text-gray-500">Innovative Software Solutions</div>
      </div>
    </a>

    <!-- Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full blur-3xl animate-pulse" />
      <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#3B82F6]/8 rounded-full blur-3xl" />
      <div class="absolute top-1/4 left-1/4 opacity-10 transition-transform duration-100" :style="parallaxStyle()">
        <i class="fas fa-ghost text-[#2563EB]" style="font-size: 110px;"></i>
      </div>
      <div class="absolute bottom-1/4 right-1/4 opacity-10 transition-transform duration-100" :style="parallaxReverse()">
        <i class="fas fa-compass text-[#3B82F6]" style="font-size: 90px;"></i>
      </div>
      <!-- Grid -->
      <div class="absolute inset-0 opacity-[0.025]"
        style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 60px 60px;">
      </div>
    </div>

    <!-- Confetti -->
    <div class="fixed inset-0 pointer-events-none z-40">
      <div
        v-for="p in confetti" :key="p.id"
        :class="p.shape === 'circle' ? 'absolute rounded-full' : 'absolute rounded-sm'"
        :style="{
          left: `${p.x}%`, top: `${p.y}%`,
          backgroundColor: p.color, width: `${p.size}px`, height: `${p.size}px`,
          transform: `rotate(${p.rotation}deg)`,
          animation: `confetti-fall ${p.speed}s linear forwards`,
          animationDelay: `${p.id * 0.01}s`,
        }"
      />
    </div>

    <!-- Main -->
    <div class="min-h-screen flex flex-col items-center justify-center px-4 text-center relative z-10">

      <!-- 404 -->
      <div class="mb-8">
        <div :class="`text-[10rem] sm:text-[12rem] font-bold leading-none mb-4 select-none ${isGlitching ? 'glitch' : ''}`">
          <span class="text-[#2563EB]">4</span>
          <span class="text-gray-100">0</span>
          <span class="text-[#2563EB]">4</span>
        </div>
        <div class="flex items-center justify-center gap-3 text-xl font-semibold text-gray-400">
          <i class="fas fa-terminal text-[#2563EB]"></i>
          <span>Page Not Found</span>
        </div>
      </div>

      <!-- Rotating message -->
      <div class="max-w-xl mb-10">
        <p class="text-lg text-gray-400 mb-4 min-h-[28px] transition-all duration-500">{{ currentMessage }}</p>
        <div class="flex justify-center gap-2">
          <button
            v-for="(msg, i) in devMessages" :key="i"
            @click="currentMessage = msg"
            :class="`h-1.5 rounded-full transition-all duration-300 ${currentMessage === msg ? 'w-6 bg-[#2563EB]' : 'w-1.5 bg-gray-700 hover:bg-gray-500'}`"
          />
        </div>
      </div>

      <!-- Search bar -->
      <div :class="`max-w-xl w-full mb-10 transition-all duration-300 ${isSearching ? 'scale-105' : ''}`">
        <div class="relative bg-[#0B0F1A] border border-[#1F2937] hover:border-[#2563EB]/50 rounded-xl p-2 transition-all duration-300 flex items-center gap-3">
          <i :class="`fas fa-search text-[#2563EB] ml-3 shrink-0 ${isSearching ? 'fa-spin' : ''}`"></i>
          <input
            :value="searchText" readonly
            class="flex-1 bg-transparent py-3 text-gray-400 focus:outline-none text-sm"
          >
          <button
            @click="handleSearch" :disabled="isSearching"
            class="shrink-0 px-5 py-2.5 rounded-lg bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <i :class="`fas ${isSearching ? 'fa-spinner fa-spin' : 'fa-search'}`"></i>
            {{ isSearching ? 'Scanning...' : 'Scan Routes' }}
          </button>
        </div>
      </div>

      <!-- Action cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl w-full mb-12">
        <button @click="createConfetti(); router.push('/')"
          class="group rounded-xl border border-[#111827] bg-[#0B0F1A]/60 p-6 hover:border-[#2563EB]/50 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex flex-col items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center group-hover:bg-[#2563EB]/20 transition-colors">
            <i class="fas fa-home text-[#3B82F6] text-xl"></i>
          </div>
          <span class="text-gray-100 font-semibold">Back to Home</span>
          <span class="text-gray-500 text-xs flex items-center gap-1"><i class="fas fa-sparkles"></i> Safe return</span>
        </button>

        <button @click="router.go(-1)"
          class="group rounded-xl border border-[#111827] bg-[#0B0F1A]/60 p-6 hover:border-[#2563EB]/50 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex flex-col items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center group-hover:bg-[#2563EB]/20 transition-colors">
            <i class="fas fa-arrow-left text-[#3B82F6] text-xl"></i>
          </div>
          <span class="text-gray-100 font-semibold">Go Back</span>
          <span class="text-gray-500 text-xs">Previous page</span>
        </button>

        <button @click="handleFunFact"
          class="group rounded-xl border border-[#111827] bg-[#0B0F1A]/60 p-6 hover:border-[#2563EB]/50 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex flex-col items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center group-hover:bg-[#2563EB]/20 transition-colors">
            <i class="fas fa-info text-[#3B82F6] text-xl"></i>
          </div>
          <span class="text-gray-100 font-semibold">Dev Fact</span>
          <span class="text-gray-500 text-xs">Learn something 💡</span>
        </button>
      </div>

      <!-- Stats -->
      <div class="flex flex-wrap justify-center gap-12 mb-12 py-8 border-y border-[#111827] w-full max-w-lg">
        <div v-for="s in [{ value: '404', label: 'Error Code' }, { value: '∞', label: 'Routes Exist' }, { value: '1', label: 'Way Home' }]"
          :key="s.label" class="text-center">
          <div class="text-4xl font-bold text-[#2563EB]">{{ s.value }}</div>
          <div class="text-xs text-gray-500 mt-1 uppercase tracking-widest">{{ s.label }}</div>
        </div>
      </div>

      <!-- Main CTA -->
      <div class="relative group">
        <div class="absolute -inset-3 bg-[#2563EB]/20 rounded-2xl blur-xl group-hover:bg-[#2563EB]/30 transition-all duration-500" />
        <a href="/" @click="createConfetti"
          class="relative flex items-center gap-3 px-10 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#2563EB]/30">
          <i class="fas fa-home group-hover:animate-bounce"></i>
          Return to Home
          <i class="fas fa-star opacity-70"></i>
        </a>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes confetti-fall {
  0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}
@keyframes glitch-anim {
  0%   { transform: translate(0); }
  20%  { transform: translate(-3px, 3px); }
  40%  { transform: translate(-3px, -3px); }
  60%  { transform: translate(3px, 3px); }
  80%  { transform: translate(3px, -3px); }
  100% { transform: translate(0); }
}
.glitch { animation: glitch-anim 0.3s infinite; }

.slide-in-enter-active { transition: all 0.4s ease-out; }
.slide-in-leave-active { transition: all 0.3s ease-in; }
.slide-in-enter-from  { transform: translateX(110%); opacity: 0; }
.slide-in-leave-to    { transform: translateX(110%); opacity: 0; }
</style>