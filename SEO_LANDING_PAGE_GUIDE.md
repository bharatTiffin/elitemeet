# SEO Landing Page System — Developer Guide

This guide explains how to create and maintain government exam SEO landing pages for Elite Academy using the reusable architecture in `src/components/exam-landing/` and `src/config/examLandingPages/`.

---

## Overview

The system powers high-intent keyword landing pages such as:

- `/psssb-coaching`
- `/punjab-police-coaching` (future)
- `/ssc-coaching` (future)
- `/banking-coaching` (future)

Each page shares the same layout and components but is driven by a **configuration object**. Adding a new page requires **one config file** and **one line in the registry** — no JSX duplication.

All coaching landing pages convert visitors to `/online-coaching` (the existing purchase page). Authentication, payment flow, and purchase pages are **not modified** by this system.

---

## Architecture

```
src/
├── components/exam-landing/
│   ├── ExamLandingPage.jsx      # Main orchestrator — accepts config prop
│   ├── AnimatedBackground.jsx   # Fixed blur orbs (matches homepage)
│   ├── LandingNavbar.jsx        # Sticky nav with CTA
│   ├── HeroSection.jsx
│   ├── AboutExam.jsx
│   ├── PostsCovered.jsx
│   ├── WhyChooseUs.jsx
│   ├── CourseFeatures.jsx
│   ├── PreparationTimeline.jsx
│   ├── ResourcesSection.jsx
│   ├── BranchSection.jsx
│   ├── FAQSection.jsx
│   ├── FinalCTA.jsx
│   └── SectionWrapper.jsx
│
└── config/examLandingPages/
    ├── index.js                 # Registry — add new configs here
    ├── shared.js                # Reusable defaults (why choose us, resources, branches)
    └── psssbCoaching.js         # First page — use as template
```

---

## How to Create a New Landing Page

### Step 1 — Copy the template config

Duplicate `src/config/examLandingPages/psssbCoaching.js` and rename it (e.g. `punjabPoliceCoaching.js`).

### Step 2 — Edit the configuration

Update every exam-specific field:

| Field | Purpose |
|-------|---------|
| `slug` | URL path, e.g. `'/punjab-police-coaching'` |
| `examName` | Short name shown in navbar and breadcrumb |
| `seo.title` | Unique `<title>` tag |
| `seo.description` | Unique meta description (150–160 chars ideal) |
| `seo.keywords` | Comma-separated keywords |
| `seo.breadcrumb` | Breadcrumb label for structured data |
| `hero.title` | H1 heading |
| `hero.subtitle` | Hero paragraph |
| `about` | "What is [Exam]?" section — write original content |
| `posts` | Posts/roles covered |
| `faq.items` | ~10 SEO-friendly Q&A pairs |
| `timeline` | Use `buildDefaultTimeline('Exam', 'Final Step Label')` from `shared.js` |
| `finalCta` | Bottom conversion section |

Reuse shared defaults where content is identical:

```js
import {
  DEFAULT_WHY_CHOOSE_US,
  DEFAULT_PROGRAM_FEATURES,
  DEFAULT_RESOURCES,
  DEFAULT_BRANCHES,
  buildDefaultTimeline,
} from './shared';
```

Override any section by providing a custom object instead of the default.

### Step 3 — Register in the index

Add your config to `src/config/examLandingPages/index.js`:

```js
import psssbCoaching from './psssbCoaching';
import punjabPoliceCoaching from './punjabPoliceCoaching';

export const EXAM_LANDING_CONFIGS = [
  psssbCoaching,
  punjabPoliceCoaching,  // ← add here
];
```

That's it. Routes, sitemap entries, and SEO metadata are registered automatically.

---

## How Routing Works

Routes are generated dynamically in `src/App.jsx`:

```jsx
{EXAM_LANDING_CONFIGS.map((config) => (
  <Route
    key={config.slug}
    path={config.slug}
    element={
      <Suspense fallback={<ExamLandingFallback />}>
        <ExamLandingPage config={config} />
      </Suspense>
    }
  />
))}
```

- `ExamLandingPage` is **lazy-loaded** for performance.
- Each config's `slug` becomes the route path.
- No manual route entry needed per page.

---

## How Metadata Works

### Central SEO registry

`getExamLandingPublicPages()` in `index.js` converts configs into `PUBLIC_PAGES` entries in `src/config/publicSeo.js`. This automatically:

- Adds the page to **sitemap.xml** (via vite-plugin-sitemap at build time)
- Enables `<PageSeo path={config.slug} />` to resolve title, description, and canonical URL

### Per-page SEO fields

Each config's `seo` object supports:

```js
seo: {
  title: 'Unique Page Title | Elite Academy',
  description: 'Unique meta description...',
  keywords: 'keyword1, keyword2, keyword3',
  breadcrumb: 'Page Name',
  changefreq: 'weekly',       // sitemap
  priority: 0.9,              // sitemap (0.0–1.0)
  schemaType: 'course',       // JSON-LD Course schema
  includeEducationalOrg: true // EducationalOrganization schema
}
```

### What PageSeo renders

For each landing page, `PageSeo` outputs:

- `<title>`
- Meta description
- Meta keywords
- Canonical URL (`https://eliteacademy.pro/your-slug`)
- Open Graph tags (title, description, url, type)
- Twitter Card tags
- JSON-LD structured data (see below)

---

## How Structured Data Works

Each landing page includes multiple schema types:

