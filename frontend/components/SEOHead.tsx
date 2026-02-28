import Head from 'next/head'
import { useTranslation } from '../lib/i18n'

interface SEOHeadProps {
  titleFr: string
  titleEn: string
  descriptionFr: string
  descriptionEn: string
  keywordsFr: string
  keywordsEn: string
  canonical: string
  robots?: string
  structuredData?: object
}

export default function SEOHead({
  titleFr,
  titleEn,
  descriptionFr,
  descriptionEn,
  keywordsFr,
  keywordsEn,
  canonical,
  robots = 'index, follow',
  structuredData
}: SEOHeadProps) {
  const { locale } = useTranslation()
  const isFrench = locale === 'fr'
  
  const title = isFrench ? titleFr : titleEn
  const description = isFrench ? descriptionFr : descriptionEn
  const keywords = isFrench ? keywordsFr : keywordsEn
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={isFrench ? 'fr_CA' : 'en_CA'} />
      <meta property="og:site_name" content="Q-MÉTIER" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Canonical & Robots */}
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />
      
      {/* Language & Location */}
      <meta name="language" content={isFrench ? 'French' : 'English'} />
      <meta name="geo.region" content="CA-QC" />
      <meta name="geo.placename" content="Quebec" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Head>
  )
}
