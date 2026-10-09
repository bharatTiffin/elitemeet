import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, MessageCircle, Sparkles, Volume2, VolumeX, Play, Pause, Star, MapPin, Trophy, CheckCircle2,
} from 'lucide-react';
import heroVideo from '../../assets/video.mp4';
import heroPoster from '../../assets/video-poster.jpg';

const DEMO_MESSAGE = 'Hi Elite Academy, I want an offline demo class.';
export const DEMO_WHATSAPP_URL = `https://wa.me/917696954686?text=${encodeURIComponent(DEMO_MESSAGE)}`;

const STATS = [
  { v: 'Online + Offline', l: 'Learning Modes' },
  { v: '2', l: 'Punjab Branches' },
  { v: 'Weekly', l: 'Mock Tests' },
  { v: '1-on-1', l: 'Mentorship' },
];

const POINTS = ['PSSSB · Punjab Police · Patwari', 'SSC · Banking · Excise Inspector', 'Live + recorded classes, PYQs, test series'];

export default function Hero() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Click-to-play: the visitor presses the play button, so sound always works.
  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.play().then(() => {
      setMuted(false);
      setPlaying(true);
    }).catch(() => {});
  };

  const togglePlayback = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    v.volume = 1;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <section className="relative min-h-[100svh] pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[640px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-24 size-[420px] rounded-full bg-secondary/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium">
              <Sparkles className="size-3.5 text-accent" />
              <span className="text-muted-foreground">Offline &amp; Online Coaching</span>
            </span>
            <span className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <MapPin className="size-3.5 text-accent" /> Chandigarh · Fatehgarh Sahib
            </span>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold tracking-tight leading-[1.06]">
            Punjab Government &amp;{' '}
            <span className="text-gradient">Competitive Exam Coaching Institute</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Elite Academy is a trusted government exam coaching institute in Punjab. We prepare students for
            Punjab Government exams, PSSSB, Punjab Police, Patwari, Naib Tehsildar, SSC, Banking, and other
            state and central competitive examinations — through structured online and offline coaching.
          </p>

          <ul className="mt-6 space-y-2">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-foreground/90">
                <CheckCircle2 className="size-4 text-accent shrink-0" /> {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/online-coaching"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-md text-sm font-semibold bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90 hover:-translate-y-0.5 transition-all"
            >
              Start Learning <ArrowRight className="size-4" />
            </Link>
            <a
              href={DEMO_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex items-center justify-center gap-2 h-12 px-7 rounded-md text-sm font-semibold hover:bg-white/10 hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle className="size-4 text-accent" /> Join Offline Demo Class
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-3.5 fill-accent text-accent" />
              ))}
              <span className="ml-1">Google Reviews</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Trophy className="size-3.5 text-accent" /> Real selections in PSSSB &amp; Punjab Police
            </span>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass rounded-xl px-4 py-3"
              >
                <div className="text-base font-bold text-gradient leading-tight">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] lg:max-h-[660px]"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-primary opacity-30 blur-2xl" />
          <div className="absolute inset-0 rounded-3xl overflow-hidden glass shadow-elegant ring-1 ring-white/15">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover bg-black"
              loop
              playsInline
              preload="metadata"
              poster={heroPoster}
              onClick={togglePlayback}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
              aria-label="Watch how Elite Academy works"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>

            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

            {!playing && (
              <button
                type="button"
                onClick={handlePlay}
                className="cursor-pointer absolute inset-0 grid place-items-center bg-black/30 hover:bg-black/20 transition-colors"
                aria-label="Play video"
              >
                <span className="flex flex-col items-center gap-3">
                  <span className="size-20 rounded-full bg-gradient-primary shadow-glow grid place-items-center ring-4 ring-white/20 hover:scale-105 transition-transform">
                    <Play className="size-8 text-primary-foreground ml-1" fill="currentColor" />
                  </span>
                  <span className="glass rounded-full px-4 py-1.5 text-sm font-semibold">
                    Watch how Elite Academy works
                  </span>
                </span>
              </button>
            )}

            {playing && (
              <div className="absolute left-3 right-3 bottom-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="cursor-pointer glass size-10 rounded-full grid place-items-center"
                  aria-label="Pause video"
                >
                  <Pause className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={toggleSound}
                  className="cursor-pointer glass size-10 rounded-full grid place-items-center"
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                >
                  {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
