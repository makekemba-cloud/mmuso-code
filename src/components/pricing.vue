<script setup lang="ts">
import { ref, computed } from 'vue'

interface PricingPlan {
  name: string
  priceRange: string
  description: string
  features: string[]
  recommended?: boolean
  category: 'business' | 'website' | 'software' | 'managed-it' | 'hosting' | 'maintenance' | 'design'
}

const businessPlans: PricingPlan[] = [
  {
    name: 'Company Registration',
    priceRange: 'R350 – R1,500',
    description: 'Get your business officially registered with CIPC.',
    features: [
      'Company registration',
      'Name reservation guidance',
      'CIPC assistance',
      'Registration documents'
    ],
    category: 'business'
  },
  {
    name: 'Professional Business Email',
    priceRange: 'R300 – R1,000',
    description: 'Build trust with a professional email address.',
    features: [
      'Business email setup',
      'Microsoft 365 / Google Workspace',
      'Email migration',
      'Mobile configuration'
    ],
    category: 'business'
  },
  {
    name: 'Google Business Profile',
    priceRange: 'R500 – R2,000',
    description: 'Appear on Google Search and Maps.',
    features: [
      'Profile setup',
      'Verification assistance',
      'Optimization',
      'Maps listing'
    ],
    category: 'business'
  }
]

const websitePlans: PricingPlan[] = [
  {
    name: 'Starter Website',
    priceRange: 'R1,500 – R3,500',
    description: 'Perfect for portfolios, small businesses, and personal brands.',
    features: [
      'Responsive design',
      'Contact form',
      'Basic SEO',
      'Modern UI',
      'Deployment'
    ],
    category: 'website'
  },
  {
    name: 'Business Website',
    priceRange: 'R4,000 – R8,000',
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
    name: 'Premium Website',
    priceRange: 'R8,000 – R15,000+',
    description: 'High‑end, fully custom websites with advanced functionality.',
    features: [
      'Bespoke design',
      'Custom animations',
      'Advanced integrations',
      'Multi‑page architecture',
      'CMS integration',
      'Priority support'
    ],
    category: 'website'
  },
  {
    name: 'eCommerce Website',
    priceRange: 'R8,000 – R20,000+',
    description: 'Full online store with cart, checkout, and admin panel.',
    features: [
      'Product catalog',
      'Shopping cart',
      'Secure checkout',
      'PayFast / Paystack',
      'Admin dashboard',
      'Inventory management'
    ],
    category: 'website'
  }
]

const softwarePlans: PricingPlan[] = [
  {
    name: 'Business Systems',
    priceRange: 'R5,000 +',
    description: 'Custom software tailored to your business operations.',
    features: [
      'Booking Systems',
      'CRM Systems',
      'Inventory Systems',
      'School Systems',
      'Employee Management',
      'Custom Dashboards'
    ],
    recommended: true,
    category: 'software'
  }
]

const itPlans: PricingPlan[] = [
  {
    name: 'IT Support',
    priceRange: 'From R350',
    description: 'On‑demand troubleshooting and maintenance.',
    features: [
      'Computer troubleshooting',
      'Software installation',
      'Printer setup',
      'Network troubleshooting'
    ],
    category: 'managed-it'
  },
  {
    name: 'Remote IT Management',
    priceRange: 'Monthly',
    description: 'Proactive management of your business computers.',
    features: [
      'Windows Updates',
      'Software deployment',
      'Device monitoring',
      'Remote support',
      'Patch management'
    ],
    category: 'managed-it'
  },
  {
    name: 'Employee Monitoring',
    priceRange: 'Monthly',
    description: 'Productivity and activity monitoring for your team.',
    features: [
      'Activity monitoring',
      'Productivity reports',
      'Application usage',
      'Alerts'
    ],
    category: 'managed-it'
  }
]

const hostingPlans: PricingPlan[] = [
  {
    name: 'Shared Hosting',
    priceRange: 'From R150 / month',
    description: 'Affordable hosting for small to medium websites.',
    features: [
      'Shared server',
      'SSL certificate',
      'Email accounts',
      'Control panel'
    ],
    category: 'hosting'
  },
  {
    name: 'VPS Hosting',
    priceRange: 'From R500 / month',
    description: 'Dedicated resources for high‑traffic sites.',
    features: [
      'Virtual private server',
      'Full root access',
      'Scalable resources',
      '24/7 monitoring'
    ],
    category: 'hosting'
  },
  {
    name: 'Domain Management',
    priceRange: 'From R100 / year',
    description: 'Register and manage your domain name.',
    features: [
      'Domain registration',
      'DNS management',
      'Domain renewal',
      'Domain transfer'
    ],
    category: 'hosting'
  }
]

