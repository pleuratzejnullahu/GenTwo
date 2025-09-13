<template>
  <div class="not-found min-h-[60vh] grid place-items-center">
    <div class="text-center">
      <h1 class="text-5xl font-extrabold">404</h1>
      <p class="mt-3 text-neutral-400">Page not found.</p>
      <router-link
          to="/"
          class="inline-block mt-6 rounded-xl px-4 py-2 border border-neutral-600 hover:bg-neutral-800"
      >
        Back home
      </router-link>
    </div>
  </div>
</template>

<script>
export default { name: 'NotFound' }
</script>
