/** Shared defaults reused across exam landing pages. Override per exam as needed. */

export const DEFAULT_WHY_CHOOSE_US = {
  title: 'Why Choose Elite Academy',
  subtitle: 'Everything you need for focused government exam preparation in one place.',
  items: [
    {
      icon: '👨‍🏫',
      title: 'Experienced Faculty',
      text: 'Learn from teachers who understand Punjab and central government exam patterns and focus on what actually appears in the paper.',
    },
    {
      icon: '📱',
      title: 'Tracker App',
      text: 'Track syllabus completion, daily targets, and preparation progress through our dedicated tracker app built for serious aspirants.',
    },
    {
      icon: '🎥',
      title: 'Live Classes',
      text: 'Attend interactive live classes with real-time doubt solving, structured pacing, and exam-oriented teaching.',
    },
    {
      icon: '📺',
      title: 'Recorded Classes',
      text: 'Revise anytime with recorded lectures — pause, replay, and cover missed topics at your own speed.',
    },
    {
      icon: '📝',
      title: 'Mock Tests',
      text: 'Practice full-length mock tests that mirror real exam difficulty, timing, and question patterns.',
    },
    {
      icon: '📅',
      title: 'Weekly Tests',
      text: 'Stay consistent with weekly tests that measure progress and highlight weak areas before they become gaps.',
    },
    {
      icon: '🎯',
      title: 'Sectional Tests',
      text: 'Sharpen individual subjects with Monday-to-Thursday sectional tests and Friday full mocks.',
    },
    {
      icon: '📰',
      title: 'Current Affairs',
      text: 'Stay exam-ready with updated current affairs notes and monthly magazines aligned with Punjab exam trends.',
    },
    {
      icon: '📚',
      title: 'Study Material',
      text: 'Access subject-wise books, notes, and revision-friendly content designed for government exam syllabi.',
    },
    {
      icon: '💬',
      title: 'Personal Mentorship',
      text: 'Get one-on-one guidance to plan your study schedule, fix weak topics, and stay accountable.',
    },
    {
      icon: '📘',
      title: 'PYQs',
      text: 'Practice previous year questions topic-wise and subject-wise to understand what examiners actually ask.',
    },
  ],
};

export const DEFAULT_PROGRAM_FEATURES = [
  {
    icon: '🎥',
    title: 'Live Classes',
    description: 'Interactive live sessions with experienced faculty covering the complete syllabus step by step.',
  },
  {
    icon: '📺',
    title: 'Recorded Classes',
    description: 'Full lecture library for revision — watch anytime, anywhere, at your own pace.',
  },
  {
    icon: '📚',
    title: 'Books & Notes',
    description: 'Subject-wise study material including Polity, History, Geography, Science, and more.',
  },
  {
    icon: '📱',
    title: 'Tracker App',
    description: 'Monitor daily progress, syllabus coverage, and preparation milestones in one dashboard.',
  },
  {
    icon: '📰',
    title: 'Current Affairs',
    description: 'Regular current affairs updates and monthly magazines for GK-heavy government exams.',
  },
  {
    icon: '📅',
    title: 'Weekly Tests',
    description: 'Scheduled weekly tests with detailed solutions and performance analytics.',
  },
  {
    icon: '❓',
    title: 'Doubt Sessions',
    description: 'Dedicated doubt-solving so small confusions do not turn into major gaps before the exam.',
  },
  {
    icon: '📊',
    title: 'Performance Tracking',
    description: 'Track scores across mocks and sectionals to see improvement trends over time.',
  },
];

