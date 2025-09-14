import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './e2e',
    timeout: 30_000,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    projects: [
        { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'Firefox',  use: { ...devices['Desktop Firefox'] } },
        { name: 'WebKit',   use: { ...devices['Desktop Safari'] } }
    ],
    webServer: {
        command: 'npm run dev',
        port: 5173,
        reuseExistingServer: !process.env.CI
    }
})
