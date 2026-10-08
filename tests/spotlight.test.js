import assert from 'node:assert/strict'
import test from 'node:test'
import { spotlight } from '../src/directives/spotlight.js'

const pointerMedia = '(hover: hover) and (pointer: fine)'
const motionMedia = '(prefers-reduced-motion: reduce)'
const pointerEvents = ['pointerenter', 'pointermove', 'pointerleave', 'pointercancel']

class TrackedEventTarget extends EventTarget {
  constructor() {
    super()
    this.listeners = new Map()
    this.addCalls = []
    this.removeCalls = []
  }

  addEventListener(type, listener, options) {
    super.addEventListener(type, listener, options)
    if (!this.listeners.has(type)) this.listeners.set(type, new Set())
    this.listeners.get(type).add(listener)
    this.addCalls.push({ type, listener, options })
  }

  removeEventListener(type, listener, options) {
    super.removeEventListener(type, listener, options)
    this.listeners.get(type)?.delete(listener)
    this.removeCalls.push({ type, listener, options })
  }

  listenerCount(type) {
    return this.listeners.get(type)?.size ?? 0
  }
}

class MockMediaQuery extends TrackedEventTarget {
  constructor(media, matches) {
    super()
    this.media = media
    this.matches = matches
  }

  setMatches(matches) {
    if (this.matches === matches) return
    this.matches = matches
    const event = Object.assign(new Event('change'), { matches, media: this.media })
    this.dispatchEvent(event)
  }
}

class MockCard extends TrackedEventTarget {
  constructor() {
    super()
    this.isConnected = true
    this.rect = { left: 100, top: 50, width: 200, height: 120 }
    this.rectReads = 0
    this.attributes = new Map()
    this.styleWrites = []
    const properties = new Map()
    this.style = {
      setProperty: (name, value) => {
        properties.set(name, value)
        this.styleWrites.push({ name, value })
      },
      getPropertyValue: (name) => properties.get(name) ?? '',
      removeProperty: (name) => {
        const value = properties.get(name) ?? ''
        properties.delete(name)
        return value
      },
    }
  }

  getBoundingClientRect() {
    this.rectReads += 1
    return this.rect
  }

  setAttribute(name, value) {
    this.attributes.set(name, value)
  }

  removeAttribute(name) {
    this.attributes.delete(name)
  }

  hasAttribute(name) {
    return this.attributes.has(name)
  }

  pointer(type, clientX = 140, clientY = 90, pointerType = 'mouse') {
    const event = Object.assign(new Event(type), { clientX, clientY, pointerType })
    this.dispatchEvent(event)
  }
}

function setup(t, { finePointer = true, reducedMotion = false } = {}) {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
  const pointerQuery = new MockMediaQuery(pointerMedia, finePointer)
  const motionQuery = new MockMediaQuery(motionMedia, reducedMotion)
  const queries = new Map([[pointerMedia, pointerQuery], [motionMedia, motionQuery]])
  const matchMediaCalls = []
  const frames = new Map()
  const cancelledFrames = []
  const cards = []
  let requestedFrames = 0

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    writable: true,
    value: {
      matchMedia: (query) => {
        matchMediaCalls.push(query)
        assert.ok(queries.has(query), `Unexpected media query: ${query}`)
        return queries.get(query)
      },
      requestAnimationFrame: (callback) => {
        requestedFrames += 1
        frames.set(requestedFrames, callback)
        return requestedFrames
      },
      cancelAnimationFrame: (id) => {
        cancelledFrames.push(id)
        frames.delete(id)
      },
    },
  })

  t.after(() => {
    try {
      for (const card of cards) spotlight.unmounted(card)
    } finally {
      if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow)
      else delete globalThis.window
    }
  })

  return {
    pointerQuery,
    motionQuery,
    matchMediaCalls,
    cancelledFrames,
    get pendingFrames() { return frames.size },
    get requestedFrames() { return requestedFrames },
    mountCard() {
      const card = new MockCard()
      cards.push(card)
      spotlight.mounted(card)
      return card
    },
    flushFrame() {
      const pending = [...frames]
      for (const [id, callback] of pending) {
        frames.delete(id)
        callback(16)
      }
    },
  }
}

function assertHandlers(card, count) {
  for (const type of pointerEvents) assert.equal(card.listenerCount(type), count, type)
}

