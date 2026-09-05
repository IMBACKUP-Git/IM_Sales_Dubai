"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './clutch.module.css';
import r1 from './r1.webp';
import r2 from './r2.webp';
import r3 from './r3.webp';
import r4 from './r4.webp';
import r5 from './r5.webp';

const STAR_PATH = "M13.3579 1.05699C13.4163 0.939017 13.5065 0.839712 13.6183 0.770283C13.7302 0.700853 13.8592 0.664063 13.9908 0.664062C14.1225 0.664062 14.2515 0.700853 14.3633 0.770283C14.4751 0.839712 14.5653 0.939017 14.6237 1.05699L17.7017 7.29146C17.9044 7.7018 18.2037 8.05682 18.5739 8.32603C18.9441 8.59524 19.374 8.77061 19.8269 8.83708L26.7103 9.84441C26.8407 9.8633 26.9632 9.91832 27.064 10.0032C27.1648 10.0881 27.2398 10.1996 27.2806 10.3249C27.3213 10.4502 27.3262 10.5844 27.2946 10.7124C27.2631 10.8404 27.1964 10.9569 27.102 11.0489L22.124 15.8963C21.7957 16.2162 21.5501 16.6112 21.4083 17.0471C21.2665 17.483 21.2327 17.9468 21.3099 18.3986L22.4851 25.2474C22.5081 25.3777 22.494 25.5119 22.4445 25.6347C22.3949 25.7574 22.3118 25.8638 22.2047 25.9416C22.0976 26.0194 21.9708 26.0655 21.8387 26.0747C21.7066 26.0839 21.5746 26.0557 21.4578 25.9935L15.3046 22.7584C14.8992 22.5455 14.4481 22.4343 13.9902 22.4343C13.5322 22.4343 13.0811 22.5455 12.6757 22.7584L6.52385 25.9935C6.40704 26.0554 6.27521 26.0832 6.14337 26.0738C6.01153 26.0644 5.88497 26.0183 5.77808 25.9405C5.67119 25.8628 5.58826 25.7566 5.53872 25.6341C5.48919 25.5115 5.47503 25.3775 5.49787 25.2474L6.67175 18.4C6.74929 17.9479 6.7157 17.4838 6.57387 17.0476C6.43203 16.6114 6.18622 16.2163 5.85763 15.8963L0.87965 11.0503C0.784506 10.9584 0.717084 10.8416 0.685065 10.7133C0.653045 10.5849 0.657716 10.4502 0.698544 10.3243C0.739372 10.1985 0.814717 10.0867 0.915995 10.0016C1.01727 9.91652 1.14041 9.86159 1.27139 9.84307L8.15342 8.83708C8.60679 8.77113 9.03734 8.59599 9.40802 8.32674C9.7787 8.0575 10.0784 7.70221 10.2813 7.29146L13.3579 1.05699Z";


