<template>
  <div class="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-6">
    <div class="flex items-center gap-2">
      <span class="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow"></span>
      <span class="font-semibold">AlphaCard</span>
    </div>

    <p class="text-neutral-400 text-sm mt-6">Amount balance</p>
    <p class="text-3xl sm:text-4xl font-extrabold mt-2">
      {{ balance.toLocaleString() }} {{ base }}
    </p>

    <div class="mt-6">
      <p class="text-sm text-neutral-400 mb-3">Currency</p>
      <ul class="space-y-3">
        <li class="flex items-center justify-between">
          <span>CHF ⇄ EUR</span><span class="tabular-nums">{{ rates.EUR }}</span>
        </li>
        <li class="flex items-center justify-between">
          <span>CHF ⇄ USD</span><span class="tabular-nums">{{ rates.USD }}</span>
        </li>
        <li class="flex items-center justify-between">
          <span>CHF ⇄ JPY</span><span class="tabular-nums">{{ rates.JPY }}</span>
        </li>
      </ul>
    </div>

    <button
        :disabled="loading"
        @click="onRefresh"
        class="mt-8 w-full rounded-lg py-3 text-sm font-medium transition hover:opacity-90
         border-1 border-transparent
         [background:linear-gradient(#1F1F1F,#1F1F1F)_padding-box,linear-gradient(to_right,#43B37D,#B1E04B)_border-box]"
    >
      <span class="block text-center text-transparent bg-clip-text bg-gradient-to-r from-[#43B37D] to-[#B1E04B]">
        {{ loading ? 'Refreshing…' : 'Refresh Rates' }}
      </span>
    </button>

    
    <p class="text-xs text-neutral-500 mt-4">Last updated: {{ formattedUpdated }}</p>
    <p v-if="error" class="text-sm mt-3 text-red-400">{{ error }}</p>
  </div>
</template>

<script>
import { refreshRates } from '../../services/ratesService'

export default {
  name: 'RatesCard',
  data() {
    return {
      base: 'CHF',
      rates: { EUR: 0.87, USD: 1.277, JPY: 0.95 },
      balance: 150000,
      lastUpdated: new Date(),
      loading: false,
      error: null
    }
  },
  computed: {
    formattedUpdated() {
      const d = this.lastUpdated
      return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`
    }
  },
  created() {
    this.onRefresh()
  },
  methods: {
    async onRefresh() {
      this.loading = true
      this.error = null
      try {
        const res = await refreshRates()
        this.base = res.base
        this.rates = res.rates
        this.balance = res.balance
        this.lastUpdated = res.lastUpdated
      } catch (e) {
        this.error = 'Failed to refresh rates.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
