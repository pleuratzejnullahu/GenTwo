function jitter(n) {
    return Number((n * (1 + (Math.random() - 0.5) * 0.01)).toFixed(3))
}

export async function refreshRates() {
    await new Promise(r => setTimeout(r, 500))
    return {
        base: 'CHF',
        rates: { EUR: jitter(0.87), USD: jitter(1.277), JPY: jitter(0.95) },
        balance: 150000,
        lastUpdated: new Date()
    }
}
