import React from 'react'
import styles from './WhyUs.module.css'

const WhyUs = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.MainConatiner}>
          <div className={styles.top}>
            <h4>Why choose us ? </h4>
            <p>Designed to convert. Built to last.</p>
          </div>
          <div className={styles.Bottom}>
            <div className={styles.Card}>
              <h4>Strategy before screens </h4>
              <p>we start with your business goals, not a blank canvas.</p>
            </div>
            <div className={styles.Card}>
              <h4>Dev-ready, every time </h4>
              <p>every design ships as production-ready files, not just pretty pictures.</p>
            </div>
            <div className={styles.Card}>
              <h4>One team, start to finish</h4>
              <p>Design, development, and brand under one roof. No handoff chaos.</p>
            </div>
            <div className={styles.Card}>
              <h4>Delivered on timeline </h4>
              <p>we scope realistically and hold the date.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WhyUs
