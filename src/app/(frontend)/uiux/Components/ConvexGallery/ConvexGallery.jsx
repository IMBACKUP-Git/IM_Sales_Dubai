'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './ConvexGallery.module.css'
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

const DEFAULT_IMAGES = [
  one.src,
  two.src,
  three.src,
  four.src,
  five.src,
  six.src,
  seven.src,
  eight.src,
  nine.src,
  ten.src,
]

const DRAG_EASE = 0.12
const DRIFT_BLEND = 0.035
const VELOCITY_SMOOTH = 0.25
const MOBILE_BP = 640
const DESKTOP_MAX_ANGLE = 1.28

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)

const falloff = (t, plateau, power, floor) => {
  const k = clamp01((t - plateau) / (1 - plateau))
  return floor + (1 - floor) * Math.pow(1 - k, power)
}

const ConvexGallery = ({
  images = DEFAULT_IMAGES,
  curvature = 0.95,
  depth = 1.8,
  driftX = -0.32,
  driftY = -0.16,
  itemRatio = 1.18,
  columnsInView = 7.4,
  gapRatio = 0.3,
  radius = 14,
  desktopFadePlateau = 0.42,
  desktopFadePower = 1.9,
  desktopFadeFloor = 0.16,
  desktopFadeSideWeight = 0.32,
  mobileCurvature = 2.2,
  mobileDepth = 3.6,
  mobileColumnsInView = 2.3,
  mobileRowsInView = 4.7,
  mobileGapRatio = 0.22,
  mobileItemRatio = 1,
  mobileStagger = 0.5,
  mobileDriftX = -0.14,
  mobileDriftY = -0.2,
  mobileFadePlateau = 0.1,
  mobileFadePower = 2.5,
  mobileFadeFloor = 0.05,
  mobileFadeSideWeight = 0.18,
  mobileShrink = 0.1,
  mobileRadius = 4,
}) => {
  const wrapRef = useRef(null)
  const stageRef = useRef(null)
  const tileRefs = useRef([])

  const [size, setSize] = useState({ w: 0, h: 0 })
  const [grid, setGrid] = useState({
    cols: 0,
    rows: 0,
    cellW: 0,
    cellH: 0,
    itemW: 0,
    itemH: 0,
    maxX: 0,
    maxY: 0,
  })

  const isMobile = size.w > 0 && size.w <= MOBILE_BP

  const state = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    velX: 0,
    velY: 0,
    pointerVX: 0,
    pointerVY: 0,
    dragging: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
  })

  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect
      setSize({ w: r.width, h: r.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useLayoutEffect(() => {
    const { w, h } = size
    if (!w || !h) return

    const mobile = w <= MOBILE_BP
    const colsInView = mobile ? mobileColumnsInView : columnsInView
    const gap = mobile ? mobileGapRatio : gapRatio
    const ratio = mobile ? mobileItemRatio : itemRatio
    const curve = mobile ? mobileCurvature : curvature

    const cellW = w / colsInView
    const itemW = cellW / (1 + gap)
    const itemH = itemW * ratio
    const cellH = itemH * (1 + gap)

    const R = w * curve

    let maxX
    let maxY

    if (mobile) {
      maxX = Math.asin(Math.min(0.995, (w / 2 + cellW * 1.5) / R))
      maxY = Math.asin(Math.min(0.995, (h / 2 + cellH * 1.5) / R))
    } else {
      maxX = DESKTOP_MAX_ANGLE
      maxY = DESKTOP_MAX_ANGLE
    }

    const cols = Math.ceil((2 * R * maxX) / cellW) + 2
    const rows = Math.ceil((2 * R * maxY) / cellH) + 2

    setGrid({ cols, rows, cellW, cellH, itemW, itemH, maxX, maxY })
  }, [
    size,
    columnsInView,
    gapRatio,
    itemRatio,
    curvature,
    mobileColumnsInView,
    mobileGapRatio,
    mobileItemRatio,
    mobileCurvature,
  ])

  const render = useCallback(() => {
    const { w, h } = size
    const { cols, rows, cellW, cellH, itemW, itemH, maxX, maxY } = grid
    if (!w || !h || !cols || !rows) return

    const s = state.current
    const mobile = w <= MOBILE_BP

    const R = w * (mobile ? mobileCurvature : curvature)
    const P = w * (mobile ? mobileDepth : depth)
    const halfW = w / 2
    const halfH = h / 2
    const totalW = cols * cellW
    const totalH = rows * cellH

    const plateau = mobile ? mobileFadePlateau : desktopFadePlateau
    const power = mobile ? mobileFadePower : desktopFadePower
    const floor = mobile ? mobileFadeFloor : desktopFadeFloor
    const sideWeight = mobile ? mobileFadeSideWeight : desktopFadeSideWeight
    const shrink = mobile ? mobileShrink : 0
    const stagger = mobile ? mobileStagger : 0

    for (let j = 0; j < rows; j++) {
      const rowOffset = stagger ? (j % 2) * cellW * stagger : 0

      for (let i = 0; i < cols; i++) {
        const idx = j * cols + i
        const node = tileRefs.current[idx]
        if (!node) continue

        const gx =
          ((i * cellW + rowOffset + s.currentX) % totalW + totalW) % totalW - totalW / 2
        const gy = ((j * cellH + s.currentY) % totalH + totalH) % totalH - totalH / 2

        const theta = gx / R
        const phi = gy / R

        if (Math.abs(theta) > maxX || Math.abs(phi) > maxY) {
          if (node.style.visibility !== 'hidden') node.style.visibility = 'hidden'
          continue
        }

        const cosT = Math.cos(theta)
        const cosP = Math.cos(phi)

        const X = R * Math.sin(theta)
        const Y = R * Math.sin(phi)
        const Z = R * (cosT - 1) + R * (cosP - 1)

        const persp = P / (P - Z)
        const screenX = X * persp
        const screenY = Y * persp
        const apparentW = itemW * persp * cosT
        const apparentH = itemH * persp * cosP

        if (
          Math.abs(screenX) - apparentW > halfW + 40 ||
          Math.abs(screenY) - apparentH > halfH + 40
        ) {
          if (node.style.visibility !== 'hidden') node.style.visibility = 'hidden'
          continue
        }

        if (node.style.visibility !== 'visible') node.style.visibility = 'visible'

        const ty = clamp01(Math.abs(screenY) / halfH)
        const tx = clamp01(Math.abs(screenX) / halfW)
        const t = clamp01(Math.hypot(ty, tx * sideWeight))

        // No manual drag on mobile anymore, so the edge fade (which existed
        // to soften the drag boundary) is no longer needed there — full
        // opacity across the grid. Desktop keeps its fade unchanged.
        const v = mobile ? 1 : falloff(t, plateau, power, floor)
        const scale = shrink ? 1 - ty * ty * shrink : 1

        node.style.opacity = v.toFixed(3)
        node.style.transform =
          `translate3d(${X.toFixed(2)}px, ${Y.toFixed(2)}px, ${Z.toFixed(2)}px) ` +
          `rotateY(${theta.toFixed(4)}rad) rotateX(${(-phi).toFixed(4)}rad) ` +
          `scale(${scale.toFixed(4)})`
      }
    }
  }, [
    size,
    grid,
    curvature,
    depth,
    mobileCurvature,
    mobileDepth,
    mobileStagger,
    mobileFadePlateau,
    mobileFadePower,
    mobileFadeFloor,
    mobileFadeSideWeight,
    mobileShrink,
    desktopFadePlateau,
    desktopFadePower,
    desktopFadeFloor,
    desktopFadeSideWeight,
  ])

  useEffect(() => {
    const dx = isMobile ? mobileDriftX : driftX
    const dy = isMobile ? mobileDriftY : driftY

    const tick = () => {
      const s = state.current

      if (s.dragging) {
        s.velX = 0
        s.velY = 0
      } else {
        s.targetX += s.velX
        s.targetY += s.velY
        s.velX += (dx - s.velX) * DRIFT_BLEND
        s.velY += (dy - s.velY) * DRIFT_BLEND
      }

      s.currentX += (s.targetX - s.currentX) * DRAG_EASE
      s.currentY += (s.targetY - s.currentY) * DRAG_EASE

      render()
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [render, driftX, driftY, mobileDriftX, mobileDriftY, isMobile])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const onDown = (e) => {
      if (isMobile) return
      const s = state.current
      s.dragging = true
      s.pointerId = e.pointerId
      s.lastX = e.clientX
      s.lastY = e.clientY
      s.pointerVX = 0
      s.pointerVY = 0
      el.setPointerCapture(e.pointerId)
    }

    const onMove = (e) => {
      const s = state.current
      if (!s.dragging || e.pointerId !== s.pointerId) return
      const dx = e.clientX - s.lastX
      const dy = e.clientY - s.lastY
      s.lastX = e.clientX
      s.lastY = e.clientY
      s.targetX += dx
      s.targetY += dy
      s.pointerVX += (dx - s.pointerVX) * VELOCITY_SMOOTH
      s.pointerVY += (dy - s.pointerVY) * VELOCITY_SMOOTH
    }

    const onUp = (e) => {
      const s = state.current
      if (!s.dragging) return
      s.dragging = false
      s.pointerId = null
      s.velX = gsap.utils.clamp(-90, 90, s.pointerVX * 1.15)
      s.velY = gsap.utils.clamp(-90, 90, s.pointerVY * 1.15)
      if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId)
    }

    const onDragStart = (e) => e.preventDefault()

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    el.addEventListener('pointerleave', onUp)
    el.addEventListener('dragstart', onDragStart)

    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      el.removeEventListener('pointerleave', onUp)
      el.removeEventListener('dragstart', onDragStart)
    }
  }, [isMobile])

  const wrapStyle = {
    perspective: size.w ? `${size.w * (isMobile ? mobileDepth : depth)}px` : undefined,
  }

  if (isMobile) {
    wrapStyle.aspectRatio = `${mobileColumnsInView} / ${mobileRowsInView}`
  }

  const tiles = []
  for (let j = 0; j < grid.rows; j++) {
    for (let i = 0; i < grid.cols; i++) {
      const idx = j * grid.cols + i
      const src = images[(i * 7 + j * 3 + i * j) % images.length]
      tiles.push(
        <div
          key={idx}
          ref={(el) => (tileRefs.current[idx] = el)}
          className={styles.tile}
          style={{
            width: `${grid.itemW}px`,
            height: `${grid.itemH}px`,
            marginLeft: `${-grid.itemW / 2}px`,
            marginTop: `${-grid.itemH / 2}px`,
            borderRadius: isMobile ? `${mobileRadius}px` : `${radius}px`,
          }}
        >
          <img className={styles.img} src={src} alt="" draggable={false} />
        </div>
      )
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.wrap} ref={wrapRef} style={wrapStyle}>
        <div className={styles.stage} ref={stageRef}>
          {tiles}
        </div>
      </div>
    </div>
  )
}

export default ConvexGallery