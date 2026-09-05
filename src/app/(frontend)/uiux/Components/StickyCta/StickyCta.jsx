'use client'
import { useEffect, useState } from 'react'
import styles from './StickyCta.module.css'
import ContactPopup from '../Contact/ContactPopup'

export default function StickyCta() {
    const [visible, setVisible] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [anyPopupOpen, setAnyPopupOpen] = useState(false)

    useEffect(() => {
        const footer = document.getElementById('footer-sentinel')
        if (!footer) return
        const obs = new IntersectionObserver(
            ([entry]) => setVisible(!entry.isIntersecting),
            { threshold: 0, rootMargin: '0px' }
        )
        obs.observe(footer)
        return () => obs.disconnect()
    }, [])

    useEffect(() => {
        const obs = new MutationObserver(() => {
            setAnyPopupOpen(document.body.style.overflow === 'hidden')
        })
        obs.observe(document.body, { attributes: true, attributeFilter: ['style'] })
        return () => obs.disconnect()
    }, [])

    return (
        <>
            <div className={`${styles.stickyOuter}${(!visible || anyPopupOpen) ? ` ${styles.hidden}` : ''}`}>
                <div className={styles.glassBorder}>
                    <div className={styles.ctaWrapper} onClick={() => setIsOpen(true)}>
                        <span className={styles.ctaText}>Book Your Free Call</span>
                        <div className={styles.ctaCircle}>
                            <svg className={styles.ctaArrow} width="11" height="11" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.20984 1.2511L13.7433 1.2511L13.7433 12.7845M12.9424 2.05203L1.24872 13.7457" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <ContactPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}
