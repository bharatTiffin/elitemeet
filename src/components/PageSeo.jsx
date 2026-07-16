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
  keywords,
  noindex = false,
  extraSchema = [],
  imageUrl,
  publishedTime,
  modifiedTime,
  author,
  publisher,
  article = false,
  section,
  tags = [],
  courseName,
}) {
  const pageSeo = getPageSeo(path);

  if (!pageSeo) {
    return null;
  }

  const title = titleOverride || pageSeo.title;
  const description = descriptionOverride || pageSeo.description;
  const metaKeywords = keywords || pageSeo.keywords;
  const canonical = getCanonicalUrl(path);
  const featuredImage = imageUrl || '/favicon.ico';
  const seoConfig = {
    ...pageSeo,
    title,
    description,
    courseName: courseName || pageSeo.courseName,
    includeLocalBusiness: pageSeo.includeLocalBusiness,
    includeEducationalOrg: pageSeo.includeEducationalOrg,
  };
  const schemas = [...getPageStructuredData(seoConfig), ...extraSchema].filter(Boolean);
  const articleType = article ? 'article' : 'website';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={articleType} />
      <meta property="og:site_name" content="Elite Academy" />
      <meta property="og:image" content={featuredImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={featuredImage} />
      <meta name="author" content={author || 'Elite Academy'} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      {publisher && <meta property="article:publisher" content={publisher} />}
      {schemas.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
