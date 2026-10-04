---
name: recruitment-blog
description: Create an SEO + conversion-optimised recruitment blog for Elite Academy from a government job notice (PDF or image, often Punjabi). Use when the user shares an advertisement/notification PDF, says "new advertisement came", or asks to "make a blog" for a Punjab govt recruitment (SSSB/PSSSB, PPSC, High Court/SSSC, etc.). Reads the notice, builds the blog page, images, PDF download, and registers it for routing, sitemap and the blog index.
---

# Recruitment blog workflow (Elite Academy)

Project: `Elite-meet-frontend` (React + Vite + Tailwind). Blogs live in `src/pages/blog/`.
Goal: rank #1 on Google for the notice + convert readers into Elite Academy students.

## 1. Read the notice carefully (do not skip)
- Render every page to PNG and read them visually. Punjabi PDFs extract as garbage text.
  ```
  python -W ignore -c "import pymupdf; d=pymupdf.open('X.pdf'); [p.get_pixmap(dpi=110).save(f'<scratchpad>/p{i+1}.png') for i,p in enumerate(d)]"
  ```
  Use `PYTHONIOENCODING=utf-8` if printing. Save temp images in the scratchpad, never the repo.
- **Identify the issuing body first.** Not every notice is SSSB (e.g. the District Court Clerk notice was SSSC / High Court at sssc.gov.in). Use the real body, website, notice number, helplines.
- Extract: advertisement/notice no., issuing body, website, posts + vacancy counts (post-wise AND category-wise), opening/closing dates (with time), qualification per post, age limit + relaxations (and the "as on" date), salary/pay level, fee per category, exam pattern/marks/negative marking, typing/skill tests, selection stages, tie-breakers, documents, reservation rules, how to apply, rejection reasons, helplines.
- **Sanity-check numbers**: sum the table and compare with the stated total. If columns have a blank/ambiguous header, work out the meaning from the totals (District Court notice: columns were men/women, not "total/women").
- **Never invent facts.** If something isn't in the notice (exam date, syllabus), say "to be announced on <website>".
- If dates conflict inside the PDF, pick the more reliable one (e.g. signature date), use it, and tell the user.

## 2. Pick slug, name and images
- Slug: `<body>-<group/post>-recruitment-2026` (e.g. `sssb-group-b-recruitment-2026`, `punjab-district-court-clerk-recruitment-2026`). Keep it distinct from existing blogs to avoid keyword cannibalisation (check `src/config/blogs.js`); differentiate with the body name in title/keywords.
- Component: `src/pages/blog/<PascalName>2026.jsx`.
- Crop 3-4 images from the PDF into `public/` (use pymupdf `get_pixmap(dpi=170, clip=Rect)`): (1) first page/key dates + vacancy table (hero, `<name>-notice.png`), (2) qualification or age table, (3) fee table, (4) exam pattern/selection. Open each crop with Read to verify it is clean.
- Copy the PDF to `public/<name>-notification.pdf` for a "Download Notification PDF" button.

## 3. Build the page
Copy the structure of the newest blog (`PunjabDistrictCourtClerk2026.jsx` or `SSSBGroupBRecruitment2026.jsx`) and adapt. Required elements, in this order:
1. Breadcrumb, H1 (keyword-rich: body + post names + vacancies + year), hero image with zoom lightbox, share + "How to apply" + PDF buttons.
2. Quick-summary grid (body, notice no., vacancies, dates, salary, qualification).
3. Table of contents.
4. **Prep-subjects block + "View Courses & Enroll Online" CTA** right after the TOC (this is the conversion hook the user wants near the top).
5. Introduction (3 short paragraphs) then **CTA #1** with phone numbers 7696954686 / 9988414686.
6. Official notice section with images + PDF/official-site buttons.
7. Important dates table (+ deadline alert), vacancy table, eligibility, age, salary, fee, exam pattern, selection process, how to apply (steps), documents, instructions/rejection reasons.
8. **CTA #2** mid-page (link to typing course `/punjabi-typing` if a typing test exists, plus `/test-series`).
9. Preparation section, then Elite Academy batch section (`/psssb-coaching`, `/online-coaching`, `/test-series`, typing/crash course), app download buttons (Android/iOS URLs are constants in the existing blogs), helpline section.
10. 12-15 FAQs (also emitted as FAQ schema), related resources, final CTA, "Last updated" disclaimer (state that Elite Academy is not affiliated; verify on the official site).
11. Sidebar: TOC, quick links, sticky "Last date" CTA with phone buttons, related guides.
- SEO: `PageSeo` with `article`, Article + WebPage + FAQ + Organization schema, ~16 keywords (body name, notice no., each post, "vacancy", "eligibility", "salary", "last date", "notification PDF", website), descriptive `alt`/`title` on images, hero image `loading="eager"` with width/height.
- Dark theme + Tailwind classes exactly like the existing blogs. Define `ImageCard` outside the component.
- Dates: `date`/`datePublished` = today's date.

## 4. Register the page (all four, or it won't rank/route)
- `src/App.jsx`: lazy import + `<Route path="/blog/<slug>">` with `Suspense`.
- `src/config/publicSeo.js`: add entry to `PUBLIC_PAGES` (path, title, description, `changefreq: 'daily'`, priority ~0.97, breadcrumb, keywords). This feeds the sitemap automatically.
- `src/config/blogs.js`: add a post at the top of `BLOG_POSTS` (slug, title, description, excerpt, date, tags, keywords, `heroBadge`, `relatedSlugs`, 3 faqs).
- Add a link card to the new blog at the top of `relatedLinks` in the other recent blog pages (internal linking helps indexing).

## 5. Verify and report
- `npx vite build` must pass, and `grep -c "<slug>" dist/sitemap.xml` should be 1. (Not a git repo; nothing to commit unless asked.)
- Tell the user: what the notice contains (key facts), files created, anything ambiguous (date conflicts, unclear table headers), and the next steps: deploy, submit the sitemap, URL-inspect `https://www.eliteacademy.pro/blog/<slug>` in Search Console.
- Also mention if a deadline is close, so they index it quickly.