test('pointer updates use the latest coordinates with one layout read per animation frame', (t) => {
  const env = setup(t)
  const card = env.mountCard()
  assertHandlers(card, 1)
  assert.ok(card.addCalls.every((call) => call.options.passive === true))

  card.pointer('pointerenter', 110, 60)
  card.pointer('pointermove', 150, 80)
  card.pointer('pointermove', 190, 105)
  assert.equal(env.requestedFrames, 1)
  assert.equal(env.pendingFrames, 1)
  assert.equal(card.rectReads, 0)
  assert.equal(card.styleWrites.length, 0)
  assert.equal(card.hasAttribute('data-spotlight-active'), false)

  env.flushFrame()
  assert.equal(card.rectReads, 1)
  assert.equal(card.style.getPropertyValue('--mx'), '90px')
  assert.equal(card.style.getPropertyValue('--my'), '55px')
  assert.equal(card.styleWrites.length, 2)
  assert.equal(card.hasAttribute('data-spotlight-active'), true)

  card.pointer('pointermove', 1000, -100)
  env.flushFrame()
  assert.equal(card.rectReads, 2)
  assert.equal(card.style.getPropertyValue('--mx'), '200px')
  assert.equal(card.style.getPropertyValue('--my'), '0px')
})

for (const eventType of ['pointerleave', 'pointercancel']) {
  test(`${eventType} clears the active state and cancels a pending position update`, (t) => {
    const env = setup(t)
    const card = env.mountCard()
    card.pointer('pointerenter')
    env.flushFrame()
    card.pointer('pointermove', 170, 100)
    assert.equal(env.pendingFrames, 1)

    card.pointer(eventType)
    assert.equal(card.hasAttribute('data-spotlight-active'), false)
    assert.equal(env.pendingFrames, 0)
    assert.deepEqual(env.cancelledFrames, [2])
    env.flushFrame()
    assert.equal(card.rectReads, 1)
    assert.equal(card.styleWrites.length, 2)

    card.pointer('pointerenter', 160, 110)
    env.flushFrame()
    assert.equal(card.hasAttribute('data-spotlight-active'), true)
    assert.equal(card.style.getPropertyValue('--mx'), '60px')
    assert.equal(card.style.getPropertyValue('--my'), '60px')
  })
}

test('touch pointers neither start an animation nor overwrite a pending mouse position', (t) => {
  const env = setup(t)
  const card = env.mountCard()
  card.pointer('pointerenter', 130, 70, 'touch')
  card.pointer('pointermove', 180, 120, 'touch')
  assert.equal(env.requestedFrames, 0)
  assert.equal(card.hasAttribute('data-spotlight-active'), false)

  card.pointer('pointermove', 140, 90)
  card.pointer('pointermove', 999, 999, 'touch')
  env.flushFrame()
  assert.equal(card.rectReads, 1)
  assert.equal(card.style.getPropertyValue('--mx'), '40px')
  assert.equal(card.style.getPropertyValue('--my'), '40px')
})

for (const [name, preferences] of [
  ['a coarse pointer', { finePointer: false }],
  ['reduced motion', { reducedMotion: true }],
]) {
  test(`${name} on initial mount leaves cards without pointer handlers or spotlight attributes`, (t) => {
    const env = setup(t, preferences)
    const card = env.mountCard()
    assertHandlers(card, 0)
    assert.equal(card.hasAttribute('data-spotlight'), false)
    card.pointer('pointerenter')
    card.pointer('pointermove')
    env.flushFrame()
    assert.equal(env.requestedFrames, 0)
    assert.equal(card.rectReads, 0)
    assert.equal(card.styleWrites.length, 0)
    assert.equal(env.pointerQuery.listenerCount('change'), 1)
    assert.equal(env.motionQuery.listenerCount('change'), 1)
  })
}

