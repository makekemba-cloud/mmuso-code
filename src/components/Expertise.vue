<script setup lang="ts">
interface ExpertiseItem {
  icon: string
  title: string
  description: string
}

const items: ExpertiseItem[] = [
  { 
    icon: 'fa-globe',
    title: 'Web Application Development',
    description: 'Modern, responsive web applications and digital platforms built with scalable architectures.'
  },
  { 
    icon: 'fa-server',
    title: 'Backend & API Development',
    description: 'Secure backend systems, REST APIs, authentication, and scalable server-side logic.'
  },
  { 
    icon: 'fa-database',
    title: 'Database Architecture',
    description: 'Designing secure, efficient databases with PostgreSQL, Supabase, and SQL Server.'
  },
  { 
    icon: 'fa-shield-alt',
    title: 'Security & Access Control',
    description: 'Authentication systems, role-based access control, and secure data architecture.'
  },
]
</script>

<template>
  <section id="expertise" class="py-20 bg-[#000000]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-sm text-[#2563EB] font-semibold">Expertise</span>
        </span>
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        Our <span class="text-[#2563EB]">Expertise</span>
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="item in items"
          :key="item.title"
          class="bg-[#111] p-6 rounded-2xl border border-gray-800 shadow-xl hover-lift"
        >
          <div class="w-12 h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center text-[#2563EB] text-2xl mb-4">
            <i :class="`fas ${item.icon}`"></i>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">{{ item.title }}</h3>
          <p class="text-gray-400">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>