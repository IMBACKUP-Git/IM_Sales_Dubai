'use client'
import React, { useState } from 'react'
import styles from './TextTop.module.css'
import ContactPopup from '../Contact/ContactPopup'

const TextTop = () => {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <>
      <div className={styles.main}>
        <div className={styles.Mainconatiner}>
          <div className={styles.top}>
            <p>
              We design and build interfaces that make customers click, sign up, book, and buy on
              your website, your app, and everywhere your users encounter your brand.
            </p>
          </div>
          <div className={styles.bottom}>
            <button className={styles.buttontt} onClick={() => setPopupOpen(true)}>
             <p>Request a Quote</p>
              <div className={styles.svgdd}>


              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.20984 1.2511L13.7433 1.2511L13.7433 12.7845M12.9424 2.05203L1.24872 13.7457"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
                </div>
            </button>
          </div>
        </div>
      </div>
      <ContactPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}

export default TextTop
