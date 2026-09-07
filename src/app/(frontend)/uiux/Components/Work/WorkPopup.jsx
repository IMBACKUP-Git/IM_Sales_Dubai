'use client'
import React, { useEffect, useRef } from 'react'
import styles from './WorkPopup.module.css'

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L15 15M15 1L1 15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const WorkPopup = ({ project, onClose }) => {
  const panelRef = useRef(null)
  const isOpen = !!project

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (panelRef.current && !panelRef.current.contains(e.target)) onClose()
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div
        className={styles.popup}
        ref={panelRef}
        style={project.popupBg ? { backgroundImage: `url(${project.popupBg.src})` } : undefined}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <div className={styles.top}>
          <h2 className={styles.title}>{project.name}</h2>
          <p className={styles.desc}>{project.stat}</p>
        </div>

        <div className={styles.imagesGrid}>
          {project.popupImages.map((image, i) => {
            if (image.type === 'landscape') {
              return (
                <div key={i} className={styles.landscape}>
                  <img src={image.src} alt={`${project.name} ${i + 1}`} className={styles.landscapeImg} />
                </div>
              )
            }
            if (image.type === 'double') {
              return (
                <div key={i} className={styles.double}>
                  {image.src.map((s, j) => (
                    <img key={j} src={s} alt={`${project.name} ${i + 1}-${j + 1}`} className={styles.doubleImg} />
                  ))}
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}

export default WorkPopup