const maintenancePlans: PricingPlan[] = [
  {
    name: 'Essential Care',
    priceRange: 'R200 – R800 / month',
    description: 'Essential maintenance for peace of mind.',
    features: [
      'Weekly backups',
      'Security updates',
      'Small content edits',
      'Uptime monitoring'
    ],
    category: 'maintenance'
  },
  {
    name: 'Business Care',
    priceRange: 'R1,000 – R3,000 / month',
    description: 'Ongoing improvements and feature updates.',
    features: [
      'All Essential features',
      'Performance optimization',
      'Feature additions',
      'Analytics reporting',
      'Priority support'
    ],
    recommended: true,
    category: 'maintenance'
  },
  {
    name: 'Enterprise Care',
    priceRange: 'R3,000 + / month',
    description: 'Full‑service management and strategic guidance.',
    features: [
      'All Business features',
      'Dedicated account manager',
      'Quarterly strategy reviews',
      '24/7 emergency support',
      'Custom development'
    ],
    category: 'maintenance'
  }
]

const designPlans: PricingPlan[] = [
  {
    name: 'Design Services',
    priceRange: 'R500 – R5,000+',
    description: 'Logo refinement, UI design, brand assets, and more.',
    features: [
      'Logo refinement',
      'Custom UI design',
      'Social media kits',
      'Brand style guide',
      'Marketing assets'
    ],
    category: 'design'
  }
]

// Comparison table (30+ features)
const comparisonFeatures = [
  { feature: 'Responsive Design', starter: '✅', business: '✅', premium: '✅' },
  { feature: 'Modern UI/UX Design', starter: '✅', business: '✅', premium: '✅' },
  { feature: 'Mobile & Tablet Optimized', starter: '✅', business: '✅', premium: '✅' },
  { feature: 'Contact Form', starter: '✅', business: '✅', premium: '✅' },
  { feature: 'Google Maps Integration', starter: '✅', business: '✅', premium: '✅' },
  { feature: 'Social Media Integration', starter: '✅', business: '✅', premium: '✅' },
  { feature: 'WhatsApp Chat Integration', starter: '✅', business: '✅', premium: '✅' },
  { feature: 'CMS / Editable Content', starter: '❌', business: '✅', premium: '✅' },
  { feature: 'Blog Functionality', starter: '❌', business: '✅', premium: '✅' },
  { feature: 'Image Gallery', starter: '✅', business: '✅', premium: '✅' },
  { feature: 'Basic SEO Setup', starter: '✅', business: '✅', premium: '✅' },
  { feature: 'Advanced SEO', starter: '❌', business: '✅', premium: '✅' },
  { feature: 'Google Analytics Setup', starter: '❌', business: '✅', premium: '✅' },
  { feature: 'Google Search Console', starter: '❌', business: '✅', premium: '✅' },
  { feature: 'Animations & Interactions', starter: '❌', business: '✅', premium: '✅' },
  { feature: 'Custom Integrations', starter: '❌', business: '❌', premium: '✅' },
  { feature: 'Booking System', starter: '❌', business: 'Optional', premium: '✅' },
  { feature: 'E‑Commerce Ready', starter: '❌', business: '❌', premium: '✅' },
  { feature: 'Payment Gateway Integration', starter: '❌', business: '❌', premium: '✅' },
  { feature: 'User Login System', starter: '❌', business: 'Optional', premium: '✅' },
  { feature: 'Admin Dashboard', starter: '❌', business: 'Optional', premium: '✅' },
  { feature: 'SSL Configuration', starter: '✅', business: '✅', premium: '✅' },
  { feature: 'Performance Optimization', starter: 'Basic', business: 'Advanced', premium: 'Premium' },
  { feature: 'Security Hardening', starter: 'Basic', business: 'Advanced', premium: 'Advanced' },
  { feature: 'Training / Handover', starter: '✅', business: '✅', premium: '✅' },
  { feature: 'Post‑Launch Support', starter: '30 Days', business: '60 Days', premium: '90 Days' },
  { feature: 'Priority Support', starter: '❌', business: '❌', premium: '✅' },
  { feature: 'Revisions', starter: '2', business: '4', premium: 'Unlimited*' },
  { feature: 'Pages Included', starter: 'Up to 5', business: 'Up to 10', premium: 'Custom' },
  { feature: 'Delivery Time', starter: '2–3 Weeks', business: '3–5 Weeks', premium: 'Project Based' },
  { feature: 'Email Accounts', starter: '1', business: '5', premium: 'Unlimited*' },
]

