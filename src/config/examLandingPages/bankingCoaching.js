import {
  DEFAULT_WHY_CHOOSE_US,
  DEFAULT_PROGRAM_FEATURES,
  DEFAULT_RESOURCES,
  DEFAULT_BRANCHES,
  buildDefaultTimeline,
} from './shared';

const bankingCoaching = {
  slug: '/banking-coaching',
  examName: 'Banking Coaching',
  ctaPath: '/online-coaching',

  seo: {
    title: 'Banking Exam Coaching in Chandigarh & Punjab | Elite Academy',
    description:
      'Prepare for IBPS PO, IBPS Clerk, SBI PO and SBI Clerk with Elite Academy. Structured banking exam coaching with reasoning, quant, English, mock tests and study material — online and offline in Chandigarh & Punjab.',
    keywords:
      'banking coaching, banking exam coaching Chandigarh, IBPS PO coaching, IBPS Clerk coaching, SBI PO coaching, SBI Clerk coaching, banking aptitude preparation, Elite Academy banking',
    breadcrumb: 'Banking Coaching',
    changefreq: 'weekly',
    priority: 0.9,
    schemaType: 'course',
  },

  hero: {
    badge: 'Banking & Finance Exam Coaching',
    title: 'Banking Exam Coaching in Chandigarh & Punjab',
    subtitle:
      'Structured preparation for IBPS and SBI examinations — PO, Clerk, and banking aptitude — with live classes, mock tests, reasoning, quant, and English coaching from Elite Academy.',
    ctaLabel: 'Start Preparation',
  },

  about: {
    title: 'What are Banking Exams?',
    paragraphs: [
      'Banking examinations are among the most popular competitive exams in India. The Institute of Banking Personnel Selection (IBPS) and State Bank of India (SBI) conduct regular recruitments for Probationary Officer (PO) and Clerk positions in public sector banks across the country. These exams attract graduates and undergraduates looking for stable careers in the banking sector.',
      'Banking exams typically test Reasoning Ability, Quantitative Aptitude, English Language, and General Awareness (with a focus on banking and financial awareness for mains examinations). IBPS PO and SBI PO are graduate-level exams with prelims, mains, and interview stages. IBPS Clerk and SBI Clerk are clerical-level exams focused on speed and accuracy in core aptitude subjects.',
      'Aspirants choose banking exams because they offer job security, growth opportunities within public sector banks, and a respected professional career. The competition is high — success requires strong fundamentals in reasoning and quant, regular mock test practice, and consistent improvement in English comprehension and general awareness.',
      'At Elite Academy, our banking exam coaching program focuses on building aptitude fundamentals through structured live classes, sectional and full-length mock tests, and exam-oriented study material. We help students develop the speed, accuracy, and strategy needed to perform well in IBPS and SBI prelims and mains examinations.',
    ],
  },

  posts: {
    title: 'Banking Exams We Prepare You For',
    subtitle:
      'Our coaching covers the major IBPS and SBI recruitments for public sector banking positions.',
    items: [
      { name: 'IBPS PO', icon: '🏦' },
      { name: 'IBPS Clerk', icon: '📋' },
      { name: 'SBI PO', icon: '🏛️' },
      { name: 'SBI Clerk', icon: '💼' },
      { name: 'IBPS RRB PO', icon: '🌾' },
      { name: 'IBPS RRB Clerk', icon: '📝' },
      { name: 'IBPS SO', icon: '⚙️' },
      { name: 'Banking Aptitude', icon: '📊' },
    ],
    footer: 'Reasoning, quant, English, and general awareness coaching for IBPS and SBI examinations.',
  },

  whyChooseUs: DEFAULT_WHY_CHOOSE_US,

  program: {
    title: 'Complete Banking Exam Coaching Program',
    subtitle:
      'Everything you need for banking exam preparation — reasoning, quant, English, and mock test practice — in one structured program.',
    features: DEFAULT_PROGRAM_FEATURES,
  },

  timeline: buildDefaultTimeline('Banking', 'Clear Your Banking Exam'),

  resources: DEFAULT_RESOURCES,

  branches: DEFAULT_BRANCHES,

  faq: {
    title: 'Banking Exam Coaching FAQs',
    subtitle: 'Common questions about banking exam preparation at Elite Academy.',
    items: [
      {
        question: 'Which banking exams does Elite Academy prepare students for?',
        answer:
          'We prepare students for major banking examinations including IBPS PO, IBPS Clerk, SBI PO, SBI Clerk, and IBPS RRB posts. Our coaching covers the core aptitude subjects tested across these exams — reasoning, quantitative aptitude, and English.',
      },
      {
        question: 'Does Elite Academy provide banking coaching in Chandigarh?',
        answer:
          'Yes. Elite Academy offers both online and offline banking exam coaching. Offline classes are available at our Chandigarh branch (SCO 144, Sector 24-D) and Fatehgarh Sahib branch. Online coaching is available for students across Punjab and India.',
      },
      {
        question: 'What subjects are covered in banking exam coaching?',
        answer:
          'Our banking coaching covers Reasoning Ability, Quantitative Aptitude, English Language, and General Awareness. For mains-level preparation, we include banking and financial awareness topics commonly tested in IBPS and SBI examinations.',
      },
      {
        question: 'Do you provide mock tests for banking exam preparation?',
        answer: [
          'Yes. Students get access to ',
          { type: 'link', path: '/weekly-test', label: 'weekly tests' },
          ', ',
          { type: 'link', path: '/sectional-test-series', label: 'sectional test series' },
          ', and full-length mock tests. Banking exams demand speed and accuracy — regular timed practice is essential.',
        ],
      },
      {
        question: 'Is online banking coaching effective?',
        answer: [
          'Yes. Our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching' },
          ' includes live classes, recorded lectures, a tracker app, mock tests, and complete study material. Many aspirants prefer online coaching for flexible, structured banking exam preparation.',
        ],
      },
      {
        question: 'Do you provide study books for banking exams?',
        answer: [
          'Yes. Students can access subject-wise ',
          { type: 'link', path: '/books', label: 'study books' },
          ' covering Polity, History, Geography, Science, Economics, and more — useful for general awareness and mains-level preparation alongside aptitude coaching.',
        ],
      },
      {
        question: 'How is banking exam preparation different from SSC preparation?',
        answer:
          'Both exams test reasoning, quant, and English, but banking exams place greater emphasis on speed and accuracy in aptitude sections, with banking awareness for mains. SSC exams include broader general awareness and may have additional tiers. Our coaching adapts to the exam pattern you are targeting.',
      },
      {
        question: 'How long does banking exam preparation take?',
        answer:
          'Preparation time depends on your starting level and target exam. Most students benefit from 3–6 months of structured coaching with daily practice, weekly tests, and regular revision. Our program adapts to your pace with recorded classes and personal mentorship.',
      },
      {
        question: 'What is the fee for banking coaching at Elite Academy?',
        answer: [
          'Banking exam coaching is part of our complete online coaching program. Visit our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching page' },
          ' for current pricing, inclusions, and enrollment details.',
        ],
      },
      {
        question: 'How do I enroll in banking exam coaching?',
        answer: [
          'You can enroll directly through our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching page' },
          '. For offline coaching at Chandigarh or Fatehgarh Sahib, call ',
          { type: 'phone', number: '+917696954686', label: '7696954686' },
          ' or visit our ',
          { type: 'link', path: '/contact-us', label: 'contact page' },
          '.',
        ],
      },
    ],
  },

  finalCta: {
    title: 'Ready to Start Your Banking Exam Preparation?',
    description:
      'Join Elite Academy for structured banking exam coaching with live classes, mock tests, aptitude practice, and personal mentorship. Begin your IBPS and SBI preparation today.',
    ctaLabel: 'Join Online Coaching',
    secondaryText: 'Have questions? Call 7696954686 or',
  },
};

export default bankingCoaching;
