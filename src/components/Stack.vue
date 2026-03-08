<script setup lang="ts">
interface StackCategory {
  icon: string
  title: string
  pills: string[]
}

const categories: StackCategory[] = [
  {
    icon: 'fa-globe',
    title: 'Web Development',
    pills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'ASP.NET Core', 'C#', 'Node.js', 'REST APIs', 'Vite'],
  },
  {
    icon: 'fa-mobile-alt',
    title: 'Mobile Development',
    pills: ['React (Mobile-ready)', 'Responsive Web', 'PWA Concepts', 'API-driven Backend', 'Supabase Auth'],
  },
  {
    icon: 'fa-database',
    title: 'Database Management',
    pills: ['PostgreSQL', 'SQL Server', 'Supabase DB', 'Stored Procedures', 'Indexes', 'ERD Design'],
  },
  {
    icon: 'fa-cloud',
    title: 'Cloud & Hosting',
    pills: ['Supabase', 'Vercel', 'GitHub'],
  },
  {
    icon: 'fa-lock',
    title: 'Auth & Security',
    pills: ['Supabase Auth', 'OAuth', 'Row Level Security', 'Role-based Access', 'Input Validation', 'JWT'],
  },
  {
    icon: 'fa-paint-brush',
    title: 'UI/UX Design',
    pills: ['Figma', 'Responsive Layouts', 'Dashboards', 'Forms & Validation', 'User-Centered Design'],
  },
  {
    icon: 'fa-tools',
    title: 'Dev Tools',
    pills: ['VS Code', 'Visual Studio', 'Git', 'GitHub', 'Postman', 'npm', 'ESLint'],
  },
]
</script>

<template>
  <section id="stack" class="bg-[#000000] py-20 border-y border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-sm text-[#2563EB] font-semibold">Technology Stack</span>
        </span>
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-center text-white mb-4">
        Our <span class="text-[#2563EB]">Technology</span> Stack
      </h2>
      <p class="text-center text-gray-400 max-w-3xl mx-auto mb-16 text-lg">
        We leverage cutting-edge technologies and industry-leading tools to build robust, scalable solutions that stand the test of time.
      </p>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="cat in categories"
          :key="cat.title"
          class="bg-[#0a0a0a] p-6 rounded-2xl border border-gray-800 hover-lift"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-400 text-2xl">
              <i :class="`fas ${cat.icon}`"></i>
            </div>
            <h3 class="text-xl font-semibold text-white">{{ cat.title }}</h3>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="pill in cat.pills"
              :key="pill"
              class="tech-pill px-3 py-1.5 rounded-full text-xs border"
            >{{ pill }}</span>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <p class="text-xl text-gray-300 mb-6">Ready to leverage these technologies for your project?</p>
        <a
          href="#contact"
          class="inline-flex items-center gap-2 bg-[#2563EB] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#1d4ed8] transition text-lg shadow-lg shadow-[#2563EB]/30 hover:shadow-[#2563EB]/50 hover-lift"
        >
          Let's Build Together <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </section>
</template>