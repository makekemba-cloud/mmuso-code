<script setup lang="ts">
interface Project {
  title: string
  image: string
  description: string
  inProduction?: boolean
  underDevelopment?: boolean
  liveUrl?: string
  codeUrl?: string
}

const projects: Project[] = [
  {
    title: 'Big Small Insights',
    image: '/assets/Screenshot%202026-04-14%20165420.png',
    description: 'A student support platform connecting learners with mentors, tutors, and structured resources.',
    liveUrl: 'https://www.bigsmallinsights.co.za/',
  },
  {
    title: 'Let Us Heal',
    image: '/assets/let-us-heal.png',
    description: 'A modern non-profit platform for youth empowerment and donations.',
    underDevelopment: true,
    liveUrl: 'https://letusheal.co.za/',
  },
  {
    title: 'SNAC Member System',
    image: '/assets/Screenshot%202026-03-06%20155837.png',
    description: 'Complete athletic club management platform and member management.',
    inProduction: false,
    liveUrl: 'https://sibalekananiac.co.za',
  },
  {
    title: 'Developer Portfolio',
    image: '/assets/Screenshot%202026-03-06%20155706.png',
    description: 'A modern portfolio showcasing development projects and skills.',
    liveUrl: 'https://makekembavhutali.co.za/',
    codeUrl: 'https://github.com/makekemba-cloud',
  },
]
</script>

<template>
  <section id="projects" class="relative py-16 md:py-24 bg-gradient-to-b from-black via-[#050816] to-black overflow-hidden">
      
    <!-- Floating glowing orbs – reduced opacity on mobile -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] opacity-50 md:opacity-100"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] opacity-50 md:opacity-100"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl opacity-50 md:opacity-100"></div>
    </div>

    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

      <!-- Divider line with pill – responsive -->
      <div class="relative mb-8 md:mb-12 flex items-center justify-center">
        <div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        <span class="mx-4 sm:mx-6 px-2 sm:px-4 py-1 text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 bg-[#050816] border border-gray-700 rounded-full backdrop-blur-sm whitespace-nowrap">
          Our Portfolio
        </span>
        <div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </div>

      <!-- Badge (responsive text) -->
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-xs sm:text-sm text-[#2563EB] font-semibold">Featured Work</span>
        </span>
      </div>

      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-4">
        Projects we are <span class="text-[#2563EB]">proud of</span>
      </h2>

      <p class="text-center text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16 text-sm sm:text-base md:text-lg">
        A selection of real-world systems built with modern frameworks and scalable architecture.
      </p>

      <!-- Projects Grid – responsive columns and gaps -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">

        <div
          v-for="project in projects"
          :key="project.title"
          class="group relative bg-[#0a0a0a] rounded-2xl border border-gray-800 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#2563EB]/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
        >

          <!-- Image Container – responsive height -->
          <div class="relative h-48 md:h-56 overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <!-- Overlay gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <!-- Status Badges – responsive padding -->
            <div class="absolute top-3 left-3 flex gap-2">
              <span v-if="project.inProduction" class="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md">
                Live
              </span>
              <span v-if="project.underDevelopment" class="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-md">
                Development
              </span>
            </div>
          </div>

          <!-- Content – responsive padding -->
          <div class="p-4 md:p-6">
            <h3 class="text-lg md:text-xl font-bold text-white mb-2 transition-colors group-hover:text-[#2563EB]">
              {{ project.title }}
            </h3>
            <p class="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
              {{ project.description }}
            </p>

            <!-- Buttons – responsive sizing -->
            <div class="flex gap-3">
              <a
                v-if="project.codeUrl"
                :href="project.codeUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium rounded-lg border border-gray-700 text-gray-300 transition-all duration-200 hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-sm"
              >
                <i class="fab fa-github text-xs sm:text-sm"></i> Code
              </a>
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-blue-500/40"
              >
                <i class="fas fa-external-link-alt text-xs sm:text-sm"></i> Live Demo
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Reuse global badge/pulse styles */
.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(37, 99, 235, 0.1);
  backdrop-filter: blur(4px);
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(37, 99, 235, 0.3);
}

.pulse-dot {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #3b82f6;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}
</style>