import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Star, Monitor, ClipboardCheck, MessageCircle, Building2, Check, Trophy, Quote,
  GraduationCap, Library, PlayCircle, MapPinned, Users, ClipboardList, MessageSquare,
  Wallet, MapPin, Phone, ChevronDown, ArrowRight,
} from 'lucide-react';
import classroomImg from '../../assets/classroom.webp';
import sawarnImg from '../../assets/sawarn-singh.jpeg';
import arshdeepImg from '../../assets/arshdeep-singh.jpeg';

const IMAGE_MAP = {
  'classroom.webp': classroomImg,
  'sawarn-singh.jpeg': sawarnImg,
  'arshdeep-singh.jpeg': arshdeepImg,
};

const fadeUp = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, delay },
});

/* ---------- Courses ---------- */
export function CoursesGrid({ courses, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {courses.map((c, i) => (
        <motion.div
          key={c.id}
          {...fadeUp((i % 4) * 0.08, 30)}
          whileHover={{ y: -6 }}
          className="group"
        >
          <div
            role="link"
            tabIndex={0}
            onClick={() => onSelect(c.path)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(c.path)}
            className="cursor-pointer block h-full glass rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-elegant transition-all relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 size-32 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
            <div className="size-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow mb-5 text-2xl">
              {c.icon}
            </div>
            <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.description}</p>
            <ul className="mt-4 space-y-1.5">
              {c.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-5 text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
              Explore →
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Online vs Offline ---------- */
const ONLINE = ['Live Classes', 'Recorded Classes', 'Mobile App', 'PDF Library', 'Test Series', 'Doubt Support', 'Anywhere Access'];
const OFFLINE = ['Classroom Learning', 'Faculty Interaction', 'Weekly Monitoring', 'Personal Guidance', 'Study Environment', 'Branch Support'];

function ModeCard({ icon: Icon, title, items, gradient }) {
  return (
    <div
      className={`relative rounded-3xl p-8 border border-border overflow-hidden ${
        gradient ? 'bg-gradient-primary text-primary-foreground' : 'glass'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`size-12 rounded-xl grid place-items-center ${gradient ? 'bg-white/15' : 'bg-primary/10 border border-primary/20'}`}>
          <Icon className={`size-6 ${gradient ? 'text-primary-foreground' : 'text-primary'}`} />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm">
            <Check className={`size-4 ${gradient ? 'text-primary-foreground' : 'text-accent'}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OnlineVsOffline() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <ModeCard icon={Monitor} title="Online" items={ONLINE} gradient />
      <ModeCard icon={Building2} title="Offline" items={OFFLINE} />
    </div>
  );
}

/* ---------- About ---------- */
const linkCls = 'text-primary hover:underline';

export function AboutElite() {
  const stats = [
    { icon: Star, label: 'Google Reviews', value: '★★★★★' },
    { icon: Monitor, label: 'Learning Modes', value: 'Online + Offline' },
    { icon: ClipboardCheck, label: 'Mock Tests', value: 'Weekly' },
    { icon: MessageCircle, label: 'Guidance', value: 'Personal Mentorship' },
  ];
  const paras = [
    <>Elite Academy is one of the leading institutes for government exam preparation in Punjab. Our focus is clear: help serious aspirants prepare for Punjab Government exams, PSSSB, Punjab Police, Patwari, Naib Tehsildar, Clerk, Senior Assistant, Inspector, SSC (CGL, CHSL, GD, CPO), Banking, and other state and central competitive examinations with a plan that actually works.</>,
    <>Our mission is to make quality government exam coaching accessible — whether you study from home or attend classes at our institute. We believe every student deserves a structured path, honest guidance, and resources that match the latest exam patterns. Punjab competitive exams move fast; we help you stay ahead with focused preparation instead of scattered self-study.</>,
    <>Our teaching approach starts with strong fundamentals. Experienced faculty explain concepts clearly, then move to practice through previous year questions, regular mock tests, and updated study material. Students also get access to <Link to="/books" className={linkCls}>books</Link>, <Link to="/current-affairs-book" className={linkCls}>current affairs</Link>, and <Link to="/sectional-test-series" className={linkCls}>test series</Link> designed for Punjab and central government exams.</>,
    <>Preparation is not only about watching lectures. We run weekly mock tests, sectional tests, and full-length practice papers so students understand their strengths and weak areas before exam day. Combined with PYQs and topic-wise revision, this builds the discipline competitive exams demand.</>,
    <>What sets us apart is personal attention. Beyond classroom teaching, we offer doubt-solving sessions and one-on-one mentorship so students know what to study, what to skip, and how to improve week by week. Whether you choose <Link to="/online-coaching" className={linkCls}>online coaching</Link> from anywhere in India or offline classes at our Chandigarh and Fatehgarh Sahib branches, you get the same commitment to structured government exam preparation and steady progress.</>,
  ];
  return (
    <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-start">
      <div className="space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-3xl">
        {paras.map((p, i) => (
          <motion.p key={i} {...fadeUp(i * 0.06, 12)}>
            {p}
          </motion.p>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 lg:w-64">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-xl px-4 py-4 text-center">
            <s.icon className="size-4 text-accent mx-auto mb-2" />
            <div className="text-sm font-bold text-gradient">{s.value}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Learn at Elite (classroom) ---------- */
export function LearnAtElite({ classroomImage }) {
  const src = IMAGE_MAP[classroomImage?.image] || classroomImg;
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden glass border border-border h-64 sm:h-80 lg:h-96"
      >
        <img
          src={src}
          alt="Elite Academy classroom with students preparing for government examinations"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </motion.div>
      <div>
        <h3 className="text-2xl font-bold tracking-tight">
          Offline and Online Coaching for{' '}
          <span className="text-gradient">Punjab &amp; Central Government Exams</span>
        </h3>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {classroomImage?.description ||
            'Offline and online classes at Elite Academy are designed to help aspirants prepare for Punjab Government and Central Government examinations through concept-based teaching, mock tests, doubt sessions and regular mentorship.'}
        </p>
      </div>
    </div>
  );
}

/* ---------- Student success + reviews ---------- */
export function StudentSuccess({ stories }) {
  return (
    <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
      {stories.map((s, i) => (
        <motion.div
          key={s.name}
          {...fadeUp(i * 0.1, 24)}
          className="glass rounded-2xl border border-border relative overflow-hidden"
        >
          <div className="relative h-48 sm:h-56">
            <img
              src={IMAGE_MAP[s.image] || s.image}
              alt={`${s.name} — selected in ${s.exam}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-primary text-primary-foreground px-3 py-1 text-xs font-semibold shadow-glow">
              <Trophy className="size-3.5" /> {s.achievement}
            </span>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold">{s.name}</h3>
            <p className="mt-1 text-sm text-primary font-medium">{s.exam}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {s.achievement} &middot; {s.year}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function Testimonials({ reviews }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {reviews.map((r, i) => (
        <motion.div
          key={r.name}
          {...fadeUp((i % 3) * 0.08, 24)}
          className="glass rounded-2xl p-6 border border-border relative"
        >
          <Quote className="absolute top-5 right-5 size-5 text-primary/30" />
          <div className="flex gap-1 mb-3" aria-label="5 out of 5 stars">
            {[0, 1, 2, 3, 4].map((j) => (
              <Star key={j} className="size-4 fill-accent text-accent" />
            ))}
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">&ldquo;{r.text}&rdquo;</p>
          <div className="mt-5 pt-5 border-t border-border">
            <div className="font-semibold text-sm">{r.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Google Review</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Trust badges ---------- */
const BADGES = [
  { icon: GraduationCap, title: 'Expert Faculty', desc: 'Experienced mentors' },
  { icon: Library, title: 'Study Material', desc: 'Updated notes & PDFs' },
  { icon: ClipboardCheck, title: 'Weekly Tests', desc: 'Regular evaluation' },
  { icon: PlayCircle, title: 'Recorded Classes', desc: 'Learn anytime' },
  { icon: MessageCircle, title: 'Personal Mentorship', desc: 'One-to-one guidance' },
  { icon: MapPinned, title: 'Online + Offline', desc: 'Learn your way' },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {BADGES.map((b, i) => (
        <motion.div key={b.title} {...fadeUp((i % 6) * 0.06, 16)} className="glass rounded-xl p-4 text-center">
          <b.icon className="size-6 text-accent mx-auto mb-2" />
          <div className="text-sm font-semibold">{b.title}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{b.desc}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Why choose us ---------- */
const FEATURES = [
  { i: Users, t: 'Experienced Faculty', d: 'Learn from teachers who understand Punjab and central government exam patterns and focus on what matters in the actual paper.' },
  { i: ClipboardList, t: 'Structured Study Plan', d: 'Follow a clear syllabus roadmap so you cover every subject on time without last-minute panic.' },
  { i: ClipboardCheck, t: 'Regular Mock Tests', d: 'Practice with weekly and sectional mock tests to build speed, accuracy, and exam temperament.' },
  { i: MessageSquare, t: 'Doubt Solving', d: 'Get your questions answered quickly so small doubts do not become big gaps before the exam.' },
  { i: Library, t: 'Updated Study Material', d: 'Access books, notes, PYQs, and current affairs aligned with the latest Punjab and SSC exam trends.' },
  { i: MessageCircle, t: 'Personal Mentorship', d: 'Receive one-on-one guidance to plan your preparation, fix weak areas, and stay on track.' },
  { i: Monitor, t: 'Online & Offline Classes', d: 'Choose live online coaching from anywhere or attend offline government exam classes at our Punjab branches.' },
  { i: Wallet, t: 'Affordable Learning', d: 'Quality coaching, test series, and study resources priced for students who invest their own savings in preparation.' },
];

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {FEATURES.map((f, i) => (
        <motion.div
          key={f.t}
          {...fadeUp((i % 4) * 0.07)}
          className="glass rounded-xl p-5 border border-border hover:border-primary/30 transition-colors"
        >
          <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center">
            <f.i className="size-5 text-primary" />
          </div>
          <h3 className="mt-4 font-semibold">{f.t}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Built for prep ---------- */
export function BuiltForPrep() {
  const paras = [
    'Government exams demand consistency, not shortcuts. At Elite Academy, we focus on disciplined learning — daily study, regular tests, and honest feedback — so students develop the habits that competitive exams actually reward.',
    'Our students work through structured programs covering Punjab Government exams, PSSSB, Punjab Police, SSC, and Banking preparation. With mock tests, previous year questions, and personal guidance, they learn to manage time, handle pressure, and improve with every attempt.',
    'We stay committed to your preparation journey. Whether you are starting fresh or giving the exam another try, our goal is the same: help you walk into the exam hall prepared, confident, and ready to perform.',
  ];
  return (
    <div className="space-y-4 max-w-3xl mx-auto text-center text-muted-foreground leading-relaxed">
      {paras.map((p, i) => (
        <motion.p key={i} {...fadeUp(i * 0.08, 12)}>
          {p}
        </motion.p>
      ))}
    </div>
  );
}

/* ---------- Branches ---------- */
const BRANCHES = [
  {
    name: 'Elite Academy Chandigarh',
    address: 'SCO 144, Sector 24-D, Chandigarh',
    description: 'Offline government exam classes for Punjab and central competitive exam aspirants in the Chandigarh region.',
    cta: 'Call: 7696954686',
  },
  {
    name: 'Elite Academy Fatehgarh Sahib',
    address: '1st Floor, Shop No. 18, Above PB 23 Outfit, City Center, Sirhind, 140406',
    description: 'Offline coaching for PSSSB, Punjab Police, Patwari, and other Punjab Government exams in Fatehgarh Sahib district.',
    cta: 'Call: 7696954686',
  },
];

export function BranchesPreview() {
  return (
    <div>
      <p className="text-muted-foreground max-w-2xl mb-8">
        Attend offline government exam coaching at either of our Punjab branches. Online coaching is available for
        students across India who prefer to prepare from home.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {BRANCHES.map((b) => (
          <div key={b.name} className="glass rounded-2xl p-8 border border-border">
            <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center mb-4">
              <MapPin className="size-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">{b.name}</h3>
            <address className="mt-3 not-italic text-sm text-muted-foreground leading-relaxed">{b.address}</address>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            <a href="tel:+917696954686" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <Phone className="size-4" /> {b.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- FAQ (native <details>, answers stay in the DOM for SEO) ---------- */
export function FAQ({ items }) {
  return (
    <div className="space-y-3">
      {items.map(({ question, answer }) => (
        <details key={question} className="group glass rounded-xl border border-border px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold [&::-webkit-details-marker]:hidden">
            {question}
            <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <p className="pb-4 text-muted-foreground leading-relaxed">{answer}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- Final CTA ---------- */
export function FinalCTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 md:p-16 shadow-elegant">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_40%),radial-gradient(circle_at_80%_70%,white,transparent_40%)]" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground max-w-3xl leading-[1.1]">
              Start Your Government Exam Preparation
            </h2>
            <p className="mt-4 text-primary-foreground/85 text-lg max-w-2xl">
              Join Elite Academy for structured Punjab Government exam coaching — online from anywhere or offline at our Chandigarh and Fatehgarh Sahib branches.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/online-coaching"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md text-sm font-medium bg-background text-foreground hover:bg-background/90 transition-colors"
              >
                Start Learning Now <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://wa.me/917696954686"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md text-sm font-medium text-primary-foreground hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="size-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
