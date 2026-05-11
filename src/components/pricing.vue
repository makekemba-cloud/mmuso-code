<script setup lang="ts">
interface PricingPlan {
  name: string
  priceRange: string
  description: string
  features: string[]
  recommended?: boolean
  category: 'website' | 'ecommerce' | 'webapp' | 'support' | 'branding'
}

const developmentPlans: PricingPlan[] = [
  {
    name: 'Basic Business Website',
    priceRange: 'R2,500 – R6,000',
    description: 'Perfect for small businesses, portfolios, and local brands.',
    features: [
      'Responsive design',
      'Contact form',
      'Modern UI',
      'Basic SEO',
      'Deployment'
    ],
    category: 'website'
  },
  {
    name: 'Premium Business Website',
    priceRange: 'R6,000 – R15,000+',
    description: 'For professional companies, startups, and premium branding.',
    features: [
      'Custom UI/UX',
      'Animations & interactions',
      'Advanced sections',
      'Performance optimization',
      'Email integration',
      'Analytics'
    ],
    recommended: true,
    category: 'website'
  },
  {
    name: 'E-Commerce Website',
    priceRange: 'R8,000 – R25,000+',
    description: 'Full online store with cart, checkout, and admin panel.',
    features: [
      'Product catalog',
      'Shopping cart',
      'Secure checkout',
      'PayFast / Paystack',
      'Admin dashboard',
      'Inventory management'
    ],
    category: 'ecommerce'
  },
  {
    name: 'Web Applications / Platforms',
    priceRange: 'R15,000 – R80,000+',
    description: 'Custom portals, booking systems, SaaS platforms, dashboards.',
    features: [
      'Authentication & roles',
      'Database integration',
      'API development',
      'Scalable architecture',
      'Admin interface',
      'Cloud deployment'
    ],
    category: 'webapp'
  }
]

const maintenancePlans: PricingPlan[] = [
  {
    name: 'Starter Support',
    priceRange: 'R300 – R800 / month',
    description: 'Essential maintenance for peace of mind.',
    features: [
      'Weekly backups',
      'Security updates',
      'Small content edits',
      'Uptime monitoring'
    ],
    category: 'support'
  },
  {
    name: 'Growth Support',
    priceRange: 'R1,000 – R3,000 / month',
    description: 'Ongoing improvements and feature updates.',
    features: [
      'All Starter features',
      'Performance optimization',
      'Feature additions',
      'Analytics reporting',
      'Priority support'
    ],
    category: 'support'
  }
]

const brandingPlans: PricingPlan[] = [
  {
    name: 'Branding / Design Add-ons',
    priceRange: 'R500 – R5,000+',
    description: 'Logo refinement, UI design, social kits, brand assets.',
    features: [
      'Logo refinement',
      'Custom UI design',
      'Social media kits',
      'Brand style guide',
      'Marketing assets'
    ],
    category: 'branding'
  }
]
</script>

