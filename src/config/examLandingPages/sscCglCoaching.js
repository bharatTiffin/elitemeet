import {
  DEFAULT_PROGRAM_FEATURES,
  DEFAULT_RESOURCES,
  buildDefaultTimeline,
} from './shared';
import { STUDENT_SUCCESS_DATA } from '../studentSuccessData';

const sscCglCoaching = {
  slug: '/ssc-cgl-coaching',
  examName: 'SSC CGL Coaching',
  ctaPath: '/online-coaching',

  seo: {
    title: 'SSC CGL Coaching in Chandigarh | Elite Academy',
    description:
      'SSC CGL coaching in Chandigarh, Mohali, Panchkula & Punjab by Elite Academy. Tier I–IV preparation, weekly mocks, PYQs, tracker app, offline classes & personal mentorship from experienced faculty.',
    keywords:
      'SSC CGL coaching Chandigarh, best SSC CGL coaching Chandigarh, SSC CGL institute Chandigarh, SSC CGL classes Chandigarh, SSC CGL coaching near me, SSC CGL coaching Punjab, SSC CGL coaching Fatehgarh Sahib, SSC CGL coaching Patran, SSC CGL coaching Mohali, SSC CGL coaching Panchkula, SSC CGL coaching Zirakpur, SSC CGL preparation, SSC CGL offline coaching, SSC CGL online coaching, SSC CGL test series, SSC CGL mock tests, SSC CGL study material, Elite Academy SSC CGL',
    breadcrumb: 'SSC CGL Coaching',
    changefreq: 'weekly',
    priority: 0.92,
    schemaType: 'course',
    includeEducationalOrg: true,
    includeLocalBusiness: true,
    courseName: 'SSC CGL Coaching Program',
  },

  hero: {
    badge: 'Graduate-Level Central Government Exam',
    title: 'SSC CGL Coaching in Chandigarh | Elite Academy',
    subtitle:
      'Tier I to Tier IV — structured CGL preparation for graduates who want Income Tax Inspector, ASO, Central Excise and allied central government posts. Classroom batches in Chandigarh, online coaching across Punjab, weekly mocks, PYQs, tracker app and one-on-one mentorship.',
    ctaLabel: 'Start SSC CGL Preparation',
  },

  about: {
    title: 'About SSC CGL — Combined Graduate Level Examination',
    paragraphs: [
      'SSC CGL is the primary gateway for graduates into Group B and Group C central government posts — Income Tax Inspector, Assistant Section Officer in ministries, Central Excise Inspector, Sub-Inspector in CBI, Auditor in CAG, and dozens more. Roughly 25–30 lakh candidates register when notification drops. Final selections are in thousands. The gap between clearing Tier I and getting a post is where most aspirants disappear.',
      'CGL is not a single exam. It is a four-stage pipeline: Tier I screens, Tier II decides your rank, Tier III tests written expression, and Tier IV checks practical skills for specific posts. Students who treat CGL like a one-day MCQ test — and stop studying after Tier I — lose the rank they thought they had earned.',
      'At Elite Academy, CGL batches run on a fixed weekly cycle: concept class → topic PYQs → sectional test → Friday full mock → mentor review. Our faculty coaches government exam aspirants daily — the same teachers behind verified Punjab Government selections including Sawarn Singh (PSSSB Excise Inspector) and Arshdeep Singh (Punjab Jail Warder, Rank 16). We do not invent SSC ranks. We apply a preparation system that has produced real results in competitive government exams.',
      'Students from Chandigarh, Mohali, Panchkula, Zirakpur, Fatehgarh Sahib and Patran join us for offline classroom discipline or online flexibility. Working professionals in the tricity use recorded classes after office hours. College students from PU,UIET and nearby institutes attend morning batches. The syllabus, tests and mentorship are identical — only the mode changes.',
    ],
    callouts: [
      {
        title: 'What separates CGL toppers from the crowd',
        text: 'Toppers start Tier II preparation alongside Tier I — not after result. They analyse every mock, maintain a mistake notebook, and revise GK with testing instead of passive reading. Average students do the opposite and wonder why scores plateau at 120.',
      },
      {
        title: 'Honest note on selections',
        text: 'We share verified Punjab Government selections on this page. We do not list unverified SSC CGL ranks. Our CGL coaching uses the same faculty, weekly tests, tracker app and mentorship that produced those Punjab selections.',
      },
    ],
  },

  examDetails: {
    title: 'SSC CGL Exam Guide — Pattern, Syllabus & Preparation',
    subtitle:
      'Field-tested advice from teachers who see CGL aspirants every week — what the notification actually means, where marks shift between tiers, and how to prepare without losing a year.',
    sections: [
      {
        heading: 'Why SSC CGL Is One of India\'s Most Competitive Exams',
        content: [
          'Three forces collide in every CGL cycle: massive applicant volume, relatively few vacancies in popular posts, and a multi-tier format that punishes partial preparation.',
          {
            type: 'bullets',
            items: [
              'Lakhs of graduates apply — including engineers, CAs, and repeaters with 2–3 attempts',
              'Top posts (Income Tax Inspector, CBI SI, Central Excise) attract the highest cut-offs',
              'Tier I normalisation and Tier II scaling mean your final rank depends on performance across stages — not one good day',
              'A single weak paper in Tier II (especially Quantitative Aptitude or English) can drop you from Inspector-level post to Auditor or nothing',
            ],
          },
          'In our classroom, we tell students this upfront: CGL rewards consistency over six months, not intensity over six weeks. The student who studies 2 hours daily and attempts every weekly mock outperforms the one who crams 10 hours on Sundays.',
        ],
      },
      {
        heading: 'How SSC CGL Differs from Other SSC Exams',
        content: [
          'CHSL, MTS and GD share subject names with CGL — Reasoning, GK, Quant, English — but the depth, time pressure and post-Tier I structure are entirely different.',
          {
            type: 'table',
            caption: 'SSC CGL vs other SSC examinations',
            headers: ['Factor', 'SSC CGL', 'SSC CHSL / MTS / GD'],
            rows: [
              ['Minimum qualification', 'Graduation', '10th or 12th pass'],
              ['Tier II difficulty', 'Advanced Quant & English papers', 'Simpler or no Tier II'],
              ['Descriptive component', 'Tier III — essay, letter, précis', 'CHSL has descriptive; GD/MTS differ'],
              ['Skill tests', 'Tier IV — DEST/CPT for specific posts', 'Typing test for CHSL DEO'],
              ['Post level', 'Group B (Gazetted in some) & Group C', 'Mostly Group C clerical/constable'],
              ['Salary ceiling', 'Higher — Inspector/ASO pay levels', 'Lower clerical/constable scales'],
            ],
          },
          {
            type: 'callout',
            title: 'Mistake we see every year',
            text: 'Students preparing CHSL alongside CGL without separating study depth. CGL Tier II Quant includes trigonometry, advanced algebra and geometry at a level CHSL never demands. Use shared GK and reasoning base, but give CGL its own Quant and English track from month one.',
          },
        ],
      },
      {
        heading: 'Posts & Departments Through SSC CGL',
        content: [
          'CGL fills posts across central ministries, tax departments, audit offices, intelligence agencies and subordinate offices. Post preference order on the form matters — your rank and category decide what you actually get.',
          {
            type: 'bullets',
            items: [
              'Income Tax Department — Inspector of Income Tax (popular, field posting + promotion scope)',
              'Central Board of Indirect Taxes — Central Excise Inspector, Preventive Officer, Examiner',
              'Ministries — Assistant Section Officer (ASO), Assistant in various ministries',
              'CBI / NIA — Sub-Inspector (high competition, strict medical and character verification)',
              'Comptroller & Auditor General — Auditor, Accountant, Senior Secretariat Assistant',
              'Ministry of Statistics — Junior Statistical Officer (JSO — Statistics paper in Tier II)',
              'Central Secretariat — Assistant, Upper Division Clerk (UDC) in some cycles',
              'Other — Assistant Enforcement Officer in ED, Tax Assistant, Sub-Inspector in Narcotics',
            ],
          },
          'Departments differ in work profile, transfer policy, promotion speed and location. An Income Tax Inspector in a metro faces different life than an Auditor posted to a regional CAG office. We help students understand post codes during mentorship — not after allocation.',
        ],
      },
      {
        heading: 'Career Growth, Promotion & Salary',
        content: [
          'CGL posts are central government — 7th CPC pay, DA revisions, job security and pension benefits under NPS for appointments after 2004. Growth is structured but slow compared to private sector; the trade-off is stability and social respect.',
          {
            type: 'table',
            caption: 'Indicative pay levels (7th CPC — varies by post and city classification)',
            headers: ['Post (examples)', 'Level', 'Approx. starting basic'],
            rows: [
              ['Income Tax Inspector', 'Level 7', '₹44,900 (plus HRA, DA, TA)'],
              ['Central Excise Inspector', 'Level 7', '₹44,900'],
              ['Assistant Section Officer', 'Level 7', '₹44,900'],
              ['Auditor (CAG)', 'Level 6', '₹35,400'],
              ['Tax Assistant', 'Level 5', '₹29,200'],
              ['Sub-Inspector CBI', 'Level 6', '₹35,400'],
            ],
          },
          'Gross in-hand salary in Chandigarh or Delhi NCR is typically ₹55,000–₹75,000 for Level 7 Inspector-class posts after allowances — verify current DA rates on notification. Promotions move through MACP and departmental exams: Inspector → ACIT takes years of service plus departmental tests; ASO → SO through seniority and exam.',
          {
            type: 'callout',
            title: 'What teachers tell confused students',
            text: 'Do not pick a post only for starting salary. Transfer policy, work hours, uniform requirements (CBI SI), and promotion exam difficulty matter for 30 years of career — not just the first payslip.',
          },
        ],
      },
      {
        heading: 'SSC CGL Exam Pattern — Tier I',
        content: [
          'Tier I is a computer-based screening test. Marks count towards final merit (with normalisation when multiple shifts run). It is qualifying in spirit but practically you need a strong Tier I to stay competitive.',
          {
            type: 'table',
            caption: 'Tier I structure (typical pattern — confirm in latest notification)',
            headers: ['Section', 'Questions', 'Marks', 'Time'],
            rows: [
              ['General Intelligence & Reasoning', '25', '50', ''],
              ['General Awareness', '25', '50', '60 minutes total'],
              ['Quantitative Aptitude', '25', '50', ''],
              ['English Comprehension', '25', '50', ''],
              ['Total', '100', '200', '60 min'],
            ],
          },
          'Each wrong answer carries a 0.50 mark penalty. Speed matters: 60 minutes for 100 questions means you cannot afford to stuck on one puzzle. We drill 25-question sectionals in 15-minute windows so Tier I feels familiar, not frantic.',
          {
            type: 'bullets',
            items: [
              'Reasoning: matrix, paper folding, embedded figures, verbal analogies — moderate difficulty',
              'GK: static subjects plus 6–8 months current affairs',
              'Quant: arithmetic-heavy — percentages, ratio, TSD, geometry basics',
              'English: vocab, grammar, cloze test, comprehension',
            ],
          },
        ],
      },
      {
        heading: 'SSC CGL Exam Pattern — Tier II',
        content: [
          'Tier II is where ranks are made. Multiple papers depending on post preference — all candidates write Maths and English; JSO aspirants add Statistics; certain posts require specific papers.',
          {
            type: 'table',
            caption: 'Tier II papers (standard CGL cycle)',
            headers: ['Paper', 'Subject', 'Questions', 'Marks', 'Duration'],
            rows: [
              ['Paper I', 'Quantitative Abilities', '100', '200', '2 hours'],
              ['Paper II', 'English Language & Comprehension', '200', '200', '2 hours'],
              ['Paper III', 'Statistics (JSO only)', '100', '200', '2 hours'],
              ['Paper IV', 'General Studies Finance & Economics (specific posts)', '100', '200', '2 hours'],
            ],
          },
          'Tier II Quant is significantly harder than Tier I — trigonometry, advanced algebra, geometry, mensuration at exam speed. Tier II English is 200 questions in 2 hours: sentence improvement, idioms, active-passive, direct-indirect, comprehension. Students who ignored English after Tier I routinely score below 100 here.',
          {
            type: 'callout',
            title: 'How we train Tier II from month two',
            text: 'Parallel track: Tier I speed drills in class, Tier II depth as homework and Sunday tests. By the time notification arrives, you have already solved 2,000+ Tier II-level questions — not starting fresh in panic mode.',
          },
        ],
      },
      {
        heading: 'SSC CGL Exam Pattern — Tier III & Tier IV',
        content: [
          'Tier III is a pen-and-paper descriptive exam — 60 minutes, typically 100 marks. Essay, letter, précis and application writing in English or Hindi as per notification.',
          {
            type: 'bullets',
            items: [
              'Tier III: Descriptive — one essay (200–250 words), one letter/application, sometimes précis',
              'Evaluated for structure, clarity, grammar and relevance — not fancy vocabulary',
              'Tier IV: DEST (Data Entry Skill Test) — 8,000 key depressions per hour on computer for some posts',
              'Tier IV: CPT (Computer Proficiency Test) — Word, Excel, PowerPoint modules for ASO/UDC-type posts',
              'Tier IV is qualifying — but failing it eliminates you regardless of Tier I/II score',
            ],
          },
          'We run bi-weekly descriptive writing in CGL batches — timed, handwritten, faculty-checked. Students who never write until Tier III result are the same ones who score 30/100 and lose Inspector-level allocation.',
        ],
      },
      {
        heading: 'Eligibility, Age Limit & Attempts',
        content: [
          'Always read the official notification on ssc.nic.in — rules change by cycle. Below reflects typical CGL requirements; verify before applying.',
          {
            type: 'table',
            caption: 'Typical SSC CGL eligibility',
            headers: ['Criteria', 'Requirement'],
            rows: [
              ['Education', 'Bachelor\'s degree from recognised university (final-year students often eligible with proof)'],
              ['Age (General)', '18–30 years as on cut-off date'],
              ['Age (OBC)', 'Up to 33 years'],
              ['Age (SC/ST)', 'Up to 35 years'],
              ['Nationality', 'Indian citizen; subject of Nepal/Bhutan or Tibetan refugee as per rules'],
              ['Attempts', 'No fixed attempt limit — age bar is the constraint'],
              ['Physical (CBI/Narcotics SI)', 'Height, chest, vision standards as per notification'],
            ],
          },
          'Age relaxation for ex-servicemen, PwD and central government employees applies as per rules. If you are 29 and general category, this may be your last comfortable cycle — plan accordingly with mentorship.',
        ],
      },
      {
        heading: 'Selection Process — End to End',
        content: [
          'CGL selection is sequential. Missing any stage ends the journey.',
          {
            type: 'bullets',
            items: [
              'Step 1: Online application on ssc.nic.in — photo, signature, category certificate, post preference',
              'Step 2: Tier I CBT — all registered candidates',
              'Step 3: Tier II CBT — candidates shortlisted from Tier I (threshold varies by cycle)',
              'Step 4: Tier III Descriptive — typically all Tier II qualifiers',
              'Step 5: Document verification — matriculation, degree, category, reservation certificates',
              'Step 6: Tier IV skill test (DEST/CPT) where applicable for opted posts',
              'Step 7: Medical examination for Inspector, SI and force-related posts',
              'Step 8: Final merit and allocation — post, department and zone assigned by rank and preference',
            ],
          },
          'Normalisation applies when Tier I and Tier II run in multiple shifts. Your raw score is not always your merit score. Focus on maximising performance in every shift — not comparing raw marks with friends in other slots.',
        ],
      },
      {
        heading: 'Detailed Syllabus — Subject by Subject',
        content: [
          {
            type: 'table',
            caption: 'SSC CGL syllabus overview',
            headers: ['Subject', 'Tier I focus', 'Tier II additional depth'],
            rows: [
              ['Reasoning', 'Analogies, series, coding, blood relations, matrix, figure counting', 'Similar — difficulty increases slightly'],
              ['General Awareness', 'History, polity, geography, physics/chemistry/biology basics, current affairs', 'Finance & Economics paper for specific posts only'],
              ['Quantitative Aptitude', 'Arithmetic, basic algebra, geometry, number system', 'Trig, advanced algebra, mensuration, DI at 2-hour depth'],
              ['English', 'Vocab, grammar, comprehension, cloze', '200-question marathon: voice, narration, one-word substitution, idioms'],
              ['Statistics', 'Not in Tier I', 'JSO paper: probability, regression, index numbers, sampling'],
            ],
          },
          'GK is not "read Lucent once." Our weekly CA tests cover the last six months — SSC repeats polity and history questions with small twists. Revise static notes with active recall: close the book, write what you remember, check gaps.',
        ],
      },
      {
        heading: 'Preparation Roadmap — 6 Month Study Plan',
        content: [
          'For a graduate with basic maths and readable English, six months of disciplined daily study is realistic. Adjust if you are starting from zero or working full-time.',
          {
            type: 'bullets',
            items: [
              'Month 1 — Foundation: Complete one pass of all four Tier I subjects. Daily 1-hour GK reading with notes. Start vocabulary — 10 new words daily with sentences.',
              'Month 2 — Depth + Tier II start: Arithmetic chapters with 50 PYQs each. Begin Tier II English grammar modules. Reasoning daily 30 questions timed.',
              'Month 3 — PYQ immersion: Topic-wise CGL PYQs 2019–2024. First Tier II Quant paper attempted (untimed, then timed). Weekly CA revision test.',
              'Month 4 — Test rhythm: Mon–Thu sectional tests. Friday full Tier I mock. One Tier II paper every Sunday. Mentor reviews weak topics.',
              'Month 5 — Weak area war: Double time on lowest-scoring subject from mock analytics. Descriptive writing every alternate day. Revision of GK notes cycle 2.',
              'Month 6 — Exam mode: Alternate Tier I and Tier II full mocks. No new chapters — only revision and mistake notebook. Light GK, heavy speed.',
            ],
          },
          {
            type: 'callout',
            title: 'Tracker app role in this plan',
            text: 'Each week your mentor sets syllabus ticks and mock targets on the tracker app. Students who follow the dashboard complete 40% more PYQs than those who self-plan from YouTube playlists.',
          },
        ],
      },
      {
        heading: '3 Month Crash Strategy — When Time Is Short',
        content: [
          'Three months works only if you already cleared concepts once and need exam tempering — not if you are learning percentages from scratch.',
          {
            type: 'bullets',
            items: [
              'Weeks 1–4: Tier I syllabus speed run — 3 hours daily minimum. Skip fringe topics; master arithmetic, reading comprehension, basic reasoning and high-weight GK (polity, history, science).',
              'Weeks 5–8: Tier II Quant and English papers alternate days. 100-question English drills build stamina. Quant: chapters that carry 4+ marks per paper — geometry, algebra, DI.',
              'Weeks 9–12: Mock-only phase — 5 Tier I mocks and 3 Tier II papers per week. Every wrong answer logged. Descriptive twice weekly. GK from monthly current affairs magazine only.',
            ],
          },
          'Crash does not mean careless. Cut low-yield topics: advanced Statistics unless JSO, Paper IV unless you opted those posts. Mentorship sessions prioritise what to skip — equally important as what to study.',
        ],
      },
      {
        heading: 'Common Mistakes & Why Students Fail SSC CGL',
        content: [
          'After coaching thousands of government exam aspirants, failure reasons for CGL are predictable.',
          {
            type: 'bullets',
            items: [
              'Stopping after Tier I — Tier II preparation treated as "later problem"',
              'Collecting 15 books, finishing none — shinier new book syndrome every month',
              'Watching shortcut videos without concept — Tier II framing breaks shortcuts instantly',
              'GK as passive reading — no testing, no revision cycle, forgotten in two weeks',
              'English neglected because "I am from Hindi medium" — Tier II English is 200 marks, non-negotiable',
              'Mocks taken for thrill, never analysed — same mistake type repeated in five consecutive tests',
              'No time management practice — 40 questions left unattempted in every mock',
              'Post preference filled without research — allocated to a post you would never accept',
              'Ignoring descriptive and Tier IV until last week — eliminated with strong Tier I/II scores',
            ],
          },
          {
            type: 'callout',
            title: 'What actually works',
            text: 'One syllabus, one test series, one mistake notebook, one mentor check-in per week. Boring? Yes. Effective? Our Punjab Government selections came from the same discipline — not from secret tricks.',
          },
        ],
      },
      {
        heading: 'Books, PYQs, Mocks & Study Resources',
        content: [
          'Books alone do not clear CGL. Books plus timed practice plus analysis do.',
          {
            type: 'bullets',
            items: [
              'Quant: Start with one standard arithmetic book; add Tier II practice from our PYQs book — 20,000+ questions topic-wise',
              'English: Grammar rules plus daily reading (editorial or comprehension passages). Previous year Tier II English is the best vocab source',
              'Reasoning: Daily practice beats theory — 30 questions under 20 minutes',
              'GK: One static notes set plus our current affairs monthly magazine and weekly CA tests',
              'PYQs: Non-negotiable — SSC repeats question styles. Solve CGL 2018–2024 minimum, twice',
              'Mock tests: Weekly full mocks under exam conditions — our Friday test series with score tracking',
              'Sectional tests: Mon–Thu subject-wise to isolate weak chapters before they compound',
            ],
          },
          {
            type: 'paragraph',
            parts: [
              'Elite Academy students access ',
              { type: 'link', path: '/books', label: 'study books' },
              ', ',
              { type: 'link', path: '/pyqs-book', label: 'PYQs book' },
              ', ',
              { type: 'link', path: '/weekly-test', label: 'weekly test series' },
              ', and ',
              { type: 'link', path: '/current-affairs-book', label: 'current affairs material' },
              ' as part of the coaching program — not scattered add-ons.',
            ],
          },
        ],
      },
      {
        heading: 'How to Improve Speed & Accuracy',
        content: [
          'Speed without accuracy loses marks to negative marking. Accuracy without speed leaves questions unattempted. CGL needs both — trained separately then combined.',
          {
            type: 'bullets',
            items: [
              'Speed: Sectional timers — 25 questions in 15 minutes for Tier I sections. Gradually reduce by 1 minute per fortnight',
              'Accuracy: After every mock, classify errors — concept gap, careless slip, time pressure guess. Fix category 1 first',
              'Quant: Learn which question types to skip on sight — lengthy DI with no easy entry, complex geometry with no formula match',
              'English: Read questions before passage in comprehension — saves re-reading time',
              'Reasoning: Pattern recognition from PYQs — matrix and figure questions repeat formats',
              'Revision: Mistake notebook reviewed every Sunday — re-solve wrong questions before new mock',
            ],
          },
          'Analyse mocks within 24 hours while memory is fresh. Students who wait until next mock forget why they guessed — and repeat the guess.',
        ],
      },
      {
        heading: 'Offline Coaching, Online Coaching & Mentorship',
        content: [
          'Mode matters less than structure. Both our offline and online CGL students follow the same weekly schedule.',
          {
            type: 'bullets',
            items: [
              'Offline — Chandigarh (SCO 144, Sector 24-D) and Fatehgarh Sahib (City Center, Sirhind): classroom teaching, peer group, doubt sessions after class',
              'Online — Live classes plus full recorded library: for Mohali, Panchkula, Zirakpur, Patran and working professionals across Punjab',
              'Weekly tests — same paper for online and offline batches every Friday',
              'Tracker app — daily targets, syllabus completion, mock score trends visible to you and your mentor',
              'Personal mentorship — mock analysis, post preference guidance, study plan adjustments: book via our mentorship page',
            ],
          },
          {
            type: 'paragraph',
            parts: [
              'Explore ',
              { type: 'link', path: '/online-coaching', label: 'online coaching' },
              ' for enrollment or ',
              { type: 'link', path: '/contact-us', label: 'contact us' },
              ' for offline batch timings. Also see our broader ',
              { type: 'link', path: '/ssc-coaching', label: 'SSC coaching' },
              ' page if you are preparing for CHSL or GD alongside CGL.',
            ],
          },
        ],
      },
    ],
  },

  posts: {
    title: 'SSC CGL Posts You Can Get Through This Exam',
    subtitle:
      'Post preference on your CGL form decides where you work — know these before you fill the application.',
    items: [
      { name: 'Income Tax Inspector', icon: '💼' },
      { name: 'Central Excise Inspector', icon: '🏛️' },
      { name: 'Assistant Section Officer', icon: '📋' },
      { name: 'Sub-Inspector CBI', icon: '🔍' },
      { name: 'Auditor (CAG)', icon: '📊' },
      { name: 'Tax Assistant', icon: '🧾' },
      { name: 'Junior Statistical Officer', icon: '📈' },
      { name: 'Assistant Enforcement Officer', icon: '⚖️' },
      { name: 'Inspector (Preventive Officer)', icon: '🛃' },
      { name: 'Senior Secretariat Assistant', icon: '📝' },
    ],
    footer:
      'Mentorship sessions help you rank post preferences by work profile, location likelihood and promotion path — not just popularity on social media.',
  },

  whyChooseUs: {
    title: 'Why Elite Academy for SSC CGL',
    subtitle:
      'CGL-specific depth — Tier II from month two, descriptive drills, and a test rhythm built for graduate-level competition.',
    items: [
      {
        icon: '👨‍🏫',
        title: 'Experienced Faculty',
        text: 'Teachers who coach government exams full-time — they know where CGL students lose marks in Tier II English and which Quant chapters carry disproportionate weight.',
      },
      {
        icon: '📱',
        title: 'Tracker App',
        text: 'Syllabus ticks, daily PYQ targets and mock score history in one dashboard. Mentors review it before every guidance session — no "how is preparation going?" small talk.',
      },
      {
        icon: '🎥',
        title: 'Live Classes',
        text: 'Tier I speed and Tier II depth taught in parallel tracks. Doubts solved in class — not deferred to a Telegram group.',
      },
      {
        icon: '📺',
        title: 'Recorded Classes',
        text: 'Rewatch Tier II Quant chapters at your pace. Working professionals in Mohali and Panchkula rely on this for weekday revision.',
      },
      {
        icon: '📅',
        title: 'Weekly Tests',
        text: 'Friday CGL-pattern mocks — Tier I and Tier II alternate weeks. Scored, ranked, analysed.',
      },
      {
        icon: '🎯',
        title: 'Sectional Tests',
        text: 'Monday to Thursday subject-wise tests isolate weak chapters before the full mock — not after.',
      },
      {
        icon: '📘',
        title: 'PYQ Practice',
        text: '20,000+ previous year questions in our PYQs book. CGL 2018 onwards solved topic-wise in class.',
      },
      {
        icon: '✍️',
        title: 'Descriptive Training',
        text: 'Bi-weekly Tier III writing — essays, letters, précis checked by faculty. Handwritten, timed, realistic.',
      },
      {
        icon: '💬',
        title: 'Personal Mentorship',
        text: 'Post preference advice, mock analysis, and crash-plan adjustments for repeaters and working aspirants.',
      },
    ],
  },

  comparison: {
    title: 'Elite Academy vs Typical Coaching Institute',
    subtitle:
      'What CGL aspirants actually get — compared honestly, feature by feature.',
    headers: ['Feature', 'Elite Academy', 'Typical Coaching Institute'],
    rows: [
      { feature: 'Faculty', elite: 'Full-time govt exam specialists — same teachers online & offline', typical: 'Rotating guest faculty; different teacher each module' },
      { feature: 'Weekly Tests', elite: 'Every Friday — Tier I & Tier II alternate schedule', typical: 'Monthly or only before exam season' },
      { feature: 'Mock Tests', elite: 'Full-length CGL-pattern with normalisation discussion', typical: 'Generic SSC mocks — not Tier II depth' },
      { feature: 'Tracker App', elite: 'Daily targets, syllabus % and score trends', typical: 'Not available — self-tracking on paper' },
      { feature: 'Personal Mentorship', elite: '1-on-1 mock analysis and post preference guidance', typical: 'Crowd doubt session once a week' },
      { feature: 'Study Material', elite: 'In-house books and class notes — updated per notification', typical: 'Photocopied sheets from multiple sources' },
      { feature: 'Recorded Classes', elite: 'Full library included for all enrolled students', typical: 'Paid separately or not offered' },
      { feature: 'Live Classes', elite: 'Interactive — Tier II parallel track from month two', typical: 'Tier I only until result; Tier II crash later' },
      { feature: 'Current Affairs', elite: 'Monthly magazine + weekly CA tests for GK', typical: 'Shared PDFs — often outdated' },
      { feature: 'PYQs', elite: '20,000+ topic-wise — built into daily classwork', typical: 'Scattered handouts without solutions' },
      { feature: 'Performance Tracking', elite: 'Score trends across all mocks and sectionals', typical: 'Rank on whiteboard — no history' },
      { feature: 'Doubt Sessions', elite: 'After-class and scheduled 1-on-1 slots', typical: 'Only if you chase faculty after lecture' },
    ],
  },

  localSeo: {
    title: 'SSC CGL Coaching Across Punjab & Chandigarh Tricity',
    subtitle:
      'Graduates from across the region prepare with us — classroom discipline in Chandigarh, online flexibility from home.',
    areas: [
      {
        heading: 'SSC CGL Coaching in Chandigarh',
        paragraphs: [
          'Chandigarh draws serious CGL aspirants — PU graduates, central government job seekers from Sector 17 and 22, and repeaters who want a structured batch instead of isolated self-study. Our Sector 24-D classroom runs CGL batches with the same Friday mock schedule as online students.',
          'Many Chandigarh students also target PSSSB or Punjab Police. Dual preparation is common — shared reasoning and GK base, separate mentorship tracks for Punjab-specific papers.',
        ],
        bullets: [
          'Offline CGL batches at SCO 144, Sector 24-D, Chandigarh',
          'Easy reach from Sector 17, 22, 35, 44 and Industrial Area',
          'Peer group of serious aspirants — accountability matters for 6-month CGL prep',
        ],
        relatedLinks: [
          { path: '/ssc-coaching', label: 'SSC Coaching (all exams)' },
          { path: '/psssb-coaching', label: 'PSSSB Coaching' },
          { path: '/punjab-police-coaching', label: 'Punjab Police Coaching' },
        ],
      },
      {
        heading: 'SSC CGL Coaching for Mohali Students',
        paragraphs: [
          'Mohali — Phase 3, Phase 7, Kharar, Aerocity — is 20–30 minutes from our Chandigarh branch. Morning batches suit college students; evening batches suit working aspirants in IT and industry.',
          'Daily commute not practical? Mohali students enroll in online CGL coaching with live classes and visit Chandigarh for monthly mock test days or mentorship sessions.',
        ],
        bullets: [
          'Online live classes with recorded backup for weekday revision',
          'Same weekly tests as Chandigarh classroom students',
        ],
      },
      {
        heading: 'SSC CGL Coaching for Panchkula Students',
        paragraphs: [
          'Panchkula students use the Zirakpur–Chandigarh corridor for classroom batches. College students from MDC and nearby institutes often prefer weekend-intensive online coaching with weekday recorded lectures.',
          'Working professionals in Panchkula civil services and administration prepare through our online program — study after 7 PM, attempt Friday mocks on Saturday morning.',
        ],
      },
      {
        heading: 'SSC CGL Coaching for Zirakpur Students',
        paragraphs: [
          'Zirakpur\'s location makes Chandigarh classroom batches practical for graduates who want in-person Tier II doubt solving — especially for Quant and English depth.',
          'Our tracker app keeps Zirakpur online students on daily PYQ targets with the same accountability as classroom batches.',
        ],
      },
      {
        heading: 'SSC CGL Coaching in Fatehgarh Sahib',
        paragraphs: [
          'The Fatehgarh Sahib branch at City Center, Sirhind serves CGL aspirants from Sirhind, Mandi Gobindgarh and surrounding towns who prefer local offline coaching over daily Chandigarh travel.',
          'Teaching quality, test series and study material are identical to Chandigarh — only batch size and timing differ. Students preparing PSSSB alongside CGL find this branch convenient.',
        ],
        link: { path: '/patwari-coaching', label: 'Patwari coaching at Fatehgarh Sahib' },
      },
      {
        heading: 'SSC CGL Coaching for Patran & Patiala District',
        paragraphs: [
          'Patran and nearby villages connect well to our Fatehgarh Sahib branch. Graduates who cannot relocate to Chandigarh get structured CGL coaching locally — Tier II depth, weekly mocks, mentorship.',
          'Online coaching with recorded classes suits Patran students still in college — attend live sessions on phone, attempt weekly tests on weekends, visit branch for doubt camps when possible.',
        ],
      },
    ],
  },

  studentSuccess: {
    ...STUDENT_SUCCESS_DATA,
    title: 'Real Classroom. Real Reviews. Real Punjab Selections.',
    subtitle:
      'We show verified Punjab Government selections — not unverified SSC ranks. Our CGL program uses the same faculty, weekly tests, tracker app and mentorship behind these results.',
    classroomImage: {
      image: 'classroom.webp',
      alt: 'Elite Academy Chandigarh classroom during government exam coaching session for SSC CGL aspirants',
      description:
        'Offline CGL and government exam batches at our Chandigarh branch — concept teaching, Tier II problem solving and weekly mock discussion with faculty.',
    },
    trustFeatures: [
      { icon: '👨‍🏫', title: 'Expert Faculty', subtitle: 'Full-time exam coaches' },
      { icon: '📱', title: 'Tracker App', subtitle: 'Daily CGL prep targets' },
      { icon: '📝', title: 'Weekly Mocks', subtitle: 'Tier I & II tests' },
      { icon: '✍️', title: 'Descriptive Drills', subtitle: 'Tier III writing practice' },
      { icon: '🎯', title: 'Mentorship', subtitle: 'Mock & strategy sessions' },
      { icon: '📍', title: 'Chandigarh + Sirhind', subtitle: 'Offline & online' },
    ],
  },

  program: {
    title: 'Complete SSC CGL Coaching Program',
    subtitle:
      'Tier I speed, Tier II depth, Tier III writing, and Tier IV awareness — one program from notification to document verification.',
    features: [
      ...DEFAULT_PROGRAM_FEATURES,
      {
        icon: '✍️',
        title: 'Descriptive Writing',
        description: 'Bi-weekly Tier III practice — essays, letters and précis checked by faculty with grammar and structure feedback.',
      },
      {
        icon: '📘',
        title: 'Tier II Depth Modules',
        description: 'Parallel Quant and English papers from month two — not a last-minute crash after Tier I result.',
      },
    ],
  },

  timeline: {
    title: 'SSC CGL Preparation Process',
    subtitle: 'From enrollment to document verification — a structured path for CGL aspirants.',
    steps: [
      {
        label: 'Enroll',
        description: 'Join online or offline CGL coaching — instant access to live classes, recordings, books and tracker app.',
      },
      {
        label: 'Tier I Foundation',
        description: 'Build speed across Reasoning, GK, Quant and English with concept classes and daily practice.',
      },
      {
        label: 'Tier II Parallel Track',
        description: 'Start advanced Quant and 200-question English stamina from month two alongside Tier I prep.',
      },
      {
        label: 'PYQ Immersion',
        description: 'Solve CGL previous year questions topic-wise — learn what SSC repeats and what it skips.',
      },
      {
        label: 'Weekly Mocks',
        description: 'Friday full mocks alternate Tier I and Tier II format. Scores tracked; weak areas flagged by mentor.',
      },
      {
        label: 'Descriptive Practice',
        description: 'Timed handwritten essays and letters for Tier III — faculty feedback on structure and clarity.',
      },
      {
        label: 'Revision & Exam Mode',
        description: 'Mistake notebook revision, GK rapid cycles, mock-only final month before Tier I exam date.',
      },
      {
        label: 'Post-Tier I Continuation',
        description: 'No gap — Tier II mocks intensify, Tier III writing continues, post preference guidance before DV.',
      },
      {
        label: 'Clear SSC CGL',
        description: 'Walk into every tier prepared — from screening to skill test to final allocation.',
      },
    ],
  },

  resources: {
    ...DEFAULT_RESOURCES,
    title: 'SSC CGL Preparation Resources',
    subtitle:
      'Books, PYQs, test series, current affairs and mentorship — integrated into CGL coaching, not sold as disconnected products.',
    items: [
      ...DEFAULT_RESOURCES.items,
      {
        icon: '🎓',
        title: 'SSC Coaching (All Exams)',
        description: 'Preparing CHSL or GD alongside CGL? See our full SSC coaching program.',
        path: '/ssc-coaching',
        color: 'from-blue-500 to-indigo-500',
      },
      {
        icon: '📰',
        title: 'Exam Preparation Blog',
        description: 'CGL strategy articles, notification updates and tier-wise preparation guides.',
        path: '/blog',
        color: 'from-emerald-500 to-teal-500',
      },
    ],
  },

  branches: {
    title: 'Offline vs Online SSC CGL Coaching',
    subtitle:
      'Chandigarh and Fatehgarh Sahib classrooms for local aspirants. Live online coaching for graduates across Punjab who need flexibility without losing structure.',
    modes: [
      {
        icon: '💻',
        title: 'Online SSC CGL Coaching',
        description:
          'Live Tier I and Tier II classes, full recorded library, Friday mocks, sectional tests, tracker app, PYQs book, current affairs and mentorship — accessible from Mohali, Panchkula, Zirakpur, Patran or anywhere in India.',
        idealFor:
          'Working professionals, college students with limited commute time, and aspirants outside the Chandigarh tricity who want the same test rhythm as classroom students.',
        ctaPath: '/online-coaching',
        ctaLabel: 'Join Online CGL Coaching →',
      },
      {
        icon: '🏫',
        title: 'Offline SSC CGL Coaching',
        description:
          'In-person CGL batches at Chandigarh (Sector 24-D) and Fatehgarh Sahib (City Center, Sirhind). Direct faculty access, classroom doubt sessions, and peer learning for 6-month preparation discipline.',
        idealFor:
          'Chandigarh tricity graduates and Fatehgarh Sahib district aspirants who want fixed batch timings and face-to-face Tier II problem solving.',
        ctaPath: '/contact-us',
        ctaLabel: 'Visit Our Branch →',
      },
    ],
    locations: [
      {
        name: 'Elite Academy Chandigarh',
        address: 'SCO 144\nSector 24-D\nChandigarh',
        description:
          'SSC CGL classroom coaching alongside PSSSB, Punjab Police and Patwari batches. Mon–Sat, 10 AM – 7 PM.',
        phone: '7696954686',
        linkPath: '/ssc-coaching',
        linkLabel: 'Also see SSC coaching →',
      },
      {
        name: 'Elite Academy Fatehgarh Sahib',
        address:
          '1st Floor, Shop No. 18\nAbove PB 23 Outfit\nCity Center\nSirhind 140406',
        description:
          'Offline SSC CGL and Punjab Government exam coaching for Fatehgarh Sahib, Patran and Patiala district aspirants.',
        phone: '7696954686',
        linkPath: '/contact-us',
        linkLabel: 'Contact us for directions →',
      },
    ],
  },

  faq: {
    title: 'SSC CGL Coaching FAQs',
    subtitle:
      '45 practical answers — eligibility, tiers, salary, books, coaching modes and what teachers see students get wrong every year.',
    items: [
      {
        question: 'What is SSC CGL?',
        answer:
          'SSC CGL (Combined Graduate Level) is a Staff Selection Commission examination for recruiting graduates into Group B and Group C central government posts — Income Tax Inspector, ASO, Central Excise Inspector, Auditor, CBI Sub-Inspector and others. It has four tiers: Tier I (screening CBT), Tier II (scoring papers), Tier III (descriptive), and Tier IV (skill test for specific posts).',
      },
      {
        question: 'Which is the best SSC CGL coaching in Chandigarh?',
        answer:
          'Look for institutes that start Tier II preparation early, conduct weekly CGL-pattern mocks, offer descriptive writing practice, and provide mentorship — not just Tier I shortcut classes. Elite Academy offers classroom batches in Sector 24-D Chandigarh and online coaching across Punjab with tracker app, PYQs, and verified government exam teaching experience.',
      },
      {
        question: 'Does Elite Academy provide SSC CGL coaching in Chandigarh?',
        answer:
          'Yes. Offline CGL batches run at SCO 144, Sector 24-D, Chandigarh. Online CGL coaching is available for students in Mohali, Panchkula, Zirakpur, Fatehgarh Sahib, Patran and across India. Both modes include live classes, recordings, weekly tests, study material, tracker app and mentorship.',
      },
      {
        question: 'What is the eligibility for SSC CGL?',
        answer:
          'Typically a bachelor\'s degree from a recognised university. Age is generally 18–30 years for general category (relaxation for OBC, SC/ST, PwD and other categories as per notification). Final-year students may apply with proof of graduation before document verification. Always verify the latest notification on ssc.nic.in.',
      },
      {
        question: 'What is the age limit for SSC CGL 2025?',
        answer:
          'Age limits vary by cycle — general category is typically 18–30 years as on the notification cut-off date. OBC gets up to 3 years relaxation, SC/ST up to 5 years. Ex-servicemen and central government employees have additional relaxations. Check the official notification for exact dates.',
      },
      {
        question: 'How many attempts are allowed in SSC CGL?',
        answer:
          'There is no fixed attempt limit for SSC CGL. The age bar is the practical constraint — you can apply every year until you exceed the maximum age for your category. Many toppers clear CGL on their second or third attempt with improved Tier II preparation.',
      },
      {
        question: 'What is the salary after clearing SSC CGL?',
        answer:
          'Starting basic pay varies by post under 7th CPC — Level 7 posts like Income Tax Inspector start around ₹44,900 basic; Level 6 Auditor around ₹35,400. With HRA, DA and TA, gross in-hand is typically ₹55,000–₹75,000 for Inspector-class posts in major cities. Exact figures depend on posting location and current DA rates.',
      },
      {
        question: 'Which post is best in SSC CGL?',
        answer:
          'There is no universal "best" — it depends on your priority. Income Tax Inspector and Central Excise offer field work and good promotion scope. ASO gives ministry desk work in Delhi. CBI SI has high prestige but strict medical standards and unpredictable hours. Auditor posts are stable with moderate growth. Research post profiles during mentorship before filling preferences.',
      },
      {
        question: 'What is the SSC CGL exam pattern for Tier I?',
        answer:
          'Tier I is a 60-minute computer-based test with 100 questions (200 marks): 25 each from Reasoning, General Awareness, Quantitative Aptitude and English. Negative marking of 0.50 per wrong answer. It is qualifying but your score affects normalised merit — aim high, not just pass.',
      },
      {
        question: 'What is the SSC CGL Tier II exam pattern?',
        answer:
          'Tier II has separate papers: Paper I (Quantitative Abilities — 100 questions, 200 marks, 2 hours), Paper II (English — 200 questions, 200 marks, 2 hours). JSO aspirants add Paper III (Statistics). Specific posts may require Paper IV (General Studies Finance & Economics). Tier II marks heavily influence final rank.',
      },
      {
        question: 'What is SSC CGL Tier III?',
        answer:
          'Tier III is a descriptive pen-and-paper exam — typically 60 minutes, 100 marks. You write an essay, letter/application and sometimes précis in English or Hindi. It tests written expression, not MCQ speed. Students who ignore Tier III often lose post allocation despite strong Tier I/II scores.',
      },
      {
        question: 'What is SSC CGL Tier IV?',
        answer:
          'Tier IV includes skill tests for specific posts: DEST (Data Entry Skill Test — 8,000 key depressions/hour) and CPT (Computer Proficiency Test — Word, Excel, PowerPoint). It is qualifying — failure eliminates you regardless of earlier scores. Confirm which test applies to your opted posts in the notification.',
      },
      {
        question: 'How long does SSC CGL preparation take?',
        answer:
          'Six to eight months for graduates with basic maths and English. Ten to twelve months if starting fundamentals from scratch. Three-month crash works only for repeaters refreshing concepts — not first-time learners. Consistency beats duration: 2 hours daily for 8 months outperforms random 10-hour weekend cramming.',
      },
      {
        question: 'Can I prepare for SSC CGL while working?',
        answer: [
          'Yes — most working aspirants in Mohali and Panchkula use recorded classes on weekdays and live sessions on weekends. The tracker app (included with ',
          { type: 'link', path: '/online-coaching', label: 'online coaching' },
          ') and ',
          { type: 'link', path: '/mentorship', label: 'mentorship' },
          ' sessions help compress study into focused 2–3 hour daily blocks.',
        ],
      },
      {
        question: 'Is online SSC CGL coaching effective?',
        answer: [
          'Effective when the institute provides live classes, recorded backup, regular Tier II mocks and mentorship — not just pre-recorded videos. Our ',
          { type: 'link', path: '/online-coaching', label: 'online coaching' },
          ' follows the identical weekly schedule as Chandigarh classroom batches.',
        ],
      },
      {
        question: 'Does Elite Academy offer offline SSC CGL classes?',
        answer:
          'Yes — at Chandigarh (SCO 144, Sector 24-D) and Fatehgarh Sahib (City Center, Sirhind). Offline batches include classroom teaching, weekly mocks, doubt sessions and access to online recordings for missed classes.',
      },
      {
        question: 'What is the fee for SSC CGL coaching at Elite Academy?',
        answer: [
          'CGL coaching is part of our comprehensive program. Visit ',
          { type: 'link', path: '/online-coaching', label: 'online coaching' },
          ' for current fees or call ',
          { type: 'phone', number: '+917696954686', label: '7696954686' },
          '.',
        ],
      },
      {
        question: 'Do you have SSC CGL selected students?',
        answer:
          'We display verified Punjab Government selections — Sawarn Singh (PSSSB Excise Inspector) and Arshdeep Singh (Punjab Jail Warder, Rank 16). We do not claim SSC CGL selections we cannot verify. Our CGL coaching applies the same faculty, tests and mentorship system behind those results.',
      },
      {
        question: 'What books should I read for SSC CGL?',
        answer: [
          'One book per subject is enough if you supplement with PYQs. Our ',
          { type: 'link', path: '/books', label: 'study books' },
          ' and ',
          { type: 'link', path: '/pyqs-book', label: 'PYQs book (20,000+ questions)' },
          ' cover the syllabus topic-wise. Avoid buying 10 books and finishing none — depth on one source beats breadth on five.',
        ],
      },
      {
        question: 'How important are PYQs for SSC CGL?',
        answer: [
          'Critical. SSC repeats question styles — especially in Reasoning, GK and English. Solve CGL 2018–2024 PYQs minimum, twice. Our ',
          { type: 'link', path: '/pyqs-book', label: 'PYQs book' },
          ' organises 20,000+ questions topic-wise for structured practice.',
        ],
      },
      {
        question: 'Do you provide mock tests for SSC CGL?',
        answer: [
          'Yes — ',
          { type: 'link', path: '/weekly-test', label: 'weekly Friday mocks' },
          ' alternate Tier I and Tier II format, plus ',
          { type: 'link', path: '/sectional-test-series', label: 'Mon–Thu sectional tests' },
          '. Mock analysis is part of mentorship — not just a score on screen.',
        ],
      },
      {
        question: 'How do I analyse SSC CGL mock tests?',
        answer:
          'Within 24 hours of each mock: (1) Classify every wrong answer — concept gap, careless error, or time-pressure guess. (2) Re-solve wrong questions without time limit. (3) Note recurring mistake types in a notebook. (4) Share analysis with mentor for weekly focus areas. Students who only check rank repeat the same errors.',
      },
      {
        question: 'What is the syllabus for SSC CGL Tier I?',
        answer:
          'General Intelligence & Reasoning (analogies, series, coding, matrix, figure counting), General Awareness (history, polity, geography, science, current affairs), Quantitative Aptitude (arithmetic, basic algebra, geometry), and English Comprehension (vocab, grammar, cloze, comprehension). 100 questions in 60 minutes.',
      },
      {
        question: 'What is the syllabus for SSC CGL Tier II Quant?',
        answer:
          'Advanced arithmetic, algebra, trigonometry, geometry, mensuration, data interpretation and number system at 2-hour exam depth. Significantly harder than Tier I — includes topics like height and distance, partnership, mixture-alligation at complex framing.',
      },
      {
        question: 'How to prepare English for SSC CGL Tier II?',
        answer:
          'Tier II English has 200 questions in 2 hours — grammar (voice, narration, sentence improvement), vocab (idioms, OWS, synonyms), and comprehension. Daily 50-question drills build stamina. Previous year Tier II English papers are the best practice source. Hindi-medium students should start English prep from month one, not after Tier I.',
      },
      {
        question: 'How to prepare GK for SSC CGL?',
        answer: [
          'Static subjects (history, polity, geography, science) from structured notes plus last 6 months current affairs. Revise with testing — weekly CA quizzes, not passive reading. Our ',
          { type: 'link', path: '/current-affairs-book', label: 'current affairs book' },
          ' and ',
          { type: 'link', path: '/monthly-current-affairs', label: 'monthly magazine' },
          ' align with SSC GK patterns.',
        ],
      },
      {
        question: 'What are common mistakes in SSC CGL preparation?',
        answer:
          'Stopping after Tier I, collecting too many books, ignoring English, skipping mock analysis, not practising descriptive writing, and choosing posts without research. The biggest: treating CGL as a Tier I-only exam when Tier II decides your rank.',
      },
      {
        question: 'Why do students fail SSC CGL?',
        answer:
          'Not because the paper is impossibly hard — because preparation is fragmented. No fixed schedule, no Tier II depth, no mock analysis, GK studied once without revision, and descriptive/Tier IV ignored until too late. Intelligence is rarely the bottleneck; discipline and strategy are.',
      },
      {
        question: 'How to improve speed in SSC CGL?',
        answer:
          'Sectional timers — 25 questions in 15 minutes, reducing gradually. Learn to skip lengthy questions on sight. In English comprehension, read questions before the passage. Speed builds from repeated timed practice, not from reading tips.',
      },
      {
        question: 'How to improve accuracy in SSC CGL?',
        answer:
          'Negative marking punishes guessing. Attempt only questions you can eliminate options on. Maintain a mistake notebook — review every Sunday. Accuracy improves when you fix concept gaps identified in mock analysis, not by slowing down indefinitely.',
      },
      {
        question: 'What is normalisation in SSC CGL?',
        answer:
          'When Tier I or Tier II runs in multiple shifts, raw scores are adjusted using a statistical formula so candidates across shifts are compared fairly. You cannot control normalisation — only your performance in your shift. Focus on maximising your raw score, not comparing with friends in other slots.',
      },
      {
        question: 'Can final-year students apply for SSC CGL?',
        answer:
          'Yes, typically — if you will obtain your degree before document verification. You must produce proof of graduation at DV stage. Check the specific notification for educational qualification wording each cycle.',
      },
      {
        question: 'Is there negative marking in SSC CGL?',
        answer:
          'Yes — Tier I and Tier II both carry negative marking (typically 0.50 marks per wrong answer in Tier I). This makes blind guessing costly. Attempt questions you have narrowed down; skip and return if time permits.',
      },
      {
        question: 'What is DEST in SSC CGL?',
        answer:
          'Data Entry Skill Test — a qualifying Tier IV test for certain posts. You type 8,000 key depressions per hour on a computer. Practice typing speed in the weeks before Tier IV — students with strong MCQ scores fail here due to zero preparation.',
      },
      {
        question: 'What is CPT in SSC CGL?',
        answer:
          'Computer Proficiency Test — modules in Word Processing, Spreadsheet and PowerPoint for ASO and similar post codes. Qualifying but mandatory for opted posts. Basic computer familiarity is sufficient if you practise the format beforehand.',
      },
      {
        question: 'How is SSC CGL different from SSC CHSL?',
        answer: [
          'CGL requires graduation; CHSL requires 12th pass. CGL Tier II is significantly harder with advanced Quant and 200-question English. CGL posts are higher-grade (Inspector, ASO). CHSL leads to clerical roles. See our ',
          { type: 'link', path: '/ssc-coaching', label: 'SSC coaching page' },
          ' if you are deciding between exams.',
        ],
      },
      {
        question: 'Can I prepare for SSC CGL and PSSSB together?',
        answer: [
          'Yes — reasoning, maths and English base overlap. PSSSB adds Punjabi and Punjab-specific GK. Many Chandigarh students prepare both. We help balance syllabi without burnout through ',
          { type: 'link', path: '/psssb-coaching', label: 'PSSSB coaching' },
          ' and CGL mentorship tracks.',
        ],
      },
      {
        question: 'Do you provide personal mentorship for SSC CGL?',
        answer: [
          'Yes — ',
          { type: 'link', path: '/mentorship', label: '1-on-1 mentorship' },
          ' covers mock analysis, post preference strategy, Tier II weak-area planning and crash schedules for repeaters. Mentors review your tracker app before each session.',
        ],
      },
      {
        question: 'Do you provide current affairs for SSC CGL?',
        answer: [
          'Yes — ',
          { type: 'link', path: '/current-affairs-book', label: 'current affairs books' },
          ', ',
          { type: 'link', path: '/monthly-current-affairs', label: 'monthly magazines' },
          ', and weekly CA tests. SSC GK typically covers the last 6 months of events plus static subjects.',
        ],
      },
      {
        question: 'Do you provide descriptive writing practice for Tier III?',
        answer:
          'Yes — bi-weekly timed writing in CGL batches. Essays, formal letters and applications checked by faculty. Handwritten practice matches the actual Tier III format.',
      },
      {
        question: 'What is the cut-off for SSC CGL Tier I?',
        answer:
          'Cut-offs vary every cycle by category, post and normalisation. General category Tier I cut-offs in recent cycles have ranged roughly 140–170 normalised marks out of 200 — but treat this as indicative only. Aim for 160+ to stay safe for Tier II.',
      },
      {
        question: 'How to fill post preference in SSC CGL?',
        answer:
          'Research work profile, posting zones, promotion path and medical requirements before filling. Do not copy a topper\'s preference list — their rank and category differ from yours. Our mentorship sessions walk through post codes when notification releases.',
      },
      {
        question: 'Can students from Mohali join SSC CGL coaching?',
        answer:
          'Yes — attend Chandigarh classroom batches (20–30 min commute) or enroll in online coaching with the same weekly tests and faculty.',
      },
      {
        question: 'Can students from Panchkula and Zirakpur join?',
        answer:
          'Yes. Panchkula and Zirakpur students attend our Chandigarh branch or join online with recorded classes for weekday flexibility.',
      },
      {
        question: 'Is SSC CGL coaching available in Fatehgarh Sahib?',
        answer:
          'Yes — offline batches at City Center, Sirhind. Same teaching, tests and material as Chandigarh. Convenient for Patran, Mandi Gobindgarh and Patiala district students.',
      },
      {
        question: 'What is the selection process after Tier II?',
        answer:
          'Tier III descriptive → document verification → Tier IV skill test (if applicable) → medical (for force/Inspector posts) → final merit and post allocation. Every stage eliminates — preparation must cover all tiers from the start.',
      },
      {
        question: 'How to revise for SSC CGL in the last month?',
        answer:
          'No new topics. Mistake notebook + GK rapid revision + alternate Tier I/Tier II mocks. Reduce study hours slightly in the final 3 days — rest matters. Descriptive format revision only, not new essay topics.',
      },
      {
        question: 'What makes Elite Academy different for CGL coaching?',
        answer:
          'Tier II parallel track from month two, bi-weekly descriptive practice, Friday CGL-pattern mocks, tracker app, 20,000+ PYQs, personal mentorship, and full-time faculty — online and offline. See the comparison table on this page for a feature-by-feature breakdown.',
      },
      {
        question: 'How do I enroll in SSC CGL coaching at Elite Academy?',
        answer: [
          'Enroll via ',
          { type: 'link', path: '/online-coaching', label: 'online coaching' },
          ' for instant access. For offline batch timings, call ',
          { type: 'phone', number: '+917696954686', label: '7696954686' },
          ' or visit ',
          { type: 'link', path: '/contact-us', label: 'contact page' },
          '.',
        ],
      },
    ],
  },

  finalCta: {
    title: 'Start SSC CGL Preparation with Structure That Survives All Four Tiers',
    description:
      'Join offline CGL batches in Chandigarh or Fatehgarh Sahib — or prepare online from Mohali, Panchkula, Zirakpur, Patran and anywhere in Punjab. Tier II depth from month two, weekly mocks, descriptive drills, tracker app, PYQs and mentorship included.',
    ctaLabel: 'Join SSC CGL Coaching Now',
    secondaryText: 'Questions about batches or fees? Call 7696954686 or',
    highlights: ['Tier II From Month 2', 'Weekly Mocks', 'Descriptive Practice', 'Tracker App', 'Online + Offline'],
  },
};

export default sscCglCoaching;
