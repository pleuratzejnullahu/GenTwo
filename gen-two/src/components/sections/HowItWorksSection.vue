<template>
  <section class="mt-24 mb-20">
    <Container>
      <h2 class="text-2xl font-semibold">How it works</h2>
      <ol class="mt-6 grid sm:grid-cols-3 gap-6">
        <li class="bg-neutral-800/40 border border-neutral-700 rounded-xl p-6">
          <h3 class="font-medium">1. Create an account</h3>
          <p class="mt-2 text-neutral-400 text-sm">Sign up and set your currency preferences.</p>
        </li>
        <li class="bg-neutral-800/40 border border-neutral-700 rounded-xl p-6">
          <h3 class="font-medium">2. Plan your goals</h3>
          <p class="mt-2 text-neutral-400 text-sm">Define targets and timelines with guidance.</p>
        </li>
        <li class="bg-neutral-800/40 border border-neutral-700 rounded-xl p-6">
          <h3 class="font-medium">3. Track & optimize</h3>
          <p class="mt-2 text-neutral-400 text-sm">Refresh rates and monitor performance.</p>
        </li>
      </ol>
    </Container>
  </section>
</template>

<script>
import Container from '../ui/Container.vue'

export default {
  name: 'HowItWorksSection',
  components: { Container }
}
</script>