| Schema | Source |
|--------|--------|
| **Course** | `schemaType: 'course'` in config → `getCourseSchema()` |
| **EducationalOrganization** | `includeEducationalOrg: true` (default) → `getOrganizationSchema()` |
| **BreadcrumbList** | Auto-generated from `seo.breadcrumb` |
| **FAQPage** | Auto-generated from `faq.items` via `getFaqSchema()` |

FAQ answers with internal links are flattened to plain text in JSON-LD while rendering as clickable links in the UI.

Example FAQ item with links in the UI:

```js
{
  question: 'How do I enroll?',
  answer: [
    'Visit our ',
    { type: 'link', path: '/online-coaching', label: 'online coaching page' },
    ' to enroll.',
  ],
}
```

---

## Internal Linking Strategy

Each landing page naturally links to:

| Destination | Where |
|-------------|-------|
| `/` | Navbar logo, breadcrumb |
| `/online-coaching` | Hero CTA, navbar, final CTA, FAQ answers |
| `/books` | Resources section |
| `/weekly-test` | Resources section |
| `/sectional-test-series` | Resources section |
| `/current-affairs-book` | Resources section |
| `/monthly-current-affairs` | Resources section |
| `/pyqs-book` | Resources section |
| `/mentorship` | Resources section |
| `/contact-us` | Branch section, final CTA |

### Future expansion: informational pages

Create informational pages (syllabus, cutoff, PYQs) as separate configs or a lighter template. Link them to coaching pages:

```
/psssb-syllabus          → links to /psssb-coaching
/psssb-previous-year-papers → links to /psssb-coaching
/psssb-coaching          → links to /online-coaching
```

This creates a scalable internal linking hub that improves SEO across dozens of pages.

---

## Configuration Reference

Minimal config structure:

```js
const myExamCoaching = {
  slug: '/my-exam-coaching',
  examName: 'My Exam Coaching',
  ctaPath: '/online-coaching',

  seo: { title, description, keywords, breadcrumb, changefreq, priority, schemaType },
  hero: { badge, title, subtitle, ctaLabel },
  about: { title, paragraphs: [] },
  posts: { title, subtitle, items: [], footer },
  whyChooseUs: DEFAULT_WHY_CHOOSE_US,  // or custom
  program: { title, subtitle, features: [] },
  timeline: buildDefaultTimeline('Exam', 'Crack Exam'),
  resources: DEFAULT_RESOURCES,        // or custom
  branches: DEFAULT_BRANCHES,          // or custom
  faq: { title, subtitle, items: [{ question, answer }] },
  finalCta: { title, description, ctaLabel, secondaryText },
};

export default myExamCoaching;
```

---

## Design Consistency

All components use the existing Elite Academy design language:

- Dark theme (`bg-black`, `text-white`)
- Glassmorphism cards (`backdrop-blur-xl`, `border-white/10`)
- Gradient headings (`from-blue-400 via-purple-400 to-pink-400`)
- Gradient CTAs (`from-blue-500 to-purple-600`)
- Hover animations on cards
- Responsive grid layouts
- Animated background orbs (same as homepage)

Do not introduce new color palettes or layout systems when adding pages.

---

## Performance Notes

- `ExamLandingPage` is lazy-loaded via `React.lazy()` + `Suspense`
- No new npm dependencies added
- Static config objects — zero API calls on landing pages
- Components are small and tree-shakeable

---

## Checklist for Each New Page

- [ ] Create config file in `src/config/examLandingPages/`
- [ ] Register in `index.js` → `EXAM_LANDING_CONFIGS`
- [ ] Unique `seo.title` and `seo.description`
- [ ] Original `about` content (not copied from Wikipedia)
- [ ] ~10 FAQ items with exam-specific questions
- [ ] Verify page loads at the slug URL
- [ ] Verify CTA links to `/online-coaching`
- [ ] Run `npm run build` to confirm sitemap includes new route
- [ ] Test structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Planned Exam Pages

High-intent coaching keywords (same template):

| Slug | Exam |
|------|------|
| `/psssb-coaching` | Built |
| `/punjab-police-coaching` | Planned |
| `/ssc-coaching` | Planned |
| `/banking-coaching` | Planned |
| `/patwari-coaching` | Planned |
| `/naib-tehsildar-coaching` | Planned |
| `/clerk-coaching` | Planned |
| `/excise-inspector-coaching` | Planned |
| `/vdo-coaching` | Planned |

Informational pages (future lighter template):

| Slug | Links to |
|------|----------|
| `/psssb-syllabus` | `/psssb-coaching` |
| `/psssb-previous-year-papers` | `/psssb-coaching` |
| `/punjab-police-syllabus` | `/punjab-police-coaching` |
| `/punjab-police-cutoff` | `/punjab-police-coaching` |
| `/ssc-cgl-syllabus` | `/ssc-coaching` |

---

## Future Expansion Recommendations

1. **Informational page template** — A lighter variant of `ExamLandingPage` with syllabus tables, cutoff data, and PYQ lists that link back to coaching pages.
2. **Cross-linking map** — Add a `relatedPages` field to configs for automatic "Related Resources" sections.
3. **Homepage integration** — Add exam landing cards on the homepage pointing to `/psssb-coaching`, etc.
4. **Footer links** — Add an "Exam Coaching" column in `Footer.jsx` listing top landing pages.
5. **Dynamic OG images** — Generate per-exam Open Graph images for better social sharing.
6. **Analytics events** — Track CTA clicks per exam slug to measure conversion by keyword.
