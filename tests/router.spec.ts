import { describe, it, expect } from 'vitest'
import router from '@/router'

describe('router', () => {
    it('has expected routes', () => {
        const names = router.getRoutes().map(r => String(r.name || ''))
        const lower = names.map(n => n.toLowerCase())

        expect(lower).toContain('home')
        expect(lower).toContain('not-found')
    })
})
