'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Contact.module.css'
import { useCountryDialCode } from '../../../../../hooks/useCountryDialCode'
import Image from 'next/image'
import Misbah from '../../../packaging/_components/ContactCopy/founder.png'

const Contact = () => {
  const router = useRouter()
  const dialCode = useCountryDialCode()
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })

  useEffect(() => {
    if (dialCode) {
      setFormData((prev) => ({ ...prev, phone: prev.phone || dialCode }))
    }
  }, [dialCode])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validateField = (name, value) => {
    if (name === 'fullName') {
      if (!value.trim()) return 'Full name is required.'
      if (value.trim().length > 50) return 'Name must be 50 characters or fewer.'
    }
    if (name === 'company') {
      if (value.trim().length > 60) return 'Company name must be 60 characters or fewer.'
    }
    if (name === 'email') {
      if (!value.trim()) return 'Work email is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.'
    }
    if (name === 'phone') {
      if (!value.trim()) return 'Contact number is required.'
      const digits = value.replace(/\D/g, '')
      if (digits.length < 7 || digits.length > 15) return 'Please enter a valid phone number (7–15 digits).'
    }
    if (name === 'message') {
      if (value.trim().length > 500) return 'Message must be 500 characters or fewer.'
    }
    return undefined
  }

  const validate = () => {
    const fields = ['fullName', 'company', 'email', 'phone', 'message']
    const newErrors = {}
    fields.forEach((field) => {
      const error = validateField(field, formData[field])
      if (error) newErrors[field] = error
    })
    return newErrors
  }

  const getOrCreateSessionId = () => {
    let id = localStorage.getItem('uiux_partial_session')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('uiux_partial_session', id)
    }
    return id
  }

  const handleBlur = (e) => {
    const { name, value } = e.target

    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))

    if (value.trim()) {
      fetch('/api/ui-partial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: getOrCreateSessionId(),
          field: name,
          value,
          allFields: { ...formData, [name]: value },
        }),
      }).catch(() => {})
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'fullName') {
      if (/[0-9]/.test(value)) return
      if (value.length > 50) return
    }
    if (name === 'company') {
      if (value.length > 60) return
    }
    if (name === 'phone') {
      if (!/^[+\d\s]*$/.test(value)) return
      if (value.length > 20) return
    }
    if (name === 'message') {
      if (value.length > 500) return
    }
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/ui-forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      localStorage.removeItem('uiux_partial_session')
      router.push('/uiux/thank-you')
    } catch {
      setSubmitError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  const phoneDigits = formData.phone.replace(/\D/g, '')
  const isFormReady =
    formData.fullName.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    phoneDigits.length >= 7

  return (
    <div className={styles.main} id="contact">
      <div className={styles.MainContainer}>
        <div className={styles.left}>
          <div className={styles.leftOne}>
            <div className={styles.leftOneTop}>
              <h3>
                Ready to
                <br />
                <span className={styles.actually}>stop blending in?</span>
              </h3>
            </div>
            <div className={styles.list}>
              <div className={styles.item}>
                <svg className={styles.checkIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="uiux-mask0" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22">
                    <path d="M11 21C12.3135 21.0016 13.6143 20.7437 14.8278 20.2411C16.0412 19.7384 17.1434 19.0009 18.071 18.071C19.0009 17.1434 19.7384 16.0412 20.2411 14.8278C20.7437 13.6143 21.0016 12.3135 21 11C21.0016 9.68655 20.7437 8.38572 20.2411 7.17225C19.7384 5.95878 19.0009 4.85659 18.071 3.92901C17.1434 2.99909 16.0412 2.26162 14.8278 1.75897C13.6143 1.25631 12.3135 0.998388 11 1.00001C9.68655 0.998388 8.38572 1.25631 7.17225 1.75897C5.95878 2.26162 4.85659 2.99909 3.92901 3.92901C2.99909 4.85659 2.26162 5.95878 1.75897 7.17225C1.25631 8.38572 0.998388 9.68655 1.00001 11C0.998388 12.3135 1.25631 13.6143 1.75897 14.8278C2.26162 16.0412 2.99909 17.1434 3.92901 18.071C4.85659 19.0009 5.95878 19.7384 7.17225 20.2411C8.38572 20.7437 9.68655 21.0016 11 21Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M7 11L10 14L16 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </mask>
                  <g mask="url(#uiux-mask0)">
                    <path d="M-1 -1H23V23H-1V-1Z" fill="white" />
                  </g>
                </svg>
                <p>Strategy-first design, not just pretty visuals</p>
              </div>
              <div className={styles.item}>
                <svg className={styles.checkIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="uiux-mask1" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22">
                    <path d="M11 21C12.3135 21.0016 13.6143 20.7437 14.8278 20.2411C16.0412 19.7384 17.1434 19.0009 18.071 18.071C19.0009 17.1434 19.7384 16.0412 20.2411 14.8278C20.7437 13.6143 21.0016 12.3135 21 11C21.0016 9.68655 20.7437 8.38572 20.2411 7.17225C19.7384 5.95878 19.0009 4.85659 18.071 3.92901C17.1434 2.99909 16.0412 2.26162 14.8278 1.75897C13.6143 1.25631 12.3135 0.998388 11 1.00001C9.68655 0.998388 8.38572 1.25631 7.17225 1.75897C5.95878 2.26162 4.85659 2.99909 3.92901 3.92901C2.99909 4.85659 2.26162 5.95878 1.75897 7.17225C1.25631 8.38572 0.998388 9.68655 1.00001 11C0.998388 12.3135 1.25631 13.6143 1.75897 14.8278C2.26162 16.0412 2.99909 17.1434 3.92901 18.071C4.85659 19.0009 5.95878 19.7384 7.17225 20.2411C8.38572 20.7437 9.68655 21.0016 11 21Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M7 11L10 14L16 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </mask>
                  <g mask="url(#uiux-mask1)">
                    <path d="M-1 -1H23V23H-1V-1Z" fill="white" />
                  </g>
                </svg>
                <p>Delivered in timeline</p>
              </div>
              <div className={styles.item}>
                <svg className={styles.checkIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="uiux-mask2" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22">
                    <path d="M11 21C12.3135 21.0016 13.6143 20.7437 14.8278 20.2411C16.0412 19.7384 17.1434 19.0009 18.071 18.071C19.0009 17.1434 19.7384 16.0412 20.2411 14.8278C20.7437 13.6143 21.0016 12.3135 21 11C21.0016 9.68655 20.7437 8.38572 20.2411 7.17225C19.7384 5.95878 19.0009 4.85659 18.071 3.92901C17.1434 2.99909 16.0412 2.26162 14.8278 1.75897C13.6143 1.25631 12.3135 0.998388 11 1.00001C9.68655 0.998388 8.38572 1.25631 7.17225 1.75897C5.95878 2.26162 4.85659 2.99909 3.92901 3.92901C2.99909 4.85659 2.26162 5.95878 1.75897 7.17225C1.25631 8.38572 0.998388 9.68655 1.00001 11C0.998388 12.3135 1.25631 13.6143 1.75897 14.8278C2.26162 16.0412 2.99909 17.1434 3.92901 18.071C4.85659 19.0009 5.95878 19.7384 7.17225 20.2411C8.38572 20.7437 9.68655 21.0016 11 21Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M7 11L10 14L16 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </mask>
                  <g mask="url(#uiux-mask2)">
                    <path d="M-1 -1H23V23H-1V-1Z" fill="white" />
                  </g>
                </svg>
                <p>One team for design, dev, and brand, no handoff chaos</p>
              </div>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.lefttwo}>
            <div className={styles.lefttwoTop}>
              <div className={styles.lefttwoTopleft}>
                <Image src={Misbah} alt="founder" width={94} height={94} />
              </div>
              <div className={styles.lefttwoTopright}>
                <div className={styles.lefttwoToprighttop}>
                  <h2>Misbah Qureshi</h2>
                </div>
                <div className={styles.founderslinks}>
                  <h4>Founder & CEO</h4>
                  <div className={styles.founderline}></div>
                  <a
                    href="https://www.linkedin.com/in/misbahqr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedin}
                  >
                    <span>Connect on LinkedIn</span>
                    <span className={styles.linkedinIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="white" />
                        <path d="M19.0581 12.3572V17H16.3664V12.668C16.3664 11.5795 15.9769 10.837 15.0029 10.837C14.2592 10.837 13.8163 11.3379 13.6219 11.8217C13.5508 11.9948 13.5325 12.2357 13.5325 12.478V17H10.8396C10.8396 17 10.876 9.66359 10.8396 8.90289H13.5325V10.0505L13.5149 10.077H13.5325V10.0505C13.8899 9.5 14.5285 8.71288 15.9587 8.71288C17.7299 8.71288 19.0581 9.8706 19.0581 12.3572ZM8.02328 5C7.10277 5 6.5 5.60403 6.5 6.3987C6.5 7.17576 7.08515 7.79803 7.98805 7.79803H8.00566C8.94505 7.79803 9.52831 7.17576 9.52831 6.3987C9.51195 5.60403 8.94505 5 8.02328 5ZM6.65982 17H9.35151V8.90289H6.65982V17Z" fill="#101820" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightWrapper}>
          <div className={styles.formHeadingMobile}>
            <h2 className={styles.formTitle}>
              Tell us what you're building,
              <br />
              <span className={styles.formSubtitle}>we'll take it further.</span>
            </h2>
            <p>No pitch. No agency jargon. Just honest product advice.</p>
          </div>
          <div className={styles.rightContainer}>
          <div className={styles.formHeadingDesktop}>
            <h2 className={styles.formTitle}>
              Tell us what you're building,
              <br />
              <span className={styles.formSubtitle}>we'll take it further.</span>
            </h2>
            <p>No pitch. No agency jargon. Just honest product advice.</p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.formRow}>
              <div className={styles.fieldWrap}>
                <input
                  className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                  type="text"
                  name="fullName"
                  placeholder="Full Name*"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.fullName && <span className={styles.errorMsg}>{errors.fullName}</span>}
              </div>
              <div className={styles.fieldWrap}>
                <input
                  className={`${styles.input} ${errors.company ? styles.inputError : ''}`}
                  type="text"
                  name="company"
                  placeholder="Company/ Organization"
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.company && <span className={styles.errorMsg}>{errors.company}</span>}
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.fieldWrap}>
                <input
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
              </div>
              <div className={styles.fieldWrap}>
                <input
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  type="tel"
                  name="phone"
                  placeholder="Contact no.*"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
              </div>
            </div>
            <div className={styles.fieldWrap}>
              <textarea
                className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                name="message"
                placeholder="Tell us about the project"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
            </div>
            {submitError && <span className={styles.errorMsg}>{submitError}</span>}
            <div className={styles.ctaRow}>
              <button type="submit" className={styles.cta} disabled={submitting || !isFormReady}>
                <span className={styles.ctaText}>{submitting ? 'Sending…' : 'Book a Free Call'}</span>
                <span className={styles.ctaArrow}>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.20984 1.2511L13.7433 1.2511L13.7433 12.7845M12.9424 2.05203L1.24872 13.7457" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
