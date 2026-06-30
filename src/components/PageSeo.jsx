import { Helmet } from '@dr.pogodin/react-helmet';
import { getCanonicalUrl, getPageSeo } from '../config/publicSeo';
import { getPageStructuredData } from '../config/structuredData';

/**
 * Renders complete SEO metadata for a public page from the central config.
 * Supports optional overrides for dynamic titles/descriptions (e.g. API-driven content).
 */
export default function PageSeo({
  path,
  titleOverride,
  descriptionOverride,
  noindex = false,
  extraSchema = [],
}) {
  const pageSeo = getPageSeo(path);

  if (!pageSeo) {
    return null;
  }

  const title = titleOverride || pageSeo.title;
  const description = descriptionOverride || pageSeo.description;
  const canonical = getCanonicalUrl(path);
  const schemas = [...getPageStructuredData(pageSeo), ...extraSchema].filter(Boolean);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {schemas.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