<template>
  <div class="relative bg-gradient-to-b from-black via-[#050816] to-black overflow-hidden">
    
    <!-- Floating glowing orbs (keep for atmosphere) -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-20 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

    <!-- Main container with responsive padding -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">

      <!-- Header -->
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-sm text-[#2563EB] font-semibold">Investment</span>
        </span>
      </div>

      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-4">
        Simple, <span class="text-[#2563EB]">Transparent Pricing</span>
      </h1>

      <p class="text-center text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16 text-base md:text-lg">
        Choose the plan that fits your project. All prices are estimates — final quotes depend on specific requirements.
      </p>

      <!-- Development & Web Applications Section -->
      <div class="mb-16 md:mb-20">
        <!-- Section heading - responsive gap -->
        <div class="flex items-center gap-2 sm:gap-4 mb-6 md:mb-10">
          <div class="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            <span class="text-[#2563EB]">Development</span> & Web Applications
          </h2>
          <div class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
        </div>

        <!-- Card grid - responsive gaps -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          <div
            v-for="plan in developmentPlans"
            :key="plan.name"
            class="relative bg-[#0a0a0a] rounded-2xl border border-gray-800 p-4 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#2563EB]/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
            :class="{ 'border-[#2563EB]/30 shadow-md': plan.recommended }"
          >
            <!-- Most Popular badge - responsive positioning and font -->
            <div 
              v-if="plan.recommended" 
              class="absolute -top-3 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg whitespace-nowrap"
            >
              Most Popular
            </div>

            <h3 class="text-lg sm:text-xl font-bold text-white mb-2">{{ plan.name }}</h3>
            <!-- Price range - smaller on mobile with line break if needed -->
            <div class="text-xl sm:text-2xl font-bold text-[#2563EB] mb-3 sm:mb-4 break-words">{{ plan.priceRange }}</div>
            <p class="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6">{{ plan.description }}</p>

            <!-- Features list - smaller gap on mobile -->
            <ul class="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                <i class="fas fa-check-circle text-[#2563EB] text-[10px] sm:text-xs mt-0.5"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <!-- Button - better touch padding on mobile -->
            <a
              href="/#contact"
              class="block w-full text-center py-2.5 sm:py-3 rounded-lg border border-gray-700 text-gray-300 font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] active:scale-[0.98]"
            >
              Get Quote
            </a>
          </div>
        </div>
      </div>

      <!-- Maintenance & Support + Branding (side‑by‑side) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 mb-12 md:mb-16">
        <!-- Maintenance Plans -->
        <div>
          <div class="flex items-center gap-2 sm:gap-4 mb-6 md:mb-8">
            <div class="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
            <h2 class="text-xl sm:text-2xl font-bold text-white">
              <span class="text-[#2563EB]">Maintenance</span> & Support
            </h2>
            <div class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            <div
              v-for="plan in maintenancePlans"
              :key="plan.name"
              class="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-4 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#2563EB]/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
            >
              <h3 class="text-lg sm:text-xl font-bold text-white mb-2">{{ plan.name }}</h3>
              <div class="text-lg sm:text-xl font-bold text-[#2563EB] mb-3 sm:mb-4">{{ plan.priceRange }}</div>
              <p class="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6">{{ plan.description }}</p>

              <ul class="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
                <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                  <i class="fas fa-check-circle text-[#2563EB] text-[10px] sm:text-xs mt-0.5"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>

              <a
                href="/#contact"
                class="block w-full text-center py-2.5 sm:py-3 rounded-lg border border-gray-700 text-gray-300 font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] active:scale-[0.98]"
              >
                Get Quote
              </a>
            </div>
          </div>
        </div>

        <!-- Branding Add-ons -->
        <div>
          <div class="flex items-center gap-2 sm:gap-4 mb-6 md:mb-8">
            <div class="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
            <h2 class="text-xl sm:text-2xl font-bold text-white">
              <span class="text-[#2563EB]">Branding</span> & Design
            </h2>
            <div class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>

          <div class="grid grid-cols-1 gap-5 md:gap-6">
            <div
              v-for="plan in brandingPlans"
              :key="plan.name"
              class="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-4 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#2563EB]/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
            >
              <h3 class="text-lg sm:text-xl font-bold text-white mb-2">{{ plan.name }}</h3>
              <div class="text-lg sm:text-xl font-bold text-[#2563EB] mb-3 sm:mb-4">{{ plan.priceRange }}</div>
              <p class="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6">{{ plan.description }}</p>

              <ul class="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
                <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                  <i class="fas fa-check-circle text-[#2563EB] text-[10px] sm:text-xs mt-0.5"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>

              <a
                href="/#contact"
                class="block w-full text-center py-2.5 sm:py-3 rounded-lg border border-gray-700 text-gray-300 font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] active:scale-[0.98]"
              >
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom note + CTA - responsive text and card -->
      <div class="text-center mt-8 md:mt-12">
        <p class="text-gray-500 text-xs sm:text-sm mb-6">
          * All prices exclude VAT. Custom enterprise solutions also available.
        </p>
        <div class="inline-flex flex-col sm:flex-row items-center gap-3 bg-[#0a0a0a]/80 backdrop-blur-sm border border-gray-700 rounded-2xl px-4 sm:px-6 py-3 sm:py-4">
          <i class="fas fa-calendar-alt text-[#2563EB] text-base sm:text-lg"></i>
          <p class="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            Not sure which plan fits? 
            <a href="/#contact" class="text-[#2563EB] hover:underline font-medium">Book a free consultation</a> – we’ll help you decide.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
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