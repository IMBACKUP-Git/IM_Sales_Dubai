'use client'

import React, { useEffect, useRef } from 'react'
import styles from './GradientStrips.module.css'

const N = 45

const GradientStrips = () => {
  const barsRef = useRef([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const applyFrame = (t) => {
      const w = (2 * Math.PI) / 4.0
      const p = w * t

      const A0 = 0.5637 + 0.077 * Math.cos(p - 0.015)
      const A1 = -0.2941 + 0.0988 * Math.cos(p - 2.189)
      const A2 = -0.0123 + 0.0447 * Math.cos(p + 2.18)
      const A3 = -0.0028 + 0.0123 * Math.cos(p - 0.448)

      for (let i = 0; i < N; i++) {
        const bar = barsRef.current[i]
        if (!bar) continue

        const u = (i + 0.5) / N
        let scale =
          A0 +
          A1 * Math.cos(2 * Math.PI * u) +
          A2 * Math.cos(4 * Math.PI * u) +
          A3 * Math.cos(6 * Math.PI * u)

        scale = Math.min(1, Math.max(0.02, scale))
        bar.style.transform = 'scale(1.35, ' + scale + ')'
      }
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyFrame(0)
      return
    }

    let frameId
    const start = performance.now()

    const loop = (now) => {
      const t = (now - start) / 1000
      applyFrame(t)
      frameId = requestAnimationFrame(loop)
    }

    frameId = requestAnimationFrame(loop)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className={styles.wrap} aria-hidden="true">
      {Array.from({ length: N }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            barsRef.current[i] = el
          }}
          className={styles.bar}
        />
      ))}
    </div>
  )
}

export default GradientStrips
