import React from 'react'
import styles from './footerCopy.module.css'

const Footer = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.MainContainer}>
          <div className={styles.top}>
            <h3>Connect us on</h3>
          <div className={styles.socials}>
  <a
    href="https://www.linkedin.com/company/rabtora"
    target="_blank"
    rel="noopener noreferrer"
    className={styles.linkdin}
    aria-label="LinkedIn"
  >
    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.00193751 -0.00343776H3.88994V24.4766H0.00193751V-0.00343776ZM18.5971 7.12456C22.9891 7.12456 25.9771 10.1486 25.9771 15.0446V24.4766H22.2331V15.2606C22.2331 12.1646 20.5771 10.5086 17.8411 10.5086C16.2211 10.5086 14.4571 11.4086 13.1251 13.0646V24.4766H9.38106V7.55656H13.1251V9.06856C14.6011 7.80856 16.4371 7.12456 18.5971 7.12456Z" fill="white"/>
    </svg>
  </a>
  <a
    href="https://www.facebook.com/people/Rabtora-Madhyam-Management/61589694790986/"
    target="_blank"
    rel="noopener noreferrer"
    className={styles.facebook}
    aria-label="Facebook"
  >
    <svg width="39" height="26" viewBox="0 0 39 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.3179 4.6465H3.88994V12.3145H15.7339V15.8785H3.88994V25.5625H0.00193751V1.0825H17.3179V4.6465ZM30.0563 8.2105C34.8083 8.2105 38.6603 12.1705 38.6603 17.0665C38.6603 22.0345 34.8083 25.9945 30.0563 25.9945C27.8963 25.9945 26.0603 25.3465 24.6563 24.2305V25.5625H20.9123V0.00249863H24.6563V9.9385C26.0603 8.8585 27.8963 8.2105 30.0563 8.2105ZM29.5163 22.6105C32.6483 22.6105 34.9163 20.0905 34.9163 17.0665C34.9163 14.0785 32.6483 11.5945 29.5163 11.5945C27.6443 11.5945 25.9163 12.2065 24.6563 13.9705V20.1985C25.9163 21.9625 27.6443 22.6105 29.5163 22.6105Z" fill="white"/>
    </svg>
  </a>
  {/* <a
    href="https://twitter.com/Integra_Magna/"
    target="_blank"
    rel="noopener noreferrer"
    className={styles.twiter}
    aria-label="Twitter / X"

  >
    <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.7876 24.4766H18.2876L11.4116 15.2606L4.49956 24.4766H-0.000437461L8.78356 12.3446L0.215563 -0.00343776H4.93156L11.3756 9.24856L17.8196 -0.00343776H22.5356L13.9676 12.3446L22.7876 24.4766Z" fill="white"/>
    </svg>
  </a> */}
  {/* <a
    href="https://www.behance.net/integra_magna/"
    target="_blank"
    rel="noopener noreferrer"
    className={styles.behance}
      aria-label="Behance"
  >
    <svg width="41" height="25" viewBox="0 0 41 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.9779 11.8046C18.3259 12.4526 19.9099 14.8646 19.9099 17.7806C19.9099 21.7766 16.4539 24.4766 11.0179 24.4766H0.00193751V-0.00343776H10.6219C15.6979 -0.00343776 18.7219 2.40856 18.7219 6.29656C18.7219 8.85256 17.3179 11.0126 14.9779 11.8046ZM10.1899 3.41656H3.88994V10.6166H10.0099C13.2859 10.6166 15.0859 9.06856 15.0859 6.80056C15.0859 4.67656 13.3219 3.41656 10.1899 3.41656ZM10.8739 21.0566C14.2579 21.0566 16.0939 19.4006 16.0939 17.3126C16.0939 15.1166 14.1499 13.8206 11.0179 13.8206H3.88994V21.0566H10.8739ZM31.7143 7.12456C37.3303 7.12456 40.8223 11.4086 40.1023 17.1326H26.8183C27.1783 19.6886 28.7983 21.6326 31.9663 21.6326C33.6223 21.6326 34.8823 21.1286 35.5663 20.0486H39.6703C38.5903 23.1086 35.6023 24.9086 31.9303 24.9086C26.6023 24.9086 23.0023 21.0566 23.0023 16.0166C23.0023 11.0126 26.5663 7.12456 31.7143 7.12456ZM31.7503 10.2926C28.9423 10.2926 27.3223 12.1646 26.8903 14.5406H36.3943C36.1783 11.7686 34.3783 10.2926 31.7503 10.2926Z" fill="white"/>
    </svg>
  </a> */}
</div>
          </div>
          <div className={styles.bottom}>
            <h4>Privacy Policy</h4>
            <p>Copyright © 2026 Rabtora</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
