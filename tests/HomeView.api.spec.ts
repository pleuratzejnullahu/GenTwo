import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import HomeView from '@/views/HomeView.vue'
import ratesService from '@/services/ratesService'
import { getHistoricalSeries } from '@/services/historicalService'

vi.mock('@/services/ratesService')
vi.mock('@/services/historicalService')

describe('HomeView', () => {
    beforeEach(() => {
        vi.resetAllMocks()
        ;(ratesService.getRates as any).mockResolvedValue({
            rates: { EUR: 1.2 },
            balance: 1000,
            lastUpdated: 'now'
        })
        ;(getHistoricalSeries as any).mockResolvedValue([
            { date: '2025-01-01', value: 1.1 }
        ])
    })

    it('fetches both latest and historical data on mount', async () => {
        mount(HomeView)
        expect(ratesService.getRates).toHaveBeenCalled()
        expect(getHistoricalSeries).toHaveBeenCalled()
    })

    it('handles API errors gracefully', async () => {
        ;(ratesService.getRates as any).mockRejectedValue(new Error('fail'))
        ;(getHistoricalSeries as any).mockRejectedValue(new Error('fail'))
        const wrapper = mount(HomeView)
        await new Promise(r => setTimeout(r))
        expect(wrapper.vm.errorLatest || wrapper.vm.errorHistorical).toBeTruthy()
    })

    it('changes base and reloads', async () => {
        const wrapper = mount(HomeView)
        await (wrapper.vm as any).onBaseChange('USD')
        expect(ratesService.getRates).toHaveBeenCalledWith(expect.objectContaining({ base: 'USD' }))
    })

    it('changes timeframe and reloads historical', async () => {
        const wrapper = mount(HomeView)
        await (wrapper.vm as any).onTimeFrameChange('monthly')
        expect(getHistoricalSeries).toHaveBeenCalledWith(expect.objectContaining({ timeFrame: 'monthly' }))
    })

    it('scrollToHowItWorks calls scrollIntoView', () => {
        const mockEl = { scrollIntoView: vi.fn() }
        vi.spyOn(document, 'getElementById').mockReturnValue(mockEl as any)
        const wrapper = mount(HomeView)
        ;(wrapper.vm as any).scrollToHowItWorks()
        expect(mockEl.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })
})
