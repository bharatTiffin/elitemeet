import psssbCoaching from './psssbCoaching';
import punjabPoliceCoaching from './punjabPoliceCoaching';
import sscCoaching from './sscCoaching';
import bankingCoaching from './bankingCoaching';
import patwariCoaching from './patwariCoaching';

/**
 * Registry of all exam landing page configurations.
 * Add new exam configs here to automatically register routes and sitemap entries.
 */
export const EXAM_LANDING_CONFIGS = [
  psssbCoaching,
  punjabPoliceCoaching,
  sscCoaching,
  bankingCoaching,
  patwariCoaching,
];

export function getExamLandingConfigByPath(path) {
  return EXAM_LANDING_CONFIGS.find((config) => config.slug === path);
}

/** Convert exam configs to PUBLIC_PAGES entries for SEO and sitemap */
export function getExamLandingPublicPages() {
  return EXAM_LANDING_CONFIGS.map((config) => ({
    path: config.slug,
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords,
    changefreq: config.seo.changefreq || 'weekly',
    priority: config.seo.priority || 0.85,
    breadcrumb: config.seo.breadcrumb || config.examName,
    schemaType: config.seo.schemaType || 'course',
    includeEducationalOrg: config.seo.includeEducationalOrg !== false,
  }));
}

export {
  psssbCoaching,
  punjabPoliceCoaching,
  sscCoaching,
  bankingCoaching,
  patwariCoaching,
};
