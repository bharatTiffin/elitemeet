import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';
import { getBlogPostBySlug } from '../../config/blogs';
import { getBreadcrumbSchema, getFaqSchema, getOrganizationSchema } from '../../config/structuredData';
import { getCanonicalUrl } from '../../config/publicSeo';

function shareArticle(url, title) {
  if (navigator.share) {
    navigator.share({ title, url }).catch(() => {});
    return;
  }

  navigator.clipboard.writeText(url).catch(() => {});
}

export default function BlogArticle({ article, children, sections = [], faqItems = [] }) {
  const { slug } = useParams();
  const post = useMemo(() => article || getBlogPostBySlug(slug), [article, slug]);
  const [copied, setCopied] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle Escape key and scroll prevention for lightbox
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    if (isLightboxOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isLightboxOpen]);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-2xl font-semibold">Blog article not found</h1>
          <p className="mt-3 text-slate-400">The content you are looking for is unavailable right now.</p>
          <Link to="/blog" className="mt-6 inline-flex rounded-full bg-blue-600 px-4 py-2 font-semibold text-white">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const articleSections = post.sections || sections;
  const articleFaqs = post.faqs || faqItems;
  const canonicalUrl = getCanonicalUrl(`/blog/${post.slug}`);
  const tocItems = (articleSections || []).filter((section) => section.title);
  const quickSummary = post.quickSummary || [
    { label: 'Posts', value: '681' },
    { label: 'Advertisement', value: '03/2026' },
    { label: 'Apply Starts', value: '10 July 2026' },
    { label: 'Qualification', value: 'ITI / Diploma / BE / BTech' },
    { label: 'Punjabi Required', value: 'Yes' },
  ];
  const relatedLinks = [
    {
      title: 'PSSSB Coaching',
      path: '/psssb-coaching',
      description: 'Structured preparation for PSSSB aspirants with live classes, PYQs and mock tests.',
    },
    {
      title: 'Punjab Police Coaching',
      path: '/punjab-police-coaching',
      description: 'Smart training for Punjab Police recruitment with current exam-focused material.',
    },
    {
      title: 'Patwari Coaching',
      path: '/patwari-coaching',
      description: 'Focused Patwari preparation with practice sets, revision plans and test series.',
    },
    {
      title: 'SSC Coaching',
      path: '/ssc-coaching',
      description: 'Complete SSC preparation support with topic-wise learning and weekly assessments.',
    },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${getCanonicalUrl('/')}/favicon.ico`,
    author: {
      '@type': 'Organization',
      name: 'Elite Academy',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Elite Academy',
      url: getCanonicalUrl('/'),
    },
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    keywords: post.keywords?.join(', '),
    articleSection: post.category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: post.title,
    url: canonicalUrl,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    breadcrumb: {
      '@id': `${canonicalUrl}#breadcrumb`,
    },
  };

  const faqSchema = getFaqSchema(articleFaqs);
  const breadcrumbSchema = getBreadcrumbSchema(`/blog/${post.slug}`, post.title);
  const organizationSchema = getOrganizationSchema();

  const handleShare = () => {
    shareArticle(canonicalUrl, post.title);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <PageSeo
        path={`/blog/${post.slug}`}
        titleOverride={post.title}
        descriptionOverride={post.description}
        keywords={post.keywords?.join(', ')}
        imageUrl="/psssb-craft-instructor-recruitment-2026.jpeg"
        publishedTime={post.date}
        modifiedTime={post.updatedDate || post.date}
        author={post.author}
        publisher="Elite Academy"
        article
        section={post.category}
        tags={post.tags}
        extraSchema={[articleSchema, breadcrumbSchema, faqSchema, webPageSchema, organizationSchema].filter(Boolean)}
      />

      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_45%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-400" id="breadcrumb">
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-blue-300">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-blue-300">Blog</Link>
              <span>/</span>
              <span className="text-slate-200">{post.title}</span>
            </div>
          </nav>

          <header className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr] lg:items-start">
            <div className="space-y-5">
              <span className="inline-flex w-fit items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-200">
                {post.heroBadge}
              </span>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">{post.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.updatedDate || post.date}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share this article"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {copied ? 'Link copied' : 'Share this article'}
                </button>
                <a
                  href="https://www.sssb.punjab.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20"
                >
                  Official Website
                </a>
                <a
                  href="https://www.sssb.punjab.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Official Short Notice
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20">
              {post.heroImage ? (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    style={{ cursor: 'zoom-in' }}
                    className="mx-auto flex w-full max-w-[460px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/10 bg-white p-3 shadow-lg shadow-black/20 transition hover:shadow-xl hover:shadow-black/30 sm:max-w-[420px] lg:max-w-[460px]"
                    aria-label="Open image in full size"
                  >
                    <img
                      src={post.heroImage}
                      alt={post.heroImageAlt || post.title}
                      title={post.heroImageTitle || post.title}
                      loading="lazy"
                      className="mx-auto h-auto w-full object-contain"
                    />
                  </button>
                  <p className="text-center text-sm text-slate-500">
                    🔍 Click the image to view it in full size.
                  </p>
                  {(post.heroImageAlt || post.heroImageTitle || post.heroImageCaption) && (
                    <p className="text-sm leading-6 text-slate-400">
                      {post.heroImageCaption || post.heroImageTitle || post.heroImageAlt || 'Featured image'}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex h-44 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/60 via-indigo-600/40 to-slate-800">
                    <div className="rounded-2xl border border-white/20 bg-black/20 px-6 py-5 text-center backdrop-blur-sm">
                      <div className="text-3xl font-semibold tracking-[0.25em] text-white">EA</div>
                      <p className="mt-2 text-sm uppercase tracking-[0.35em] text-blue-100">Recruitment Guide</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3 text-sm text-slate-400">
                    <p className="font-semibold uppercase tracking-[0.25em] text-blue-300">Why this guide matters</p>
                    <p>It combines the latest notification update, exam preparation insight and a practical action plan for aspirants.</p>
                  </div>
                </>
              )}
            </div>
          </header>

          <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Quick summary</p>
                <h2 className="text-2xl font-semibold text-white">Key highlights from the short notice</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {quickSummary.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-10 lg:grid-cols-[1.8fr_0.8fr]">
            <div className="space-y-10">
              {tocItems.length > 0 && (
                <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                  <h2 className="text-xl font-semibold text-white">Table of contents</h2>
                  <ul className="mt-4 space-y-2 text-sm text-slate-400">
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="transition hover:text-blue-300">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                <h2 className="text-2xl font-semibold text-white">Internal links for smart preparation</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <Link to="/psssb-coaching" className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300 transition hover:border-blue-400/50 hover:text-white">
                    PSSSB Coaching
                  </Link>
                  <Link to="/punjab-police-coaching" className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300 transition hover:border-blue-400/50 hover:text-white">
                    Punjab Police Coaching
                  </Link>
                  <Link to="/patwari-coaching" className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300 transition hover:border-blue-400/50 hover:text-white">
                    Patwari Coaching
                  </Link>
                  <Link to="/ssc-coaching" className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300 transition hover:border-blue-400/50 hover:text-white">
                    SSC Coaching
                  </Link>
                </div>
              </section>

              <article className="space-y-8">
                {children || (articleSections || []).map((section) => (
                  <section key={section.id} id={section.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                    <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                    <div className="mt-4 space-y-4 text-[1rem] leading-8 text-slate-300">
                      {section.paragraphs?.map((paragraph, index) => (
                        <p key={`${section.id}-${index}`}>{paragraph}</p>
                      ))}
                      {section.bulletPoints?.length > 0 && (
                        <ul className="list-disc space-y-2 pl-6">
                          {section.bulletPoints.map((item, index) => (
                            <li key={`${section.id}-bullet-${index}`}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {section.table && (
                        <div className="overflow-x-auto">
                          <table className="min-w-full border-collapse text-left text-sm">
                            <thead>
                              <tr className="bg-slate-800/70 text-slate-100">
                                {section.table.headers.map((header) => (
                                  <th key={header} className="border border-slate-700 px-3 py-2">{header}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.table.rows.map((row, index) => (
                                <tr key={`${section.id}-row-${index}`} className="odd:bg-slate-900/50">
                                  {row.map((cell) => (
                                    <td key={`${section.id}-${cell}`} className="border border-slate-800 px-3 py-2 text-slate-300">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </section>
                ))}
              </article>

              <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                <h2 className="text-2xl font-semibold text-white">Frequently asked questions</h2>
                <div className="mt-6 space-y-3">
                  {articleFaqs.map((faq) => (
                    <details key={faq.question} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                      <summary className="cursor-pointer text-base font-medium text-white">{faq.question}</summary>
                      <p className="mt-3 text-sm leading-7 text-slate-400">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Continue reading</p>
                    <h2 className="text-2xl font-semibold text-white">Related articles</h2>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {relatedLinks.map((link) => (
                    <Link key={link.path} to={link.path} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:border-blue-400/50 hover:bg-slate-800/70">
                      <h3 className="text-lg font-semibold text-white">{link.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{link.description}</p>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-slate-950/80 p-6 shadow-xl shadow-black/20">
                <h2 className="text-2xl font-semibold text-white">Preparing for PSSSB?</h2>
                <p className="mt-3 max-w-2xl text-slate-300">
                  Students preparing for PSSSB examinations can join Elite Academy for online and offline coaching, mock tests, tracker app support, study material and previous year questions that help create a structured preparation plan.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/online-coaching" className="rounded-full bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500">
                    Join Elite Academy
                  </Link>
                  <Link to="/books" className="rounded-full border border-white/10 px-4 py-2 font-semibold text-slate-200 transition hover:bg-white/10">
                    Explore Books
                  </Link>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {['Live Classes', 'Recorded Classes', 'Tracker App', 'Mock Tests', 'Weekly Tests', 'PYQs', 'Study Material'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
              <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                <h2 className="text-lg font-semibold text-white">On this page</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="transition hover:text-blue-300">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                <h2 className="text-lg font-semibold text-white">Related guides</h2>
                <div className="mt-4 space-y-3">
                  {relatedLinks.map((link) => (
                    <Link key={link.path} to={link.path} className="block rounded-2xl border border-white/10 bg-slate-900/70 p-3 transition hover:border-blue-400/50 hover:bg-slate-800/70">
                      <h3 className="text-sm font-semibold text-white">{link.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{link.description}</p>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                <h2 className="text-lg font-semibold text-white">Useful links</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-400">
                  <a href="https://www.sssb.punjab.gov.in/" target="_blank" rel="noreferrer" className="block hover:text-blue-300">
                    Official PSSSB Website
                  </a>
                  <Link to="/monthly-current-affairs" className="block hover:text-blue-300">
                    Monthly Current Affairs
                  </Link>
                  <Link to="/books" className="block hover:text-blue-300">
                    Study Books
                  </Link>
                  <Link to="/online-coaching" className="block hover:text-blue-300">
                    Online Coaching
                  </Link>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && post.heroImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative flex flex-col items-center justify-center px-4 py-4 sm:py-6 lg:py-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image with Animation */}
            <div className="transition-all duration-300" style={{ opacity: 1, transform: 'scale(1)' }}>
              <img
                src={post.heroImage}
                alt={post.heroImageAlt || post.title}
                className="h-auto w-auto object-contain"
                style={{
                  maxWidth: '95vw',
                  maxHeight: '90vh',
                }}
              />
            </div>

            {/* Image Information Below */}
            <div className="mt-6 text-center text-sm text-slate-300 sm:mt-8">
              <p className="font-semibold text-white">Official Short Notice</p>
              <p className="mt-1 text-slate-400">Advertisement No. 03/2026</p>
              <p className="mt-1 text-slate-500">Released on 07 July 2026</p>
            </div>
          </div>

          {/* Keyboard hint for desktop */}
          <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 transform text-xs text-slate-400 sm:block">
            Press <kbd className="rounded bg-white/10 px-2 py-1">ESC</kbd> to close
          </div>
        </div>
      )}
    </>
  );
}
