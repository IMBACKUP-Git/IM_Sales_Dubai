'use client'
import React, { useState } from 'react'
import styles from './DesignBuild.module.css'
import ContactPopup from '../Contact/ContactPopup'
import bg1 from './1.webp'
import bg2 from './2.webp'
import bg3 from './3.webp'
import bg4 from './4.webp'
import bg5 from './5.webp'
import bg6 from './6.webp'

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.20984 1.2511L13.7433 1.2511L13.7433 12.7845M12.9424 2.05203L1.24872 13.7457"
      stroke="black"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const designCards = [
  { title: 'UI/UX Design', desc: 'Mobile & web interfaces people actually want to use.', bg: bg1 },
  { title: 'Website & Product Design', desc: 'Beautiful interfaces, from first idea to full launch.', bg: bg2 },
  { title: 'Visual & Motion Design', desc: 'Brand assets and motion that stop the scroll.', bg: bg3 },
]

const devCards = [
  { title: 'Custom Websites & Landing Pages', desc: 'Fast, scalable, and built to convert.', bg: bg4 },
  { title: 'E-commerce & Web Applications', desc: 'Shopping experiences and digital products, built to perform.', bg: bg5 },
  { title: 'CMS & Integrations', desc: 'Easy management, powerful workflows.', bg: bg6 },
]

const Card = ({ title, desc, bg, onArrowClick }) => (
  <div className={styles.card} style={{ backgroundImage: `url(${bg.src})` }}>
    <h4>{title}</h4>
    <div className={styles.cardBottom}>
      <p>{desc}</p>
      <button
        type="button"
        className={styles.cardArrow}
        onClick={onArrowClick}
        aria-label={`Enquire about ${title}`}
      >
        <ArrowIcon />
      </button>
    </div>
  </div>
)

const DesignBuild = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <>
      <div className={styles.main}>
        <div className={styles.MainConatiner}>
          <div className={styles.top}>
            <h3>What we design & build</h3>
          </div>
          <div className={styles.bottom}>
            <div className={styles.design}>
              <div className={styles.deisgntop}>
                <h4>Design</h4>
              </div>
              <div className={styles.designbottom}>
                {designCards.map((c, i) => (
                  <Card key={i} title={c.title} desc={c.desc} bg={c.bg} onArrowClick={() => setIsPopupOpen(true)} />
                ))}
              </div>
            </div>
            <div className={styles.dev}>
              <div className={styles.devtop}>
                <h4>Development</h4>
              </div>
              <div className={styles.devbottom}>
                {devCards.map((c, i) => (
                  <Card key={i} title={c.title} desc={c.desc} bg={c.bg} onArrowClick={() => setIsPopupOpen(true)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  )
}

export default DesignBuild
