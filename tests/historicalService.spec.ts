import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { getHistoricalSeries } from '@/services/historicalService'

vi.mock('axios', () => ({
    default: { get: vi.fn() }
}))

describe('historicalService.getHistoricalSeries', () => {
    beforeEach(() => {
        vi.resetAllMocks()
        vi.setSystemTime(new Date('2025-09-13T00:00:00Z'))
    })

    it('fetches 7 daily points for weekly and converts using USD rates', async () => {
        ;(axios.get as any).mockImplementation(async (_url: string) => {
            return {
                data: {
                    rates: {
                        // USD rates from the API
                        EUR: 0.85,
                        CHF: 0.90
                    }
                }
            }
        })

        const result = await getHistoricalSeries({
            base: 'CHF',
            symbol: 'EUR',
            timeFrame: 'weekly'
        })

        expect(result).toHaveLength(7)

        const calls = (axios.get as any).mock.calls.map((c: any[]) => c[0])
        expect(calls[0]).toContain('/historical/2025-09-07.json')
        expect(calls[calls.length - 1]).toContain('/historical/2025-09-13.json')

        const expected = +(0.85 / 0.90).toFixed(4)
        for (const p of result) expect(p.value).toBe(expected)
        for (let i = 1; i < result.length; i++) {
            expect(+result[i].date >= +result[i - 1].date).toBe(true)
        }
    })

    it('returns direct USD rate when base is USD', async () => {
        ;(axios.get as any).mockResolvedValue({
            data: { rates: { EUR: 0.91 } }
        })

        const result = await getHistoricalSeries({
            base: 'USD',
            symbol: 'EUR',
            timeFrame: 'weekly'
        })

        expect(result[0].value).toBe(+0.91.toFixed(4))
    })

    it('fetches 30 points for monthly (smoke)', async () => {
        ;(axios.get as any).mockResolvedValue({
            data: { rates: { EUR: 0.9, CHF: 0.9 } } // 0.9/0.9=1.0000
        })

        const result = await getHistoricalSeries({
            base: 'CHF',
            symbol: 'EUR',
            timeFrame: 'monthly'
        })

        expect(result).toHaveLength(30)
        expect((axios.get as any).mock.calls.length).toBe(30)
        expect(result[0].value).toBe(1.0)
    })
})
