<template>
  <div class="space-y-6 animate-pulse">
    <div class="flex items-center gap-2">
      <span class="inline-block h-2.5 w-2.5 rounded-full bg-neutral-600"></span>
      <div class="h-4 w-24 bg-neutral-700 rounded"></div>
    </div>

    <div>
      <div class="h-3 w-28 bg-neutral-700 rounded mb-3"></div>
      <div class="h-10 w-48 bg-neutral-700 rounded"></div>
    </div>

    <div>
      <div class="h-3 w-20 bg-neutral-700 rounded mb-3"></div>
      <ul class="space-y-3">
        <li class="flex items-center justify-between">
          <div class="h-4 w-28 bg-neutral-700 rounded"></div>
          <div class="h-4 w-16 bg-neutral-700 rounded"></div>
        </li>
        <li class="flex items-center justify-between">
          <div class="h-4 w-28 bg-neutral-700 rounded"></div>
          <div class="h-4 w-16 bg-neutral-700 rounded"></div>
        </li>
        <li class="flex items-center justify-between">
          <div class="h-4 w-28 bg-neutral-700 rounded"></div>
          <div class="h-4 w-16 bg-neutral-700 rounded"></div>
        </li>
      </ul>
    </div>

    <div class="h-10 w-full bg-neutral-700 rounded-lg"></div>
    <div class="h-3 w-40 bg-neutral-700 rounded"></div>
  </div>
</template>

<script>
export default { name: 'RatesCardSkeleton' }
</script>
