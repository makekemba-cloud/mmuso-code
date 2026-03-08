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
    liveUrl: 'https://makekembav-portfolio.vercel.app/',
    codeUrl: 'https://github.com/makekemba-cloud',
  },
  {
    title: 'SNAC Member System',
    image: '/assets/Screenshot%202026-03-06%20155837.png',
    description: 'A full-stack athletic club management platform with member registration, admin approvals, role-based access control, and athlete profiles. Built with Supabase RLS enforced at the database layer.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    inProduction: true,
    liveUrl: 'https://sibalekananiac.co.za',
  },
]
</script>

<template>
  <section id="projects" class="bg-[#000000] py-20 border-b border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div v-for="project in projects" :key="project.title" class="project-card">

          <!-- Image -->
          <div class="card-img">
            <img :src="project.image" :alt="project.title">
            <div v-if="project.inProduction" class="production-banner">
              <div class="ping-dot"></div>
              <i class="fas fa-wrench" style="font-size:11px;color:#000;"></i>
              <span class="label">Currently in Production</span>
              <i class="fas fa-wrench" style="font-size:11px;color:#000;"></i>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-lg font-bold text-white mb-2">{{ project.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">{{ project.description }}</p>

            <div class="flex flex-wrap gap-1.5 mb-5">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>

            <div class="flex gap-2 pt-4 border-t border-gray-800">
              <a
                v-if="project.codeUrl"
                :href="project.codeUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="card-btn"
              >
                <i class="fab fa-github" style="font-size:16px"></i> Code
              </a>
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="card-btn primary"
              >
                <i class="fas fa-external-link-alt" style="font-size:14px"></i> Live Demo
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>