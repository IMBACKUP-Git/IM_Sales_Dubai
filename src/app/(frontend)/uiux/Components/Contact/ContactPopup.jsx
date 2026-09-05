'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './ContactPopup.module.css'
import { useCountryDialCode } from '../../../../../hooks/useCountryDialCode'

const getOrCreateSessionId = () => {
  let id = localStorage.getItem('uiux_partial_session')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('uiux_partial_session', id)
  }
  return id
}

const ContactPopup = ({ isOpen, onClose }) => {
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
  const popupRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setFormData({ fullName: '', company: '', email: '', phone: dialCode, message: '' })
      setErrors({})
      setSubmitError('')
      setSubmitting(false)
    }
  }, [isOpen])

  if (!isOpen) return null

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
      if (digits.length < 7 || digits.length > 15)
        return 'Please enter a valid phone number (7–15 digits).'
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

  const handleOverlayClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose()
    }
  }

  const phoneDigits = formData.phone.replace(/\D/g, '')
  const isFormReady = formData.fullName.trim().length > 0 && phoneDigits.length >= 7

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} aria-modal="true" role="dialog">
      <div className={styles.popup} ref={popupRef}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L15 15M15 1L1 15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className={styles.formHeading}>
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
                  <path
                    d="M2.20984 1.2511L13.7433 1.2511L13.7433 12.7845M12.9424 2.05203L1.24872 13.7457"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactPopup
