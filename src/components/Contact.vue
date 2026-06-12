<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ (e: 'showPopup'): void }>()

const formRef = ref<HTMLFormElement | null>(null)
const sending = ref(false)

const form = ref({
  name: '',
  email: '',
  title: '',
  message: '',
})

async function handleSubmit() {
  if (!formRef.value) return
  sending.value = true

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to send email')
    }

    // Success – show popup and reset form
    emit('showPopup')
    form.value = { name: '', email: '', title: '', message: '' }
  } catch (err) {
    console.error(err)
    alert('Failed to send message. Please email info@mmusocode.co.za directly.')
  } finally {
    sending.value = false
  }
}

const contactInfo = [
  { icon: 'fa-envelope',       label: 'Email',          value: 'info@mmusocode.co.za',        href: 'mailto:info@mmusocode.co.za' },
  { icon: 'fa-phone-alt',      label: 'Phone',          value: '+27 79 118 9866',              href: 'tel:+27791189866' },
  { icon: 'fa-map-marker-alt', label: 'Location',       value: 'Masia, Limpopo, South Africa', href: null },
  { icon: 'fa-clock',          label: 'Business Hours', value: 'Monday – Friday: 9:00 AM – 5:00 PM',        href: null },
]

const socials = [
  { icon: 'fab fa-linkedin-in', href: 'https://linkedin.com/company/mmusocode', label: 'LinkedIn',  color: 'hover:text-blue-400 hover:border-blue-400' },
  { icon: 'fab fa-whatsapp',    href: 'https://wa.me/27791189866',                 label: 'WhatsApp',  color: 'hover:text-green-400 hover:border-green-400' },
  { icon: 'fab fa-facebook-f',  href: 'https://www.facebook.com/mmusocode',          label: 'Facebook',  color: 'hover:text-blue-500 hover:border-blue-500' },
  { icon: 'fab fa-instagram',   href: 'https://www.instagram.com/mmusocode/',        label: 'Instagram', color: 'hover:text-pink-400 hover:border-pink-400' },
]

const mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3485.9946888039303!2d30.30841997509711!3d-23.18999477905678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec5d31484f30f49%3A0xf221773a72793c82!2s341%20Makekemba!5e1!3m2!1sen!2sza!4v1772999661032!5m2!1sen!2sza'
</script>

