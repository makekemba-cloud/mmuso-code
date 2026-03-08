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
      'service_hv2gkdi',
      'template_svjui79',
      formRef.value,
      'KILymnp7Qzb46rSiD'
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
  { icon: 'fa-envelope',      label: 'Email',          value: 'makekembav@gmail.com', href: 'mailto:makekembav@gmail.com' },
  { icon: 'fa-phone-alt',     label: 'Phone',          value: '+27 72 947 3009',       href: 'tel:+27729473009' },
  { icon: 'fa-map-marker-alt',label: 'Location',       value: 'Masia, Limpopo, South Africa', href: null },
  { icon: 'fa-clock',         label: 'Business Hours', value: 'Monday - Sunday: 24/7', href: null },
]
</script>

<template>
  <section id="contact" class="bg-[#000000] py-20 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
        <p class="text-xl text-gray-400">
          Ready to transform your ideas into reality? Get in touch and let's discuss how we can help your business grow.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12">

        <!-- Form -->
        <div class="bg-[#0a0a0a] p-8 rounded-2xl border border-gray-800 hover-lift">
          <h3 class="text-2xl font-semibold text-white mb-6">Send us a message</h3>
          <form ref="formRef" class="space-y-5" @submit.prevent="handleSubmit">

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
              <input
                v-model="form.name" type="text" name="name" placeholder="Your Name" required
                class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-white placeholder-gray-500 transition hover:border-[#2563EB]"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Your Email</label>
              <input
                v-model="form.email" type="email" name="email" placeholder="Your Email" required
                class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-white placeholder-gray-500 transition hover:border-[#2563EB]"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Subject</label>
              <input
                v-model="form.title" type="text" name="title" placeholder="Subject"
                class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-white placeholder-gray-500 transition hover:border-[#2563EB]"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Tell us about your project...</label>
              <textarea
                v-model="form.message" rows="4" name="message" placeholder="Tell us about your project..." required
                class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-white placeholder-gray-500 transition hover:border-[#2563EB]"
              ></textarea>
            </div>

            <p class="text-xs text-gray-500 italic flex items-center gap-1">
              <i class="fas fa-shield-alt text-[#2563EB]"></i> We reply within 24h. Your email is safe with us.
            </p>

            <button
              type="submit"
              :disabled="sending"
              class="w-full bg-[#2563EB] text-white py-3 rounded-lg font-medium hover:bg-[#1d4ed8] transition shadow-lg shadow-[#2563EB]/30 hover:shadow-[#2563EB]/50 flex items-center justify-center gap-2 hover-lift disabled:opacity-60"
            >
              <span>{{ sending ? 'Sending...' : 'Send Message' }}</span>
              <i :class="sending ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'"></i>
            </button>

          </form>
        </div>

        <!-- Contact Info -->
        <div class="space-y-8">
          <div class="bg-[#0a0a0a] p-8 rounded-2xl border border-gray-800 hover-lift">
            <h3 class="text-2xl font-semibold text-white mb-6">Contact Information</h3>
            <div class="space-y-6">
              <div
                v-for="info in contactInfo"
                :key="info.label"
                class="flex items-start gap-4 p-3 rounded-lg hover:bg-[#2563EB]/10 transition"
              >
                <div class="w-10 h-10 bg-[#2563EB]/10 rounded-lg flex items-center justify-center text-[#2563EB]">
                  <i :class="`fas ${info.icon}`"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-400">{{ info.label }}</p>
                  <a v-if="info.href" :href="info.href" class="text-white hover:text-[#2563EB] transition">{{ info.value }}</a>
                  <p v-else class="text-white">{{ info.value }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>