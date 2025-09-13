<template>
  <section class="mt-16 mb-5">
    <Container>
      <div class="w-full rounded-2xl border border-neutral-700 bg-neutral-800/40 p-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-sm text-neutral-400">Statistics</p>
            <h3 class="text-lg font-semibold">Historical Data</h3>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <div class="segmented">
              <button
                  v-for="opt in tfOpts"
                  :key="opt.value"
                  class="segmented-btn"
                  :class="timeFrame === opt.value ? 'is-active' : ''"
                  @click="$emit('timeframe-change', opt.value)"
              >
                {{ opt.label }}
              </button>
            </div>

            <div class="icon-toggle">
              <button
                  class="icon-btn"
                  :class="view === 'chart' ? 'is-active' : ''"
                  @click="view='chart'"
                  title="Chart"
                  aria-label="Chart view"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                  <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                </svg>
              </button>

              <button
                  class="icon-btn"
                  :class="view === 'table' ? 'is-active' : ''"
                  @click="view='table'"
                  title="Table"
                  aria-label="Table view"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <rect x="3" y="4" width="3" height="3" rx="0.75"></rect>
                  <rect x="3" y="10.5" width="3" height="3" rx="0.75"></rect>
                  <rect x="3" y="17" width="3" height="3" rx="0.75"></rect>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6 min-h-[280px]">
          <div v-if="loading" class="text-neutral-400 text-sm">Loading…</div>
          <div v-else-if="error" class="text-red-400 text-sm">{{ error }}</div>

          <apexchart
              v-else-if="view==='chart'"
              type="line"
              height="320"
              :options="chartOptions"
              :series="chartSeries"
          />

          <table v-else class="w-full text-sm">
            <thead class="text-neutral-400">
            <tr class="border-b border-neutral-700/60">
              <th class="text-left py-2 font-medium">Date</th>
              <th class="text-right py-2 font-medium">Rate ({{ base }} → {{ symbol }})</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in tableRows" :key="row.k" class="border-b border-neutral-800">
              <td class="py-2" :title="row.full">{{ row.label }}</td>
              <td class="py-2 text-right tabular-nums">{{ row.value }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <p class="mt-4 text-xs text-neutral-500">
          Showing {{ labelFor(timeFrame).toLowerCase() }} data for {{ base }} ⇄ {{ symbol }}.
        </p>
      </div>
    </Container>
  </section>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import Container from '../ui/Container.vue'
import dayjs from 'dayjs'

export default {
  name: 'HistoricalDataApex',
  components: { apexchart: VueApexCharts, Container },
  props: {
    base: { type: String, required: true },
    symbol: { type: String, required: true },
    timeFrame: { type: String, required: true },
    series: { type: Array, required: true },
    loading: { type: Boolean, default: false },
    error: { type: String, default: null }
  },
  data() {
    return {
      view: 'chart',
      tfOpts: [
        { value: 'weekly',  label: 'Weekly'  },
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly',  label: 'Yearly'  },
      ]
    }
  },
  computed: {
    chartSeries() {
      return [{ name: `${this.base}→${this.symbol}`, data: this.series.map(p => p.value) }]
    },
    yBounds() {
      const vals = this.series.map(p => p.value)
      if (!vals.length) return { min: undefined, max: undefined }
      const min = Math.min(...vals)
      const max = Math.max(...vals)
      const pad = Math.max((max - min) * 0.15, 0.0002)
      return { min: +(min - pad).toFixed(6), max: +(max + pad).toFixed(6) }
    },
    chartOptions() {
      return {
        chart: { toolbar: { show: false }, animations: { enabled: true } },
        stroke: { width: 2, curve: 'smooth' },

        markers: {
          size: 5,
          strokeWidth: 3,
          strokeColors: '#7FE055',
          colors: ['#0F0F0F'],
          hover: { size: 7, sizeOffset: 2 }
        },

        grid: { borderColor: 'rgba(148,163,184,.2)' },
        xaxis: {
          categories: this.series.map(p => this.xLabel(p.date)),
          labels: { style: { colors: '#A3A3A3' } },
          axisBorder: { color: 'rgba(148,163,184,.35)' },
          axisTicks:  { color: 'rgba(148,163,184,.35)' }
        },
        yaxis: { labels: { style: { colors: '#A3A3A3' } } },
        tooltip: {
          x: { formatter: (_val, { dataPointIndex }) => this.tooltipDate(this.series[dataPointIndex]?.date) }
        },
        theme: { mode: 'dark' },
        colors: ['#43B37D']
      }
    },
    tableRows() {
      const asc = this.series || []
      return asc.map(p => ({
        k: +new Date(p.date),
        label: this.xLabel(p.date),
        full:  this.tooltipDate(p.date),
        value: Number(p.value).toFixed(4)
      }))
    }
  },
  methods: {
    labelFor(tf) { return this.tfOpts.find(t => t.value === tf)?.label ?? tf },
    xLabel(d) {
      const dt = dayjs(d)
      if (this.timeFrame === 'yearly')  return dt.format('MMM YYYY')
      if (this.timeFrame === 'monthly') return dt.format('DD.MM')
      return dt.format('D MMM')
    },
    tooltipDate(d) {
      const dt = dayjs(d)
      return this.timeFrame === 'yearly'
          ? dt.format('MMM YYYY')
          : dt.format('DD.MM.YYYY')
    }
  }
}
</script>


<style scoped>
.tabular-nums { font-variant-numeric: tabular-nums; }

.segmented {
  display: inline-flex;
  gap: .25rem;
  padding: .25rem;
  border-radius: .75rem;
  background: rgba(82,82,82,.25);
  border: 1px solid rgba(148,163,184,.35);
}
.segmented-btn {
  padding: .5rem 1.25rem;
  border-radius: .5rem;
  font-size: .95rem;
  color: #D4D4D4;
  transition: all .15s ease;
}
.segmented-btn:hover { color: #fff; }
.segmented-btn.is-active {
  color: #0b0f0b;
  font-weight: 700;
  background: linear-gradient(90deg, #43B37D, #B1E04B);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.15);
}

.icon-toggle {
  display: inline-flex;
  gap: .5rem;
  padding: .35rem;
  border-radius: .75rem;
  background: rgba(82,82,82,.25);
  border: 1px solid rgba(148,163,184,.35);
}
.icon-btn {
  width: 40px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: .5rem;
  color: #d4d4d4;
  transition: all .15s ease;
}
.icon-btn:hover { color: #fff; }
.icon-btn.is-active {
  color: #7FE055;
  background: rgba(38,38,38,.75);
  box-shadow: inset 0 0 0 1px rgba(127,224,85,.3);
}
</style>
