<script setup lang="ts">
import { ref } from 'vue'
import Popup     from './components/Popup.vue'
import Nav       from './components/Nav.vue'
import Hero      from './components/Hero.vue'
import About     from './components/About.vue'
import Expertise from './components/Expertise.vue'
import Approach  from './components/Approach.vue'
import Stack     from './components/Stack.vue'
import Projects  from './components/Projects.vue'
import Contact   from './components/Contact.vue'
import Footer    from './components/Footer.vue'

const popupRef = ref<InstanceType<typeof Popup> | null>(null)

function showPopup() {
  popupRef.value?.show()
}
</script>

<template>
  <div class="bg-[#0a0a0a] text-gray-200 antialiased">
    <Popup ref="popupRef" />
    <Nav />
    <Hero />
    <About />
    <Expertise />
    <Approach />
    <Stack />
    <Projects />
    <Contact @show-popup="showPopup" />
    <Footer />
  </div>
</template>