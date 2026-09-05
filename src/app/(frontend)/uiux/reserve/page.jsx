export const metadata = {
  title: 'Reserve Your Spot | UI/UX Design Agency Dubai | Rabtora',
  description: "Reserve your spot with Rabtora's UI/UX design team. Tell us about your project and receive a clear, honest quote within 24 hours. No pitch, no jargon.",
  keywords: [
    'reserve UI UX design Dubai',
    'book UI UX agency UAE',
    'UI UX design quote Dubai',
    'UX design agency reservation',
    'UI design consultation UAE',
  ],
  openGraph: {
    title: 'Reserve Your Spot | UI/UX Design Agency Dubai | Rabtora',
    description: "Reserve your spot with Rabtora's UI/UX design team. Tell us about your project and receive a clear, honest quote within 24 hours.",
    url: 'https://impact.rabtora.ae/uiux/reserve',
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
    title: 'Reserve Your Spot | UI/UX Design Agency Dubai | Rabtora',
    images: ['https://impact.rabtora.ae/og.png'],
  },
  alternates: {
    canonical: 'https://impact.rabtora.ae/uiux/reserve',
  },
}

import Contact from '../Components/Contact/Contact'
import FAQS from '../Components/FAQS/FAQS'
import Footer from '../Components/Footer/footerCopy'
import StickyCta from '../Components/StickyCta/StickyCta'

export default function ReservePage() {
  return (
    <>
      <Contact />
      <FAQS />
      <div id="footer-sentinel" style={{ height: '1px' }} />
      <Footer />
      <StickyCta />
    </>
  )
}
