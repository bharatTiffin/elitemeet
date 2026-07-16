import { getCanonicalUrl, SITE_URL } from './publicSeo';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EducationalOrganization'],
    name: 'Elite Academy',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description:
      'Elite Academy provides Punjab government exam coaching, SSC coaching, online classes, books, test series and mentorship for PSSSB, Punjab Police and competitive exams in Chandigarh and Punjab.',
    email: '2025eliteacademy@gmail.com',
    telephone: '+91-7696954686',
    sameAs: [
      'https://www.instagram.com/happy_khore/',
      'https://www.youtube.com/@itsmehappysingh/',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-7696954686',
        contactType: 'customer service',
        email: '2025eliteacademy@gmail.com',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi', 'pa'],
      },
    ],
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'SCO 144, Sector 24-D',
        addressLocality: 'Chandigarh',
        addressRegion: 'Punjab',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '1st Floor, Shop No. 18, Above PB 23 Outfit, City Center',
        addressLocality: 'Sirhind',
        postalCode: '140406',
        addressRegion: 'Punjab',
        addressCountry: 'IN',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Chandigarh' },
      { '@type': 'City', name: 'Mohali' },
      { '@type': 'City', name: 'Panchkula' },
      { '@type': 'City', name: 'Zirakpur' },
      { '@type': 'AdministrativeArea', name: 'Fatehgarh Sahib' },
      { '@type': 'AdministrativeArea', name: 'Punjab' },
    ],
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EducationalOrganization'],
    name: 'Elite Academy Chandigarh',
    url: SITE_URL,
    telephone: '+91-7696954686',
    email: '2025eliteacademy@gmail.com',
    image: `${SITE_URL}/favicon.ico`,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'SCO 144, Sector 24-D',
      addressLocality: 'Chandigarh',
      addressRegion: 'Punjab',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.7333,
      longitude: 76.7794,
    },
    areaServed: [
      { '@type': 'City', name: 'Chandigarh' },
      { '@type': 'City', name: 'Mohali' },
      { '@type': 'City', name: 'Panchkula' },
      { '@type': 'City', name: 'Zirakpur' },
      { '@type': 'AdministrativeArea', name: 'Fatehgarh Sahib' },
      { '@type': 'AdministrativeArea', name: 'Punjab' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Government Exam Coaching',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'SSC Coaching',
            description: 'SSC CGL, CHSL, GD and central government exam coaching',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'PSSSB Coaching',
            description: 'Punjab Subordinate Services Selection Board exam coaching',
          },
        },
      ],
    },
  };
}

export function getBreadcrumbSchema(path, breadcrumbLabel) {
  if (!path || path === '/') {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: breadcrumbLabel,
        item: getCanonicalUrl(path),
      },
    ],
  };
}

export function getCourseSchema({ name, description, path, courseName }) {
  const displayName = courseName || name;
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: displayName,
    description,
    url: getCanonicalUrl(path),
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Elite Academy',
      url: SITE_URL,
      telephone: '+91-7696954686',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'SCO 144, Sector 24-D',
        addressLocality: 'Chandigarh',
        addressRegion: 'Punjab',
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'Competitive exam preparation',
    inLanguage: ['en', 'hi'],
    courseMode: ['onsite', 'online'],
    teaches: 'Staff Selection Commission examination preparation including reasoning, quantitative aptitude, English and general awareness',
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        courseWorkload: 'PT6M',
        location: {
          '@type': 'Place',
          name: 'Elite Academy Chandigarh',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'SCO 144, Sector 24-D',
            addressLocality: 'Chandigarh',
            addressRegion: 'Punjab',
            addressCountry: 'IN',
          },
        },
      },
      {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'PT6M',
      },
    ],
  };
}

export function getProductSchema({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url: getCanonicalUrl(path),
    brand: {
      '@type': 'Organization',
      name: 'Elite Academy',
    },
  };
}

export function getFaqSchema(faqItems) {
  if (!faqItems?.length) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: flattenFaqAnswer(answer),
      },
    })),
  };
}

function flattenFaqAnswer(answer) {
  if (typeof answer === 'string') {
    return answer;
  }

  return answer
    .map((part) => {
      if (typeof part === 'string') {
        return part;
      }
      if (part.type === 'link') {
        return part.label;
      }
      if (part.type === 'phone') {
        return part.label || part.number;
      }
      return '';
    })
    .join('');
}

export function getPageStructuredData(pageSeo) {
  if (!pageSeo) {
    return [];
  }

  const schemas = [];
  const {
    path,
    title,
    description,
    breadcrumb,
    schemaType,
    includeEducationalOrg,
    includeLocalBusiness,
    courseName,
  } = pageSeo;

  if (schemaType === 'contact' || includeEducationalOrg) {
    schemas.push(getOrganizationSchema());
  }

  if (schemaType === 'contact' || includeLocalBusiness) {
    schemas.push(getLocalBusinessSchema());
  }

  if (schemaType === 'course') {
    schemas.push(getCourseSchema({ name: title, description, path, courseName }));
  }

  if (schemaType === 'product') {
    schemas.push(getProductSchema({ name: title, description, path }));
  }

  const breadcrumbSchema = getBreadcrumbSchema(path, breadcrumb);
  if (breadcrumbSchema) {
    schemas.push(breadcrumbSchema);
  }

  return schemas;
}