test('media changes remove active effects and enable handlers only when both preferences allow them', (t) => {
  const env = setup(t)
  const card = env.mountCard()
  card.pointer('pointerenter')
  env.flushFrame()
  card.pointer('pointermove', 180, 100)
  env.motionQuery.setMatches(true)

  assertHandlers(card, 0)
  assert.equal(env.pendingFrames, 0)
  assert.deepEqual(env.cancelledFrames, [2])
  assert.equal(card.hasAttribute('data-spotlight'), false)
  assert.equal(card.hasAttribute('data-spotlight-active'), false)
  assert.equal(card.style.getPropertyValue('--mx'), '')
  assert.equal(card.style.getPropertyValue('--my'), '')
  card.pointer('pointermove')
  assert.equal(env.requestedFrames, 2)

  env.pointerQuery.setMatches(false)
  env.motionQuery.setMatches(false)
  assertHandlers(card, 0)
  env.pointerQuery.setMatches(true)
  assertHandlers(card, 1)
  assert.equal(card.hasAttribute('data-spotlight'), true)
  card.pointer('pointerenter', 160, 100)
  env.flushFrame()
  assert.equal(card.hasAttribute('data-spotlight-active'), true)

  env.pointerQuery.setMatches(false)
  assertHandlers(card, 0)
  assert.equal(card.style.getPropertyValue('--mx'), '')
  env.motionQuery.setMatches(true)
  env.pointerQuery.setMatches(true)
  assertHandlers(card, 0)
  env.motionQuery.setMatches(false)
  assertHandlers(card, 1)
})

test('cards share media watchers and unmounting cleans only their own frames until the final card is removed', (t) => {
  const env = setup(t)
  const first = env.mountCard()
  const second = env.mountCard()
  assert.deepEqual(env.matchMediaCalls, [pointerMedia, motionMedia])
  assert.equal(env.pointerQuery.addCalls.length, 1)
  assert.equal(env.motionQuery.addCalls.length, 1)
  first.pointer('pointerenter')
  second.pointer('pointerenter', 170, 100)
  env.flushFrame()
  env.motionQuery.setMatches(true)
  for (const card of [first, second]) {
    assertHandlers(card, 0)
    assert.equal(card.hasAttribute('data-spotlight'), false)
    assert.equal(card.hasAttribute('data-spotlight-active'), false)
    assert.equal(card.style.getPropertyValue('--mx'), '')
    assert.equal(card.style.getPropertyValue('--my'), '')
  }
  env.motionQuery.setMatches(false)
  for (const card of [first, second]) {
    assertHandlers(card, 1)
    assert.equal(card.hasAttribute('data-spotlight'), true)
    card.pointer('pointerenter')
  }
  env.flushFrame()
  first.pointer('pointermove')
  second.pointer('pointermove', 180, 110)

  spotlight.unmounted(first)
  assertHandlers(first, 0)
  assert.equal(first.hasAttribute('data-spotlight'), false)
  assert.equal(first.hasAttribute('data-spotlight-active'), false)
  assert.equal(first.style.getPropertyValue('--mx'), '')
  assert.equal(first.style.getPropertyValue('--my'), '')
  assert.equal(env.pendingFrames, 1)
  assert.equal(env.pointerQuery.listenerCount('change'), 1)
  assert.equal(env.motionQuery.listenerCount('change'), 1)
  env.flushFrame()
  assert.equal(second.style.getPropertyValue('--mx'), '80px')
  assert.equal(second.style.getPropertyValue('--my'), '60px')
  assert.equal(second.hasAttribute('data-spotlight-active'), true)

  spotlight.unmounted(second)
  assertHandlers(second, 0)
  assert.equal(second.hasAttribute('data-spotlight'), false)
  assert.equal(second.hasAttribute('data-spotlight-active'), false)
  assert.equal(second.style.getPropertyValue('--mx'), '')
  assert.equal(second.style.getPropertyValue('--my'), '')
  assert.equal(env.pointerQuery.listenerCount('change'), 0)
  assert.equal(env.motionQuery.listenerCount('change'), 0)
  assert.equal(env.pointerQuery.removeCalls.length, 1)
  assert.equal(env.motionQuery.removeCalls.length, 1)
  env.motionQuery.setMatches(true)
  env.motionQuery.setMatches(false)
  assertHandlers(first, 0)
  assertHandlers(second, 0)

  const next = env.mountCard()
  assert.deepEqual(env.matchMediaCalls, [pointerMedia, motionMedia, pointerMedia, motionMedia])
  assertHandlers(next, 1)
  assert.equal(env.pointerQuery.listenerCount('change'), 1)
  assert.equal(env.motionQuery.listenerCount('change'), 1)
})
