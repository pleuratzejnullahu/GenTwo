import { vi } from 'vitest'

vi.mock('vue3-apexcharts', () => ({
    default: {
        name: 'apexchart',
        props: ['type', 'height', 'options', 'series'],
        template: '<div data-testid="apexchart"><slot /></div>',
    },
}))
