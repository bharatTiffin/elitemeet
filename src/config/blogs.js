export const BLOG_POSTS = [
  {
    slug: 'psssb-craft-instructor-recruitment-2026',
    title:
      'PSSSB Craft Instructor Recruitment 2026 Notification Out for 681 Posts | Eligibility, Apply Online, Selection Process',
    description:
      'PSSSB Craft Instructor Recruitment 2026 notification released for 681 ITI Instructor vacancies under Advertisement No. 03/2026. Check eligibility, age limit, important dates, selection process, syllabus, salary and application process.',
    excerpt:
      'A complete guide to the PSSSB Craft Instructor Recruitment 2026 for 681 vacancies, including eligibility, age limit, selection process, expected syllabus and how to prepare early.',
    date: '2026-07-09',
    updatedDate: '2026-07-09',
    readingTime: '10 min read',
    author: 'Elite Academy Editorial Team',
    category: 'PSSSB Recruitment',
    tags: [
      'PSSSB Craft Instructor Recruitment 2026',
      'PSSSB ITI Instructor Recruitment',
      'PSSSB Craft Instructor Vacancy',
      'PSSSB Advertisement 03/2026',
    ],
    keywords: [
      'PSSSB Craft Instructor Recruitment 2026',
      'PSSSB ITI Instructor Recruitment',
      'PSSSB Craft Instructor Vacancy',
      'PSSSB Advertisement 03/2026',
      'PSSSB Craft Instructor Notification',
      'PSSSB Craft Instructor Apply Online',
      'Punjab ITI Instructor Recruitment',
      'Craft Instructor Vacancy Punjab',
    ],
    heroBadge: 'Latest Recruitment Update',
    relatedSlugs: ['psssb-craft-instructor-recruitment-2026'],
    faqs: [
      {
        question: 'What is PSSSB Craft Instructor Recruitment 2026?',
        answer:
          'It is the recruitment drive conducted by the Punjab Subordinate Services Selection Board for filling Craft Instructor posts in various government departments and institutions under the Punjab government.',
      },
      {
        question: 'How many vacancies are there?',
        answer:
          'The notification mentions 681 posts, which is the total number of Craft Instructor vacancies being advertised under Advertisement No. 03/2026.',
      },
      {
        question: 'Who can apply?',
        answer:
          'Candidates who meet the prescribed educational qualification, age limit and other eligibility conditions mentioned in the official notification can apply. The detailed eligibility criteria will be updated as the full notification is released.',
      },
      {
        question: 'Can diploma holders apply?',
        answer:
          'Yes, candidates holding the relevant diploma or qualification in the trade concerned may be eligible, subject to the detailed conditions specified in the official notification.',
      },
      {
        question: 'Can ITI students apply?',
        answer:
          'ITI-qualified candidates may be considered for certain trades if the official notification defines the required qualification accordingly. Applicants should verify the exact eligibility for their trade before applying.',
      },
      {
        question: 'What is Advertisement No. 03/2026?',
        answer:
          'Advertisement No. 03/2026 is the official recruitment notification number assigned by PSSSB for this Craft Instructor recruitment cycle.',
      },
      {
        question: 'What is the age limit?',
        answer:
          'The precise age limit will be confirmed from the official notification once the full details are published. Candidates should regularly check the PSSSB website for updates.',
      },
      {
        question: 'What is the salary?',
        answer:
          'The official pay scale and salary details will be updated when the detailed recruitment notice is released. Candidates should rely on the official notification for the final pay structure.',
      },
      {
        question: 'Is Punjabi compulsory?',
        answer:
          'The notification may include a Punjabi language requirement or a qualifying paper, depending on the exact recruitment conditions. Applicants should read the official instructions carefully.',
      },
      {
        question: 'When will applications start?',
        answer:
          'The application timeline will be confirmed once the official notification provides the opening and closing dates for submission.',
      },
      {
        question: 'What is the last date?',
        answer:
          'The closing date for applications will be updated in the official notification. Candidates should track the PSSSB website for the final deadline.',
      },
      {
        question: 'How can I apply?',
        answer:
          'Applications are expected to be submitted online through the official PSSSB portal. Candidates should keep ready the required documents and follow the instructions in the notification carefully.',
      },
      {
        question: 'What documents are required?',
        answer:
          'Commonly required documents include identity proof, educational certificates, experience proof if applicable, category certificate, domicile or other supporting documents, and a recent photograph as per the instructions.',
      },
      {
        question: 'What is the selection process?',
        answer:
          'The selection process may include a written examination, a Punjabi qualifying paper, document verification and a medical examination, depending on the final recruitment rules.',
      },
      {
        question: 'What is the syllabus?',
        answer:
          'The detailed syllabus for the written test will be announced in the official notification. Candidates should prepare for their trade-related questions and general awareness topics as the pattern becomes clearer.',
      },
    ],
  },
];

export function getBlogPostBySlug(slug) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogIndex() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    excerpt: post.excerpt,
    date: post.date,
    readingTime: post.readingTime,
    author: post.author,
    category: post.category,
    tags: post.tags,
  }));
}
