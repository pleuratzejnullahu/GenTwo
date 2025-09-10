<template>
  <div class="min-h-screen bg-neutral-900 text-neutral-100">
    <SiteHeader />

    <div class="dynamic-content px-4 sm:px-6 lg:px-8">
      <RouterView />
    </div>
  </div>
</template>

<script>
import SiteHeader from "./components/layout/SiteHeader.vue";
export default {
  components: {
    SiteHeader: SiteHeader
  }
}
</script>

<style lang="scss" scoped>

</style>
