import {
  DEFAULT_PROGRAM_FEATURES,
  DEFAULT_RESOURCES,
  buildDefaultTimeline,
} from './shared';
import { STUDENT_SUCCESS_DATA } from '../studentSuccessData';

const sscCoaching = {
  slug: '/ssc-coaching',
  examName: 'SSC Coaching',
  ctaPath: '/online-coaching',

  seo: {
    title: 'SSC Coaching in Chandigarh | Best SSC CGL, CHSL, GD Coaching Institute Punjab',
    description:
      'Elite Academy offers SSC coaching in Chandigarh & Punjab for CGL, CHSL, GD & CPO. Classroom & online classes, weekly tests, PYQs, tracker app & mentorship from experienced faculty.',
    keywords:
      'SSC coaching Chandigarh, best SSC coaching institute Chandigarh, SSC CGL coaching Chandigarh, SSC CHSL coaching Chandigarh, SSC GD coaching Chandigarh, SSC coaching Punjab, SSC coaching Fatehgarh Sahib, SSC coaching Patran, SSC coaching near me, SSC coaching institute Chandigarh, Staff Selection Commission coaching, Elite Academy SSC',
    breadcrumb: 'SSC Coaching',
    changefreq: 'weekly',
    priority: 0.9,
    schemaType: 'course',
    includeEducationalOrg: true,
    includeLocalBusiness: true,
    courseName: 'SSC Coaching Program',
  },

  hero: {
    badge: 'Central Government Exam Coaching',
    title: 'SSC Coaching in Chandigarh | Elite Academy',
    subtitle:
      'Prepare for SSC CGL, CHSL, GD and other central government exams with the same structured teaching that has helped our students clear Punjab Government examinations — live classes, weekly tests, PYQs, tracker app and personal mentorship.',
    ctaLabel: 'Start SSC Preparation',
  },

  about: {
    title: 'About SSC — Staff Selection Commission',
    paragraphs: [
      'SSC recruits lakhs of candidates every year for central government posts — from Income Tax Inspector and ASO through CHSL clerical roles to GD Constable in CAPFs. The competition is national, the syllabus is wide, and most students who fail do not fail because the paper is impossible. They fail because preparation stays scattered for too long.',
      'At Elite Academy, we have spent years coaching students for Punjab Government exams — PSSSB, Punjab Police, Patwari and allied posts. Our selected students include Sawarn Singh (PSSSB Excise Inspector) and Arshdeep Singh (Punjab Jail Warder, Rank 16). The reasoning shortcuts, quant foundations, English drills and current affairs rhythm we use for Punjab exams are the same building blocks SSC demands — only the difficulty and time pressure increase.',
      'What we see repeatedly: students buy too many books, watch random YouTube videos, and never test themselves under timed conditions. They revise GK once and forget it. They solve quant without learning when to skip a question. Our SSC coaching fixes this with a fixed weekly rhythm — concept class, PYQ practice, sectional test, full mock, mentorship check-in.',
      'Whether you attend offline classes at our Chandigarh branch (SCO 144, Sector 24-D), join from Mohali, Panchkula, Zirakpur, Fatehgarh Sahib or Patran, or prepare fully online — you get the same faculty, study material, tracker app and test series. Classroom students sit with motivated peers; online students follow the identical schedule with recorded backup for missed sessions.',
    ],
    callouts: [
      {
        title: 'What actually works for SSC',
        text: 'Daily consistency beats weekend cramming. PYQs teach you what SSC repeats. Weekly mocks teach you what your score actually is — not what you think it is.',
      },
    ],
  },

  examDetails: {
    title: 'SSC Exam Details & Preparation Guide',
    subtitle:
      'Practical guidance from teachers who coach government exam aspirants every day — exam patterns, common mistakes, and how to prepare without wasting months.',
    sections: [
      {
        heading: 'SSC CGL — Combined Graduate Level',
        content: [
          'CGL is a four-tier exam: Tier I (screening), Tier II (scoring papers in Quant, English, Statistics, GS), Tier III (descriptive), and Tier IV (skill test for specific posts). Most students prepare only for Tier I and get surprised by Tier II difficulty.',
          {
            type: 'callout',
            title: 'Common mistake we correct in class',
            text: 'Students mug up shortcuts without understanding basics. In Tier II Quant, shortcuts fail when question framing changes. We teach concept first, speed second.',
          },
          {
            type: 'bullets',
            items: [
              'Posts: ASO, Income Tax Inspector, Central Excise Inspector, Sub-Inspector in CBI, and more',
              'Eligibility: Graduation; age typically 18–30 (varies by post)',
              'Tier I: 100 MCQs — Reasoning, GK, Quant, English — 60 minutes',
              'Tier II: Separate papers — advanced Quant and English are where most rank shifts happen',
            ],
          },
          'Our CGL batches run parallel concept classes and Tier II-focused practice from month two onward — not one week before the exam.',
        ],
      },
      {
        heading: 'SSC CHSL — Combined Higher Secondary Level',
        content: [
          'CHSL is the main route for 12th-pass students into central government clerical posts — LDC, Postal Assistant, DEO and similar roles. The written exam is manageable; the descriptive paper and typing test eliminate candidates who ignored them.',
          {
            type: 'bullets',
            items: [
              'Tier I: Objective test — same four subjects as most SSC exams',
              'Tier II: Descriptive — essay, letter, application (English or Hindi)',
              'Tier III: Typing/skill test — 35 WPM English or 30 WPM Hindi for DEO posts',
              'Eligibility: 12th pass; age generally 18–27',
            ],
          },
          {
            type: 'callout',
            title: 'What students struggle with',
            text: 'They score well in MCQs but never practice writing 200-word answers by hand. We run weekly descriptive drills — timed, checked, corrected.',
          },
        ],
      },
      {
        heading: 'SSC GD — General Duty Constable',
        content: [
          'GD recruits constables for BSF, CISF, CRPF, SSB, ITBP and Assam Rifles. The written paper is 10th-level, but PET/PST standards filter out candidates who prepared only for MCQs.',
          {
            type: 'bullets',
            items: [
              'Written: Reasoning, GK, Maths, English/Hindi — CBE format',
              'Physical: Running, long jump, height/chest standards — force-specific',
              'Eligibility: 10th pass; age 18–23 (relaxed for reserved categories)',
            ],
          },
          'We cover the written syllabus in class and share structured PET preparation guidance — weekly running targets, jump technique, and what to expect on test day.',
        ],
      },
      {
        heading: 'Why Most Students Fail SSC',
        content: [
          'After years of coaching, the failure patterns are predictable. It is rarely about intelligence.',
          {
            type: 'bullets',
            items: [
              'No fixed study schedule — preparation happens only when guilt kicks in',
              'GK treated as "reading" instead of daily revision with testing',
              'Quant practice without timer — speed never develops',
              'English vocabulary ignored until one month before exam',
              'Mock tests taken without analysing wrong answers',
              'Jumping between CGL, CHSL and GD without finishing one syllabus cycle',
            ],
          },
          {
            type: 'callout',
            title: 'How our faculty addresses this',
            text: 'Every student gets a weekly target on the tracker app. Mentors review mock scores and tell you which subject to fix that week — not "study harder" generic advice.',
          },
        ],
      },
      {
        heading: 'SSC Exam Pattern & Syllabus',
        content: [
          'Most SSC exams share four subjects. Difficulty and weightage shift by exam and tier.',
          {
            type: 'table',
            caption: 'Core subjects across SSC examinations',
            headers: ['Subject', 'What SSC tests', 'Preparation focus'],
            rows: [
              ['Reasoning', 'Analogies, series, coding, blood relations, puzzles', 'Daily 20–30 questions under time limit'],
              ['General Awareness', 'History, polity, science, geography, current affairs', 'Notes + weekly CA test — not passive reading'],
              ['Quantitative Aptitude', 'Arithmetic, algebra, geometry, DI', 'Concept → PYQ → timed drill'],
              ['English', 'Grammar, vocab, comprehension, cloze test', 'Daily reading + error-spotting practice'],
            ],
          },
        ],
      },
      {
        heading: 'How to Prepare Effectively',
        content: [
          'A workable 6-month plan for a graduate targeting CGL:',
          {
            type: 'bullets',
            items: [
              'Months 1–2: Complete one pass of all four subjects with concept notes',
              'Month 3: Start topic-wise PYQs — 50 questions per topic minimum',
              'Month 4: Sectional tests Mon–Thu; full mock every Friday',
              'Month 5: Weak-area revision + Tier II English/Quant depth for CGL',
              'Month 6: Full mocks only + GK/current affairs daily revision',
            ],
          },
          'CHSL and GD students can compress this to 3–4 months if they study daily. Working professionals use our recorded classes and attend live sessions on weekends.',
          {
            type: 'callout',
            title: 'Resources we point students to',
            text: 'Our PYQs book, weekly test series, current affairs monthly magazine, and mentorship sessions are built for this exact rhythm — not as optional add-ons.',
          },
        ],
      },
      {
        heading: 'SSC CPO & MTS — Quick Overview',
        content: [
          'CPO recruits Sub-Inspectors in Delhi Police and CAPFs — graduation required, written exam plus physical tests. MTS is a 10th-level entry for support staff posts in central ministries.',
          {
            type: 'bullets',
            items: [
              'CPO: Bachelor\'s degree; age ~20–25; written + PET/PST + medical',
              'MTS: 10th pass; age 18–25; CBT + descriptive paper',
              'Both share the same four core subjects — students often prepare alongside CHSL or CGL',
            ],
          },
        ],
      },
      {
        heading: 'SSC Eligibility & Selection Process',
        content: [
          'Always verify the latest notification on ssc.nic.in — age limits and educational requirements change by post.',
          {
            type: 'table',
            caption: 'Typical eligibility by examination',
            headers: ['Exam', 'Education', 'Age (general)'],
            rows: [
              ['SSC CGL', 'Graduation', '18–30 years'],
              ['SSC CHSL', '12th pass', '18–27 years'],
              ['SSC GD', '10th pass', '18–23 years'],
              ['SSC CPO', 'Graduation', '20–25 years'],
              ['SSC MTS', '10th pass', '18–25 years'],
            ],
          },
          'Selection is multi-stage for most exams. Clearing Tier I means nothing if Tier II preparation was ignored. We map each student\'s target exam to the full selection pipeline — not just the first stage.',
        ],
      },
    ],
  },

  posts: {
    title: 'SSC Exams We Prepare You For',
    subtitle:
      'Coaching aligned to the actual exam pattern for each Staff Selection Commission recruitment.',
    items: [
      { name: 'SSC CGL', icon: '🎓' },
      { name: 'SSC CHSL', icon: '📝' },
      { name: 'SSC GD', icon: '🛡️' },
      { name: 'SSC CPO', icon: '👮' },
      { name: 'SSC MTS', icon: '💼' },
      { name: 'SSC Stenographer', icon: '⌨️' },
      { name: 'SSC Selection Post', icon: '📋' },
      { name: 'SSC JE', icon: '🔧' },
    ],
    footer:
      'One coaching program covers shared subjects; mentorship helps you focus on the specific exam and tier you are targeting.',
  },

  whyChooseUs: {
    title: 'Why Choose Elite Academy for SSC',
    subtitle:
      'The same system behind our Punjab Government exam selections — adapted for national-level SSC competition.',
    items: [
      {
        icon: '👨‍🏫',
        title: 'Experienced Faculty',
        text: 'Teachers who have coached thousands through PSSSB and Punjab Police papers — they know where students actually lose marks in reasoning and quant.',
      },
      {
        icon: '📱',
        title: 'Tracker App',
        text: 'Daily targets, syllabus ticks, and mock score history in one place. Your mentor reviews this before every guidance session.',
      },
      {
        icon: '🎥',
        title: 'Live Classes',
        text: 'Interactive sessions with real-time doubt solving. Ask why a shortcut works — not just what the answer is.',
      },
      {
        icon: '📺',
        title: 'Recorded Classes',
        text: 'Missed a live class? Rewatch, pause, and redo the practice questions before the next test.',
      },
      {
        icon: '📅',
        title: 'Weekly Tests',
        text: 'Every Friday, a scored mock under exam conditions. No surprises on exam day.',
      },
      {
        icon: '🎯',
        title: 'Sectional Tests',
        text: 'Monday to Thursday subject-wise tests so weak areas surface early — not after the final mock.',
      },
      {
        icon: '📘',
        title: 'PYQ Practice',
        text: '20,000+ previous year questions in our PYQs book — the fastest way to learn what SSC actually asks.',
      },
      {
        icon: '📰',
        title: 'Current Affairs',
        text: 'Monthly magazines and daily capsules aligned to SSC GK — static subjects plus last 6 months CA.',
      },
      {
        icon: '💬',
        title: 'Personal Mentorship',
        text: 'One-on-one sessions for study planning, mock analysis, and keeping working professionals on track.',
      },
    ],
  },

  comparison: {
    title: 'Why Elite Academy is Different',
    subtitle:
      'An honest look at what you get here versus what most coaching institutes offer.',
    headers: ['Feature', 'Elite Academy', 'Typical Coaching Institute'],
    rows: [
      { feature: 'Experienced Faculty', elite: 'Full-time mentors with govt exam coaching track record', typical: 'Mixed — often part-time or rotating' },
      { feature: 'Tracker App', elite: 'Yes — daily targets & progress dashboard', typical: 'Rarely available' },
      { feature: 'Weekly Tests', elite: 'Every week, scored with analysis', typical: 'Monthly or irregular' },
      { feature: 'Sectional Tests', elite: 'Mon–Thu subject-wise tests', typical: 'Not structured' },
      { feature: 'Mock Tests', elite: 'Full-length, exam-pattern mocks', typical: 'Limited count' },
      { feature: 'Personal Mentorship', elite: '1-on-1 sessions available', typical: 'Group doubts only' },
      { feature: 'Study Material', elite: 'Updated books & notes in-house', typical: 'Third-party photocopies' },
      { feature: 'Current Affairs', elite: 'Monthly magazine + daily updates', typical: 'Shared PDFs, often outdated' },
      { feature: 'Recorded Classes', elite: 'Full library for all enrolled students', typical: 'Live-only or paid extra' },
      { feature: 'Live Classes', elite: 'Interactive with doubt solving', typical: 'One-way lectures' },
      { feature: 'Performance Tracking', elite: 'Score trends across all tests', typical: 'Marks on paper only' },
      { feature: 'PYQ Practice', elite: '20,000+ PYQs, topic-wise', typical: 'Scattered handouts' },
    ],
  },

  localSeo: {
    title: 'SSC Coaching Across Punjab & Chandigarh Region',
    subtitle:
      'Students travel to us from across the tricity and beyond — for classroom discipline, online flexibility, or both.',
    areas: [
      {
        heading: 'Why Students from Chandigarh Choose Elite Academy',
        paragraphs: [
          'Chandigarh students want coaching that respects their time — no filler lectures, no three-hour classes that could be forty focused minutes. Our Sector 24-D branch is where classroom batches run with the same weekly test schedule as online students.',
          'Many Chandigarh aspirants also prepare for Punjab Government exams alongside SSC. PSSSB, Punjab Police, and Patwari coaching run on the same platform — one enrollment, shared study material, separate exam-specific mentorship.',
        ],
        bullets: [
          'Offline classes at SCO 144, Sector 24-D, Chandigarh',
          'Easy access from Sector 17, 22, 35 and surrounding areas',
          'Library and doubt sessions for enrolled classroom students',
        ],
        relatedLinks: [
          { path: '/psssb-coaching', label: 'PSSSB Coaching' },
          { path: '/punjab-police-coaching', label: 'Punjab Police Coaching' },
          { path: '/patwari-coaching', label: 'Patwari Coaching' },
        ],
      },
      {
        heading: 'SSC Coaching for Students from Mohali',
        paragraphs: [
          'Mohali is 20–30 minutes from our Chandigarh branch. Students from Phase 3, Phase 7, Kharar and SAS Nagar regularly attend morning and evening batches.',
          'Prefer not to commute daily? Mohali students join online coaching with live classes and visit the branch for mock test days or mentorship sessions.',
        ],
      },
      {
        heading: 'SSC Coaching for Students from Panchkula',
        paragraphs: [
          'Panchkula students use the Zirakpur–Chandigarh corridor to reach Sector 24-D. Weekend batches suit college students from MDC and nearby institutes.',
          'Online coaching is popular among Panchkula working professionals who study after office hours using recorded classes.',
        ],
      },
      {
        heading: 'SSC Coaching for Students from Zirakpur',
        paragraphs: [
          'Zirakpur\'s proximity to Chandigarh makes our classroom batches a practical choice. Students get peer group motivation — important when SSC preparation feels isolating.',
          'Our tracker app keeps Zirakpur online students accountable with the same daily targets as classroom batches.',
        ],
      },
      {
        heading: 'SSC Coaching for Students from Fatehgarh Sahib',
        paragraphs: [
          'Our Fatehgarh Sahib branch at City Center, Sirhind serves students who want local classroom coaching without travelling to Chandigarh daily.',
          'The teaching methodology is identical — live classes, weekly tests, study material and mentorship. Students from Sirhind, Mandi Gobindgarh and nearby towns attend here.',
        ],
        link: { path: '/psssb-coaching', label: 'PSSSB coaching at Fatehgarh Sahib' },
      },
      {
        heading: 'SSC Coaching for Students from Patran',
        paragraphs: [
          'Patran and surrounding villages in Patiala district are well connected to our Fatehgarh Sahib branch. Students who cannot reach Chandigarh still get structured offline coaching.',
          'Online coaching with recorded classes works well for Patran students in college — they watch lectures after classes and attempt weekly tests on weekends.',
        ],
      },
    ],
  },

  studentSuccess: {
    ...STUDENT_SUCCESS_DATA,
    title: 'Proven Results in Punjab Government Exams',
    subtitle:
      'Our SSC coaching uses the same faculty, tests, and mentorship that produced these selections. We do not claim SSC selections we cannot verify — we show you what our system has actually delivered.',
    classroomImage: {
      image: 'classroom.webp',
      alt: 'Elite Academy classroom in Chandigarh with students attending government exam coaching lecture',
      description:
        'Real classroom at our Chandigarh branch — concept teaching, doubt solving, and weekly test discussions. The same faculty teaches SSC batches online and offline.',
    },
    trustFeatures: [
      { icon: '👨‍🏫', title: 'Expert Faculty', subtitle: 'Govt exam specialists' },
      { icon: '📱', title: 'Tracker App', subtitle: 'Daily progress tracking' },
      { icon: '📝', title: 'Weekly Tests', subtitle: 'Scored mock every Friday' },
      { icon: '🎥', title: 'Recorded Classes', subtitle: 'Rewatch anytime' },
      { icon: '🎯', title: 'Personal Mentorship', subtitle: '1-on-1 guidance' },
      { icon: '📍', title: 'Online + Offline', subtitle: 'Chandigarh & Sirhind' },
    ],
  },

  program: {
    title: 'Complete SSC Coaching Program',
    subtitle:
      'Reasoning, quant, English, and GK — one structured program with the testing rhythm SSC demands.',
    features: DEFAULT_PROGRAM_FEATURES,
  },

  timeline: buildDefaultTimeline('SSC', 'Clear Your SSC Exam'),

  resources: {
    ...DEFAULT_RESOURCES,
    subtitle:
      'Books, test series, current affairs, and mentorship — the same resources our Punjab Government exam toppers used, now aligned for SSC preparation.',
    items: [
      ...DEFAULT_RESOURCES.items,
      {
        icon: '📰',
        title: 'Exam Preparation Blog',
        description: 'Strategy articles, notification updates, and preparation tips from our faculty.',
        path: '/blog',
        color: 'from-emerald-500 to-teal-500',
      },
    ],
  },

  branches: {
    title: 'Online vs Offline SSC Coaching',
    subtitle:
      'Classroom batches in Chandigarh and Fatehgarh Sahib. Live online coaching for students across Punjab and India. Same faculty, tests, and tracker app in both modes.',
    modes: [
      {
        icon: '💻',
        title: 'Online SSC Coaching',
        description:
          'Live classes, recorded lectures, weekly tests, sectional tests, tracker app, PYQs book, and mentorship — from anywhere. Ideal for working professionals and students outside the tricity.',
        idealFor:
          'Mohali, Panchkula, Zirakpur, Patran and other areas where daily commute to Chandigarh is not practical.',
        ctaPath: '/online-coaching',
        ctaLabel: 'Join Online SSC Coaching →',
      },
      {
        icon: '🏫',
        title: 'Offline SSC Coaching',
        description:
          'In-person classes at Chandigarh (Sector 24-D) or Fatehgarh Sahib (City Center, Sirhind). Peer learning, classroom discipline, and direct faculty access after class.',
        idealFor:
          'Chandigarh tricity students and Fatehgarh Sahib district aspirants who want a fixed classroom routine.',
        ctaPath: '/contact-us',
        ctaLabel: 'Visit Our Branch →',
      },
    ],
    locations: [
      {
        name: 'Elite Academy Chandigarh',
        address: 'SCO 144\nSector 24-D\nChandigarh',
        description:
          'SSC, PSSSB, Punjab Police and Patwari classroom coaching. Open Mon–Sat, 10 AM – 7 PM.',
        phone: '7696954686',
        linkPath: '/psssb-coaching',
        linkLabel: 'Also see PSSSB coaching →',
      },
      {
        name: 'Elite Academy Fatehgarh Sahib',
        address:
          '1st Floor, Shop No. 18\nAbove PB 23 Outfit\nCity Center\nSirhind 140406',
        description:
          'Offline coaching for SSC, PSSSB, Punjab Police and Patwari aspirants in Fatehgarh Sahib district.',
        phone: '7696954686',
        linkPath: '/contact-us',
        linkLabel: 'Contact us for directions →',
      },
    ],
  },

  faq: {
    title: 'SSC Coaching FAQs',
    subtitle: 'Straight answers from our faculty — eligibility, coaching modes, fees, and preparation strategy.',
    items: [
      {
        question: 'Which is the best SSC coaching institute in Chandigarh?',
        answer:
          'Look for structured weekly tests, PYQ-based teaching, mentorship, and faculty who coach full-time — not guest lectures. Elite Academy offers all of this with classroom batches in Sector 24-D and online coaching for students across Punjab. Our track record in Punjab Government exams shows the quality of our teaching system.',
      },
      {
        question: 'Does Elite Academy provide SSC coaching in Chandigarh?',
        answer:
          'Yes — offline classes at SCO 144, Sector 24-D, Chandigarh, and online coaching for students anywhere. Both modes include live classes, recorded lectures, weekly tests, study material, tracker app, and mentorship.',
      },
      {
        question: 'What is the fee structure for SSC coaching at Elite Academy?',
        answer: [
          'SSC coaching is part of our comprehensive program. Visit our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching page' },
          ' for current fees, or call ',
          { type: 'phone', number: '+917696954686', label: '7696954686' },
          '.',
        ],
      },
      {
        question: 'Which SSC exams does Elite Academy prepare students for?',
        answer:
          'SSC CGL, CHSL, GD, CPO, MTS, Stenographer, Selection Post, and JE. The core four subjects are taught comprehensively; mentorship helps you focus on the specific exam and tier you are targeting.',
      },
      {
        question: 'Do you have SSC selected students?',
        answer:
          'We do not claim SSC selections we cannot verify. Our verified selections are in Punjab Government examinations — including PSSSB Excise Inspector and Punjab Jail Warder (Rank 16). Our SSC coaching uses the identical teaching methodology, faculty, tests, and mentorship that produced those results.',
      },
      {
        question: 'Do you provide mock tests for SSC preparation?',
        answer: [
          'Yes — ',
          { type: 'link', path: '/weekly-test', label: 'weekly tests' },
          ', ',
          { type: 'link', path: '/sectional-test-series', label: 'sectional tests (Mon–Thu)' },
          ', and full-length Friday mocks with score analysis. This is non-negotiable in our program — not an optional extra.',
        ],
      },
      {
        question: 'Is online SSC coaching effective?',
        answer: [
          'Yes, if the institute provides live classes, recorded backup, and regular testing — not just videos. Our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching' },
          ' includes all three plus the tracker app and mentorship. Many working professionals prepare this way.',
        ],
      },
      {
        question: 'Do you provide PYQs for SSC exams?',
        answer: [
          'Our ',
          { type: 'link', path: '/pyqs-book', label: 'PYQs book' },
          ' has 20,000+ questions organized topic-wise. PYQ practice is built into daily classwork — not left for students to do alone.',
        ],
      },
      {
        question: 'How is SSC preparation different from PSSSB preparation?',
        answer: [
          'SSC is national-level with heavier quant and English. ',
          { type: 'link', path: '/psssb-coaching', label: 'PSSSB' },
          ' adds Punjabi and Punjab-specific GK. Many of our students prepare for both — the study material overlaps significantly. We help you balance both without burning out.',
        ],
      },
      {
        question: 'How long does SSC CGL preparation take?',
        answer:
          '6–8 months for graduates with decent basics. 10–12 months if starting quant and English from scratch. Consistency matters more than duration — our mentorship keeps you on a weekly schedule.',
      },
      {
        question: 'Can I prepare for SSC while working or in college?',
        answer: [
          'Most of our working students use recorded classes on weekdays and live sessions on weekends. The tracker app (included with ',
          { type: 'link', path: '/online-coaching', label: 'online coaching' },
          ') and ',
          { type: 'link', path: '/mentorship', label: 'mentorship' },
          ' sessions are especially useful for limited study hours.',
        ],
      },
      {
        question: 'Can students from Fatehgarh Sahib and Patran join SSC coaching?',
        answer:
          'Yes. Our Fatehgarh Sahib branch at City Center, Sirhind runs offline batches. Patran students can attend there or join online coaching. Same faculty and test series in both cases.',
      },
      {
        question: 'Can students from Mohali, Panchkula and Zirakpur join?',
        answer:
          'Yes — many attend our Chandigarh branch (20–30 min from Mohali/Panchkula). Online coaching is available if daily commute is not feasible.',
      },
      {
        question: 'Do you provide personal mentorship for SSC?',
        answer: [
          'Yes — book ',
          { type: 'link', path: '/mentorship', label: '1-on-1 mentorship' },
          ' for mock analysis, study planning, and weak-area targeting. Mentors review your tracker app progress before each session.',
        ],
      },
      {
        question: 'Do you provide current affairs for SSC?',
        answer: [
          'Yes — ',
          { type: 'link', path: '/current-affairs-book', label: 'current affairs books' },
          ', ',
          { type: 'link', path: '/monthly-current-affairs', label: 'monthly magazines' },
          ', and weekly CA tests. SSC GK needs both static subjects and last 6 months current affairs.',
        ],
      },
      {
        question: 'Do you provide study material for SSC?',
        answer: [
          'Subject-wise ',
          { type: 'link', path: '/books', label: 'books' },
          ', class notes, and practice sheets — updated when SSC changes patterns. No third-party photocopy bundles.',
        ],
      },
      {
        question: 'Do you provide coaching for SSC descriptive paper?',
        answer:
          'Yes — weekly writing practice for CGL Tier III and CHSL Tier II. Essays, letters, and applications checked by faculty with specific feedback on structure and grammar.',
      },
      {
        question: 'Do you provide SSC GD physical test guidance?',
        answer:
          'We guide on PET standards, running schedules, and jump technique. Academic preparation is in class; physical training is structured as a self-practice plan with checkpoints.',
      },
      {
        question: 'How do I enroll in SSC coaching?',
        answer: [
          'Enroll via ',
          { type: 'link', path: '/online-coaching', label: 'online coaching' },
          ' for instant access. For offline batches, call ',
          { type: 'phone', number: '+917696954686', label: '7696954686' },
          ' or visit ',
          { type: 'link', path: '/contact-us', label: 'contact page' },
          '.',
        ],
      },
      {
        question: 'What makes Elite Academy different from other SSC coaching institutes?',
        answer:
          'Weekly tests every Friday, sectional tests Mon–Thu, tracker app, 20,000+ PYQs, personal mentorship, and faculty who coach government exams full-time. See our comparison table above for a feature-by-feature breakdown.',
      },
    ],
  },

  finalCta: {
    title: 'Start SSC Preparation with a System That Works',
    description:
      'Join offline classes in Chandigarh or Fatehgarh Sahib — or prepare online from Mohali, Panchkula, Zirakpur, Patran or anywhere in Punjab. Weekly tests, mentorship, tracker app, PYQs, and live classes included.',
    ctaLabel: 'Join SSC Coaching Now',
    secondaryText: 'Questions? Call 7696954686 or',
    highlights: ['Offline Classes', 'Online Classes', 'Weekly Tests', 'Mentorship', 'Tracker App'],
  },
};

export default sscCoaching;
