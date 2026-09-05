'use client'
import React, { useState } from 'react'
import styles from './Youhaveseen.module.css'
import ContactPopup from '../Contact/ContactPopup'

const Youhaveseen = () => {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <>
      <div className={styles.main}>
        <div className={styles.MainContainer}>
          <div className={styles.top}>
            <h3>
              You've seen how it works. Now <span className={styles.italic}>let's make it work for you.</span>
            </h3>
            <p>
              One free call is all it takes. Tell us about your product and we'll tell you exactly what your packaging needs.
            </p>
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

export default Youhaveseen
