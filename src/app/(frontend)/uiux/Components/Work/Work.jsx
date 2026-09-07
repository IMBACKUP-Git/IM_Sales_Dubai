'use client'
import React, { useEffect, useState } from 'react'
import styles from './Work.module.css'
import WorkPopup from './WorkPopup'
import d1 from './d1.webp'
import d2 from './d2.webp'
import d3 from './d3.webp'
import d4 from './d4.webp'
import m1 from './m1.webp'
import m2 from './m2.webp'
import m3 from './m3.webp'
import m4 from './m4.webp'
import glow1 from './1.webp'
import glow2 from './2.webp'
import glow3 from './3.webp'
import glow4 from './4.webp'
import p1 from '../Contact/p1.webp'
import p2 from '../Contact/p2.webp'
import p3 from '../Contact/p3.webp'
import p4 from '../Contact/p4.webp'

const ArrowIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.15739 0.613131C1.15725 0.693971 1.17307 0.774044 1.20394 0.848758C1.23481 0.923471 1.28012 0.991356 1.33729 1.04852C1.39445 1.10568 1.46233 1.151 1.53705 1.18187C1.61176 1.21274 1.69184 1.22856 1.77268 1.22842L5.49988 1.22842L0.179438 6.54887C0.0642491 6.66405 -0.000463195 6.82029 -0.000463202 6.98319C-0.000463209 7.14609 0.0642486 7.30232 0.179438 7.41751C0.294627 7.5327 0.450859 7.59741 0.613761 7.59741C0.776663 7.59741 0.932893 7.5327 1.04808 7.41751L6.36853 2.09706L6.36925 5.825C6.36925 5.98818 6.43408 6.14468 6.54947 6.26007C6.66485 6.37546 6.82136 6.44029 6.98454 6.44029C7.14773 6.44029 7.30423 6.37546 7.41962 6.26007C7.53501 6.14468 7.59983 5.98818 7.59983 5.825L7.59983 0.613131C7.59997 0.53229 7.58415 0.452217 7.55328 0.377504C7.52241 0.30279 7.47709 0.234905 7.41993 0.177742C7.36277 0.12058 7.29488 0.0752629 7.22017 0.0443914C7.14545 0.0135199 7.06538 -0.00229944 6.98454 -0.00215909L1.77268 -0.00215851C1.69184 -0.00229886 1.61176 0.0135203 1.53705 0.0443918C1.46234 0.0752633 1.39445 0.120579 1.33729 0.177742C1.28012 0.234905 1.23481 0.30279 1.20394 0.377504C1.17307 0.452218 1.15725 0.532291 1.15739 0.613131Z"
      fill="#101820"
    />
  </svg>
)

