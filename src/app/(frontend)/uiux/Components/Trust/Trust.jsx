'use client'
import React, { useLayoutEffect, useRef } from 'react'
import styles from './Trust.module.css'
import Image from 'next/image'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import one from './1.png'
import two from './2.png'
import three from './3.png'
import four from './4.png'
import five from './5.png'
import six from './6.png'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const logos = [one, two, three, four, five, six]

const Trust = () => {
  const bottomRef = useRef(null)
  const cardRefs = useRef([])

  useLayoutEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    if (!bottomRef.current || !cards.length) return

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 })
        return
      }

      gsap.set(cards, { opacity: 0, y: 28 })

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: bottomRef.current,
          start: 'top 88%',
          once: true,
        },
      })
    }, bottomRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <div className={styles.main}>
        <div className={styles.Mainconatiner}>
          <div className={styles.top}>
            <h4>
              Trusted by <span className={styles.brands}>250+ brands</span>
            </h4>
          </div>
          <div className={styles.bottom} ref={bottomRef}>
            {logos.map((logo, i) => (
              <div
                className={styles.card}
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
              >
                <Image src={logo} alt="Brand logo" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Trust