const HalfStarIcon = ({ size = 20 }) => (
  <svg width={size} height={Math.round(size * 21 / 22)} viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.2768 1.04489C10.3206 0.956355 10.3883 0.881826 10.4723 0.829719C10.5562 0.777612 10.653 0.75 10.7518 0.75C10.8506 0.75 10.9474 0.777612 11.0313 0.829719C11.1153 0.881826 11.183 0.956355 11.2268 1.04489L13.5368 5.72389C13.689 6.03186 13.9136 6.2983 14.1914 6.50035C14.4692 6.70239 14.7919 6.83401 15.1318 6.88389L20.2978 7.63989C20.3957 7.65408 20.4876 7.69537 20.5633 7.75909C20.6389 7.82282 20.6952 7.90644 20.7258 8.0005C20.7564 8.09456 20.7601 8.1953 20.7364 8.29133C20.7127 8.38736 20.6626 8.47485 20.5918 8.54389L16.8558 12.1819C16.6094 12.422 16.4251 12.7184 16.3186 13.0455C16.2122 13.3727 16.1869 13.7208 16.2448 14.0599L17.1268 19.1999C17.1441 19.2977 17.1335 19.3985 17.0963 19.4906C17.0591 19.5827 16.9967 19.6625 16.9163 19.7209C16.836 19.7793 16.7408 19.8139 16.6417 19.8208C16.5426 19.8277 16.4435 19.8066 16.3558 19.7599L11.7378 17.3319C11.4335 17.1721 11.095 17.0886 10.7513 17.0886C10.4076 17.0886 10.0691 17.1721 9.7648 17.3319L5.1478 19.7599C5.06013 19.8063 4.9612 19.8272 4.86225 19.8201C4.7633 19.8131 4.66832 19.7785 4.58809 19.7201C4.50787 19.6618 4.44563 19.5821 4.40846 19.4901C4.37128 19.3981 4.36066 19.2976 4.3778 19.1999L5.2588 14.0609C5.317 13.7216 5.29178 13.3733 5.18534 13.0459C5.07889 12.7186 4.89441 12.422 4.6478 12.1819L0.9118 8.54489C0.840394 8.47593 0.789793 8.38829 0.765762 8.29197C0.741731 8.19565 0.745237 8.09451 0.775878 8.00008C0.80652 7.90566 0.863067 7.82174 0.939076 7.75788C1.01509 7.69402 1.1075 7.65279 1.2058 7.63889L6.3708 6.88389C6.71106 6.83439 7.03419 6.70295 7.31238 6.50088C7.59058 6.29881 7.8155 6.03216 7.9678 5.72389L10.2768 1.04489Z" fill="#FF3D2E" stroke="#FF3D2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <g clipPath="url(#halfClip)">
      <path d="M10.3446 2.05928C10.3835 1.9805 10.4438 1.91418 10.5185 1.86781C10.5932 1.82145 10.6793 1.79688 10.7672 1.79688C10.8551 1.79688 10.9413 1.82145 11.016 1.86781C11.0907 1.91418 11.1509 1.9805 11.1899 2.05928L13.2454 6.22286C13.3809 6.49691 13.5807 6.734 13.828 6.91378C14.0752 7.09357 14.3623 7.21069 14.6647 7.25508L19.2617 7.9278C19.3488 7.94042 19.4306 7.97716 19.4979 8.03387C19.5652 8.09058 19.6153 8.16499 19.6425 8.24869C19.6698 8.33238 19.673 8.42203 19.6519 8.50748C19.6309 8.59293 19.5863 8.67078 19.5233 8.73222L16.1988 11.9695C15.9796 12.1831 15.8156 12.4469 15.7208 12.738C15.6261 13.0291 15.6036 13.3388 15.6551 13.6406L16.44 18.2144C16.4554 18.3015 16.446 18.3911 16.4128 18.4731C16.3797 18.555 16.3242 18.626 16.2527 18.678C16.1812 18.73 16.0965 18.7608 16.0083 18.7669C15.9201 18.773 15.8319 18.7543 15.7539 18.7127L11.6446 16.5522C11.3738 16.41 11.0726 16.3357 10.7668 16.3357C10.461 16.3357 10.1597 16.41 9.88895 16.5522L5.78054 18.7127C5.70253 18.754 5.61449 18.7726 5.52645 18.7663C5.4384 18.7601 5.35388 18.7292 5.28249 18.6773C5.21111 18.6254 5.15572 18.5545 5.12264 18.4726C5.08956 18.3908 5.08011 18.3013 5.09536 18.2144L5.87931 13.6415C5.9311 13.3396 5.90867 13.0296 5.81395 12.7383C5.71922 12.447 5.55506 12.1832 5.33562 11.9695L2.01116 8.73311C1.94762 8.67174 1.9026 8.59376 1.88121 8.50805C1.85983 8.42234 1.86295 8.33234 1.89022 8.24832C1.91748 8.16429 1.9678 8.08961 2.03544 8.03279C2.10307 7.97597 2.18531 7.93928 2.27278 7.92691L6.86882 7.25508C7.1716 7.21103 7.45913 7.09407 7.70668 6.91426C7.95423 6.73445 8.15438 6.49718 8.2899 6.22286L10.3446 2.05928Z" fill="white" />
    </g>
    <defs>
      <clipPath id="halfClip">
        <rect width="8.89844" height="16.907" fill="white" transform="translate(10.75 1.79688)" />
      </clipPath>
    </defs>
  </svg>
);

const StarIcon = ({ size = 20 }) => (
  <svg width={size} height={Math.round(size * 27 / 28)} viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d={STAR_PATH} fill="#FF3D2E" stroke="#FF3D2E" strokeWidth="1.33244" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


const Stars = ({ count = 5, half = false, gap = 9, size = 20 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: `${gap}px` }}>
    {Array.from({ length: count }, (_, i) => <StarIcon key={i} size={size} />)}
    {half && <HalfStarIcon size={size} />}
  </div>
);

