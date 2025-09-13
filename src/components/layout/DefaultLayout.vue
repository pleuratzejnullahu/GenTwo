<template>
  <div class="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
    <SiteHeader />

    <main class="flex-1 dynamic-content px-4 sm:px-6 lg:px-8">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from './SiteHeader.vue'

export default {
  name: 'DefaultLayout',
  components: { SiteHeader }
}
</script>