export const DEFAULT_RESOURCES = {
  title: 'Preparation Resources',
  subtitle:
    'Boost your preparation with Elite Academy books, test series, current affairs, and mentorship — all designed for government exam success.',
  items: [
    {
      icon: '📚',
      title: 'Study Books',
      description: 'Subject-wise e-books with notes and PYQs for complete syllabus coverage.',
      path: '/books',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: '📅',
      title: 'Weekly Test Series',
      description: 'Weekly mock tests with solutions and performance tracking.',
      path: '/weekly-test',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: '🎯',
      title: 'Sectional Test Series',
      description: 'Daily sectional tests plus Friday full mocks for subject-wise mastery.',
      path: '/sectional-test-series',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: '📰',
      title: 'Current Affairs Book',
      description: 'Exam-focused current affairs notes with instant PDF download.',
      path: '/current-affairs-book',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: '📖',
      title: 'Monthly Current Affairs',
      description: 'Monthly magazine compilation for quick revision of important events.',
      path: '/monthly-current-affairs',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: '📘',
      title: 'PYQs Book',
      description: '20,000+ previous year questions organized subject-wise and topic-wise.',
      path: '/pyqs-book',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: '💬',
      title: 'Personal Mentorship',
      description: 'One-on-one sessions for strategy, doubt solving, and study planning.',
      path: '/mentorship',
      color: 'from-violet-500 to-indigo-500',
    },
  ],
};

export const DEFAULT_BRANCHES = {
  title: 'Online vs Offline Coaching',
  subtitle:
    'Choose the mode that fits your schedule and location. Both online and offline students get structured coaching, tests, and study material.',
  modes: [
    {
      icon: '💻',
      title: 'Online Coaching',
      description:
        'Prepare from anywhere in India with live and recorded classes, mock tests, tracker app access, and complete study material delivered digitally.',
      idealFor:
        'Working professionals, college students, and aspirants outside Chandigarh or Fatehgarh Sahib who want flexible, structured preparation.',
      ctaPath: '/online-coaching',
      ctaLabel: 'Join Online Coaching →',
    },
    {
      icon: '🏫',
      title: 'Offline Coaching',
      description:
        'Attend in-person classes at our Chandigarh or Fatehgarh Sahib branch with classroom teaching, peer learning, and direct faculty interaction.',
      idealFor:
        'Local aspirants who prefer a classroom environment, daily discipline, and face-to-face guidance at our Punjab branches.',
      ctaPath: '/contact-us',
      ctaLabel: 'Visit Our Branch →',
    },
  ],
  locations: [
    {
      name: 'Elite Academy Chandigarh',
      address: 'SCO 144\nSector 24-D\nChandigarh',
      description:
        'Offline government exam classes for Punjab and central competitive exam aspirants in the Chandigarh region.',
      phone: '7696954686',
    },
    {
      name: 'Elite Academy Fatehgarh Sahib',
      address:
        '1st Floor, Shop No. 18\nAbove PB 23 Outfit\nCity Center\nSirhind 140406',
      description:
        'Offline coaching for PSSSB, Punjab Police, Patwari, and other Punjab Government exams in Fatehgarh Sahib district.',
      linkPath: '/contact-us',
      linkLabel: 'Contact us for directions →',
    },
  ],
};

export function buildDefaultTimeline(examShortName, finalStepLabel) {
  return {
    title: 'Preparation Process',
    subtitle: `A structured path from enrollment to clearing your ${examShortName} exam.`,
    steps: [
      {
        label: 'Enroll',
        description: 'Join online coaching and get instant access to live classes, recorded lectures, and study material.',
      },
      {
        label: 'Understand Concepts',
        description: 'Build strong fundamentals through structured live classes covering every subject in the syllabus.',
      },
      {
        label: 'Practice Questions',
        description: 'Solve topic-wise and subject-wise PYQs to understand exam patterns and question types.',
      },
      {
        label: 'Weekly Tests',
        description: 'Take weekly tests to measure progress and identify subjects that need more attention.',
      },
      {
        label: 'Mock Tests',
        description: 'Attempt full-length mock tests under timed conditions to build speed and exam temperament.',
      },
      {
        label: 'Revision',
        description: 'Use recorded classes, notes, and current affairs for focused revision before the exam date.',
      },
      {
        label: finalStepLabel,
        description: 'Walk into the exam hall prepared, confident, and ready to perform your best.',
      },
    ],
  };
}
