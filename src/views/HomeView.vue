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

      try {
        const [latestRes, historicalRes] = await Promise.all([
          ratesService.getRates({
            base: this.base,
            symbols: ['EUR','USD','JPY','GBP','AUD','CAD','SEK','NOK','CNY','TRY','INR','AED']
          }),
          getHistoricalSeries({
            base: this.base,
            symbol: this.symbol,
            timeFrame: this.timeFrame
          })
        ])

        this.rates = latestRes.rates
        this.balance = latestRes.balance
        this.lastUpdated = latestRes.lastUpdated

        this.historicalSeries = historicalRes
      } catch (e) {
        console.error(e)
        const url = e?.response?.config?.url || ''
        if (url.includes('/historical/')) {
          this.errorHistorical = 'Failed to load historical data.'
          this.historicalSeries = []
        } else {
          this.errorLatest = 'Failed to refresh rates.'
        }
      } finally {
        setTimeout(() => {
          this.loadingLatest = false
          this.loadingHistorical = false
        }, 2000)
      }
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
