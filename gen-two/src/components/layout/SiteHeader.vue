<template>
  <div class="main-header bg-neutral-900 sticky top-0 z-50">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2">
        <span class="text-lg font-semibold tracking-wide font-sans">GenTwo</span>
      </RouterLink>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-8 text-sm">
        <li class="cursor-pointer">
          <RouterLink to="/service" class="text-sm text-neutral-200 hover:text-white transition">
            Service
          </RouterLink>
        </li>

        <li class="cursor-pointer">
          <RouterLink to="/features" class="text-sm text-neutral-200 hover:text-white transition">
            Features
          </RouterLink>
        </li>

        <li class="cursor-pointer">
          <RouterLink to="/resources" class="text-sm text-neutral-200 hover:text-white transition">
            Resources
          </RouterLink>
        </li>

        <li class="cursor-pointer">
          <RouterLink to="/contacts" class="text-sm text-neutral-200 hover:text-white transition">
            Contacts
          </RouterLink>
        </li>
      </ul>

      <div class="hidden md:flex items-center gap-4">
        <RouterLink to="/login" class="text-sm text-neutral-200 hover:text-white transition cursor-pointer">
          Login
        </RouterLink>

        <RouterLink
            to="/signup"
            class="rounded-full border border-white/20 px-5 py-2 text-sm hover:border-white/60 transition cursor-pointer"
        >
          Signup
        </RouterLink>
      </div>

      <!-- Mobile menu button -->
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

    <div class="mx-4 sm:mx-6 lg:mx-8 h-px bg-white/10"></div>

    <!-- Mobile dropdown -->
    <div v-if="open" class="md:hidden border-t border-white/10 bg-neutral-900">
      <div class="px-4 py-3 space-y-2">
        <RouterLink to="/service" class="block text-neutral-200 hover:text-white text-sm">
          Service
        </RouterLink>

        <RouterLink to="/features" class="block text-neutral-200 hover:text-white text-sm">
          Features
        </RouterLink>

        <RouterLink to="/resources" class="block text-neutral-200 hover:text-white text-sm">
          Resources
        </RouterLink>

        <RouterLink to="/contacts" class="block text-neutral-200 hover:text-white text-sm">
          Contacts
        </RouterLink>

        <div class="pt-2 flex items-center gap-3">
          <RouterLink to="/login" class="block text-neutral-200 hover:text-white text-sm">
            Login
          </RouterLink>

          <RouterLink
              to="/signup"
              class="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-white/60 transition"
          >
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
    return {
      open: false,
    };
  },
  methods: {
    toggleMenu() {
      this.open = !this.open;
    },
  },
};
</script>
