<template>
  <div
      class="chart-skeleton"
      :style="{ height: height + 'px' }"
      role="status"
      aria-label="Loading chart data"
      aria-live="polite"
  >
    <div class="chart-skeleton__y"></div>
    <div class="chart-skeleton__grid"/>
    <div class="chart-skeleton__line"/>
    <div class="sr-only">Loading…</div>
  </div>
</template>

<script>
export default {
  name: 'ChartSkeleton',
  props: {
    height: {
      type: Number,
      default: 320
    }
  }
}
</script>

<style scoped>
.chart-skeleton {
  position: relative;
  width: 100%;
  border-radius: .75rem;
  overflow: hidden;
  background: linear-gradient(
      180deg,
      rgba(38, 38, 38, .9) 0%,
      rgba(38, 38, 38, .9) 30%,
      rgba(38, 38, 38, .85) 30%,
      rgba(38, 38, 38, .85) 100%
  );
  border: 1px solid rgba(148, 163, 184, .15);
  animation: skeleton-pulse 1.2s ease-in-out infinite;
}

.chart-skeleton__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(148, 163, 184, .10) 1px, transparent 1px),
  linear-gradient(90deg, rgba(148, 163, 184, .08) 1px, transparent 1px);
  background-size: 100% 48px, 64px 100%;
  mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
}

.chart-skeleton__y {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 44px;
  background: linear-gradient(to right, rgba(148, 163, 184, .15), rgba(148, 163, 184, .0));
  border-right: 1px solid rgba(148, 163, 184, .15);
}

.chart-skeleton__line {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 10% 75%, rgba(127, 224, 85, .09) 0 10%, transparent 11%),
  radial-gradient(circle at 30% 35%, rgba(127, 224, 85, .09) 0 10%, transparent 11%),
  radial-gradient(circle at 52% 60%, rgba(127, 224, 85, .09) 0 10%, transparent 11%),
  radial-gradient(circle at 70% 30%, rgba(127, 224, 85, .09) 0 10%, transparent 11%),
  radial-gradient(circle at 88% 65%, rgba(127, 224, 85, .09) 0 10%, transparent 11%);
  filter: blur(8px);
}

@keyframes skeleton-pulse {
  0% {
    opacity: .85;
  }
  50% {
    opacity: .65;
  }
  100% {
    opacity: .85;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
