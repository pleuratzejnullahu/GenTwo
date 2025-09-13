import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HistoricalDataApex from '@/components/sections/HistoricalDataApex.vue'

const baseProps = {
    base: 'CHF',
    symbol: 'EUR',
    timeFrame: 'weekly',
    series: [
        { date: '2025-01-01', value: 1.1 },
        { date: '2025-01-02', value: 1.2 }
    ],
    loading: false,
    error: null
}

describe('HistoricalDataApex', () => {
    it('renders chart by default', () => {
        const wrapper = mount(HistoricalDataApex, { props: baseProps })
        expect(wrapper.find('[data-testid="apexchart"]').exists()).toBe(true)
    })

    it('renders table view', async () => {
        const wrapper = mount(HistoricalDataApex, { props: baseProps })
        await wrapper.setData({ view: 'table' })
        expect(wrapper.find('table').exists()).toBe(true)
        expect(wrapper.findAll('tbody tr')).toHaveLength(baseProps.series.length)
    })

    it('shows loading state', () => {
        const wrapper = mount(HistoricalDataApex, {
            props: { ...baseProps, loading: true }
        })
        expect(wrapper.text()).toContain('Loading')
    })

    it('shows error state', () => {
        const wrapper = mount(HistoricalDataApex, {
            props: { ...baseProps, error: 'Something went wrong' }
        })
        expect(wrapper.text()).toContain('Something went wrong')
    })

    it('emits timeframe-change when button clicked', async () => {
        const wrapper = mount(HistoricalDataApex, { props: baseProps })
        const btn = wrapper.find('button')
        await btn.trigger('click')
        expect(wrapper.emitted('timeframe-change')).toBeTruthy()
    })

    it('formats xLabel and tooltipDate correctly', async () => {
        const wrapper = mount(HistoricalDataApex, { props: baseProps })
        const vm = wrapper.vm as any

        expect(vm.xLabel('2025-01-01')).toMatch(/\d+ Jan/)
        expect(vm.tooltipDate('2025-01-01')).toBe('01.01.2025')

        await wrapper.setProps({ timeFrame: 'yearly' })
        expect(vm.xLabel('2025-01-01')).toBe('Jan 2025')
        expect(vm.tooltipDate('2025-01-01')).toBe('Jan 2025')
    })

    it('yBounds returns undefined min/max when series is empty', () => {
        const wrapper = mount(HistoricalDataApex, {
            props: {
                base: 'CHF',
                symbol: 'EUR',
                timeFrame: 'weekly',
                series: [],
                loading: false,
                error: null
            },
            global: {
                stubs: { apexchart: { template: '<div data-testid="apexchart"/>' }, Container: true }
            }
        })
        expect(wrapper.vm.yBounds).toEqual({ min: undefined, max: undefined })
    })
})