const projects = [
  {
    slug: 'white-mantis',
    name: 'White Mantis',
    stat: 'Crafting a seamless coffee-first journey that blends discovery, rewards, and everyday convenience.',
    desktopImg: d1,
    mobileImg: m1,
    glow: glow1,
    popupBg: p1,
    popupImages: [
      { type: 'landscape', src: '/assets/images/uiux/Whitemantis/1.webp' },
      { type: 'landscape', src: '/assets/images/uiux/Whitemantis/2.webp' },
      { type: 'landscape', src: '/assets/images/uiux/Whitemantis/3.webp' },
      { type: 'landscape', src: '/assets/images/uiux/Whitemantis/4.webp' },
    ],
  },
  {
    slug: 'surge',
    name: 'Surge',
    stat: 'Crafting a seamless coffee-first journey that blends discovery, rewards, and everyday convenience.',
    desktopImg: d2,
    mobileImg: m2,
    glow: glow2,
    popupBg: p2,
    popupImages: [
      { type: 'landscape', src: '/assets/images/uiux/Surge/1.webp' },
      {
        type: 'double',
        src: ['/assets/images/uiux/Surge/2.webp', '/assets/images/uiux/Surge/3.webp'],
      },
      {
        type: 'double',
        src: ['/assets/images/uiux/Surge/4.webp', '/assets/images/uiux/Surge/5.webp'],
      },
      { type: 'landscape', src: '/assets/images/uiux/Surge/6.webp' },
    ],
  },
  {
    slug: 'al-huzaifa',
    name: 'Al Huzaifa',
    stat: 'Elevating luxury interiors through an immersive digital experience that reflects timeless sophistication.',
    desktopImg: d3,
    mobileImg: m3,
    glow: glow3,
    popupBg: p3,
    popupImages: [
      { type: 'landscape', src: '/assets/images/uiux/Alhuzaifa/1.webp' },
      {
        type: 'double',
        src: ['/assets/images/uiux/Alhuzaifa/2.webp', '/assets/images/uiux/Alhuzaifa/3.webp'],
      },
       {
        type: 'double',
        src: ['/assets/images/uiux/Alhuzaifa/4.webp', '/assets/images/uiux/Alhuzaifa/5.webp'],
      },
      { type: 'landscape', src: '/assets/images/uiux/Alhuzaifa/6.webp' },
    ],
  },
  {
    slug: 'chrysaliis',
    name: 'Chrysaliis',
    stat: 'Elevating luxury interiors through an immersive digital experience that reflects timeless sophistication.',
    desktopImg: d4,
    mobileImg: m4,
    glow: glow4,
    popupBg: p4,
    popupImages: [
      { type: 'landscape', src: '/assets/images/uiux/Chrysaliis/1.webp' },
      {
        type: 'double',
        src: ['/assets/images/uiux/Chrysaliis/2.webp', '/assets/images/uiux/Chrysaliis/3.webp'],
      },
      {
        type: 'double',
        src: ['/assets/images/uiux/Chrysaliis/4.webp', '/assets/images/uiux/Chrysaliis/5.webp'],
      },
        { type: 'landscape', src: '/assets/images/uiux/Chrysaliis/6.webp' },
    ],
  },
]

const Work = () => {
  const [activeProject, setActiveProject] = useState(null)

  // Popup images are plain <img src> paths (not bundled), so the browser only
  // starts fetching them once the popup actually opens — which is why the
  // heading/description (pure JS data, no network wait) show first while the
  // images visibly lag in behind. Warm the browser cache for all of them as
  // soon as this section mounts, so by the time someone clicks a card the
  // images are already loaded.
  useEffect(() => {
    projects.forEach((project) => {
      project.popupImages.forEach((image) => {
        const srcs = image.type === 'double' ? image.src : [image.src]
        srcs.forEach((src) => {
          const preloadImg = new window.Image()
          preloadImg.src = src
        })
      })
    })
  }, [])

  return (
    <>
      <div className={styles.main}>
        <div className={styles.MainContainer}>
          <div className={styles.top}>
            <h3>
              Work that <span className={styles.italic}>delivered results</span>
            </h3>
          </div>
          <div className={styles.grid}>
            {projects.map((project) => (
              <div key={project.slug} className={styles.card}>
                <div
                  className={styles.cardGlow}
                  style={{ backgroundImage: `url(${project.glow.src})` }}
                  aria-hidden="true"
                />
                <div className={styles.cardImage}>
                  <img
                    src={project.desktopImg.src}
                    alt={project.name}
                    className={styles.imgDesktop}
                  />
                  <img
                    src={project.mobileImg.src}
                    alt={project.name}
                    className={styles.imgMobile}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div
                    className={styles.cardNameRow}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveProject(project)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setActiveProject(project)
                    }}
                  >
                    <span className={styles.cardName}>{project.name}</span>
                    <span className={styles.cardArrow}>
                      <ArrowIcon />
                    </span>
                  </div>
                  <div className={styles.divider} />
                  <p className={styles.cardStat}>{project.stat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <WorkPopup project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  )
}

export default Work
