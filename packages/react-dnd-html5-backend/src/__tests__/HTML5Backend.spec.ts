declare var global: any

import HTML5Backend from '../HTML5Backend'
import { DragDropManager } from '@finlife/dnd-core'
import { HTML5BackendContext } from '../interfaces'

describe('The HTML5 Backend', () => {
	describe('window injection', () => {
		it('uses an undefined window when no window is available', () => {
			const mockManager: DragDropManager<HTML5BackendContext> = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
				getContext: () => ({}),
			} as any
			const mockWindow = global.window
			try {
				delete global.window
				const backend = new HTML5Backend(mockManager)
				expect(backend).toBeDefined()
				expect(backend.window).toBeUndefined()
			} finally {
				global.window = mockWindow
			}
		})

		it('uses the ambient window global', () => {
			const mockManager: DragDropManager<HTML5BackendContext> = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
				getContext: () => ({}),
			} as any
			const backend = new HTML5Backend(mockManager)
			expect(backend).toBeDefined()
			expect(backend.window).toBeDefined()
		})

		it('allows a window to be injected', () => {
			const fakeWindow = {
				x: 1,
			}
			const mockManager: DragDropManager<HTML5BackendContext> = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
				getContext: () => ({
					window: fakeWindow,
				}),
			} as any
			const backend = new HTML5Backend(mockManager)
			expect(backend).toBeDefined()
			expect(backend.window).toBe(fakeWindow)
		})
	})
})
