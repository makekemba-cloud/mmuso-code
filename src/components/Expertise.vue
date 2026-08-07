<script setup lang="ts">
import { ref } from 'vue'
import { useTracker } from '../composables/useTracker'   // ← import tracker

interface ServiceModal {
  overview: string
  idealFor?: string[]
  websiteTypes?: string[]
  solutionsWeDevelop?: string[]
  supportServices?: string[]
  weCanBuild?: string[]
  includes?: string[]
  addOns?: string[]
  deliveryProcess?: string[]
  integrations?: string[]
  benefits?: string[]
  deliveryEstimate?: string[]
  summaryHighlights?: string[]
}

interface Service {
  title: string
  popular?: boolean
  modalContent: ServiceModal
}

interface ExpertiseItem {
  icon: string
  title: string
  description: string
  services: Service[]
}

const items: ExpertiseItem[] = [
  {
    icon: 'fa-briefcase',
    title: 'Business Solutions',
    description: 'Helping businesses establish and grow their professional presence.',
    services: [
      {
        title: 'Company Registration',
        modalContent: {
          overview: 'Start your business the right way. We assist with company registration and provide guidance throughout the process to ensure your business is legally established.',
          includes: [
            'Company Registration Assistance',
            'Name Reservation Guidance',
            'Registration Support',
            'Business Setup Guidance'
          ]
        }
      },
      {
        title: 'Professional Business Email',
        modalContent: {
          overview: 'Build trust with a professional email address that matches your business name.',
          benefits: [
            'Professional Image',
            'Better Customer Trust',
            'Secure Email',
            'Accessible Anywhere'
          ]
        }
      },
      {
        title: 'Google Business Profile Setup',
        modalContent: {
          overview: 'Appear on Google Search and Google Maps so customers can easily find and contact your business.',
          includes: [
            'Profile Setup',
            'Business Verification Guidance',
            'Categories & Services',
            'Business Hours',
            'Photos'
          ]
        }
      }
    ]
  },
  {
    icon: 'fa-code',
    title: 'Software Development',
    description: 'Custom digital solutions built to streamline operations and drive business growth.',
    services: [
      {
        title: 'Website Development',
        popular: true,
        modalContent: {
          overview: 'Build a professional website that represents your business, attracts customers, and helps you grow online. Whether you need a simple company website or a custom web application, we create responsive, secure, and high-performing solutions tailored to your goals.',
          idealFor: [
            'Startups',
            'Small Businesses',
            'NGOs & NPOs',
            'Law Firms',
            'Schools',
            'Restaurants',
            'Construction Companies',
            'Medical Practices'
          ],
          websiteTypes: [
            'Company Websites',
            'Business Websites',
            'eCommerce Stores',
            'Booking Websites',
            'Portfolio Websites',
            'Landing Pages',
            'Custom Web Applications'
          ],
          includes: [
            'Responsive Design',
            'Mobile & Tablet Friendly',
            'Contact Forms',
            'WhatsApp Integration',
            'Google Maps',
            'Social Media Integration',
            'Basic SEO Setup',
            'SSL Security',
            'Fast Loading',
            'Admin Dashboard (where applicable)'
          ],
          addOns: [
            'Online Payments',
            'Appointment Booking',
            'Customer Portal',
            'Live Chat',
            'Email Marketing Integration',
            'Multi-language Support'
          ],
          deliveryProcess: [
            'Consultation',
            'Design',
            'Development',
            'Testing',
            'Launch',
            'Support'
          ],
          deliveryEstimate: [
            'Landing Page – 3–7 days',
            'Business Website – 1–5 weeks',
            'Custom Website – Depends on project scope'
          ],
          summaryHighlights: [
            'Starting from custom requirements',
            'Responsive Design',
            'Ongoing Support'
          ]
        }
      },
      {
        title: 'Custom Software Development',
        popular: true,
        modalContent: {
          overview: 'Automate your business processes with a custom-built system designed specifically for your organization. We develop software that improves efficiency, reduces manual work, and keeps your business organized.',
          solutionsWeDevelop: [
            'School Management Systems',
            'HR Systems',
            'Inventory Systems',
            'Booking Systems',
            'CRM Systems',
            'Law Firm Systems',
            'Clinic Management Systems',
            'Production Management Systems',
            'Reception Systems'
          ],
          includes: [
            'Secure Login',
            'User Roles & Permissions',
            'Reports & Analytics',
            'Dashboard',
            'Notifications',
            'File Uploads',
            'Data Backup',
            'Responsive Design'
          ],
          integrations: [
            'Payment Gateways',
            'WhatsApp',
            'Email Notifications',
            'SMS Notifications',
            'Google Maps',
            'APIs'
          ],
          summaryHighlights: [
            'Tailored to your business',
            'Secure & Scalable',
            'Full Support & Training'
          ]
        }
      },
      {
        title: 'Mobile App Development',
        modalContent: {
          overview: 'Reach your customers anywhere with a professionally designed mobile application for Android and iOS.',
          weCanBuild: [
            'Business Apps',
            'Booking Apps',
            'Delivery Apps',
            'Customer Portals',
            'Employee Apps',
            'Internal Business Apps'
          ],
          includes: [
            'Android & iOS',
            'Modern UI Design',
            'Push Notifications',
            'Secure Authentication',
            'API Integration',
            'Cloud Database'
          ],
          summaryHighlights: [
            'Native performance',
            'Intuitive UX',
            'Scalable backend'
          ]
        }
      }
    ]
  },
  {
    icon: 'fa-globe',
    title: 'Website Services',
    description: 'Everything you need to launch, manage, and grow your online presence.',
    services: [
      {
        title: 'Website Hosting & Management',
        modalContent: {
          overview: 'We take care of everything needed to keep your website online, secure, and performing at its best.',
          includes: [
            'Domain Connection',
            'Hosting Setup',
            'SSL Certificate',
            'Business Email Setup',
            'Website Migration',
            'Hosting Management'
          ]
        }
      },
      {
        title: 'Website Maintenance & Support',
        modalContent: {
          overview: 'Keep your website secure, updated, and running smoothly with ongoing maintenance and technical support.',
          includes: [
            'Content Updates',
            'Bug Fixes',
            'Security Updates',
            'Website Backups',
            'Performance Monitoring',
            'Technical Support'
          ]
        }
      },
      {
        title: 'SEO & Google Search Visibility',
        modalContent: {
          overview: 'Help more customers discover your business through Google by improving your website\'s visibility and performance.',
          includes: [
            'Basic SEO',
            'Google Search Console Setup',
            'Google Analytics',
            'Keyword Optimization',
            'Performance Improvements'
          ]
        }
      }
    ]
  },
  {
    icon: 'fa-server',
    title: 'Managed IT Services',
    description: 'Reliable technology solutions to keep your business running smoothly.',
    services: [
      {
        title: 'IT Support',
        popular: true,
        modalContent: {
          overview: 'Professional IT support for businesses, helping keep computers and software running smoothly.',
          supportServices: [
            'Software Installation',
            'Computer Troubleshooting',
            'System Maintenance',
            'Technical Support',
            'Device Setup'
          ],
          summaryHighlights: [
            'Fast response times',
            'Experienced technicians',
            'Remote & on‑site support'
          ]
        }
      },
      {
        title: 'Remote IT Management',
        modalContent: {
          overview: 'Manage and maintain business computers remotely, reducing downtime and improving productivity without the need for on-site visits.',
          includes: [
            'Remote Assistance',
            'Software Updates',
            'Health Monitoring',
            'Security Checks',
            'Device Management'
          ]
        }
      },
      {
        title: 'Employee Monitoring Solutions',
        modalContent: {
          overview: 'Help businesses improve productivity through secure employee activity and computer monitoring solutions.',
          includes: [
            'Activity Monitoring',
            'Productivity Reports',
            'Application Usage',
            'Attendance Insights',
            'Performance Reports'
          ]
        }
      }
    ]
  }
]

