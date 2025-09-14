<template>
  <div class="home-view">
    <HeroSection
        :base="base"
        :rates="rates"
        :balance="balance"
        :last-updated="lastUpdated"
        :loading-latest="loadingLatest"
        :error-latest="errorLatest"
        @base-change="onBaseChange"
        @refresh-latest="fetchAll"
        @scroll-how-it-works="scrollToHowItWorks"
    />

    <HowItWorksSection id="how-it-works" />

    <HistoricalDataApex
        :base="base"
        :symbol="symbol"
        :time-frame="timeFrame"
        :series="historicalSeries"
        :loading="loadingHistorical"
        :error="errorHistorical"
        @timeframe-change="onTimeFrameChange"
    />
  </div>
</template>

<script>
import ratesService from '@/services/ratesService'
import { getHistoricalSeries } from '@/services/historicalService'

import HeroSection from '@/components/sections/HeroSection.vue'
import HowItWorksSection from '@/components/sections/HowItWorksSection.vue'
import HistoricalDataApex from '@/components/sections/HistoricalDataApex.vue'

export default {
  name: 'HomeView',
  components: { HeroSection, HowItWorksSection, HistoricalDataApex },

  data() {
    return {
      rates: {},
      base: 'CHF',
      symbol: 'EUR',
      balance: null,
      lastUpdated: null,
      timeFrame: 'weekly',
      historicalSeries: [],
      loadingLatest: false,
      loadingHistorical: false,
      errorLatest: null,
      errorHistorical: null,
    }
  },

  mounted() {
    this.fetchAll()
  },

  methods: {
    async fetchAll() {
      this.loadingLatest = true
      this.loadingHistorical = true
      this.errorLatest = null
      this.errorHistorical = null

      const latestP = ratesService.getRates({
        base: this.base,
        symbols: ['EUR','USD','JPY','GBP','AUD','CAD','SEK','NOK','CNY','TRY','INR','AED']
      })

      const historicalP = getHistoricalSeries({
        base: this.base,
        symbol: this.symbol,
        timeFrame: this.timeFrame
      })

      const [latest, historical] = await Promise.allSettled([latestP, historicalP])

      if (latest.status === 'fulfilled') {
        const r = latest.value
        this.rates = r.rates
        this.balance = r.balance
        this.lastUpdated = r.lastUpdated
      } else {
        console.error('latest failed:', latest.reason)
        this.errorLatest = 'Failed to refresh rates.'
      }

      if (historical.status === 'fulfilled') {
        this.historicalSeries = historical.value
      } else {
        console.error('historical failed:', historical.reason)
        this.errorHistorical = 'Failed to load historical data.'
        this.historicalSeries = []
      }

      setTimeout(() => {
        this.loadingLatest = false
        this.loadingHistorical = false
      }, 200)
    },

    async onBaseChange(newBase) {
      if (newBase && newBase !== this.base) {
        this.base = newBase
        await this.fetchAll()
      }
    },

    async onTimeFrameChange(tf) {
      if (tf && tf !== this.timeFrame) {
        this.timeFrame = tf
        await this.fetchAll()
      }
    },

    scrollToHowItWorks() {
      const el = document.getElementById('how-it-works')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>
