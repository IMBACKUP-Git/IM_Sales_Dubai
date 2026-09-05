'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import styles from './Imageanime.module.css'
import one from './1.webp'
import two from './2.webp'
import three from './3.webp'
import four from './4.webp'
import five from './1.webp'
import six from './2.webp'
import seven from './1.webp'
import eight from './2.webp'
import nine from './1.webp'
import ten from './2.webp'

const IMAGES = [one, two, three, four, five, six, seven, eight, nine, ten]

// Shared flight path (position/rotation only) for every tier — desktop and
// mobile both fly cards along the same curve, they just differ on how many
// tiers stay visible.
const SLOT_POSITIONS = [
  { x: 0.0, z: 0.0, rot: 0 },
  { x: 1.09, z: -1.7, rot: 60 },
  { x: 1.89, z: -2.81, rot: -70 },
  { x: 2.55, z: -3.6, rot: -68 },
  { x: 3.1, z: -4.35, rot: -73 },
  { x: 3.55, z: -5.05, rot: -74 },
  { x: 3.95, z: -5.7, rot: -74 },
]

// Mobile-only: fixed at 3 visible cards (center + one each side).
const SLOTS_MOBILE = SLOT_POSITIONS.map((p, i) => ({ ...p, o: i <= 1 ? 1 : 0 }))

// Desktop: how many tiers stay visible scales with the actual available
// width, not a fixed number — a narrow desktop window shows fewer cards,
// a wide/ultra-wide one shows more, up to the full flight path.
const buildDesktopSlots = (stageWidth, cardWidth) => {
  const maxTier = SLOT_POSITIONS.length - 1
  if (!stageWidth || !cardWidth) {
    return SLOT_POSITIONS.map((p, i) => ({ ...p, o: i <= 1 ? 1 : 0 }))
  }
  const halfSpan = stageWidth / 2 - cardWidth / 2
  const fit = Math.floor(halfSpan / (cardWidth * 0.35))
  const visible = Math.min(maxTier, Math.max(1, fit))
  return SLOT_POSITIONS.map((p, i) => {
    let o
    if (i <= visible) o = 1
    else if (i === visible + 1) o = 0.3
    else o = 0
    return { ...p, o }
  })
}

const MOBILE_QUERY = '(max-width: 640px)'
const DRAG_RATIO = 0.85
const FLING_MS = 140
const SETTLE_DURATION = 0.7
const SETTLE_EASE = 'power3.out'
const AUTO_SPEED = 0.09 // progress units per second

const lerp = (a, b, t) => a + (b - a) * t

const slotAt = (distance, slots) => {
  const max = slots.length - 1
  const clamped = Math.min(Math.abs(distance), max)
  const index = Math.floor(clamped)
  const frac = clamped - index
  const from = slots[index]
  const to = slots[Math.min(index + 1, max)]
  return {
    x: lerp(from.x, to.x, frac),
    z: lerp(from.z, to.z, frac),
    rot: lerp(from.rot, to.rot, frac),
    o: lerp(from.o, to.o, frac),
  }
}

const wrap = (value, total) => {
  const half = total / 2
  let v = ((value % total) + total) % total
  if (v > half) v -= total
  return v
}

