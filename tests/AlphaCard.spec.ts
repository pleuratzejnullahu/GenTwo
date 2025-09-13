import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import AlphaCard from '@/components/sections/AlphaCard.vue'

const baseRates = {
    EUR: 1.07,
    USD: 1.26,
    JPY: 185.41,
    GBP: 0.93,
    AUD: 1.89,
    CAD: 1.23,
    SEK: 9.31,
    NOK: 9.85,
    CNY: 7.12,
    TRY: 41.3,
    INR: 88.27,
    AED: 3.67,
}

function mountCard(extraProps = {}) {
    return mount(AlphaCard, {
        props: {
            base: 'CHF',
            rates: baseRates,
            balance: 150000,
            lastUpdated: new Date('2025-09-13T00:00:00Z'),
            loading: false,
            error: null,
            ...extraProps
        }
    })
}

describe('AlphaCard', () => {
    it('renders balance & base', () => {
        const w = mountCard()
        expect(w.text()).toContain('150,000')
        expect(w.text()).toContain('CHF')
    })

    it('emits refresh-latest when Refresh Rates clicked', async () => {
        const w = mountCard()
        const btn = w.findAll('button').find(b => b.text().includes('Refresh Rates'))
        expect(btn).toBeTruthy()
        await btn!.trigger('click')
        expect(w.emitted('refresh-latest')).toBeTruthy()
    })

    it('emits base-change when selecting a different base', async () => {
        const w = mountCard()
        const toggler = w.find('button')
        await toggler.trigger('click')

        const item = w.findAll('li').find(li => li.text().includes('USD'))
        expect(item).toBeTruthy()
        await item!.trigger('click')

        const evt = w.emitted('base-change') || []
        expect(evt.length).toBeGreaterThan(0)
        expect(evt[0]).toEqual(['USD'])
    })

    it('paginates currency list (next/prev)', async () => {
        const w = mountCard({ pageSize: 5 })
        const next = w.findAll('.pagination .arrow')[1]
        await next.trigger('click')
        const active = w.find('.pagination .num.active')
        expect(active.exists()).toBe(true)
        expect(active.text()).toBe('2')

        const prev = w.findAll('.pagination .arrow')[0]
        await prev.trigger('click')
        const activeAgain = w.find('.pagination .num.active')
        expect(activeAgain.text()).toBe('1')
    })
})

