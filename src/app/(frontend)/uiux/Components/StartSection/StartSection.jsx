'use client'
import React, { useState } from 'react'
import styles from './StartSection.module.css'
import ContactPopup from '../Contact/ContactPopup'

const StartSection = () => {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <>
      <div className={styles.main}>
        <div className={styles.MainContainer}>
          <div className={styles.top}>
            <h3>Ready to start a project ? </h3>
            <p>Book a free consultation to get clarity, direction, and expert advice you can implement right away.</p>
          </div>
          <div className={styles.bottom}>
            <button className={styles.buttoncta} onClick={() => setPopupOpen(true)}>
              <span>Book a Free call</span>
              <span className={styles.ctaArrow}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.20984 1.2511L13.7433 1.2511L13.7433 12.7845M12.9424 2.05203L1.24872 13.7457" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      <ContactPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}

export default StartSection
