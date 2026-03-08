<script setup lang="ts">
interface StackCategory {
  icon: string
  title: string
  pills: string[]
  color: string
  glow: string
}

const categories: StackCategory[] = [
  {
    icon: 'fa-globe',
    title: 'Web Development',
    pills: [
      'React.js', 'Next.js', 'Vue 3', 'TypeScript', 'Tailwind CSS', 
      'ASP.NET Core', 'C#', 'Node.js', 'Vite', 'Razor Pages', 'REST APIs'
    ],
    color: 'from-blue-500/20 to-transparent',
    glow: 'group-hover:shadow-blue-500/20',
  },
  {
    icon: 'fa-database',
    title: 'Database Management',
    pills: [
      'PostgreSQL', 'SQL Server', 'Supabase DB', 'Stored Procedures', 
      'Indexes', 'ERD Design'
    ],
    color: 'from-violet-500/20 to-transparent',
    glow: 'group-hover:shadow-violet-500/20',
  },
  {
    icon: 'fa-cloud',
    title: 'Cloud & Hosting',
    pills: [
      'Supabase', 'Vercel', 'HostAfrica', 'IIS', 'Azure DevOps', 'GitHub', 'Netlify'
    ],
    color: 'from-sky-500/20 to-transparent',
    glow: 'group-hover:shadow-sky-500/20',
  },
  {
    icon: 'fa-lock',
    title: 'Auth & Security',
    pills: [
      'Supabase Auth', 'OAuth', 'Google OAuth 2.0', 'Role-Based Access Control (RBAC)', 
      'Row Level Security', 'JWT', 'Input Validation'
    ],
    color: 'from-emerald-500/20 to-transparent',
    glow: 'group-hover:shadow-emerald-500/20',
  },
  {
    icon: 'fa-paint-brush',
    title: 'UI/UX Design',
    pills: [
      'Figma', 'Responsive Layouts', 'Dashboards', 'Forms & Validation', 
      'User-Centered Design', 'Intuitive UX'
    ],
    color: 'from-pink-500/20 to-transparent',
    glow: 'group-hover:shadow-pink-500/20',
  },
  {
    icon: 'fa-tools',
    title: 'Dev Tools & Monitoring',
    pills: [
      'VS Code', 'Visual Studio', 'Git', 'GitHub Actions', 
      'Postman', 'npm', 'ESLint', 'Sentry'
    ],
    color: 'from-orange-500/20 to-transparent',
    glow: 'group-hover:shadow-orange-500/20',
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
          :class="`group relative bg-[#0a0a0a] p-7 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl ${cat.glow} overflow-hidden`"
        >
          <!-- gradient top bar -->
          <div :class="`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.color.replace('to-transparent', 'to-blue-400')}`"></div>

          <!-- background glow blob -->
          <div :class="`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${cat.color} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`"></div>

          <div class="relative">
            <div class="flex items-center gap-4 mb-5">
              <div class="w-12 h-12 bg-[#2563EB]/10 border border-[#2563EB]/30 rounded-xl flex items-center justify-center text-[#2563EB] text-xl group-hover:bg-[#2563EB]/20 transition-colors duration-300">
                <i :class="`fas ${cat.icon}`"></i>
              </div>
              <h3 class="text-lg font-semibold text-white">{{ cat.title }}</h3>
            </div>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="pill in cat.pills"
                :key="pill"
                class="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-900 border border-gray-700 text-gray-300 hover:border-[#2563EB]/60 hover:text-[#2563EB] hover:bg-[#2563EB]/5 transition-all duration-200 cursor-default"
              >{{ pill }}</span>
            </div>
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