<template>
<section id="contact" class="relative py-16 md:py-20 bg-gradient-to-b from-black via-[#050816] to-black border-t border-gray-800 overflow-hidden">
  
  <!-- Floating glowing orbs – reduced opacity on mobile -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-20 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] opacity-50 md:opacity-100"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] opacity-50 md:opacity-100"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl opacity-50 md:opacity-100"></div>
  </div>

  <!-- Subtle grid overlay -->
  <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

    <!-- Header (badge + title) – responsive -->
    <div class="flex justify-center mb-4">
      <span class="section-badge">
        <span class="pulse-dot"></span>
        <span class="text-xs sm:text-sm text-[#2563EB] font-semibold">Get In Touch</span>
      </span>
    </div>

    <div class="text-center mb-12 md:mb-16">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
        Let's <span class="text-[#2563EB]">Connect</span>
      </h2>
      <p class="text-sm sm:text-base md:text-xl text-gray-400 max-w-3xl mx-auto">
        Ready to turn your ideas into reality? Reach out — we’re excited to discuss how we can help you build something exceptional.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8 md:gap-12">

      <!-- Contact Form – responsive padding and spacing -->
      <div class="bg-[#0a0a0a] p-5 sm:p-8 rounded-2xl border border-gray-800 transition-all duration-500 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.12)]">
        <h3 class="text-xl sm:text-2xl font-semibold text-white mb-5 sm:mb-6">Send us a message</h3>
        <form ref="formRef" class="space-y-4 sm:space-y-5" @submit.prevent="handleSubmit">
          <div v-for="field in ['name', 'email', 'title']" :key="field">
            <label class="block text-xs sm:text-sm font-medium text-gray-400 mb-1">
              {{ field === 'name' ? 'Your Name' : field === 'email' ? 'Your Email' : 'Subject' }}
            </label>
            <input
                v-model="form[field as keyof typeof form]"
                :type="field === 'email' ? 'email' : 'text'"
                :name="field"
                :placeholder="field === 'name' ? 'Your Name' : field === 'email' ? 'Your Email' : 'Subject'"
                required
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-white placeholder-gray-500 text-sm sm:text-base transition hover:border-[#2563EB]"
            />
          </div>
          <div>
            <label class="block text-xs sm:text-sm font-medium text-gray-400 mb-1">Message</label>
            <textarea
              v-model="form.message"
              rows="4"
              name="message"
              placeholder="Tell us about your project..."
              required
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-white placeholder-gray-500 text-sm sm:text-base transition hover:border-[#2563EB]"
            ></textarea>
          </div>

          <p class="text-[11px] sm:text-xs text-gray-500 italic flex items-center gap-1 group relative cursor-help">
            <i class="fas fa-shield-alt text-[#2563EB]"></i> We reply within 24h.
            <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 rounded bg-gray-800 text-gray-200 text-xs opacity-0 group-hover:opacity-100 transition-all">
              Your email is safe with us
            </span>
          </p>

          <button type="submit" :disabled="sending"
            class="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 sm:py-3 rounded-lg font-medium hover:shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 disabled:opacity-60 text-sm sm:text-base">
            <span>{{ sending ? 'Sending...' : 'Send Message' }}</span>
            <i :class="sending ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'"></i>
          </button>
        </form>
      </div>

      <!-- Contact Info & Socials – responsive -->
      <div class="space-y-5 sm:space-y-6">
        <div class="bg-[#0a0a0a] p-5 sm:p-8 rounded-2xl border border-gray-800 transition-all duration-500 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.12)]">
          <h3 class="text-xl sm:text-2xl font-semibold text-white mb-5 sm:mb-6">Contact Information</h3>
          <div class="space-y-3 sm:space-y-4">
            <div v-for="info in contactInfo" :key="info.label"
              class="flex items-start gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-gradient-to-r hover:from-[#2563EB]/10 hover:to-transparent transition">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-[#2563EB]/10 rounded-lg flex items-center justify-center text-[#2563EB] shrink-0 text-sm sm:text-base">
                <i :class="`fas ${info.icon}`"></i>
              </div>
              <div>
                <p class="text-xs sm:text-sm text-gray-400">{{ info.label }}</p>
                <a v-if="info.href" :href="info.href" class="text-white hover:text-[#2563EB] transition text-sm sm:text-base">{{ info.value }}</a>
                <p v-else class="text-white text-sm sm:text-base">{{ info.value }}</p>
              </div>
            </div>
          </div>

          <div class="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-800">
            <h2 class="text-base sm:text-lg font-semibold text-gray-300 mb-3 sm:mb-4">Find us on</h2>
            <div class="flex flex-wrap gap-2">
              <a
                v-for="social in socials"
                :key="social.label"
                :href="social.href"
                :aria-label="social.label"
                target="_blank"
                rel="noopener noreferrer"
                :class="`w-8 h-8 sm:w-10 sm:h-10 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 transform hover:scale-110 ${social.color}`"
              >
                <i :class="`${social.icon} text-sm sm:text-base`"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Google Maps – responsive height -->
    <div class="mt-10 md:mt-12">
      <h3 class="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4 text-center">
        <i class="fas fa-map-marker-alt text-[#2563EB] mr-2"></i>Our <span class="text-[#2563EB]">Location</span>
      </h3>
      <div class="rounded-2xl border border-gray-800 overflow-hidden shadow-lg transition-all duration-500 hover:border-[#2563EB]/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)] h-72 sm:h-96">
        <iframe
          :src="mapSrc"
          width="100%"
          height="100%"
          style="border: 0;"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
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
</style>