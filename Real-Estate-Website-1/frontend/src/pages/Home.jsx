import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Properties from '../components/propertiesshow'
import Stats from '../components/Stats'
import Testimonials from '../components/testimonial'
import WhyChooseUs from '../components/WhyChooseUs'
import MarketTrends from '../components/MarketTrends'
import Companies from '../components/Companies'
import Features from '../components/Features'
import Steps from '../components/Steps'
import Blog from '../components/Blog'

// SEO Schema Markup
const SCHEMA_MARKUP = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Choice Properties",
  "description": "Fair rental housing for renters with bad credit, evictions, or broken leases. 5-7 day approvals. Solutions for applicants denied everywhere else.",
  "url": "https://choiceproperties.com",
  "telephone": "+1-800-PROPERTIES",
  "sameAs": [
    "https://facebook.com/choiceproperties",
    "https://twitter.com/choiceproperties"
  ],
  "areaServed": "US",
  "priceRange": "$$",
  "image": "https://choiceproperties.com/og-image.png",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "2847"
  }
}

const Home = ({ setShowNewsletter }) => {
  useEffect(() => {
    // Show newsletter after 15 seconds
    const timer = setTimeout(() => {
      if (setShowNewsletter && !localStorage.getItem('newsletterDismissed')) {
        setShowNewsletter(true);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [setShowNewsletter]);

  return (
    <div>
      <Helmet>
        <title>Rentals for Everyone | Choice Properties - Approved Despite Bad Credit</title>
        <meta name="description" content="Approved for rentals even with bad credit, evictions, or broken leases. 5-7 day approvals. 25K+ verified properties. Fair housing for denied applicants." />
        <meta name="keywords" content="rentals bad credit, approved with eviction, broken lease rental, fast rental approval, second chance housing" />
        <meta property="og:title" content="Choice Properties - Fair Rentals for Everyone" />
        <meta property="og:description" content="Get approved for rentals even with bad credit or past evictions. 5-7 day approvals. No judgment." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://choiceproperties.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Choice Properties - Approved with Bad Credit" />
        <meta name="twitter:description" content="Fair rental housing for renters with challenging backgrounds. Second chance rentals, 5-7 day approvals." />
        <link rel="canonical" href="https://choiceproperties.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json">
          {JSON.stringify(SCHEMA_MARKUP)}
        </script>
      </Helmet>
      
      {/* Optimized Page Structure */}
      <Hero />
      <Properties />
      <Testimonials />
      <Stats />
      <WhyChooseUs />
      <MarketTrends />
      <Companies />
      <Features />
      <Steps />
      <Blog />
    </div>
  )
}

export default Home
