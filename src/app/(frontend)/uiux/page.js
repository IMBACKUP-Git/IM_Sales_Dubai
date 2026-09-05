export const metadata = {
  title: 'UI/UX Design Agency in Dubai | Rabtora',
  description: "UAE's trusted UI/UX design agency. We design interfaces that drive more clicks, signups, and conversions for websites, apps, and digital products. Get a free quote in 24 hours.",
  keywords: [
    'UI UX design agency Dubai',
    'UX design UAE',
    'UI design agency',
    'user experience design Dubai',
    'conversion rate optimization',
    'app UI design Dubai',
    'website UX design UAE',
    'product design agency Dubai',
    'UI UX designer UAE',
  ],
  openGraph: {
    title: 'UI/UX Design Agency in Dubai | Rabtora',
    description: "UAE's trusted UI/UX design agency. We design interfaces that drive more clicks, signups, and conversions — for websites, apps, and digital products.",
    url: 'https://impact.rabtora.ae/uiux',
    siteName: 'Rabtora',
    type: 'website',
    images: [
      {
        url: 'https://impact.rabtora.ae/og.png',
        width: 1200,
        height: 630,
        alt: 'Rabtora UI/UX Design Agency Dubai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Rabtora',
    title: 'UI/UX Design Agency in Dubai | Rabtora',
    images: ['https://impact.rabtora.ae/og.png'],
  },
  alternates: {
    canonical: 'https://rabtora.com/uiux',
  },
}

import Footer from './Components/Footer/footerCopy'
import Navbar from './Components/Navbar/Navbar'
import Landing from './Components/Landing/Landing'
import Contact from './Components/Contact/Contact'
import StickyCta from './Components/StickyCta/StickyCta'
import styles from './page.module.css'
import TextTop from './Components/TextTop/TextTop'
// import ClutchSection from './Components/Clutch/clutch'
import FAQS from './Components/FAQS/FAQS'
import Trust from './Components/Trust/Trust'
import WhyUs from './Components/WhyUs/WhyUs'
import DesignBuild from './Components/DesignBuild/DesignBuild'
import HowWorks from './Components/HowWorks/HowWorks'
import StartSection from './Components/StartSection/StartSection'
import Youhaveseen from './Components/Youhaveseen/Youhaveseen'
import Work from './Components/Work/Work'
import YourInterface from './Components/YourInterface/YourInterface'
// import Imageanime from './Components/Imageanime/Imageanime'
// import ConvexGallery from './Components/ConvexGallery/ConvexGallery'

export default function UIUXPage() {
  return (
    <>
      <Navbar />
      <div className={styles.hero}>
        <Landing />
      </div>
      <TextTop />
      <Trust />
      <Work />
      <YourInterface />
      <WhyUs />
      {/* <Imageanime /> */}
      <DesignBuild />
      <HowWorks />
      <Youhaveseen />
      {/* <ClutchSection /> */}
      <Contact />
      <FAQS />
      <StartSection />
      {/* <ConvexGallery /> */}
      <Footer />
      <StickyCta />
    </>
  )
}
