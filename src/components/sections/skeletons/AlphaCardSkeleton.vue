<template>
  <div class="sk" role="status" aria-label="Loading alpha card" aria-live="polite">
    <div class="flex items-center gap-2">
      <span class="sk-dot"></span>
      <span class="sk-pill w-28 h-5"></span>
    </div>

    <div class="mt-6">
      <div class="sk-pill w-40 h-4"></div>

      <div class="mt-4 flex items-center gap-4">
        <div class="sk-pill h-12 w-[240px] sm:w-[240px]"></div>
        <div class="sk-chip h-10 w-[112px] ml-auto"></div>
      </div>
    </div>

    <div class="mt-6">
      <div class="sk-pill w-24 h-4 mb-3"></div>

      <ul class="min-h-[180px] space-y-3">
        <li v-for="i in 5" :key="i" class="flex items-center justify-between">
          <div class="sk-pill h-5 w-40"></div>
          <div class="sk-pill h-5 w-14"></div>
        </li>
      </ul>

      <div class="mt-5 flex items-center justify-end gap-3">
        <span class="sk-circle w-7 h-7"></span>
        <div class="flex items-center gap-3">
          <span class="sk-page sk-page--active">1</span>
          <span class="sk-page">2</span>
          <span class="sk-page">3</span>
        </div>
        <span class="sk-circle w-7 h-7"></span>
      </div>
    </div>

    <div class="mt-8">
      <div class="sk-cta h-12 w-full"></div>
      <div class="sk-pill w-48 h-4 mt-4"></div>
    </div>

    <span class="sr-only">Loading…</span>
  </div>
</template>

<script>
export default { name: 'AlphaCardSkeleton' }
</script>

<style scoped>
.sk {
  width: 100%;
  display: flex;
  flex-direction: column;
  --sk-bg: #2e2e2e;
  --sk-fg: #3a3a3a;
  --sk-br: 12px;
  position: relative;
}
.sk *, .sk::before, .sk::after { box-sizing: border-box; }

@media (prefers-reduced-motion: no-preference) {
  .sk .sk-pill,
  .sk .sk-chip,
  .sk .sk-circle,
  .sk .sk-cta {
    position: relative;
    overflow: hidden;
  }
  .sk .sk-pill::after,
  .sk .sk-chip::after,
  .sk .sk-circle::after,
  .sk .sk-cta::after {
    content: "";
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.06), transparent);
    transform: translateX(-100%);
    animation: sk-shimmer 1.2s ease-in-out infinite;
  }
  @keyframes sk-shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
}

.sk-dot   { width: 10px; height: 10px; border-radius: 9999px; background: var(--sk-fg); }
.sk-pill  { border-radius: 8px; background: var(--sk-fg); }
.sk-chip  { border-radius: 10px; background: var(--sk-fg); box-shadow: inset 0 0 0 1px rgba(148,163,184,.2); }
.sk-circle{ border-radius: 9999px; background: var(--sk-fg); box-shadow: inset 0 0 0 1px rgba(148,163,184,.2); }

.sk-page {
  width: 2.25rem; height: 2.25rem;
  border-radius: .75rem;
  display: inline-flex; align-items: center; justify-content: center;
  font-weight: 600; font-size: 1rem;
  color: transparent;
  background: rgba(38,38,38,.95);
  box-shadow: inset 0 0 0 1px rgba(148,163,184,.15);
  border: 1px solid rgba(148,163,184,.35);
}
.sk-page--active {
  box-shadow: inset 0 0 0 1px rgba(148,163,184,.25);
}

.sk-cta {
  border-radius: .75rem;
  background: #1f1f1f;
  box-shadow: inset 0 0 0 2px rgba(118, 202, 92, .45);
}

.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0);
  border: 0; white-space: nowrap;
}
</style>