const ClutchLogoWhite = () => (
  <svg width="40" height="45" viewBox="0 0 40 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.2239 29.6119C26.2999 29.6119 29.6041 26.3077 29.6041 22.2317C29.6041 18.1558 26.2999 14.8516 22.2239 14.8516C18.148 14.8516 14.8438 18.1558 14.8438 22.2317C14.8438 26.3077 18.148 29.6119 22.2239 29.6119Z" fill="white" />
    <path d="M22.2293 34.4923C15.4677 34.4923 9.96768 28.9923 9.96768 22.2307C9.96768 15.469 15.4677 9.96768 22.2293 9.96768C26.2218 9.96768 29.7747 11.8861 32.0154 14.8491L39.0965 7.76797C35.018 3.01488 28.9691 0 22.2293 0C9.97178 0 0 9.97314 0 22.2307C0 34.4882 9.97178 44.46 22.2293 44.46C28.9691 44.46 35.018 41.4451 39.0965 36.692L32.0154 29.6108C29.7761 32.5738 26.2218 34.4923 22.2293 34.4923Z" fill="white" />
  </svg>
);

const ClutchLogoColored = () => (
  <svg width="39" height="44" viewBox="0 0 40 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.2239 29.6119C26.2999 29.6119 29.6041 26.3077 29.6041 22.2317C29.6041 18.1558 26.2999 14.8516 22.2239 14.8516C18.148 14.8516 14.8438 18.1558 14.8438 22.2317C14.8438 26.3077 18.148 29.6119 22.2239 29.6119Z" fill="#FF3D2E" />
    <path d="M22.2293 34.4923C15.4677 34.4923 9.96768 28.9923 9.96768 22.2307C9.96768 15.469 15.4677 9.96768 22.2293 9.96768C26.2218 9.96768 29.7747 11.8861 32.0154 14.8491L39.0965 7.76797C35.018 3.01488 28.9691 0 22.2293 0C9.97178 0 0 9.97314 0 22.2307C0 34.4882 9.97178 44.46 22.2293 44.46C28.9691 44.46 35.018 41.4451 39.0965 36.692L32.0154 29.6108C29.7761 32.5738 26.2218 34.4923 22.2293 34.4923Z" fill="#FFFFFF" />
  </svg>
);

// 7 review cards, only 5 background images placed — cycle through them.
const REVIEW_CARD_BGS = [r1, r2, r3, r4, r5];

const ArrowIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.66315 1.00091L9.6181 1.00091L9.6181 8.95587M9.06567 1.55334L1.00024 9.61878" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


const reviews = [
  {
    quote: '"Integra Magna\'s work was a resounding success and a perfect representation of the client\'s brand ethos. The team was creative, attentive to detail, and deeply understanding of the brand experience. Integra Magna\'s turnaround time was faster than the speed of light. The team delivered on time."',
    reviewer: 'Kunal Kumrawat',
    designation: 'Brand Head, STAGE',
    location: 'Noida, India',
    stars: 4,
    half: true,
    rating: '4.5',
  },
  {
    quote: '"Integra Magna\'s work has received more than 400 leads for the client\'s services in two months. The team has delivered on time and had perfect communication with a dedicated account manager. Integra Magna is very responsive and integrates feedback easily. They\'re always excited to try new ideas."',
    reviewer: 'Prashi Sharma',
    designation: 'Chief Strategy Officer, First Response Healthcare',
    location: 'Dubai, UAE',
    stars: 5,
    half: false,
    rating: '5.0',
  },
  {
    quote: '"Thanks to Integra Magna\'s efforts, the client has reached a million followers on their Facebook page. The team consistently delivers work on time, is easy to approach, and has a great sense of design and UX. The team\'s UX capabilities and value-driven work are hallmarks of their engagement."',
    reviewer: 'Rajshikhar Molasaria',
    designation: 'Brand Manager, Prestige Feed Mills Ltd.',
    location: 'Indore, India',
    stars: 5,
    half: false,
    rating: '5.0',
  },
  {
    quote: '"Thanks to Integra Magna\'s work, the client has seen a 30% increase in website engagement and a more cohesive brand identity. The client praises their commitment and family-like treatment. The team has a creative approach, delivers work on time, and understands the client\'s needs well."',
    reviewer: 'Aditya Sharma',
    designation: 'CEO, Serovia',
    location: 'Indore, India',
    stars: 5,
    half: false,
    rating: '5.0',
  },
  {
    quote: '"IM Designs has delivered top-notch work so far. For example, the packaging they designed has attracted new customers. Throughout the engagement, they\'ve been communicative and responsive to feedback. Consequentially, the client is happy to continue their partnership."',
    reviewer: 'Shailja Lakhotia',
    designation: 'Founder & CEO, Beyond Offices',
    location: 'Guwahati, India',
    stars: 5,
    half: false,
    rating: '5.0',
  },
  {
    quote: '"Integra Magna successfully completed the project, meeting all the client\'s expectations. The team was open and communicative, ensuring a smooth workflow. Integra Magna delivered work on time and made adjustments based on feedback. Their attention to detail and high-quality work stood out."',
    reviewer: 'Miltali Akarte',
    designation: 'Founder, Mograa Awakkenings',
    location: 'Dubai, UAE',
    stars: 5,
    half: false,
    rating: '5.0',
  },
  {
    quote: '"Integra Magna delivered a logo that resembled the client\'s brand values. The team was supportive, ensured that the client didn\'t face any challenges, and provided timely deliverables throughout the engagement. Integra Magna communicated with the client through email and WhatsApp."',
    reviewer: 'Abhijeet Singh',
    designation: 'Executive, DRP Exoticfarms',
    location: 'Mhow, India',
    stars: 5,
    half: false,
    rating: '5.0',
  },
];
const TOTAL_CARDS = 1 + reviews.length;


const ClutchSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    loop: false,
  });

  const cursorRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);


  const handleMouseMove = useCallback((e) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.visibility = 'visible';
      cursorRef.current.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.visibility = 'hidden';
      cursorRef.current.style.opacity = '0';
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (cursorRef.current) {
        cursorRef.current.style.visibility = 'hidden';
        cursorRef.current.style.opacity = '0';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  const scrollToCard = useCallback((index) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  return (
    <div className={styles.main}>
      <div className={styles.MainConatiner}>

        <div className={styles.top}>
          <h4>
            Loved by clients,
            <br />
            <span className={styles.trusttext}>trusted by many</span>
          </h4>
        </div>

        <div className={styles.middle}>

          <div
            className={styles.carouselOuter}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >

            <div className={styles.emblaViewport} ref={emblaRef}>
              <div className={styles.cardsTrack}>

                {/* First special dark card */}
                <div className={styles.emblaSlide}>
                  <div className={styles.diffcard}>
                    <div className={styles.diffcardTop}>
                      <h4 className={styles.clutchTitle}>Clutch</h4>
                      <Stars count={5} gap={9.33} size={28} />
                      <p>4.9/5</p>
                    </div>
                    <div className={styles.diffcardBottom}>
                      <div className={styles.diffcardBottomLeft}>
                        <ClutchLogoWhite />
                        <p className={styles.reviewsCount}>18 reviews</p>
                      </div>
                      <a
                        href="https://clutch.co/profile/integra-magna"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.ctatoclutch}
                      >
                        <span>Go to Clutch</span>
                        <span className={styles.ctaArrow}><ArrowIcon /></span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Review cards */}
                {reviews.map((review, i) => (
                  <div key={i} className={styles.emblaSlide}>
                    <div
                      className={styles.card}
                      style={{ backgroundImage: `url(${REVIEW_CARD_BGS[i % REVIEW_CARD_BGS.length].src})` }}
                    >
                      <div className={styles.cardTop}>
                        <ClutchLogoColored />
                        <div className={styles.starsRow}>
                          <Stars count={review.stars} half={review.half} gap={9} size={20} />
                          <span className={styles.ratingText}>{review.rating}</span>
                        </div>
                      </div>
                      <div className={styles.cardBottom}>
                        <p className={styles.quote}>{review.quote}</p>
                        <div className={styles.reviewer}>
                          <p className={styles.reviewerName}>{review.reviewer}</p>
                          <p className={styles.reviewerDesignation}>{review.designation}</p>
                          <p className={styles.reviewerLocation}>{review.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>


          <div className={styles.pills}>
            {Array.from({ length: TOTAL_CARDS }, (_, i) => (
              <button
                key={i}
                className={`${styles.pill} ${i === activeIndex ? styles.pillActive : ''}`}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      <div className={styles.dragCursor} ref={cursorRef}>Drag</div>
    </div>
  );
};

export default ClutchSection;