const Imageanime = () => {
  const stageRef = useRef(null)
  const cardRefs = useRef([])
  const slotsRef = useRef(SLOT_POSITIONS.map((p, i) => ({ ...p, o: i <= 1 ? 1 : 0 })))
  const isMobileRef = useRef(false)
  const state = useRef({
    progress: 0,
    target: 0,
    dragging: false,
    pointerId: null,
    startX: 0,
    startProgress: 0,
    lastX: 0,
    lastTime: 0,
    pointerVelocity: 0,
    cardWidth: 0,
    paintScheduled: false,
  })

  const paint = useCallback(() => {
    const total = IMAGES.length
    const width = state.current.cardWidth || 1
    for (let i = 0; i < total; i += 1) {
      const el = cardRefs.current[i]
      if (!el) continue
      const distance = wrap(i - state.current.progress, total)
      const sign = distance < 0 ? -1 : 1
      const slot = slotAt(distance, slotsRef.current)
      el.style.transform = `translate3d(${sign * slot.x * width}px, 0px, ${
        slot.z * width
      }px) rotateY(${sign * slot.rot}deg)`
      el.style.opacity = String(slot.o)
      el.style.zIndex = String(1000 - Math.round(Math.abs(distance) * 100))
      el.style.visibility = slot.o <= 0.01 ? 'hidden' : 'visible'
    }
  }, [])

  // Coalesces paint() to once per animation frame, however often pointermove fires.
  const requestPaint = useCallback(() => {
    const s = state.current
    if (s.paintScheduled) return
    s.paintScheduled = true
    requestAnimationFrame(() => {
      s.paintScheduled = false
      paint()
    })
  }, [paint])

  const measure = useCallback(() => {
    const el = cardRefs.current[0]
    if (el) state.current.cardWidth = el.offsetWidth
    slotsRef.current = isMobileRef.current
      ? SLOTS_MOBILE
      : buildDesktopSlots(stageRef.current?.offsetWidth || 0, state.current.cardWidth)
    paint()
  }, [paint])

  useEffect(() => {
    measure()
    const observer = new ResizeObserver(measure)
    if (stageRef.current) observer.observe(stageRef.current)
    return () => {
      observer.disconnect()
      gsap.killTweensOf(state.current)
    }
  }, [measure])

  // Mobile is fixed at 3 visible cards; desktop's visible-tier count scales
  // with actual available width (recomputed in measure()) instead of a
  // fixed number.
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const applyBreakpoint = () => {
      isMobileRef.current = mql.matches
      measure()
    }
    applyBreakpoint()
    mql.addEventListener('change', applyBreakpoint)
    return () => mql.removeEventListener('change', applyBreakpoint)
  }, [measure])

  // Auto-drag: mobile only. Continuously advances progress when idle (not
  // being dragged, and not mid-settle from a manual release), pausing
  // cleanly for either. Desktop stays static at whatever position it's in
  // until the user manually drags it.
  useEffect(() => {
    const tick = (_time, deltaTime) => {
      const s = state.current
      if (!isMobileRef.current) return
      if (s.dragging || gsap.isTweening(s)) return
      s.progress += AUTO_SPEED * (deltaTime / 1000)
      paint()
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [paint])

  const onPointerDown = useCallback(
    (event) => {
      const s = state.current
      gsap.killTweensOf(s)
      s.dragging = true
      s.pointerId = event.pointerId
      s.startX = event.clientX
      s.lastX = event.clientX
      s.lastTime = event.timeStamp
      s.startProgress = s.progress
      s.pointerVelocity = 0
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    []
  )

  const onPointerMove = useCallback(
    (event) => {
      const s = state.current
      if (!s.dragging || event.pointerId !== s.pointerId) return
      const perCard = Math.max(1, s.cardWidth * DRAG_RATIO)
      s.progress = s.startProgress - (event.clientX - s.startX) / perCard
      const dt = event.timeStamp - s.lastTime
      if (dt > 0) {
        const instant = (event.clientX - s.lastX) / dt
        s.pointerVelocity = s.pointerVelocity * 0.6 + instant * 0.4
        s.lastX = event.clientX
        s.lastTime = event.timeStamp
      }
      requestPaint()
    },
    [requestPaint]
  )

  const onPointerUp = useCallback(
    (event) => {
      const s = state.current
      if (!s.dragging) return
      s.dragging = false
      s.pointerId = null
      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }
      const perCard = Math.max(1, s.cardWidth * DRAG_RATIO)
      const projected = s.progress - (s.pointerVelocity / perCard) * FLING_MS
      s.target = Math.round(projected)
      gsap.to(s, {
        progress: s.target,
        duration: SETTLE_DURATION,
        ease: SETTLE_EASE,
        onUpdate: paint,
        overwrite: true,
      })
    },
    [paint]
  )

  return (
    <div className={styles.main}>
      <div
        ref={stageRef}
        className={styles.stage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className={styles.track}>
          {IMAGES.map((src, index) => (
            <div
              key={index}
              className={styles.card}
              ref={(node) => {
                cardRefs.current[index] = node
              }}
            >
              <Image src={src} alt="" draggable={false} priority={index < 3} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Imageanime