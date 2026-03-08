<script setup lang="ts">
interface Advantage {
  icon: string
  title: string
  description: string
}

const advantages: Advantage[] = [
  {
    icon: 'fa-rocket',
    title: 'Modern Technologies',
    description: 'We build systems using Next.js, TypeScript, Supabase, and ASP.NET to ensure performance and scalability.',
  },
  {
    icon: 'fa-shield-alt',
    title: 'Security First',
    description: 'Authentication, role-based access control, and database-level security ensure your platform is safe and reliable.',
  },
  {
    icon: 'fa-bolt',
    title: 'Fast & Scalable',
    description: 'Our systems are designed to grow with your business using optimised cloud infrastructure.',
  },
  {
    icon: 'fa-handshake',
    title: 'Client Focused',
    description: 'We work closely with clients through every stage — from idea to launch — ensuring the product meets your goals.',
  },
]

const industries = [
  { icon: 'fa-lightbulb',    label: 'Startups' },
  { icon: 'fa-store',        label: 'Small Businesses' },
  { icon: 'fa-running',      label: 'Sports Clubs' },
  { icon: 'fa-graduation-cap', label: 'Educational Platforms' },
]
</script>

<template>
  <section id="why-us" class="py-20 bg-[#000000] border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Why Choose Us -->
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-sm text-[#2563EB] font-semibold">Why Us</span>
        </span>
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-center text-white mb-4">
        Why Choose <span class="text-[#2563EB]">Mmuso Code</span>
      </h2>
      <p class="text-center text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
        We combine modern technologies, secure architecture, and user-focused design to build reliable digital solutions for businesses.
      </p>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        <div
          v-for="item in advantages"
          :key="item.title"
          class="bg-[#111] p-6 rounded-xl border border-gray-800 hover-lift text-center"
        >
          <i :class="`fas ${item.icon} text-[#2563EB] text-3xl mb-4 block`"></i>
          <h3 class="text-lg font-semibold text-white mb-2">{{ item.title }}</h3>
          <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
        </div>
      </div>

     
        <div class="relative mb-16 flex items-center justify-center">
  
            <!-- Left Line -->
            <div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

            <!-- Label -->
            <span class="mx-6 px-4 py-1 text-xs uppercase tracking-wider text-gray-500 bg-[#000] border border-gray-800 rounded-full">
            Industries We Serve
            </span>

            <!-- Right Line -->
            <div class="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        </div>
      <!-- Industries -->
      <div class="flex flex-wrap justify-center gap-4 mb-16">
        <div
          v-for="ind in industries"
          :key="ind.label"
          class="flex items-center gap-3 bg-[#0a0a0a] border border-gray-800 px-6 py-4 rounded-xl hover-lift"
        >
          <i :class="`fas ${ind.icon} text-[#2563EB] text-xl`"></i>
          <span class="text-white font-medium">{{ ind.label }}</span>
        </div>
      </div>

      <!-- Trusted By -->
      <div class="text-center">
        <p class="text-sm uppercase tracking-widest text-gray-500 mb-6">Trusted By</p>
        <div class="flex flex-wrap justify-center gap-8 items-center">
          <a href="https://www.bigsmallinsights.co.za/" target="_blank" rel="noopener noreferrer" class="text-gray-400 font-semibold text-lg hover:text-[#2563EB] transition">BigSmallInsights</a>
          <div class="w-px h-6 bg-gray-700"></div>
          <a href="https://sibalekananiac.co.za" target="_blank" rel="noopener noreferrer" class="text-gray-400 font-semibold text-lg hover:text-[#2563EB] transition">SNAC Athletics Club</a>
          <div class="w-px h-6 bg-gray-700"></div>
          <div class="text-gray-400 font-semibold text-lg cursor-default">Startups Across South Africa</div>
        </div>
      </div>

    </div>
  </section>
</template>