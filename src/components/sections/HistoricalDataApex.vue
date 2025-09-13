<template>
  <section class="mt-16 mb-10">
    <Container>
      <div class="w-full rounded-2xl border border-neutral-700 bg-neutral-800/40 p-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-sm text-neutral-400">Statistics</p>
            <h3 class="text-lg font-semibold">Historical Data</h3>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <!-- timeframe (emit up) -->
            <div class="inline-flex rounded-md border border-neutral-700 overflow-hidden">
              <button
                  v-for="opt in tfOpts"
                  :key="opt.value"
                  class="px-3 py-1.5 text-sm"
                  :class="timeFrame === opt.value ? 'bg-neutral-700 font-medium' : 'bg-transparent text-neutral-300'"
                  @click="$emit('timeframe-change', opt.value)"
              >{{ opt.label }}</button>
            </div>

            <!-- view toggle (local-only) -->
            <div class="inline-flex rounded-md border border-neutral-700 overflow-hidden">
              <button class="px-3 py-1.5 text-sm"
                      :class="view==='chart' ? 'bg-neutral-700 font-medium' : 'text-neutral-300'"
                      @click="view='chart'">📈 Chart</button>
              <button class="px-3 py-1.5 text-sm"
                      :class="view==='table' ? 'bg-neutral-700 font-medium' : 'text-neutral-300'"
                      @click="view='table'">📋 Table</button>
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
    timeFrame: { type: String, required: true }, // 'weekly' | 'monthly' | 'yearly'
    series: { type: Array, required: true },     // [{date, value}]
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
    chartOptions() {
      return {
        chart: { toolbar: { show: false }, animations: { enabled: true } },
        stroke: { width: 2, curve: 'smooth' },
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
      const asc = this.series || [] // already oldest→newest
      return asc.map(p => ({
        k: +new Date(p.date),
        label: this.xLabel(p.date),          // SAME as chart x-axis
        full:  this.tooltipDate(p.date),     // full date for hover
        value: Number(p.value).toFixed(4)
      }))
    }
  },
  methods: {
    labelFor(tf) { return this.tfOpts.find(t => t.value === tf)?.label ?? tf },
    xLabel(d) {
      const dt = dayjs(d)
      if (this.timeFrame === 'yearly') {
        return dt.format('MMM YYYY')
      }
      if (this.timeFrame === 'monthly') {
        return dt.format('DD.MM')
      }
      return dt.format('D MMM')
    },
    tooltipDate(d) {
      const dt = dayjs(d)
      if (this.timeFrame === 'yearly') {
        return dt.format('MMM YYYY')
      }
      return dt.format('DD.MM.YYYY')
    },
  }
}
</script>

<style scoped>
.tabular-nums { font-variant-numeric: tabular-nums; }
</style>
