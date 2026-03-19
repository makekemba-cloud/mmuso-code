<script setup lang="ts">
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

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
    await emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.value,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    emit('showPopup')
    form.value = { name: '', email: '', title: '', message: '' }
  } catch (err) {
    alert('Failed. Please email makekembav@gmail.com directly.')
    console.error(err)
  } finally {
    sending.value = false
  }
}

const contactInfo = [
  { icon: 'fa-envelope',       label: 'Email',          value: 'info@mmusocode.co.za',        href: 'mailto:info@mmusocode.co.za' },
  { icon: 'fa-phone-alt',      label: 'Phone',          value: '+27 72 947 3009',              href: 'tel:+27729473009' },
  { icon: 'fa-map-marker-alt', label: 'Location',       value: 'Masia, Limpopo, South Africa', href: null },
  { icon: 'fa-clock',          label: 'Business Hours', value: 'Monday - Sunday: 24/7',        href: null },
]

const socials = [
  { icon: 'fas fa-envelope',    href: 'mailto:info@mmusocode.co.za',               label: 'Email',     color: 'hover:text-red-400 hover:border-red-400' },
  { icon: 'fab fa-linkedin-in', href: 'https://linkedin.com/in/makekemba-vhutali', label: 'LinkedIn',  color: 'hover:text-blue-400 hover:border-blue-400' },
  { icon: 'fab fa-github',      href: 'https://github.com/makekemba-cloud',        label: 'GitHub',    color: 'hover:text-gray-300 hover:border-gray-300' },
  { icon: 'fab fa-twitter',     href: 'https://x.com/Makekembavhutal',             label: 'Twitter',   color: 'hover:text-sky-400 hover:border-sky-400' },
  { icon: 'fab fa-whatsapp',    href: 'https://wa.me/27729473009',                 label: 'WhatsApp',  color: 'hover:text-green-400 hover:border-green-400' },
  { icon: 'fab fa-facebook-f',  href: 'https://www.facebook.com/Mmuso.0',          label: 'Facebook',  color: 'hover:text-blue-500 hover:border-blue-500' },
  { icon: 'fab fa-instagram',   href: 'https://www.instagram.com/mmuso.0/',        label: 'Instagram', color: 'hover:text-pink-400 hover:border-pink-400' },
]

const mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3485.9946888039303!2d30.30841997509711!3d-23.18999477905678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec5d31484f30f49%3A0xf221773a72793c82!2s341%20Makekemba!5e1!3m2!1sen!2sza!4v1772999661032!5m2!1sen!2sza'
</script>

<template>
<section id="contact" class="bg-[#000000] py-20 border-t border-gray-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Header -->
    <div class="flex justify-center mb-4">
      <span class="section-badge">
        <span class="pulse-dot"></span>
        <span class="text-sm text-[#2563EB] font-semibold">Contact</span>
      </span>
    </div>

    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Let's <span class="text-[#2563EB]">Connect</span>
      </h2>
      <p class="text-xl text-gray-400 max-w-3xl mx-auto">
        Ready to transform your ideas into reality? Get in touch and let's discuss how we can help your business grow.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-12">

      <!-- Form -->
      <div class="bg-[#0a0a0a] p-8 rounded-2xl border border-gray-800 hover-lift transition-transform hover:-translate-y-1">
        <h3 class="text-2xl font-semibold text-white mb-6">Send us a message</h3>
        <form ref="formRef" class="space-y-5" @submit.prevent="handleSubmit">
          <div v-for="field in ['name', 'email', 'title']" :key="field">
            <label class="block text-sm font-medium text-gray-400 mb-1">
              {{ field === 'name' ? 'Your Name' : field === 'email' ? 'Your Email' : 'Subject' }}
            </label>
           <input
                v-model="form[field as keyof typeof form]"
                :type="field === 'email' ? 'email' : 'text'"
                :name="field"
                :placeholder="field === 'name' ? 'Your Name' : field === 'email' ? 'Your Email' : 'Subject'"
                required
                class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-white placeholder-gray-500 transition hover:border-[#2563EB]"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Message</label>
            <textarea
              v-model="form.message"
              rows="4"
              name="message"
              placeholder="Tell us about your project..."
              required
              class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-white placeholder-gray-500 transition hover:border-[#2563EB]"
            ></textarea>
          </div>

          <p class="text-xs text-gray-500 italic flex items-center gap-1 group relative cursor-help">
            <i class="fas fa-shield-alt text-[#2563EB]"></i> We reply within 24h.
            <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 rounded bg-gray-800 text-gray-200 text-xs opacity-0 group-hover:opacity-100 transition-all">
              Your email is safe with us
            </span>
          </p>

          <button type="submit" :disabled="sending"
            class="w-full bg-[#2563EB] text-white py-3 rounded-lg font-medium hover:bg-[#1d4ed8] transition shadow-lg shadow-[#2563EB]/30 hover:shadow-[#2563EB]/50 flex items-center justify-center gap-2 hover-lift disabled:opacity-60">
            <span>{{ sending ? 'Sending...' : 'Send Message' }}</span>
            <i :class="sending ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'"></i>
          </button>
        </form>
      </div>

      <!-- Contact Info & Socials -->
      <div class="space-y-6">
        <div class="bg-[#0a0a0a] p-8 rounded-2xl border border-gray-800 hover-lift transition-transform hover:-translate-y-1">
          <h3 class="text-2xl font-semibold text-white mb-6">Contact Information</h3>
          <div class="space-y-4">
            <div v-for="info in contactInfo" :key="info.label"
              class="flex items-start gap-4 p-3 rounded-lg hover:bg-gradient-to-r hover:from-[#2563EB]/10 hover:to-transparent transition">
              <div class="w-10 h-10 bg-[#2563EB]/10 rounded-lg flex items-center justify-center text-[#2563EB] shrink-0">
                <i :class="`fas ${info.icon}`"></i>
              </div>
              <div>
                <p class="text-sm text-gray-400">{{ info.label }}</p>
                <a v-if="info.href" :href="info.href" class="text-white hover:text-[#2563EB] transition">{{ info.value }}</a>
                <p v-else class="text-white">{{ info.value }}</p>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-800">
            <h2 class="text-lg font-semibold text-gray-300 mb-4">Find us on</h2>
            <div class="flex flex-wrap gap-2">
              <a
                v-for="social in socials"
                :key="social.label"
                :href="social.href"
                :aria-label="social.label"
                target="_blank"
                rel="noopener noreferrer"
                :class="`w-10 h-10 border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 transition transform hover:scale-110 ${social.color}`"
              >
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Google Maps -->
    <div class="mt-12">
      <h3 class="text-xl font-semibold text-white mb-4 text-center">
        <i class="fas fa-map-marker-alt text-[#2563EB] mr-2"></i>Our <span class="text-[#2563EB]">Location</span>
      </h3>
      <div class="rounded-2xl border border-gray-800 overflow-hidden shadow-lg" style="height: 380px;">
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