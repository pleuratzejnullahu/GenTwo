import { test, expect } from '@playwright/test'

async function clickAnyTimeframe(page, patterns: RegExp[]) {
    for (const rx of patterns) {
        const btn = page.getByRole('button', { name: rx }).first()
        if (await btn.isVisible().catch(() => false)) {
            await btn.click()
            return
        }
    }
    throw new Error('No timeframe button found matching provided patterns.')
}

test.describe('Home (GenTwo)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('loads hero, AlphaCard, and Historical Data', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

        const alphaCard = page.getByTestId('alpha-card')
        await expect(alphaCard).toBeVisible()
        await expect(alphaCard.getByText(/AlphaCard/i)).toBeVisible()

        await expect(page.getByText(/Historical Data|History|Chart/i)).toBeVisible()
    })

    test('switch timeframe and toggle table', async ({ page }) => {
        await clickAnyTimeframe(page, [/weekly|1w/i, /monthly|1m|30d/i, /year|1y|12m/i])

        await page.getByRole('button', { name: /table/i }).click()
        await expect(page.getByRole('table')).toBeVisible()

        await page.getByRole('button', { name: /chart/i }).click()
        await expect(page.getByRole('table')).toHaveCount(0)
    })

    test('change base currency from AlphaCard', async ({ page }) => {
        const alphaCard = page.getByTestId('alpha-card')

        const baseButton = alphaCard.getByTestId('base-button')
        await baseButton.click()

        const menu = page.getByTestId('base-menu')
        await expect(menu).toBeVisible()
        
        await menu.getByText('EUR', { exact: true }).click()
        await expect(baseButton).toContainText('EUR')
    })
})
