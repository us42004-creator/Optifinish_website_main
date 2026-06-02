/**
 * OptiFinish — centralised SEO / GEO / AIO config
 * All schema, metadata defaults, and entity data lives here.
 */

export const SITE = {
  name:        'OptiFinish',
  legalName:   'Value Added Coating Solutions Pvt. Ltd.',
  shortName:   'VACSPL',
  url:         'https://www.optifinish.in',
  logo:        'https://www.optifinish.in/images/logos/optifinish-logo.png',
  ogImage:     'https://www.optifinish.in/images/og-default.jpg',
  tagline:     'Powder Coating Plants, Automation & GEMA Equipment — India',
  description: 'Powder coating plants, curing ovens & automation — manufactured in Greater Noida. Authorised GEMA & Dürr partner in India. Z-TAP robot. Get a quote.',
  phone:       '+91-96434-03374',
  email:       'info@optifinish.in',
  founded:     '2011',  // VACSPL registration year; founders' journey since 1999 is handled in about page content
  employees:   '11-50',
};

export const ADDRESS = {
  street:       'K-288, Q-21 (GF & FF), SITE-V, Surajpur Industrial Area',
  city:         'Greater Noida',
  district:     'Gautam Budh Nagar',
  state:        'Uttar Pradesh',
  stateCode:    'UP',
  postalCode:   '201306',
  country:      'India',
  countryCode:  'IN',
  geo: {
    lat:  28.4595,
    lng:  77.5022,
  },
};

export const SOCIAL = {
  linkedin:  'https://www.linkedin.com/company/value-added-coating-solution',
  youtube:   'https://www.youtube.com/@vacspl',
  instagram: 'https://www.instagram.com/vacspl',
  facebook:  'https://www.facebook.com/optifinish.connect',
};

// ─── Schema.org JSON-LD blocks ──────────────────────────────────────────────

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ManufacturingBusiness'],
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  alternateName: ['VACSPL', 'Value Added Coating Solutions'],
  url: SITE.url,
  logo: {
    '@type': 'ImageObject',
    url: SITE.logo,
    width: 400,
    height: 400,
  },
  image: SITE.logo,
  description: SITE.description,
  slogan: SITE.tagline,
  foundingDate: SITE.founded,
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 30 },
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.state,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude:  ADDRESS.geo.lat,
    longitude: ADDRESS.geo.lng,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    {
      '@type': 'ContactPoint',
      email: SITE.email,
      contactType: 'customer support',
      areaServed: 'IN',
    },
  ],
  sameAs: Object.values(SOCIAL),
  knowsAbout: [
    'Powder Coating',
    'Industrial Coating Automation',
    'Curing Ovens',
    'Spray Booths',
    'GEMA Powder Coating Equipment',
    'DÜRR Liquid Coating Systems',
    'Pretreatment Systems',
    'Surface Finishing Technology',
    'Coating Plant Manufacturing',
  ],
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'City', name: 'Greater Noida', containedInPlace: { '@type': 'State', name: 'Uttar Pradesh' } },
    { '@type': 'City', name: 'Delhi' },
    { '@type': 'City', name: 'Noida' },
    { '@type': 'City', name: 'Gurgaon' },
    { '@type': 'City', name: 'Faridabad' },
    { '@type': 'City', name: 'Agra' },
    { '@type': 'City', name: 'Lucknow' },
    { '@type': 'City', name: 'Pune' },
    { '@type': 'City', name: 'Mumbai' },
    { '@type': 'City', name: 'Ahmedabad' },
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'City', name: 'Bengaluru' },
    { '@type': 'City', name: 'Hyderabad' },
    { '@type': 'City', name: 'Rajkot' },
    { '@type': 'City', name: 'Ludhiana' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'OptiFinish Product & Service Catalogue',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Powder Coating Plant',            url: `${SITE.url}/products/optifinish-manufactured/powder-coating-plant` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Curing Oven',                     url: `${SITE.url}/products/optifinish-manufactured/curing-oven` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Powder Spray Booth',              url: `${SITE.url}/products/optifinish-manufactured/powder-spray-booth` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Liquid Spray Booth',              url: `${SITE.url}/products/optifinish-manufactured/liquid-spray-booth` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SS-304 Booth System',             url: `${SITE.url}/products/optifinish-manufactured/ss-booth-system` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cyclone & Dust Collector',        url: `${SITE.url}/products/optifinish-manufactured/cyclone-dust-collector` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pretreatment Line',               url: `${SITE.url}/products/optifinish-manufactured/pt-line` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wood Finish Oven',                url: `${SITE.url}/products/optifinish-manufactured/wood-finish-oven` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Z-TAP Coating Automation System', url: `${SITE.url}/products/automation/z-tap` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'OPTI-ZA-18 Vertical Reciprocator', url: `${SITE.url}/products/automation/za01` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automatic Sieve Machine',         url: `${SITE.url}/products/automation/sieve-machine` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GEMA Manual Powder Coating Gun',  url: `${SITE.url}/products/gema/manual-gun` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GEMA Automatic Powder Coating Gun', url: `${SITE.url}/products/gema/automatic-gun` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GEMA OptiCentre Powder Management', url: `${SITE.url}/products/gema/opticentre` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GEMA Reciprocators',              url: `${SITE.url}/products/gema/reciprocators` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'DÜRR Liquid Coating Systems',     url: `${SITE.url}/products/durr` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Powder Paints',                   url: `${SITE.url}/products/vinayak/powder-paints` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Adhesives',                       url: `${SITE.url}/products/vinayak/adhesives` } },
    ],
  },
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ManufacturingBusiness'],
  '@id': `${SITE.url}/#localbusiness`,
  name: SITE.name,
  image: SITE.logo,
  telephone: SITE.phone,
  email: SITE.email,
  url: SITE.url,
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.state,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude:  ADDRESS.geo.lat,
    longitude: ADDRESS.geo.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Bank Transfer, Cheque',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '47',
    bestRating: '5',
    worstRating: '1',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  publisher: { '@id': `${SITE.url}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/resources/blog?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-IN',
};

// ─── Metadata base defaults ─────────────────────────────────────────────────

export const metadataBase = new URL(SITE.url);

export const defaultOpenGraph = {
  type:        'website' as const,
  siteName:    SITE.name,
  locale:      'en_IN',
  images: [
    {
      url:    SITE.ogImage,
      width:  1200,
      height: 630,
      alt:    `${SITE.name} — ${SITE.tagline}`,
    },
  ],
};

export const defaultTwitter = {
  card:    'summary_large_image' as const,
  site:    '@optifinish',
  creator: '@optifinish',
  images:  [SITE.ogImage],
};

export const defaultKeywords = [
  'powder coating plant India',
  'powder coating plant manufacturer Greater Noida',
  'curing oven manufacturer India',
  'industrial spray booth manufacturer',
  'GEMA authorised distributor India',
  'DÜRR liquid coating systems India',
  'coating automation system India',
  'Z-TAP powder coating robot',
  'OptiFinish',
  'VACSPL',
  'Value Added Coating Solutions',
  'powder coating equipment supplier India',
  'conveyorised powder coating line',
  'surface finishing equipment India',
  'industrial coating solutions Greater Noida',
  'pretreatment line manufacturer',
  'coating plant installation India',
  'GEMA OptiFlex gun India',
  'GEMA OptiGun India',
  'powder coating booth manufacturer',
];

// ─── Breadcrumb helper ──────────────────────────────────────────────────────

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.href}`,
    })),
  };
}

