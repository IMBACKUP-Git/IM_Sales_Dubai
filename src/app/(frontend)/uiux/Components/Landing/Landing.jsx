'use client'
import React, { useState } from 'react'
import styles from './Landing.module.css'
import GradientStrips from '../GradientStrips/GradientStrips'
import ContactPopup from '../Contact/ContactPopup'

const Landing = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <>
      <div className={styles.main}>
        <GradientStrips />
        <div className={styles.Top}>
          <h5>LEADING DESIGN & DEVELOPMENT AGENCY IN DUBAI</h5>
          <h2>
            More Clicks.<br className={styles.mobileBreak} /> More Signups.
            <br className={styles.mobileBreak} /> Better Conversion <br />
            <span className={styles.gur}>Guaranteed</span>
          </h2>
        </div>
        <div className={styles.Bottom}>
          <div className={styles.ctaGlass}>
            <button className={styles.cta} onClick={() => setIsPopupOpen(true)}>
              Book Your Free Call
            </button>
          </div>
        </div>
      </div>
      <ContactPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  )
}

export default Landing
