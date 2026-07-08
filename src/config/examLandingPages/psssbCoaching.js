import {
  DEFAULT_WHY_CHOOSE_US,
  DEFAULT_PROGRAM_FEATURES,
  DEFAULT_RESOURCES,
  DEFAULT_BRANCHES,
  buildDefaultTimeline,
} from './shared';
import { STUDENT_SUCCESS_DATA } from '../studentSuccessData';

export const psssbCoaching = {
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

examDetails: {
  title: 'PSSSB Exam Details',
  subtitle:
    'A practical guide to the PSSSB examination, covering notifications, eligibility, exam pattern, selection stages, salary expectations, and the preparation approach students need before joining coaching.',
  sections: [
    {
      heading: 'Latest PSSSB Notification',
      content: [
        'PSSSB recruitment is not based on a single fixed calendar. Notifications are released whenever vacancies arise in different departments of the Punjab Government, and each notice is important because it tells candidates which post is being recruited, what the requirements are, and how the process will move forward.',
        'A student should never assume that one old notice is still valid for the next recruitment. The latest PSSSB notification is the only reliable source for understanding the current post, eligibility, application process, syllabus, and important instructions. Since the rules and vacancies can change from one cycle to another, it is always better to verify the official website before applying.',
        'For students who are planning long-term preparation, this is also the point where PSSSB Coaching becomes more practical. Once a notification appears, candidates can match their preparation with the exact role they are targeting, whether they are preparing for a clerical position, a field-based role, or another Punjab Government Exam category.',
        'Elite Academy helps students interpret each new recruitment notice in a clear way, so they understand what the notification means for their schedule, subjects, and overall PSSSB Preparation plan without wasting time on confusion or outdated information.',
      ],
    },
    {
      heading: 'PSSSB Eligibility Criteria',
      content: [
        'Eligibility is one of the first things a student should check before joining any PSSSB preparation plan. For many Clerk recruitments, the minimum educational requirement is a bachelor\'s degree from a recognized university, although some posts may require a different academic background depending on the department and role.',
        'Most recruitments also mention an age range. For many general category candidates, the minimum age is 18 years and the maximum age is 37 years, while age relaxation is available according to Punjab Government rules and the category of the applicant. Students should not rely on memory for this point because the exact details can change from one notification to another.',
        'Punjabi at the matriculation level is also an important eligibility requirement for many posts, especially where language proficiency is considered necessary for official work. In addition, many Clerk recruitments expect candidates to have completed a 120-hour computer course or possess an equivalent qualification, which is why computer awareness has become a practical part of PSSSB Preparation.',
        'The most important point is that eligibility differs according to the advertised post. A candidate preparing for one recruitment should not assume that the same educational or age requirement will apply to every PSSSB Exam vacancy, which is why the official notification must be read carefully before applying.',
      ],
    },
    {
      heading: 'PSSSB Exam Pattern & Syllabus',
      content: [
        'Most PSSSB recruitments include an objective-type written examination as the first stage of selection. This stage is designed to test a candidate\'s general awareness, language ability, reasoning, quantitative understanding, and preparedness for office-based government work.',
        'The syllabus commonly includes General Knowledge, Current Affairs, English, Punjabi, Reasoning, Quantitative Aptitude, and Computer Awareness. These subjects are included because they reflect the everyday knowledge and basic skills a candidate needs for Punjab Government Jobs and administrative responsibilities.',
        'The exact exam pattern may differ from one post to another, and that is why students should always follow the latest notification instead of relying on a single old pattern. Some recruitments may place more emphasis on Punjabi, others on current affairs, while some clerical posts may also include typing or practical skill evaluation.',
        'For students preparing through PSSSB Coaching Chandigarh or online programs, this means that planning must be based on the actual notification rather than guesswork. A strong preparation plan covers the main subjects in a balanced way while also preparing for any extra test that may be mentioned in the latest recruitment notice.',
      ],
    },
    {
      heading: 'PSSSB Selection Process',
      content: [
        'The selection process for PSSSB usually begins with the written examination. Candidates who clear this stage move forward according to the merit and vacancy conditions set by the recruitment notice. This is why performance in the written test is so important for every candidate.',
        'Some recruitments, especially those involving clerical duties, include a typing test after the written exam. This stage checks whether the candidate has the speed and accuracy needed for day-to-day office work. Students who are aiming for such posts should not ignore typing practice, even if they are strong in general subjects.',
        'After that, document verification is conducted to confirm the details submitted in the application. Educational certificates, identity proof, category documents, and other required papers are checked at this stage. In some cases, additional skill tests or departmental requirements may also be added depending on the post.',
        'This full process shows why a student should prepare not only for the written paper but also for each stage that follows. A serious PSSSB Exam preparation plan looks at the recruitment process as a whole rather than treating the written exam as the only challenge.',
      ],
    },
    {
      heading: 'PSSSB Salary & Career Growth',
      content: [
        'Salary is an important reason why many students prepare for PSSSB. For many Clerk recruitments, the basic pay begins around ₹19,900, although the exact figure depends on the post, pay level, and the rules applicable at the time of recruitment. Students should look at the official notification for the most accurate information.',
        'In addition to basic pay, employees may receive Dearness Allowance, House Rent Allowance, medical benefits, and other government allowances according to the applicable pay rules. These benefits make Punjab Government Jobs attractive to candidates who want stable employment with long-term financial security.',
        'The career value of a PSSSB job is not limited to salary alone. Promotion opportunities, regular service structure, job security, and the chance to work in public administration are strong reasons why so many aspirants prefer this route over private-sector alternatives.',
        'For candidates who want a dependable career, the balance of pay, benefits, and long-term growth makes this exam important. That is why a proper PSSSB Preparation strategy should be based on both exam readiness and an understanding of the larger job opportunity behind the recruitment.',
      ],
    },
    {
      heading: 'How to Prepare for PSSSB',
      content: [
        'The best preparation strategy for PSSSB begins with understanding the syllabus in detail. A student should not study randomly; instead, they should identify the subjects that are asked in the relevant recruitment and build a study plan around them. This is especially important because the pattern can vary across posts and departments.',
        'Previous year papers help students understand the kind of questions that are repeatedly asked and how the difficulty level changes over time. Daily revision is equally important because a student cannot rely on one-time reading to retain concepts, especially in subjects like General Knowledge, Current Affairs, Punjabi, and reasoning.',
        'Mock tests should be treated as a regular part of preparation, not as a last-minute activity. They improve time management, accuracy, confidence, and the ability to attempt the paper in a calm manner. Students targeting clerical posts should also practice typing regularly, because this skill can become part of the selection process in certain recruitments.',
        'Current Affairs should be revised in short, repeated sessions rather than left for the end. Punjabi preparation should also be handled consistently because it is a core part of the exam for many posts. At Elite Academy, students benefit from Live Classes, Recorded Lectures, Weekly Tests, Mock Tests, Personal Mentorship, and Study Material that help them stay organised and focused throughout their Punjab Government Exam journey.',
      ],
    },
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

  studentSuccess: STUDENT_SUCCESS_DATA,

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
