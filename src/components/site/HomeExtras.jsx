import { motion } from 'framer-motion';
import { Check, Keyboard, GraduationCap, Camera, Calendar, Clock, Tv } from 'lucide-react';

const ROLES = [
  {
    role: 'Data Entry',
    icon: Keyboard,
    badge: 'Flexible Hours',
    focus: ['Precision', 'Speed', 'Remote Work'],
    points: ['Accurate data handling', 'Flexible remote schedule', 'Fast typing skills'],
  },
  {
    role: 'Teacher',
    icon: GraduationCap,
    badge: 'Impactful',
    focus: ['Expertise', 'Subject Mastery', 'Student Success'],
    points: ['Subject matter expert', 'Mentor & guide students', 'Drive results'],
  },
  {
    role: 'Content Creator',
    icon: Camera,
    badge: 'Creative Freedom',
    focus: ['Video Editing', 'Social Media Strategy', 'Storytelling'],
    points: ['Video & media creation', 'Social media growth', 'Creative campaigns'],
  },
];

export function JoinTeamSection({ onApply }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-destructive" />
            </span>
            We are Hiring
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            We&rsquo;re Hiring: <span className="text-gradient">Join the Elite Revolution</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Help us shape the future of Punjab&rsquo;s competitive exam preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ROLES.map((r, i) => (
            <motion.div
              key={r.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-7 border border-border hover:border-primary/40 hover:shadow-elegant transition-all flex flex-col"
            >
              <div className="size-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow mb-5">
                <r.icon className="size-6 text-primary-foreground" />
              </div>
              <span className="self-start mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                {r.badge}
              </span>
              <h3 className="text-xl font-semibold">{r.role}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Focus on {r.focus.join(', ')}.
              </p>
              <ul className="mt-4 mb-6 space-y-2 text-sm text-muted-foreground">
                {r.points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <Check className="size-4 text-accent" /> {p}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onApply(r.role)}
                className="cursor-pointer mt-auto w-full h-10 rounded-md text-sm font-medium bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FrenchCourseSection({ info, onOpen }) {
  const sym = info?.currency === 'USD' ? '$' : '₹';
  const p1 = info?.price1Month ? `${sym}${info.price1Month}` : '$200';
  const p1Week = info?.price1Month ? `${sym}${Math.round(info.price1Month / 4)}/week` : '$50/week';
  const p3 = info?.price3Month ? `${sym}${info.price3Month}` : '$500';
  const save =
    info?.price1Month && info?.price3Month ? `${sym}${info.price1Month * 3 - info.price3Month}` : '$100';

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-primary" />
            </span>
            New Course
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            Learn <span className="text-gradient">French Language</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Master French with expert teachers and accelerate your path to PR in Canada/France.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="glass rounded-3xl p-8 border border-border">
            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
              PR Pathway Course
            </span>
            <h3 className="text-2xl font-bold mb-5">French Course — Get Your PR</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Calendar className="size-5 text-accent" />
                <span><strong>3 Month Program</strong> <span className="text-muted-foreground">(Basic to Advanced)</span></span>
              </li>
              <li className="flex items-center gap-3">
                <GraduationCap className="size-5 text-accent" />
                <span><strong>Expert Teachers</strong> <span className="text-muted-foreground">(Native &amp; Indian)</span></span>
              </li>
              <li className="flex items-center gap-3">
                <Tv className="size-5 text-accent" />
                <strong>Live + Recorded Classes</strong>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-5 text-accent" />
                <strong>Mon-Fri | 7:00 PM IST</strong>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-sm text-muted-foreground">
              <span className="text-primary font-semibold">Perfect for:</span> Canada PR (Express Entry +30 points), France visa, Career growth
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="glass rounded-2xl p-6 border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent border border-accent/20">
                    Flexible Plan
                  </span>
                  <h4 className="text-lg font-bold">1 Month Access</h4>
                  <p className="text-sm text-muted-foreground">{p1Week} • Basic to Intermediate</p>
                </div>
                <div className="text-left sm:text-center">
                  <div className="text-3xl font-black text-gradient">{p1}</div>
                  <div className="text-xs text-muted-foreground">per month</div>
                </div>
                <button
                  type="button"
                  onClick={onOpen}
                  className="cursor-pointer h-11 px-5 rounded-md text-sm font-medium glass hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  Pay {p1} Now
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl p-6 pt-8 border border-primary/40 bg-card shadow-elegant">
              <span className="absolute -top-3 left-6 px-4 py-1 text-xs font-bold rounded-full bg-gradient-primary text-primary-foreground">
                Best Value
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                    Complete Program
                  </span>
                  <h4 className="text-lg font-bold">3 Months Full Access</h4>
                  <p className="text-sm text-muted-foreground">Basic to Advanced • Complete PR Ready</p>
                </div>
                <div className="text-left sm:text-center">
                  <div className="text-3xl font-black text-gradient">{p3}</div>
                  <div className="text-xs font-semibold text-accent">Save {save}</div>
                </div>
                <button
                  type="button"
                  onClick={onOpen}
                  className="cursor-pointer h-11 px-5 rounded-md text-sm font-medium bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Pay {p3} Now
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              {['Secured by Razorpay', 'Instant Access', 'Certificate Included'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-accent" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
