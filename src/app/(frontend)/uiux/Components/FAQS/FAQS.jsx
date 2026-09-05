'use client'
import React, { useState } from 'react'
import styles from './FAQS.module.css'

const faqs = [
  {
    question: 'How much does a UI/UX project cost?',
    answer:
      "Every project is scoped based on what you actually need - we don't believe in one-size-fits-all pricing. Book a free call and we'll give you a clear, honest quote within 24 hours. No vague estimates, no surprise additions.",
  },
  {
    question: 'What if I already have a design and just need it improved?',
    answer:
      'We do UX audits too, we review your current product, identify friction points, and give you a prioritized list of changes that will move the needle on conversions.',
  },
  {
    question: "What if I'm not happy with the direction?",
    answer:
      "You see wireframes before we move to high-fidelity screens, so misalignment gets caught early, not after final files are delivered. If something's off, we adjust before moving forward.",
  },
  {
    question: 'Do I need to know exactly what I want before booking the call?',
    answer:
      "No, most clients don't. Tell us about your product, your users, and where you're losing them, and we'll tell you exactly what needs to change. That's what the free call is for.",
  },
  {
    question: 'Do you handle both design and development, or just one?',
    answer:
      "Both, one team handles UI/UX design and full development (websites, apps, e-commerce, CMS) under one roof. You're not stitching together a design agency and a dev shop and hoping they talk to each other.",
  },
  {
    question: 'How long does a typical project take?',
    answer:
      "Timelines depend on scope, so we'd rather give you a real number than a generic one. You'll get an exact timeline on the free call, based on what you're actually building - not a placeholder estimate.",
  },
  {
    question: 'Can you design and build in Arabic (RTL layouts)?',
    answer:
      'Yes, we design and build fully bilingual Arabic/English experiences, including right-to-left layouts, so the experience reads naturally for both audiences, not just a mirrored English site.',
  },
]

const ChevronIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.437502 0.437501L4.8125 4.8125L9.1875 0.437501"
      stroke="white"
      strokeWidth="0.875"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((prev) => !prev)

  return (
    <div
      className={`${styles.card} ${open ? styles.cardOpen : ''}`}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle()
        }
      }}
    >
      <div className={styles.cardtop}>
        <h3>{question}</h3>
        <div className={styles.svgddss}>
          <ChevronIcon />
        </div>
      </div>
      <div className={styles.cardbottomWrapper}>
        <div className={styles.cardbottom}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

const FAQS = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.Mainconatiner}>
          <div className={styles.top}>
            <h4>
              Frequently asked
              <br className={styles.mobileBreak} />{' '}
              <span className={styles.sp}>questions?</span>
            </h4>
          </div>
          <div className={styles.bottom}>
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default FAQS