// Expandable table
const showAllRows = ref(false)
const initialRows = 5

const displayedFeatures = computed(() => {
  if (showAllRows.value) return comparisonFeatures
  return comparisonFeatures.slice(0, initialRows)
})

function toggleTable() {
  showAllRows.value = !showAllRows.value
}

// FAQ
const faqs = [
  {
    q: 'Can I request a custom quote?',
    a: 'Yes. Every project is unique. Contact us with your requirements and we’ll provide a tailored estimate.'
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes, for qualifying projects we offer flexible payment plans. Discuss this during your consultation.'
  },
  {
    q: 'How long does a website take?',
    a: 'Typically 2–12 weeks depending on the scope. A simple starter site can be ready in 1–2 weeks.'
  },
  {
    q: 'Do prices include hosting?',
    a: 'Hosting is quoted separately unless explicitly stated in the package.'
  },
  {
    q: 'What about ongoing support after launch?',
    a: 'We provide 30 days of free support on all projects. Extended support is available via our maintenance plans.'
  }
]
</script>

<template>
  <div class="relative bg-gradient-to-b from-black via-[#050816] to-black overflow-hidden">
    
    <!-- Floating glowing orbs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-20 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

    <!-- Main container -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">

      <!-- Header -->
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-sm text-[#2563EB] font-semibold">Investment</span>
        </span>
      </div>

      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-4">
        Our <span class="text-[#2563EB]">Services & Pricing</span>
      </h1>

      <p class="text-center text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16 text-base md:text-lg">
        Transparent pricing for all our services – from business setup and websites to software, IT support, and hosting. All estimates; final quotes depend on your specific needs.
      </p>

      <!-- ============================================================ -->
      <!-- BUSINESS SOLUTIONS -->
      <!-- ============================================================ -->
      <div class="mb-16 md:mb-20">
        <div class="flex items-center gap-2 sm:gap-4 mb-6 md:mb-10">
          <div class="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            <span class="text-[#2563EB]">Business</span> Solutions
          </h2>
          <div class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          <div
            v-for="plan in businessPlans"
            :key="plan.name"
            class="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-4 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#2563EB]/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
          >
            <h3 class="text-lg sm:text-xl font-bold text-white mb-2">{{ plan.name }}</h3>
            <div class="text-xl sm:text-2xl font-bold text-[#2563EB] mb-3 sm:mb-4 break-words">{{ plan.priceRange }}</div>
            <p class="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6">{{ plan.description }}</p>

            <ul class="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                <i class="fas fa-check-circle text-[#2563EB] text-[10px] sm:text-xs mt-0.5"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <a href="/#contact" class="block w-full text-center py-2.5 sm:py-3 rounded-lg border border-gray-700 text-gray-300 font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] active:scale-[0.98]">
              Get Quote
            </a>
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- WEBSITE DEVELOPMENT -->
      <!-- ============================================================ -->
      <div class="mb-16 md:mb-20">
        <div class="flex items-center gap-2 sm:gap-4 mb-6 md:mb-10">
          <div class="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            <span class="text-[#2563EB]">Website</span> Development
          </h2>
          <div class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          <div
            v-for="plan in websitePlans"
            :key="plan.name"
            class="relative bg-[#0a0a0a] rounded-2xl border border-gray-800 p-4 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#2563EB]/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
            :class="{ 'border-[#2563EB]/30 shadow-md': plan.recommended }"
          >
            <div v-if="plan.recommended" class="absolute -top-3 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
              Most Popular
            </div>

            <h3 class="text-lg sm:text-xl font-bold text-white mb-2">{{ plan.name }}</h3>
            <div class="text-xl sm:text-2xl font-bold text-[#2563EB] mb-3 sm:mb-4 break-words">{{ plan.priceRange }}</div>
            <p class="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6">{{ plan.description }}</p>

            <ul class="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                <i class="fas fa-check-circle text-[#2563EB] text-[10px] sm:text-xs mt-0.5"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <a href="/#contact" class="block w-full text-center py-2.5 sm:py-3 rounded-lg border border-gray-700 text-gray-300 font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] active:scale-[0.98]">
              Get Quote
            </a>
          </div>
        </div>

        <!-- Redesign card -->
        <div class="mt-10 mb-10">
          <div class="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:border-[#2563EB]/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.12)]">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h4 class="text-lg sm:text-xl font-bold text-white">🔄 Website Redesign & Upgrades</h4>
                <p class="text-gray-400 text-xs sm:text-sm mt-1">
                  Already have a website? We can redesign, modernize, or upgrade your existing site without starting from scratch.
                  <span class="block text-gray-500 text-xs mt-1">
                    WordPress, Wix, Squarespace, Shopify – we migrate and rebuild using modern technologies.
                  </span>
                </p>
                <ul class="flex flex-wrap gap-2 mt-3">
                  <li class="text-gray-300 text-xs flex items-center gap-1"><i class="fas fa-check-circle text-[#2563EB] text-[10px]"></i> Modern UI redesign</li>
                  <li class="text-gray-300 text-xs flex items-center gap-1"><i class="fas fa-check-circle text-[#2563EB] text-[10px]"></i> Mobile optimization</li>
                  <li class="text-gray-300 text-xs flex items-center gap-1"><i class="fas fa-check-circle text-[#2563EB] text-[10px]"></i> Performance improvements</li>
                  <li class="text-gray-300 text-xs flex items-center gap-1"><i class="fas fa-check-circle text-[#2563EB] text-[10px]"></i> Content updates</li>
                  <li class="text-gray-300 text-xs flex items-center gap-1"><i class="fas fa-check-circle text-[#2563EB] text-[10px]"></i> Feature enhancements</li>
                </ul>
              </div>
              <div class="flex flex-col items-start md:items-end gap-2">
                <div class="text-xl font-bold text-[#2563EB]">From R2,500</div>
                <a href="/#contact" class="px-4 py-2 bg-[#2563EB] hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition">Get a Custom Quote</a>
                <p class="text-gray-500 text-[10px]">* Price depends on size & complexity</p>
              </div>
            </div>
          </div>
        </div>

      <!-- ======= COMPARISON TABLE ======= -->
<div class="mt-10">
  <h3 class="text-lg sm:text-xl font-semibold text-white mb-4 text-center">Compare Website Packages</h3>

  <!-- Mobile View (full package names with icons + badge) -->
  <div class="block md:hidden space-y-2">
    <!-- Package header row -->
    <div class="grid grid-cols-4 gap-1 px-1 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
      <span class="col-span-1">Feature</span>
      <span class="text-center">Starter</span>
      <span class="text-center flex items-center justify-center gap-0.5">
        Business
        <span class="bg-blue-600 text-white text-[8px] px-1 rounded-full leading-none">⭐</span>
      </span>
      <span class="text-center">Premium</span>
    </div>

    <div
      v-for="(feat, idx) in displayedFeatures"
      :key="idx"
      class="bg-[#0a0a0a] border border-gray-700 rounded-xl p-2.5 grid grid-cols-4 gap-1 items-center hover:border-[#2563EB]/40 transition"
    >
      <span class="text-gray-300 text-xs font-medium col-span-1 pr-1">{{ feat.feature }}</span>
      <div class="text-center text-sm">
        <span v-if="feat.starter === '✅'" class="text-green-400">✅</span>
        <span v-else-if="feat.starter === '❌'" class="text-gray-600">❌</span>
        <span v-else class="text-gray-400 text-[10px]">{{ feat.starter }}</span>
      </div>
      <div class="text-center text-sm">
        <span v-if="feat.business === '✅'" class="text-green-400">✅</span>
        <span v-else-if="feat.business === '❌'" class="text-gray-600">❌</span>
        <span v-else class="text-gray-400 text-[10px]">{{ feat.business }}</span>
      </div>
      <div class="text-center text-sm">
        <span v-if="feat.premium === '✅'" class="text-green-400">✅</span>
        <span v-else-if="feat.premium === '❌'" class="text-gray-600">❌</span>
        <span v-else class="text-gray-400 text-[10px]">{{ feat.premium }}</span>
      </div>
    </div>
  </div>

  <!-- Desktop View (advanced table with fully visible badge) -->
  <div class="hidden md:block overflow-x-auto">
    <div class="inline-block min-w-full align-middle">
      <div class="overflow-hidden shadow-lg shadow-black/20 rounded-xl border border-gray-700">
        <table class="min-w-full divide-y divide-gray-700">
          <thead class="bg-gradient-to-r from-[#2563EB]/20 to-[#1a1a2e]">
            <tr>
              <th scope="col" class="px-4 py-3 text-left text-white font-semibold text-sm">Feature</th>
              <th scope="col" class="px-4 py-3 text-center text-white font-semibold text-sm">Starter</th>
              <th scope="col" class="px-4 py-3 text-center text-white font-semibold text-sm relative overflow-visible">
                Business ⭐
                
              </th>
              <th scope="col" class="px-4 py-3 text-center text-white font-semibold text-sm">Premium</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700/50 bg-[#0a0a0a]">
            <tr
              v-for="(feat, idx) in displayedFeatures"
              :key="idx"
              class="hover:bg-[#1a1a2e]/40 transition-colors even:bg-[#0a0a0a]/60"
            >
              <td class="px-4 py-2.5 text-gray-300 text-sm">{{ feat.feature }}</td>
              <td class="px-4 py-2.5 text-center text-sm">
                <span v-if="feat.starter === '✅'" class="text-green-400">✅</span>
                <span v-else-if="feat.starter === '❌'" class="text-gray-600">❌</span>
                <span v-else class="text-gray-400">{{ feat.starter }}</span>
              </td>
              <td class="px-4 py-2.5 text-center text-sm">
                <span v-if="feat.business === '✅'" class="text-green-400">✅</span>
                <span v-else-if="feat.business === '❌'" class="text-gray-600">❌</span>
                <span v-else class="text-gray-400">{{ feat.business }}</span>
              </td>
              <td class="px-4 py-2.5 text-center text-sm">
                <span v-if="feat.premium === '✅'" class="text-green-400">✅</span>
                <span v-else-if="feat.premium === '❌'" class="text-gray-600">❌</span>
                <span v-else class="text-gray-400">{{ feat.premium }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Show More / Show Less button -->
  <div class="text-center mt-4">
    <button
      @click="toggleTable"
      class="text-[#2563EB] hover:text-blue-400 text-sm font-medium transition flex items-center gap-1 mx-auto"
    >
      {{ showAllRows ? 'Show Less ↑' : 'Show More Features ↓' }}
      <span class="text-gray-500 text-xs">({{ comparisonFeatures.length }} total)</span>
    </button>
  </div>

  <!-- Custom note -->
  <div class="mt-6 text-center text-gray-400 text-xs sm:text-sm border-t border-gray-700 pt-4">
    <i class="fas fa-info-circle text-[#2563EB] mr-1"></i>
    Need something unique? Every business is different. We also create fully custom websites and software solutions tailored to your requirements.
    <a href="/#contact" class="text-[#2563EB] hover:underline font-medium block sm:inline">Contact us for a personalised quotation.</a>
  </div>
</div>

      </div>

      <!-- ============================================================ -->
      <!-- SOFTWARE DEVELOPMENT -->
      <!-- ============================================================ -->
      <div class="mb-16 md:mb-20">
        <div class="flex items-center gap-2 sm:gap-4 mb-6 md:mb-10">
          <div class="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            <span class="text-[#2563EB]">Software</span> Development
          </h2>
          <div class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          <div
            v-for="plan in softwarePlans"
            :key="plan.name"
            class="relative bg-[#0a0a0a] rounded-2xl border border-gray-800 p-4 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#2563EB]/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
            :class="{ 'border-[#2563EB]/30 shadow-md': plan.recommended }"
          >
            <div v-if="plan.recommended" class="absolute -top-3 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
              Most Popular
            </div>

            <h3 class="text-lg sm:text-xl font-bold text-white mb-2">{{ plan.name }}</h3>
            <div class="text-xl sm:text-2xl font-bold text-[#2563EB] mb-3 sm:mb-4 break-words">{{ plan.priceRange }}</div>
            <p class="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6">{{ plan.description }}</p>

            <ul class="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                <i class="fas fa-check-circle text-[#2563EB] text-[10px] sm:text-xs mt-0.5"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <a href="/#contact" class="block w-full text-center py-2.5 sm:py-3 rounded-lg border border-gray-700 text-gray-300 font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] active:scale-[0.98]">
              Get Quote
            </a>
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- MANAGED IT SERVICES -->
      <!-- ============================================================ -->
      <div class="mb-16 md:mb-20">
        <div class="flex items-center gap-2 sm:gap-4 mb-6 md:mb-10">
          <div class="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            <span class="text-[#2563EB]">Managed IT</span> Services
          </h2>
          <div class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          <div
            v-for="plan in itPlans"
            :key="plan.name"
            class="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-4 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#2563EB]/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
          >
            <h3 class="text-lg sm:text-xl font-bold text-white mb-2">{{ plan.name }}</h3>
            <div class="text-xl sm:text-2xl font-bold text-[#2563EB] mb-3 sm:mb-4 break-words">{{ plan.priceRange }}</div>
            <p class="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6">{{ plan.description }}</p>

            <ul class="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                <i class="fas fa-check-circle text-[#2563EB] text-[10px] sm:text-xs mt-0.5"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <a href="/#contact" class="block w-full text-center py-2.5 sm:py-3 rounded-lg border border-gray-700 text-gray-300 font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] active:scale-[0.98]">
              Get Quote
            </a>
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- HOSTING & DOMAINS -->
      <!-- ============================================================ -->
      <div class="mb-16 md:mb-20">
        <div class="flex items-center gap-2 sm:gap-4 mb-6 md:mb-10">
          <div class="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            <span class="text-[#2563EB]">Hosting</span> & Domains
          </h2>
          <div class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          <div
            v-for="plan in hostingPlans"
            :key="plan.name"
            class="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-4 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#2563EB]/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
          >
            <h3 class="text-lg sm:text-xl font-bold text-white mb-2">{{ plan.name }}</h3>
            <div class="text-xl sm:text-2xl font-bold text-[#2563EB] mb-3 sm:mb-4 break-words">{{ plan.priceRange }}</div>
            <p class="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6">{{ plan.description }}</p>

            <ul class="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                <i class="fas fa-check-circle text-[#2563EB] text-[10px] sm:text-xs mt-0.5"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <a href="/#contact" class="block w-full text-center py-2.5 sm:py-3 rounded-lg border border-gray-700 text-gray-300 font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] active:scale-[0.98]">
              Get Quote
            </a>
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- MAINTENANCE & SUPPORT -->
      <!-- ============================================================ -->
      <div class="mb-16 md:mb-20">
        <div class="flex items-center gap-2 sm:gap-4 mb-6 md:mb-10">
          <div class="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            <span class="text-[#2563EB]">Maintenance</span> & Support
          </h2>
          <div class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          <div
            v-for="plan in maintenancePlans"
            :key="plan.name"
            class="relative bg-[#0a0a0a] rounded-2xl border border-gray-800 p-4 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#2563EB]/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
            :class="{ 'border-[#2563EB]/30 shadow-md': plan.recommended }"
          >
            <div v-if="plan.recommended" class="absolute -top-3 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
              Most Popular
            </div>

            <h3 class="text-lg sm:text-xl font-bold text-white mb-2">{{ plan.name }}</h3>
            <div class="text-xl sm:text-2xl font-bold text-[#2563EB] mb-3 sm:mb-4 break-words">{{ plan.priceRange }}</div>
            <p class="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6">{{ plan.description }}</p>

            <ul class="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                <i class="fas fa-check-circle text-[#2563EB] text-[10px] sm:text-xs mt-0.5"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <a href="/#contact" class="block w-full text-center py-2.5 sm:py-3 rounded-lg border border-gray-700 text-gray-300 font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] active:scale-[0.98]">
              Get Quote
            </a>
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- DESIGN SERVICES -->
      <!-- ============================================================ -->
      <div class="mb-16 md:mb-20">
        <div class="flex items-center gap-2 sm:gap-4 mb-6 md:mb-10">
          <div class="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            <span class="text-[#2563EB]">Design</span> Services
          </h2>
          <div class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
          <div
            v-for="plan in designPlans"
            :key="plan.name"
            class="bg-[#0a0a0a] rounded-2xl border border-gray-800 p-4 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#2563EB]/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
          >
            <h3 class="text-lg sm:text-xl font-bold text-white mb-2">{{ plan.name }}</h3>
            <div class="text-xl sm:text-2xl font-bold text-[#2563EB] mb-3 sm:mb-4 break-words">{{ plan.priceRange }}</div>
            <p class="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6">{{ plan.description }}</p>

            <ul class="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                <i class="fas fa-check-circle text-[#2563EB] text-[10px] sm:text-xs mt-0.5"></i>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <a href="/#contact" class="block w-full text-center py-2.5 sm:py-3 rounded-lg border border-gray-700 text-gray-300 font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] active:scale-[0.98]">
              Get Quote
            </a>
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- WHAT'S INCLUDED (value checklist) -->
      <!-- ============================================================ -->
      <div class="mb-16 md:mb-20">
        <div class="flex items-center gap-2 sm:gap-4 mb-6 md:mb-10">
          <div class="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            What’s <span class="text-[#2563EB]">Included</span>
          </h2>
          <div class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 bg-[#0a0a0a] border border-gray-800 rounded-2xl p-4 sm:p-6">
          <div class="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
            <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> Mobile Friendly
          </div>
          <div class="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
            <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> SEO Ready
          </div>
          <div class="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
            <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> SSL Enabled
          </div>
          <div class="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
            <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> Responsive Design
          </div>
          <div class="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
            <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> Training Provided
          </div>
          <div class="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
            <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> After‑launch Support
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- PAYMENT TERMS – NOW 2-COLUMN -->
      <!-- ============================================================ -->
      <div class="mb-16 md:mb-20">
        <div class="flex items-center gap-2 sm:gap-4 mb-6 md:mb-10">
          <div class="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            <span class="text-[#2563EB]">Payment</span> Terms
          </h2>
          <div class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 bg-[#0a0a0a] border border-gray-800 rounded-2xl p-4 sm:p-6">
          <p class="text-gray-300 text-sm sm:text-base flex items-start gap-2">
            <span class="text-[#2563EB] font-bold">•</span>
            <span><span class="font-medium text-white">50% deposit</span> required before work begins.</span>
          </p>
          <p class="text-gray-300 text-sm sm:text-base flex items-start gap-2">
            <span class="text-[#2563EB] font-bold">•</span>
            <span>Remaining balance payable before final deployment.</span>
          </p>
          <p class="text-gray-300 text-sm sm:text-base flex items-start gap-2">
            <span class="text-[#2563EB] font-bold">•</span>
            <span>Monthly services are billed in advance.</span>
          </p>
          <p class="text-gray-300 text-sm sm:text-base flex items-start gap-2">
            <span class="text-[#2563EB] font-bold">•</span>
            <span>Flexible payment plans available for larger projects.</span>
          </p>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- FAQ -->
      <!-- ============================================================ -->
      <div class="mb-16 md:mb-20">
        <div class="flex items-center gap-2 sm:gap-4 mb-6 md:mb-10">
          <div class="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Frequently Asked <span class="text-[#2563EB]">Questions</span>
          </h2>
          <div class="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
        </div>

        <div class="space-y-3">
          <details v-for="(faq, idx) in faqs" :key="idx" class="bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 sm:p-4">
            <summary class="text-white font-medium text-sm sm:text-base cursor-pointer">{{ faq.q }}</summary>
            <p class="text-gray-400 text-xs sm:text-sm mt-2">{{ faq.a }}</p>
          </details>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- BOTTOM CTA -->
      <!-- ============================================================ -->
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

details summary::-webkit-details-marker {
  color: #2563EB;
}
details summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
details summary::after {
  content: "▼";
  color: #2563EB;
  font-size: 0.75rem;
  transition: transform 0.2s;
}
details[open] summary::after {
  transform: rotate(180deg);
}
</style>