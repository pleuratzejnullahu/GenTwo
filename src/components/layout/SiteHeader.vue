<template>
  <div class="main-header bg-neutral-900 sticky top-0 z-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav class="h-16 flex items-center justify-between border-b border-white/10">
        <RouterLink to="/" class="flex items-center gap-2">
          <span class="font-semibold tracking-wide font-sans text-[24px]">GenTwo</span>
        </RouterLink>

        <ul class="hidden md:flex items-center gap-8 text-sm">
          <li><RouterLink to="/service" class="text-neutral-200 hover:text-white transition text-[16px]">Service</RouterLink></li>
          <li><RouterLink to="/features" class="text-neutral-200 hover:text-white transition text-[16px]">Features</RouterLink></li>
          <li><RouterLink to="/resources" class="text-neutral-200 hover:text-white transition text-[16px]">Resources</RouterLink></li>
          <li><RouterLink to="/contacts" class="text-neutral-200 hover:text-white transition text-[16px]">Contacts</RouterLink></li>
        </ul>

        <div class="hidden md:flex items-center gap-4">
          <RouterLink to="/login" class="text-neutral-200 hover:text-white transition text-[16px]">Login</RouterLink>
          <RouterLink to="/signup" class="rounded-full border border-white/20 px-5 py-2 hover:border-white/60 transition text-[16px]">
            Signup
          </RouterLink>
        </div>

        <button
            class="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/5 focus:outline-none"
            @click="toggleMenu"
            aria-label="Toggle menu"
        >
          <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </nav>
    </div>

    <div v-if="open" class="md:hidden bg-neutral-900 px-4 sm:px-6 lg:px-8">
      <div class="py-3 space-y-2">
        <RouterLink to="/service" class="block text-neutral-200 hover:text-white text-sm">Service</RouterLink>
        <RouterLink to="/features" class="block text-neutral-200 hover:text-white text-sm">Features</RouterLink>
        <RouterLink to="/resources" class="block text-neutral-200 hover:text-white text-sm">Resources</RouterLink>
        <RouterLink to="/contacts" class="block text-neutral-200 hover:text-white text-sm">Contacts</RouterLink>

        <div class="pt-2 flex items-center gap-3">
          <RouterLink to="/login" class="block text-neutral-200 hover:text-white text-sm">Login</RouterLink>
          <RouterLink to="/signup" class="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-white/60 transition">
            Signup
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SiteHeader",
  data() {
    return { open: false };
  },
  methods: {
    toggleMenu() {
      this.open = !this.open;
    },
  },
};
</script>