// ─── Product schema helper ──────────────────────────────────────────────────

export function productSchema({
  name,
  description,
  image,
  url,
  category,
  brand = SITE.name,
  manufacturer = SITE.legalName,
  keywords = [],
}: {
  name: string;
  description: string;
  image?: string;
  url: string;
  category: string;
  brand?: string;
  manufacturer?: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image ? `${SITE.url}${image}` : SITE.logo,
    url: `${SITE.url}${url}`,
    category,
    keywords: keywords.join(', '),
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    manufacturer: {
      '@type': 'Organization',
      name: manufacturer,
      '@id': `${SITE.url}/#organization`,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE.url}/contact?product=${encodeURIComponent(name)}`,
      price: '0',
      priceCurrency: 'INR',
      description: 'Price available on request. Contact OptiFinish for a customised quote.',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE.url}/#organization` },
    },
  };
}

// ─── VideoObject schema helper ──────────────────────────────────────────────

export function videoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    publisher: { '@id': `${SITE.url}/#organization` },
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    ...(duration && { duration }),
  };
}

// ─── Article schema helper ──────────────────────────────────────────────────

export function articleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = SITE.name,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE.url}${url}`,
    image: image ? `${SITE.url}${image}` : SITE.ogImage,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Organization',
      name: authorName,
      '@id': `${SITE.url}/#organization`,
    },
    publisher: {
      '@id': `${SITE.url}/#organization`,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}${url}` },
  };
}

// ─── HowTo schema helper ────────────────────────────────────────────────────

export function howToSchema({
  name,
  description,
  steps,
  image,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string; image?: string }[];
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(image && { image: `${SITE.url}${image}` }),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.image && { image: `${SITE.url}${s.image}` }),
    })),
  };
}

// ─── Service schema helper ──────────────────────────────────────────────────

export function serviceSchema({
  name,
  description,
  url,
  serviceType,
  areaServed = 'India',
}: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE.url}${url}`,
    serviceType,
    areaServed: { '@type': 'Country', name: areaServed },
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      '@id': `${SITE.url}/#organization`,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE.url}/contact`,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };
}

// ─── FAQ schema helper ──────────────────────────────────────────────────────

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
