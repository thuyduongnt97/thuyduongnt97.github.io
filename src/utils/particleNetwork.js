/**
 * Particle Network Engine — Canvas-based interactive network visualization.
 * Nodes drift, connect when nearby, and react to the cursor.
 * Palette: amber / cyan / emerald to match the portfolio identity.
 * Theme-aware: darker colors on light bg, brighter on dark bg.
 * No external deps — pure Canvas 2D + requestAnimationFrame.
 */

/** @typedef {{ x: number, y: number, vx: number, vy: number, radius: number, color: string, alpha: number, baseAlpha: number }} Node */

export const NODE_COUNT = { desktop: 80, mobile: 35 }

const COLORS_DARK = ['#fbbf24', '#22d3ee', '#10b981', '#94a3b8', '#cbd5e1']
const COLORS_LIGHT = ['#d97706', '#0891b2', '#059669', '#475569', '#64748b']

const CONNECTION_DISTANCE = 160
const MOUSE_RADIUS = 200
const MOUSE_REPULSE = 0.6
const BASE_SPEED = 0.35

// Connection line colors per theme
const LINE_COLOR_DARK = '#94a3b8'
const LINE_COLOR_LIGHT = '#64748b'
const CONNECTION_ALPHA_MAX_DARK = 0.25
const CONNECTION_ALPHA_MAX_LIGHT = 0.18

/**
 * Create N nodes with random positions, velocities, sizes and colors.
 * @param {number} count
 * @param {number} width
 * @param {number} height
 * @param {boolean} isDark
 * @returns {Node[]}
 */
export function createNodes(count, width, height, isDark = true) {
  const colors = isDark ? COLORS_DARK : COLORS_LIGHT
  return Array.from({ length: count }, () => {
    const tier = Math.random()
    const r = tier < 0.6 ? Math.random() * 1 + 1 : tier < 0.9 ? Math.random() * 1.2 + 2 : Math.random() * 1.5 + 3
    const baseAlpha = isDark
      ? (tier < 0.6 ? 0.25 + Math.random() * 0.15 : tier < 0.9 ? 0.4 + Math.random() * 0.2 : 0.55 + Math.random() * 0.25)
      : (tier < 0.6 ? 0.15 + Math.random() * 0.1 : tier < 0.9 ? 0.25 + Math.random() * 0.15 : 0.35 + Math.random() * 0.2)
    const angle = Math.random() * Math.PI * 2
    const speed = BASE_SPEED * (0.5 + Math.random() * 0.8)
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: r,
      color: colors[Math.floor(Math.random() * colors.length)] ?? colors[0],
      alpha: baseAlpha,
      baseAlpha,
    }
  })
}

/**
 * Advance the simulation by one frame: drift + wrap + mouse interaction.
 * @param {Node[]} nodes
 * @param {number} width
 * @param {number} height
 * @param {{ x: number, y: number, active: boolean }} mouse
 */
export function stepNodes(nodes, width, height, mouse) {
  for (const node of nodes) {
    node.x += node.vx
    node.y += node.vy

    // Wrap around edges
    if (node.x < -20) { node.x = width + 20 }
    else if (node.x > width + 20) { node.x = -20 }
    if (node.y < -20) { node.y = height + 20 }
    else if (node.y > height + 20) { node.y = -20 }

    // Mouse repulsion
    if (mouse.active) {
      const dx = node.x - mouse.x
      const dy = node.y - mouse.y
      const dist = Math.hypot(dx, dy)
      if (dist < MOUSE_RADIUS && dist > 1) {
        const force = (1 - dist / MOUSE_RADIUS) * MOUSE_REPULSE
        node.x += (dx / dist) * force
        node.y += (dy / dist) * force
        node.alpha = Math.min(1.0, node.baseAlpha + (1 - dist / MOUSE_RADIUS) * 0.5)
      } else {
        node.alpha += (node.baseAlpha - node.alpha) * 0.05
      }
    } else {
      node.alpha += (node.baseAlpha - node.alpha) * 0.05
    }
  }
}

/**
 * @param {string} hex
 * @param {number} alpha
 * @returns {string}
 */
function hexToRgba(hex, alpha) {
  if (hex.startsWith('#') && hex.length === 7) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${alpha})`
  }
  return hex
}

/**
 * Draw all nodes and their connections.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Node[]} nodes
 * @param {{ x: number, y: number, active: boolean }} mouse
 * @param {boolean} isDark
 */
export function drawNetwork(ctx, nodes, mouse, isDark = true) {
  const len = nodes.length
  const lineColor = isDark ? LINE_COLOR_DARK : LINE_COLOR_LIGHT
  const connAlphaMax = isDark ? CONNECTION_ALPHA_MAX_DARK : CONNECTION_ALPHA_MAX_LIGHT

  // Draw connections first (behind nodes)
  for (let i = 0; i < len; i++) {
    const a = nodes[i]
    for (let j = i + 1; j < len; j++) {
      const b = nodes[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dist = Math.hypot(dx, dy)
      if (dist < CONNECTION_DISTANCE) {
        const lineAlpha = (1 - dist / CONNECTION_DISTANCE) * connAlphaMax

        let boost = 0
        if (mouse.active) {
          const midX = (a.x + b.x) / 2
          const midY = (a.y + b.y) / 2
          const mouseDist = Math.hypot(midX - mouse.x, midY - mouse.y)
          if (mouseDist < MOUSE_RADIUS) {
            boost = (1 - mouseDist / MOUSE_RADIUS) * 0.3
          }
        }

        ctx.strokeStyle = hexToRgba(lineColor, lineAlpha + boost)
        ctx.lineWidth = 0.5 + (1 - dist / CONNECTION_DISTANCE) * 0.8
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }

  // Draw nodes
  for (const node of nodes) {
    // Outer glow for larger nodes
    if (node.radius > 2.5) {
      const outerR = node.radius * 3
      const grad = ctx.createRadialGradient(
        node.x, node.y, node.radius * 0.3,
        node.x, node.y, outerR,
      )
      grad.addColorStop(0, hexToRgba(node.color, node.alpha * 0.4))
      grad.addColorStop(0.5, hexToRgba(node.color, node.alpha * 0.12))
      grad.addColorStop(1, hexToRgba(node.color, 0))
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(node.x, node.y, outerR, 0, Math.PI * 2)
      ctx.fill()
    }

    // Core dot
    ctx.globalAlpha = node.alpha
    ctx.fillStyle = node.color
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.globalAlpha = 1
}
