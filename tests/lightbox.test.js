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
