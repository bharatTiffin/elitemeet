import {
  DEFAULT_WHY_CHOOSE_US,
  DEFAULT_PROGRAM_FEATURES,
  DEFAULT_RESOURCES,
  DEFAULT_BRANCHES,
  buildDefaultTimeline,
} from './shared';

const psssbCoaching = {
  slug: '/psssb-coaching',
  examName: 'PSSSB Coaching',
  ctaPath: '/online-coaching',

  seo: {
    title: 'PSSSB Coaching in Chandigarh & Punjab | Elite Academy',
    description:
      'Join Elite Academy for PSSSB coaching in Chandigarh and Punjab. Live classes, mock tests, PYQs, tracker app and complete study material for Clerk, Patwari, Excise Inspector and all PSSSB posts.',
    keywords:
      'PSSSB coaching, PSSSB coaching Chandigarh, PSSSB coaching Punjab, Punjab Subordinate Services Selection Board, PSSSB clerk coaching, PSSSB patwari coaching, PSSSB preparation, Elite Academy PSSSB',
    breadcrumb: 'PSSSB Coaching',
    changefreq: 'weekly',
    priority: 0.9,
    schemaType: 'course',
  },

  hero: {
    badge: 'Punjab Government Exam Coaching',
    title: 'PSSSB Coaching in Chandigarh & Punjab',
    subtitle:
      'Prepare for Punjab Subordinate Services Selection Board exams through structured online and offline coaching — live classes, mock tests, PYQs, and complete study material from Elite Academy.',
    ctaLabel: 'Start Preparation',
  },

  about: {
    title: 'What is PSSSB?',
    paragraphs: [
      'The Punjab Subordinate Services Selection Board (PSSSB) is the primary recruitment body for Group C and Group D posts in the Punjab Government. Every year, lakhs of aspirants compete for positions like Clerk, Senior Assistant, Patwari, Excise Inspector, VDO, Typist, Stenographer, Jail Warder, and Lab Assistant across various departments.',
      'PSSSB exams typically include a written test covering General Knowledge, Punjabi, English, Mathematics, Reasoning, and subject-specific topics depending on the post. Some positions also require a typing or stenography test. The competition is intense because these posts offer job security, respectable salaries, and the opportunity to serve the Punjab Government.',
      'Students prepare for PSSSB because these are stable government jobs with clear promotion paths. Whether you are a fresh graduate or a working professional looking for a secure career, PSSSB recruitment offers one of the most accessible entry points into Punjab Government service — provided you prepare with the right strategy, consistent practice, and exam-oriented guidance.',
      'At Elite Academy, we have built our coaching program around the actual PSSSB exam pattern. Our students get structured syllabus coverage, regular mock tests, previous year question practice, and personal mentorship — everything needed to move from scattered self-study to a disciplined preparation plan that delivers results.',
    ],
  },

  posts: {
    title: 'PSSSB Posts We Prepare You For',
    subtitle:
      'Our coaching covers the full range of Punjab Subordinate Services Selection Board recruitments.',
    items: [
      { name: 'Clerk', icon: '📋' },
      { name: 'Senior Assistant', icon: '💼' },
      { name: 'Patwari', icon: '🌾' },
      { name: 'Excise Inspector', icon: '🏛️' },
      { name: 'Lab Assistant', icon: '🔬' },
      { name: 'Jail Warder', icon: '🛡️' },
      { name: 'VDO', icon: '🏘️' },
      { name: 'Typist', icon: '⌨️' },
      { name: 'Stenographer', icon: '📝' },
      { name: 'Naib Tehsildar', icon: '📑' },
      { name: 'Forest Guard', icon: '🌲' },
      { name: 'Constable (Various)', icon: '👮' },
    ],
    footer: 'And other Punjab Government recruitments conducted through PSSSB.',
  },

  whyChooseUs: DEFAULT_WHY_CHOOSE_US,

  program: {
    title: 'Complete PSSSB Coaching Program',
    subtitle:
      'Everything you need for PSSSB preparation — from concept building to final revision — in one structured program designed for Punjab Government exam success.',
    features: DEFAULT_PROGRAM_FEATURES,
  },

  timeline: buildDefaultTimeline('PSSSB', 'Crack PSSSB'),

  resources: DEFAULT_RESOURCES,

  branches: DEFAULT_BRANCHES,

  faq: {
    title: 'PSSSB Coaching FAQs',
    subtitle: 'Common questions about PSSSB exam preparation at Elite Academy.',
    items: [
      {
        question: 'What is PSSSB and which posts does it recruit for?',
        answer:
          'PSSSB (Punjab Subordinate Services Selection Board) conducts recruitment for Group C and Group D posts in the Punjab Government. Common posts include Clerk, Senior Assistant, Patwari, Excise Inspector, VDO, Typist, Stenographer, Jail Warder, Lab Assistant, and Naib Tehsildar.',
      },
      {
        question: 'Does Elite Academy provide PSSSB coaching in Chandigarh?',
        answer:
          'Yes. Elite Academy offers both online and offline PSSSB coaching. Offline classes are available at our Chandigarh branch (SCO 144, Sector 24-D) and Fatehgarh Sahib branch. Online coaching is available for students across Punjab and India.',
      },
      {
        question: 'What subjects are covered in PSSSB coaching?',
        answer:
          'Our PSSSB coaching covers General Knowledge, Punjabi, English, Mathematics, Reasoning, Computer Basics, and Punjab-specific topics. Subject emphasis varies by post — for example, Patwari includes land records while Clerk includes typing tests.',
      },
      {
        question: 'Do you provide mock tests for PSSSB preparation?',
        answer:
          'Yes. Students get access to weekly tests, sectional test series, and full-length mock tests designed around PSSSB exam patterns. Regular testing helps build speed, accuracy, and exam temperament.',
      },
      {
        question: 'Is online PSSSB coaching effective?',
        answer:
          'Absolutely. Our online coaching includes live classes, recorded lectures, a tracker app, mock tests, and complete study material. Many students prefer online coaching for flexibility while getting the same structured preparation as offline students.',
      },
      {
        question: 'Do you provide PYQs for PSSSB exams?',
        answer:
          'Yes. We offer a comprehensive PYQs book with 20,000+ previous year questions organized subject-wise and topic-wise. PYQ practice is a core part of our PSSSB preparation strategy.',
      },
      {
        question: 'How long does PSSSB preparation take?',
        answer:
          'Preparation time depends on your starting level and target post. Most students benefit from 3–6 months of structured coaching with daily study, weekly tests, and regular revision. Our program adapts to your pace with recorded classes and personal mentorship.',
      },
      {
        question: 'Do you prepare for PSSSB typing and stenography tests?',
        answer:
          'Yes. For posts requiring typing or stenography skills (Clerk, Senior Assistant, Typist, Stenographer), we offer dedicated Punjabi and English typing courses alongside the main PSSSB coaching program.',
      },
      {
        question: 'What is the fee for PSSSB coaching at Elite Academy?',
        answer: [
          'PSSSB coaching is part of our complete online coaching program. Visit our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching page' },
          ' for current pricing, inclusions, and enrollment details.',
        ],
      },
      {
        question: 'How do I enroll in PSSSB coaching?',
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
    title: 'Ready to Start Your PSSSB Preparation?',
    description:
      'Join Elite Academy for structured PSSSB coaching with live classes, mock tests, PYQs, and personal mentorship. Start your Punjab Government exam journey today.',
    ctaLabel: 'Join Online Coaching',
    secondaryText: 'Have questions? Call 7696954686 or',
  },
};

export default psssbCoaching;
