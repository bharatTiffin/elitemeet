import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionWrapper from './SectionWrapper';
import classroomImg from '../../assets/classroom.webp';
import sawarnImg from '../../assets/sawarn-singh.jpeg';
import arshdeepImg from '../../assets/arshdeep-singh.jpeg';

const imageMap = {
  'classroom.webp': classroomImg,
  'sawarn-singh.jpeg': sawarnImg,
  'arshdeep-singh.jpeg': arshdeepImg,
};

const DEFAULT_TRUST_FEATURES = [
  { icon: '👨‍🏫', title: 'Expert Faculty', subtitle: 'Experienced mentors' },
  { icon: '📚', title: 'Study Material', subtitle: 'Updated notes & PDFs' },
  { icon: '📝', title: 'Weekly Tests', subtitle: 'Regular evaluation' },
  { icon: '🎥', title: 'Recorded Classes', subtitle: 'Learn anytime' },
  { icon: '🎯', title: 'Personal Mentorship', subtitle: 'One-to-one guidance' },
  { icon: '📍', title: 'Online + Offline', subtitle: 'Learn your way' },
];

export default function StudentSuccessSection({
  title,
  subtitle,
  classroomImage,
  successStories,
  reviews,
  stats,
  trustFeatures,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const features = trustFeatures?.length ? trustFeatures : DEFAULT_TRUST_FEATURES;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const hasContent =
    classroomImage ||
    (successStories && successStories.length > 0) ||
    (reviews && reviews.length > 0) ||
    (stats && stats.length > 0);

  if (!hasContent) {
    return null;
  }

  return (
    <SectionWrapper id="student-success" alt narrow>
      <div className="max-w-[1400px] mx-auto space-y-16 sm:space-y-20 lg:space-y-[120px]">
        {(title || subtitle) && (
          <header className="text-center">
            {title && (
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </header>
        )}

        {stats && stats.length > 0 && (
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-0 translate-y-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : ''
            }`}
            role="list"
            aria-label="Trust indicators"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                role="listitem"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {classroomImage && (
          <figure
            className={`opacity-0 translate-y-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : ''
            }`}
          >
            {!title && (
              <figcaption className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  Learn at Elite Academy
                </h2>
                <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
                  Offline and Online Coaching for Punjab & Central Government Exams
                </p>
              </figcaption>
            )}
            <div className="relative rounded-[30px] overflow-hidden shadow-2xl shadow-blue-500/10 h-[500px] sm:h-[600px]">
              <img
                src={imageMap[classroomImage.image] || classroomImage.image}
                alt={
                  classroomImage.alt ||
                  'Elite Academy classroom with students preparing for government examinations'
                }
                className="w-full h-full object-cover"
                loading="lazy"
                width={1200}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
            {classroomImage.description && (
              <figcaption className="text-gray-400 text-lg max-w-3xl mx-auto mt-6 text-center leading-relaxed">
                {classroomImage.description}
              </figcaption>
            )}
          </figure>
        )}

        {successStories && successStories.length > 0 && (
          <section
            aria-labelledby="success-stories-heading"
            className={`space-y-10 opacity-0 translate-y-8 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : ''
            }`}
          >
            <h2
              id="success-stories-heading"
              className="text-4xl sm:text-5xl font-bold text-center text-white"
            >
              Student Success Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {successStories.map((story) => (
                <article
                  key={story.name}
                  className="group relative w-full max-w-[380px] h-full rounded-[30px] border border-white/10 bg-gradient-to-br from-gray-900/90 via-gray-950/80 to-black/90 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/40 hover:shadow-blue-500/15 hover:translate-y-[-8px] hover:shadow-2xl overflow-hidden flex flex-col"
                >
                  {story.image && imageMap[story.image] && (
                    <figure className="relative h-[380px] overflow-hidden flex-shrink-0 m-0">
                      <img
                        src={imageMap[story.image]}
                        alt={`${story.name} — selected in ${story.exam}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        width={380}
                        height={380}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </figure>
                  )}
                  <div className="p-7 space-y-5 flex-1 flex flex-col">
                    <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 self-start">
                      <span className="text-lg" aria-hidden="true">
                        🏆
                      </span>
                      <span className="text-blue-400 font-semibold text-sm">
                        {story.achievement}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{story.name}</h3>
                      <p className="text-blue-400 font-medium text-sm mb-1">{story.exam}</p>
                    </div>
                    {story.year && <p className="text-gray-500 text-sm">{story.year}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {reviews && reviews.length > 0 && (
          <section
            aria-labelledby="google-reviews-heading"
            className={`space-y-10 opacity-0 translate-y-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : ''
            }`}
          >
            <header className="text-center">
              <h2
                id="google-reviews-heading"
                className="text-4xl sm:text-5xl font-bold text-white mb-3"
              >
                Google Reviews
              </h2>
              <p className="text-gray-400 text-lg">
                Verified feedback from students at our Chandigarh and Fatehgarh Sahib branches
              </p>
            </header>
            <div className="flex overflow-x-auto gap-6 pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible justify-items-center">
              {reviews.map((review) => {
                const initial = review.name.charAt(0).toUpperCase();
                return (
                  <blockquote
                    key={review.name}
                    cite="https://www.google.com/maps"
                    className="flex-shrink-0 w-full max-w-[380px] min-h-[320px] group relative rounded-[30px] border border-white/10 bg-gradient-to-br from-gray-900/90 via-gray-950/80 to-black/90 p-7 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/40 hover:shadow-blue-500/15 hover:translate-y-[-8px] hover:shadow-2xl flex flex-col"
                  >
                    <footer className="flex items-start gap-4 mb-4 flex-shrink-0 not-italic">
                      <div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                        aria-hidden="true"
                      >
                        {initial}
                      </div>
                      <div className="flex-1">
                        <cite className="text-white font-semibold text-base mb-1 not-italic block">
                          {review.name}
                        </cite>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 text-lg" aria-label="5 out of 5 stars">
                            ★★★★★
                          </span>
                          <span className="text-gray-500 text-xs">Google Review</span>
                        </div>
                      </div>
                    </footer>
                    <p className="text-gray-300 text-sm leading-relaxed flex-1">{review.text}</p>
                  </blockquote>
                );
              })}
            </div>
          </section>
        )}

        <section
          aria-labelledby="trust-features-heading"
          className={`space-y-10 opacity-0 translate-y-8 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : ''
          }`}
        >
          <h2 id="trust-features-heading" className="text-4xl sm:text-5xl font-bold text-center text-white">
            Why Students Trust Elite Academy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-[30px] border border-white/10 bg-gradient-to-br from-gray-900/90 via-gray-950/80 to-black/90 p-8 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/40 hover:shadow-blue-500/15 hover:translate-y-[-8px] hover:shadow-2xl text-center"
              >
                <div className="space-y-4">
                  <div className="text-5xl mb-2" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SectionWrapper>
  );
}
