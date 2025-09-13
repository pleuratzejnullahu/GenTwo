<template>
  <div
      class="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-6 relative flex flex-col justify-between"
  >
    <AlphaCardSkeleton v-if="loading" />

    <div v-else class="flex flex-col justify-between h-full">
      <div>
        <div class="flex items-center gap-2">
          <span class="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow"></span>
          <span class="font-semibold">AlphaCard</span>
        </div>

        <div class="mt-6 flex items-start justify-between gap-3">
          <div>
            <p class="text-neutral-400 text-sm">Amount balance</p>
            <p class="text-3xl sm:text-4xl font-extrabold mt-2">
              {{ Number(balance).toLocaleString() }} {{ base }}
            </p>
          </div>

          <!-- Base selector (emits base-change) -->
          <div class="relative" @keydown.escape="dropdownOpen=false">
            <button
                class="flex items-center gap-2 rounded-md px-3 py-2 bg-neutral-700/60 border border-neutral-600 text-sm"
                @click="dropdownOpen = !dropdownOpen"
            >
              <span class="text-lg leading-none">{{ flagFor(base) }}</span>
              <span class="font-medium">{{ base }}</span>
              <svg class="w-4 h-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd"/>
              </svg>
            </button>

            <ul
                v-if="dropdownOpen"
                class="absolute right-0 mt-2 w-36 rounded-md border border-neutral-700 bg-neutral-800 shadow-lg z-10 overflow-hidden"
            >
              <li
                  v-for="opt in baseOptions"
                  :key="opt"
                  @click="selectBase(opt)"
                  class="flex items-center justify-between px-3 py-2 text-sm hover:bg-neutral-700 cursor-pointer"
              >
                <span class="text-lg">{{ flagFor(opt) }}</span>
                <span class="ml-2">{{ opt }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-6">
          <p class="text-sm text-neutral-400 mb-3">Currency</p>
          <ul class="space-y-3 min-h-[180px]">
            <li
                v-for="[code, value] in pagedPairs"
                :key="`${base}-${code}`"
                class="flex items-center justify-between"
            >
              <span>{{ base }} ⇄ {{ code }}</span>
              <span class="tabular-nums">{{ formatRate(value) }}</span>
            </li>

            <li
                v-for="n in (pageSize - pagedPairs.length)"
                :key="`placeholder-${n}`"
                class="flex items-center justify-between opacity-0 select-none"
            >
              <span>placeholder</span><span>0.00</span>
            </li>
          </ul>

          <div class="mt-5 flex items-center justify-end pagination">
            <button
                class="arrow"
                :disabled="currentPage === 1"
                @click="prevPage"
                aria-label="Previous page"
            >
              ‹
            </button>

            <div class="flex items-center gap-3 mx-3">
              <button
                  v-for="p in totalPages"
                  :key="`p-${p}`"
                  class="num"
                  :class="p === currentPage ? 'active' : 'idle'"
                  @click="goToPage(p)"
              >
                {{ p }}
              </button>
            </div>

            <button
                class="arrow"
                :disabled="currentPage === totalPages"
                @click="nextPage"
                aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div>
        <button
            :disabled="loading"
            @click="$emit('refresh-latest')"
            class="mt-8 w-full cursor-pointer rounded-lg py-3 text-sm font-medium transition hover:opacity-90
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
    </div>
  </div>
</template>

<script>
import AlphaCardSkeleton from '../sections/AlphaCardSkeleton.vue'
import currencies from '../../assets/currencies/currencies.json'

export default {
  name: 'RatesCard',
  components: { AlphaCardSkeleton },

  props: {
    base: { type: String, required: true },
    rates: { type: Object, default: () => ({}) },
    balance: { type: [Number, String], default: 0 },
    lastUpdated: { type: [Date, Number, String], default: null },
    loading: { type: Boolean, default: false },
    error: { type: String, default: null },
    baseOptions: { type: Array, default: () => ['CHF', 'EUR', 'USD', 'GBP', 'JPY'] },
    allSymbols: {
      type: Array,
      default: () => ['EUR','USD','JPY','GBP','AUD','CAD','SEK','NOK','CNY','TRY','INR','AED']
    },
    pageSize: { type: Number, default: 5 }
  },

  emits: ['base-change', 'refresh-latest'],

  data() {
    return {
      currentPage: 1,
      dropdownOpen: false
    }
  },

  computed: {
    formattedUpdated() {
      if (!this.lastUpdated) return '—'
      let d = this.lastUpdated
      if (typeof d === 'number') {
        if (d < 2e12) d = d * 1000
        d = new Date(d)
      } else if (typeof d === 'string') {
        d = new Date(d)
      }
      const dd = String(d.getDate()).padStart(2,'0')
      const mm = String(d.getMonth()+1).padStart(2,'0')
      const yyyy = d.getFullYear()
      return `${dd}.${mm}.${yyyy}`
    },

    availableSymbols() {
      return this.allSymbols.filter(s => this.rates[s] != null)
    },

    totalPages() {
      return Math.max(1, Math.ceil(this.availableSymbols.length / this.pageSize))
    },

    pagedPairs() {
      const start = (this.currentPage - 1) * this.pageSize
      const pageSymbols = this.availableSymbols.slice(start, start + this.pageSize)
      return pageSymbols.map(code => [code, this.rates[code]])
    }
  },

  mounted() {
    if (typeof window !== 'undefined') {
      this._onClickAway = (e) => { if (!this.$el.contains(e.target)) this.dropdownOpen = false }
      window.addEventListener('click', this._onClickAway)
    }
  },

  beforeUnmount() {
    if (this._onClickAway) window.removeEventListener('click', this._onClickAway)
  },

  watch: {
    base() { this.currentPage = 1 },
    rates() { if (this.currentPage > this.totalPages) this.currentPage = this.totalPages }
  },

  methods: {
    selectBase(code) {
      this.dropdownOpen = false
      if (code && code !== this.base) this.$emit('base-change', code)
    },
    flagFor(code) {
      return currencies[code] || '🏳️'
    },
    goToPage(p) {
      if (p >= 1 && p <= this.totalPages) this.currentPage = p
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    formatRate(v) {
      if (v == null || isNaN(v)) return '—'
      return Number(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
  }
}
</script>

<style scoped>
.pagination .arrow {
  padding: 0 .25rem;
  line-height: 1;
  font-size: 1.25rem;
  color: rgb(163 163 163);
  transition: opacity .15s ease, color .15s ease;
}
.pagination .arrow:hover { color: rgb(212 212 212); }
.pagination .arrow:disabled { opacity: .35; cursor: not-allowed; }

.pagination .num {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
}
.pagination .num.active {
  background: rgba(38,38,38,.95);
  border: 1px solid rgba(148,163,184,.35);
  color: rgb(243 244 246);
  box-shadow: 0 0 0 1px rgba(148,163,184,.15) inset;
}
</style>
