import axios from 'axios'

const APP_ID = 'f53561faf19f41e5a8a2b9c5ddfe7700'

function fmtDate(d) {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
}

function startOfMonth(d) {
    const x = new Date(d)
    x.setDate(1)
    x.setHours(0,0,0,0)
    return x
}

function dateRange(timeFrame) {
    const now = new Date()
    now.setHours(0,0,0,0)

    if (timeFrame === 'weekly') {
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(now)
            d.setDate(now.getDate() - (6 - i))
            return d
        })
    }

    if (timeFrame === 'monthly') {
        return Array.from({ length: 30 }, (_, i) => {
            const d = new Date(now)
            d.setDate(now.getDate() - (29 - i))
            return d
        })
    }

    return Array.from({ length: 12 }, (_, i) => {
        const d = startOfMonth(new Date(now))
        d.setMonth(d.getMonth() - (11 - i))
        return d
    })
}

export async function getHistoricalSeries({ base, symbol, timeFrame }) {
    const dates = dateRange(timeFrame)

    const chunk = (arr, n) => arr.reduce((a, c, i) => {
        (a[Math.floor(i/n)] ||= []).push(c); return a
    }, [])
    const chunks = chunk(dates, 3)

    const all = []
    for (const group of chunks) {
        const reqs = group.map(async d => {
            const url = `https://openexchangerates.org/api/historical/${fmtDate(d)}.json`
            const { data } = await axios.get(url, {
                params: { app_id: APP_ID, symbols: `${symbol},${base}` }
            })

            const usdRates = data.rates || {}
            const v = (base === 'USD')
                ? Number(usdRates[symbol])
                : Number(usdRates[symbol] / usdRates[base])

            return { date: d, value: Number.isFinite(v) ? Number(v.toFixed(4)) : null }
        })
        const results = await Promise.all(reqs)
        all.push(...results.filter(r => r.value != null))
    }

    all.sort((a, b) => a.date - b.date)
    return all
}
