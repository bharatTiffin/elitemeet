import { getCanonicalUrl, SITE_URL } from './publicSeo';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EducationalOrganization'],
    name: 'Elite Academy',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description:
      'Elite Academy provides Punjab government exam coaching, online classes, books, test series and mentorship for PSSSB, Punjab Police and competitive exams.',
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
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Elite Academy Chandigarh',
    url: SITE_URL,
    telephone: '+91-7696954686',
    email: '2025eliteacademy@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'SCO 144, Sector 24-D',
      addressLocality: 'Chandigarh',
      addressRegion: 'Punjab',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
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

export function getCourseSchema({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url: getCanonicalUrl(path),
    provider: {
      '@type': 'Organization',
      name: 'Elite Academy',
      url: SITE_URL,
    },
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
  const { path, title, description, breadcrumb, schemaType, includeEducationalOrg } = pageSeo;

  if (schemaType === 'contact' || includeEducationalOrg) {
    schemas.push(getOrganizationSchema());
  }

  if (schemaType === 'contact') {
    schemas.push(getLocalBusinessSchema());
  }

  if (schemaType === 'course') {
    schemas.push(getCourseSchema({ name: title, description, path }));
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