// Modal state
const selectedService = ref<Service | null>(null)
const isModalOpen = ref(false)

// ── Tracker ──
const { trackEvent } = useTracker()

// ── Modal functions ──
function openModal(service: Service) {
  selectedService.value = service
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'

  // Fire‑and‑forget tracking (never blocks)
  try {
    trackEvent({
      event: 'modal_open',
      category: 'expertise',
      element: service.title,
      metadata: {
        service: service.title,
        popular: service.popular || false
      }
    })
  } catch (_) {
    // ignore
  }
}

function closeModal() {
  // 1. Force‑close the modal immediately
  isModalOpen.value = false
  document.body.style.overflow = ''
  
  // 2. Clear the selected service (after saving its title for tracking)
  const service = selectedService.value
  selectedService.value = null

  // 3. Send tracking event (best‑effort, never blocks)
  if (service) {
    try {
      trackEvent({
        event: 'modal_close',
        category: 'expertise',
        element: service.title,
        metadata: {
          service: service.title
        }
      })
    } catch (_) {
      // ignore
    }
  }
}
</script>

<template>
  <section id="expertise" class="relative py-16 md:py-20 bg-gradient-to-b from-black via-[#050816] to-black overflow-hidden">
    
    <!-- Floating glowing orbs -->
    <div class="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>
    <div class="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none opacity-50 md:opacity-100"></div>
    
    <!-- Subtle grid overlay -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

    <div class="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Badge -->
      <div class="flex justify-center mb-4">
        <span class="section-badge">
          <span class="pulse-dot"></span>
          <span class="text-xs sm:text-sm text-[#2563EB] font-semibold">Our Expertise ⭐</span>
        </span>
      </div>
      
      <!-- Title -->
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-4">
        Our <span class="text-[#2563EB]">Services</span>
      </h2>
      
      <p class="text-center text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16 text-sm sm:text-base md:text-lg">
        Comprehensive technology solutions designed to help businesses start, grow, and succeed.
      </p>

      <!-- Expertise cards – 2 columns on all screens, 3 on md, 4 on lg -->
      <div class="flex flex-wrap justify-center -mx-2 md:-mx-3">
        <div
          v-for="item in items"
          :key="item.title"
          class="w-1/2 md:w-1/3 lg:w-1/4 px-2 md:px-3 mb-5 md:mb-8"
        >
          <div class="bg-[#0a0a0a] p-5 md:p-6 rounded-2xl border border-gray-800 transition-all duration-500 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.12)] h-full">
            
            <!-- Icon -->
            <div class="w-10 h-10 md:w-12 md:h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center text-[#2563EB] text-xl md:text-2xl mb-3 md:mb-4">
              <i :class="`fas ${item.icon}`"></i>
            </div>
            
            <!-- Title -->
            <h3 class="text-base md:text-xl font-semibold text-white mb-2">{{ item.title }}</h3>
            
            <!-- Description -->
            <p class="text-xs md:text-sm text-gray-400 leading-relaxed mb-3">{{ item.description }}</p>
            
            <!-- Service list -->
            <ul class="space-y-2">
              <li
                v-for="service in item.services"
                :key="service.title"
                class="group flex items-center justify-between py-1 border-b border-gray-800/50 last:border-0 cursor-pointer"
                @click="openModal(service)"
              >
                <div class="flex items-center gap-1.5">
                  <span class="text-xs md:text-sm text-gray-300 group-hover:text-[#2563EB] transition-colors duration-200">
                    {{ service.title }}
                  </span>
                  <span
                    v-if="service.popular"
                    class="text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-1.5 py-0.5 rounded-full shadow-lg leading-none"
                  >⭐</span>
                </div>
                <!-- "View Details" – always visible on mobile, visible on hover on desktop -->
                <span class="text-[10px] text-[#2563EB] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center gap-0.5 whitespace-nowrap">
                  View Details <i class="fas fa-chevron-right text-[8px]"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Overlay -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="relative bg-[#0a0a0a] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-700 shadow-2xl p-6 md:p-8 modal-content">
          
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl z-10"
          >
            <i class="fas fa-times"></i>
          </button>

          <div v-if="selectedService">
            <!-- SUMMARY CARD at the top -->
            <div class="bg-[#111] rounded-xl p-4 md:p-5 border border-gray-700 mb-6">
              <div class="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 class="text-xl md:text-2xl font-bold text-white">
                    {{ selectedService.title }}
                  </h3>
                  <div v-if="selectedService.popular" class="mt-1">
                    <span class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg inline-block">
                      ⭐ Most Popular
                    </span>
                  </div>
                </div>
              </div>
              <!-- Overview – only here, not repeated -->
              <p class="text-gray-300 text-sm mt-3 leading-relaxed">
                {{ selectedService.modalContent.overview }}
              </p>
              <!-- Highlights -->
              <div class="flex flex-wrap gap-3 mt-3">
                <span
                  v-for="highlight in (selectedService.modalContent.summaryHighlights || (selectedService.modalContent.includes?.slice(0,3) || []))"
                  :key="highlight"
                  class="text-xs bg-[#1a1a1a] text-gray-300 px-2 py-1 rounded-full border border-gray-700 flex items-center gap-1"
                >
                  <i class="fas fa-check-circle text-[#2563EB] text-[10px]"></i> {{ highlight }}
                </span>
              </div>
            </div>

            <!-- Dynamic sections (no separate Overview) -->
            <div v-if="selectedService.modalContent.idealFor" class="mb-6">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span class="text-base">👥</span> Ideal For
              </h4>
              <ul class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <li v-for="item in selectedService.modalContent.idealFor" :key="item" class="text-gray-300 text-sm flex items-center gap-2">
                  <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="selectedService.modalContent.websiteTypes" class="mb-6">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span class="text-base">🌐</span> Website Types
              </h4>
              <ul class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <li v-for="item in selectedService.modalContent.websiteTypes" :key="item" class="text-gray-300 text-sm flex items-center gap-2">
                  <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="selectedService.modalContent.solutionsWeDevelop" class="mb-6">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span class="text-base">⚙️</span> Solutions We Develop
              </h4>
              <ul class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <li v-for="item in selectedService.modalContent.solutionsWeDevelop" :key="item" class="text-gray-300 text-sm flex items-center gap-2">
                  <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="selectedService.modalContent.supportServices" class="mb-6">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span class="text-base">🛠️</span> Support Services
              </h4>
              <ul class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <li v-for="item in selectedService.modalContent.supportServices" :key="item" class="text-gray-300 text-sm flex items-center gap-2">
                  <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="selectedService.modalContent.weCanBuild && !selectedService.modalContent.websiteTypes && !selectedService.modalContent.solutionsWeDevelop && !selectedService.modalContent.supportServices" class="mb-6">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span class="text-base">📦</span> What We Build
              </h4>
              <ul class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <li v-for="item in selectedService.modalContent.weCanBuild" :key="item" class="text-gray-300 text-sm flex items-center gap-2">
                  <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="selectedService.modalContent.includes" class="mb-6">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span class="text-base">✅</span> What's Included
              </h4>
              <ul class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <li v-for="item in selectedService.modalContent.includes" :key="item" class="text-gray-300 text-sm flex items-center gap-2">
                  <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="selectedService.modalContent.benefits" class="mb-6">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span class="text-base">⭐</span> Benefits
              </h4>
              <ul class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <li v-for="item in selectedService.modalContent.benefits" :key="item" class="text-gray-300 text-sm flex items-center gap-2">
                  <i class="fas fa-check-circle text-[#2563EB] text-xs"></i> {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="selectedService.modalContent.addOns" class="mb-6">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span class="text-base">➕</span> Optional Add‑ons
              </h4>
              <ul class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <li v-for="item in selectedService.modalContent.addOns" :key="item" class="text-gray-300 text-sm flex items-center gap-2">
                  <i class="fas fa-plus-circle text-[#2563EB] text-xs"></i> {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="selectedService.modalContent.deliveryProcess" class="mb-6">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span class="text-base">🚀</span> Delivery Process
              </h4>
              <ul class="flex flex-wrap gap-3">
                <li v-for="step in selectedService.modalContent.deliveryProcess" :key="step" class="bg-[#1a1a1a] px-4 py-2 rounded-full text-gray-300 text-sm border border-gray-700">
                  {{ step }}
                </li>
              </ul>
            </div>

            <div v-if="selectedService.modalContent.integrations" class="mb-6">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span class="text-base">🔗</span> Integrations
              </h4>
              <ul class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <li v-for="item in selectedService.modalContent.integrations" :key="item" class="text-gray-300 text-sm flex items-center gap-2">
                  <i class="fas fa-plug text-[#2563EB] text-xs"></i> {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="selectedService.modalContent.deliveryEstimate" class="mb-6">
              <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span class="text-base">⏱️</span> Typical Delivery
              </h4>
              <ul class="space-y-1">
                <li v-for="item in selectedService.modalContent.deliveryEstimate" :key="item" class="text-gray-300 text-sm flex items-center gap-2">
                  <i class="fas fa-clock text-[#2563EB] text-xs"></i> {{ item }}
                </li>
              </ul>
            </div>

            <!-- CTA Section -->
            <div class="mt-8 pt-6 border-t border-gray-700 text-center">
              <h4 class="text-xl font-semibold text-white mb-2">Ready to Get Started?</h4>
              <p class="text-gray-400 text-sm mb-4">Have a project in mind? We'd love to help bring your ideas to life.</p>
              <div class="flex flex-wrap justify-center gap-4">
                <a
                  href="#contact"
                  @click="closeModal"
                  class="inline-block bg-[#2563EB] hover:bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Request a Quote
                </a>
                <a
                  href="#contact"
                  @click="closeModal"
                  class="inline-block bg-transparent border border-gray-600 hover:border-[#2563EB] text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
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

.modal-content {
  scrollbar-width: thin;
  scrollbar-color: #2563EB #1a1a1a;
}
.modal-content::-webkit-scrollbar {
  width: 6px;
}
.modal-content::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 10px;
}
.modal-content::-webkit-scrollbar-thumb {
  background: #2563EB;
  border-radius: 10px;
}
</style>