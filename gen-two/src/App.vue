<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<script>
import DefaultLayout from './components/layout/DefaultLayout.vue'

export default {
  name: 'App',
  components: { DefaultLayout },
  computed: {
    layoutName() {
      return (this.$route.meta && this.$route.meta.layout) || 'default'
    },
    layoutComponent() {
      switch (this.layoutName) {
        case 'default': return 'DefaultLayout'
        default: return 'DefaultLayout'
      }
    }
  }
}
</script>
