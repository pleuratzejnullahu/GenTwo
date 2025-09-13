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
        @refresh-latest="fetchLatest"
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
import HeroSection from '@/components/sections/HeroSection.vue'
import HowItWorksSection from '@/components/sections/HowItWorksSection.vue'
import HistoricalDataApex from '@/components/sections/HistoricalDataApex.vue'
import ratesService from '@/services/ratesService'
import { getHistoricalSeries } from '@/services/historicalService'

export default {
  name: 'HomeView',
  components: { HeroSection, HowItWorksSection, HistoricalDataApex },

  data() {
    return {
      base: 'CHF',
      symbol: 'EUR',
      timeFrame: 'weekly',
      rates: {},
      balance: null,
      lastUpdated: null,
      historicalSeries: [],
      loadingLatest: false,
      loadingHistorical: false,
      errorLatest: null,
      errorHistorical: null,
    }
  },

  created() {
    this.fetchLatest()
    this.fetchHistorical()
  },

  methods: {
    async fetchLatest() {
      this.loadingLatest = true
      this.errorLatest = null
      try {
        const res = await ratesService.getRates({
          base: this.base,
          symbols: ['EUR','USD','JPY','GBP','AUD','CAD','SEK','NOK','CNY','TRY','INR','AED']
        })
        this.rates = res.rates
        this.balance = res.balance
        this.lastUpdated = res.lastUpdated
      } catch (e) {
        console.error(e)
        this.errorLatest = 'Failed to refresh rates.'
      } finally {
        this.loadingLatest = false
      }
    },

    async fetchHistorical() {
      this.loadingHistorical = true
      this.errorHistorical = null
      try {
        this.historicalSeries = await getHistoricalSeries({
          base: this.base,
          symbol: this.symbol,
          timeFrame: this.timeFrame
        })
      } catch (e) {
        console.error(e)
        this.errorHistorical = 'Failed to load historical data.'
        this.historicalSeries = []
      } finally {
        this.loadingHistorical = false
      }
    },
    onBaseChange(newBase) {
      if (newBase && newBase !== this.base) {
        this.base = newBase
        this.fetchLatest()
        this.fetchHistorical()
      }
    },
    onSymbolChange(newSymbol) {
      if (newSymbol && newSymbol !== this.symbol) {
        this.symbol = newSymbol
        this.fetchLatest()
        this.fetchHistorical()
      }
    },
    onTimeFrameChange(tf) {
      if (tf && tf !== this.timeFrame) {
        this.timeFrame = tf
        this.fetchHistorical()
      }
    },
    scrollToHowItWorks() {
      const el = document.getElementById('how-it-works')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>
