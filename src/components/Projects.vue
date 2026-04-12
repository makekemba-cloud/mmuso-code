<script setup lang="ts">
interface Project {
  title: string
  image: string
  description: string
  tags: string[]
  inProduction?: boolean
  liveUrl?: string
  codeUrl?: string
}

const projects: Project[] = [
  {
    title: 'BigSmallInsights',
    image: '/assets/Screenshot%202026-03-06%20155732.png',
    description: 'A student support platform connecting learners with mentors, tutors, and structured resources. Features Google OAuth, role-based access control, Sentry error monitoring, and custom activity logging.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Google OAuth', 'Sentry'],
    liveUrl: 'https://www.bigsmallinsights.co.za/',
  },
  {
    title: 'Developer Portfolio',
    image: '/assets/Screenshot%202026-03-06%20155706.png',
    description: 'A modern, responsive portfolio built with Next.js to showcase projects, technical skills, and development experience. Features animated project cards, dynamic filtering, and sections for blogs and mini apps.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://makekembavhutali.co.za/',
    codeUrl: 'https://github.com/makekemba-cloud/my-portfolio',
  },
  {
    title: 'SNAC Member System',
    image: '/assets/Screenshot%202026-03-06%20155837.png',
    description: 'A full-stack athletic club management platform with member registration, admin approvals, role-based access control, and athlete profiles. Built with Supabase RLS enforced at the database layer.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    inProduction: false,
    liveUrl: 'https://sibalekananiac.co.za',
  },
]
</script>

<template>
  <section id="projects" class="bg-[#000000] py-20 border-b border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-sm text-[#2563EB] font-semibold">Featured Work</span>
        </span>
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-center text-white mb-4">
        Projects we are <span class="text-[#2563EB]">proud of</span>
      </h2>
      <p class="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
        A selection of projects showcasing expertise in fullstack development, authentication, and real-world business solutions. Working closely with our clients to deliver custom web applications across South Africa.
      </p>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div
          v-for="project in projects"
          :key="project.title"
          class="relative bg-[#111] rounded-2xl overflow-hidden border border-gray-800 shadow-lg transform transition-all hover:-translate-y-2 hover:scale-105 hover:shadow-[#2563EB]/30"
        >
          <!-- Ribbon for Proud/Production -->
          <div v-if="project.inProduction" class="absolute top-3 left-0 bg-[#2563EB] px-3 py-1 text-xs font-semibold text-white rounded-r-lg z-10">
            In Production
          </div>

          <!-- Image -->
          <div class="relative w-full h-56 overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-lg font-bold text-white mb-2">{{ project.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{{ project.description }}</p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="bg-gradient-to-r from-[#2563EB]/20 to-transparent text-[#2563EB] text-xs font-semibold px-2 py-1 rounded-full"
              >{{ tag }}</span>
            </div>

            <!-- Buttons -->
            <div class="flex gap-3 mt-auto">
              <a
                v-if="project.codeUrl"
                :href="project.codeUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1 px-4 py-2 text-sm border border-gray-600 text-gray-300 rounded-lg hover:bg-[#2563EB]/10 hover:border-[#2563EB] transition"
              >
                <i class="fab fa-github"></i> Code
              </a>
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1 px-4 py-2 text-sm bg-[#2563EB] text-white rounded-lg shadow hover:shadow-[#2563EB]/50 transition"
              >
                <i class="fas fa-external-link-alt"></i> Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>