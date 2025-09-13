import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import ratesService from '@/services/ratesService'

vi.mock('axios', () => ({
    default: { get: vi.fn() }
}))

describe('ratesService.getRates', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('calls latest API with correct params and converts rates relative to base', async () => {
        ;(axios.get as any).mockResolvedValueOnce({
            data: {
                base: 'USD',
                timestamp: 1757779184,
                rates: {
                    USD: 1,
                    EUR: 0.85224,
                    CHF: 0.79671,
                    JPY: 147.71506962
                }
            }
        })

        const res = await ratesService.getRates({
            base: 'CHF',
            symbols: ['EUR', 'USD', 'JPY']
        })

        expect(axios.get).toHaveBeenCalledWith(
            'https://openexchangerates.org/api/latest.json',
            expect.objectContaining({
                params: expect.objectContaining({
                    app_id: expect.any(String),
                    symbols: expect.stringContaining('EUR,USD,JPY,CHF')
                })
            })
        )

        const expectedEUR = +(0.85224 / 0.79671).toFixed(3)
        const expectedUSD = +(1 / 0.79671).toFixed(3)
        const expectedJPY = +(147.71506962 / 0.79671).toFixed(3)

        expect(res.base).toBe('CHF')
        expect(res.rates.EUR).toBe(expectedEUR)
        expect(res.rates.USD).toBe(expectedUSD)
        expect(res.rates.JPY).toBe(expectedJPY)

        expect(res.lastUpdated instanceof Date).toBe(true)
        expect(+res.lastUpdated).toBe(1757779184 * 1000)
        expect(typeof res.balance).toBe('number')
    })

    it('works when base is USD (no division by base)', async () => {
        ;(axios.get as any).mockResolvedValueOnce({
            data: {
                base: 'USD',
                timestamp: 1111111111,
                rates: { USD: 1, EUR: 0.9 }
            }
        })

        const res = await ratesService.getRates({
            base: 'USD',
            symbols: ['EUR']
        })

        expect(res.base).toBe('USD')
        expect(res.rates.EUR).toBe(+0.9.toFixed(3))
    })
})
