<template>
  <div class="pt-16 lg:max-w-[75%] mx-auto">
    <Container>
      <div class="grid lg:grid-cols-[1fr_auto] gap-10 items-start">
        <FinancialPlan @scroll-how-it-works="$emit('scroll-how-it-works')" />

        <AlphaCard
            :base="base"
            :rates="rates"
            :balance="balance"
            :last-updated="lastUpdated"
            :loading="loadingLatest"
            :error="errorLatest"
            @base-change="$emit('base-change', $event)"
            @refresh-latest="$emit('refresh-latest')"
        />
      </div>
    </Container>
  </div>
</template>

<script>
import Container from '../ui/Container.vue'
import AlphaCard from './AlphaCard.vue'
import FinancialPlan from './FinancialPlan.vue'

export default {
  name: 'HeroSection',
  components: { Container, AlphaCard, FinancialPlan },
  props: {
    base: { type: String, required: true },
    rates: { type: Object, default: () => ({}) },
    balance: { type: [Number, String], default: 0 },
    lastUpdated: { type: [Date, Number, String], default: null },
    loadingLatest: { type: Boolean, default: false },
    errorLatest: { type: String, default: null }
  },
  emits: ['base-change', 'refresh-latest', 'scroll-how-it-works']
}
</script>
