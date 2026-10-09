import assert from 'node:assert/strict'
import test from 'node:test'
import { useProjectLightbox } from '../src/composables/useProjectLightbox.js'

test('lightbox composable initializes with null active project', () => {
  const { activeProject, closeLightbox } = useProjectLightbox()
  closeLightbox()
  assert.equal(activeProject.value, null)
})

test('openLightbox sets active project and closeLightbox resets it', () => {
  const { activeProject, openLightbox, closeLightbox } = useProjectLightbox()
  const mockProject = { id: 'sample-project', name: 'Sample UI', techStack: ['Vue'] }

  openLightbox(mockProject)
  assert.deepEqual(activeProject.value, mockProject)

  closeLightbox()
  assert.equal(activeProject.value, null)
})

test('switching active project in lightbox updates active state cleanly', () => {
  const { activeProject, openLightbox, closeLightbox } = useProjectLightbox()
  const project1 = { id: 'p1', name: 'Project 1' }
  const project2 = { id: 'p2', name: 'Project 2' }

  openLightbox(project1)
  assert.equal(activeProject.value.id, 'p1')

  openLightbox(project2)
  assert.equal(activeProject.value.id, 'p2')

  closeLightbox()
  assert.equal(activeProject.value, null)
})

test('scrollLock locks and unlocks documentElement and body with simulated DOM', async () => {
  const { lockScroll, unlockScroll, forceUnlockScroll } = await import('../src/utils/scrollLock.js')

  const createMockElement = () => ({
    classes: new Set(),
    style: {
      removeProperty(prop) { delete this[prop] },
    },
    classList: {
      add(cls) { this._el.classes.add(cls) },
      remove(cls) { this._el.classes.delete(cls) },
      contains(cls) { return this._el.classes.has(cls) },
    },
  })

  const mockDoc = {
    documentElement: createMockElement(),
    body: createMockElement(),
  }
  mockDoc.documentElement.classList._el = mockDoc.documentElement
  mockDoc.body.classList._el = mockDoc.body

  globalThis.document = mockDoc

  try {
    forceUnlockScroll()
    assert.equal(mockDoc.documentElement.classList.contains('modal-open'), false)

    // First lock
    lockScroll()
    assert.equal(mockDoc.documentElement.classList.contains('modal-open'), true)
    assert.equal(mockDoc.body.classList.contains('modal-open'), true)
    assert.equal(mockDoc.documentElement.style.overflow, 'hidden')
    assert.equal(mockDoc.body.style.overflow, 'hidden')

    // Second nested lock
    lockScroll()
    assert.equal(mockDoc.documentElement.classList.contains('modal-open'), true)

    // Unlock one level (still locked)
    unlockScroll()
    assert.equal(mockDoc.documentElement.classList.contains('modal-open'), true)

    // Unlock last level (fully unlocked)
    unlockScroll()
    assert.equal(mockDoc.documentElement.classList.contains('modal-open'), false)
    assert.equal(mockDoc.body.classList.contains('modal-open'), false)
    assert.equal(mockDoc.documentElement.style.overflow, '')
    assert.equal(mockDoc.body.style.overflow, '')
  } finally {
    delete globalThis.document
  }
})
