<template>
  <div class="home-view">
    <HeroSection />
    <HowItWorksSection />
  </div>
</template>

<script>
import HeroSection from '../components/sections/HeroSection.vue'
import HowItWorksSection from '../components/sections/HowItWorksSection.vue'

export default {
  name: 'HomeView',
  components: { HeroSection, HowItWorksSection }
}
</script>
