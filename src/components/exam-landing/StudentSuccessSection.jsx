import { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import classroomImg from '../../assets/classroom.webp';
import sawarnImg from '../../assets/sawarn-singh.jpeg';
import arshdeepImg from '../../assets/arshdeep-singh.jpeg';

const imageMap = {
  "classroom.webp": classroomImg,
  "sawarn-singh.jpeg": sawarnImg,
  "arshdeep-singh.jpeg": arshdeepImg,
};

export default function StudentSuccessSection({
  classroomImage,
  successStories,
  reviews,
  stats,
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <SectionWrapper id="student-success" alt narrow>
      <div className="max-w-[1400px] mx-auto space-y-16 sm:space-y-20 lg:space-y-[120px]">
        
        {/* SECTION 1: Real Classroom */}
        {classroomImage && (
          <div className={`opacity-0 translate-y-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : ''
          }`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Learn at Elite Academy
              </h2>
              <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
                Offline and Online Coaching for Punjab & Central Government Exams
              </p>
            </div>
            <div className="relative rounded-[30px] overflow-hidden shadow-2xl shadow-blue-500/10 h-[500px] sm:h-[600px]">
              <img
                src={imageMap[classroomImage.image] || classroomImage.image}
                alt="Elite Academy Classroom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              {/* Floating Badges */}
              {/* <div className="absolute top-6 left-6 flex flex-col gap-4 w-fit min-w-[280px]">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-[20px] px-[22px] py-4 text-white font-medium text-sm sm:text-base">
                  📍 Sector 24 Chandigarh
                </div>
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-[20px] px-[22px] py-4 text-white font-medium text-sm sm:text-base">
                  🎯 Punjab Government Exam Coaching
                </div>
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-[20px] px-[22px] py-4 text-white font-medium text-sm sm:text-base">
                  👨‍🏫 Live + Offline Classes
                </div>
              </div> */}

              {/* Bottom Left Overlay */}
              {/* <div className="absolute bottom-8 left-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-[20px] px-6 py-4">
                <p className="text-white font-semibold text-lg sm:text-xl">
                  Learn with Expert Mentors
                </p>
              </div> */}

              {/* Bottom Right Overlay */}
              {/* <div className="absolute bottom-8 right-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-[20px] px-6 py-4">
                <p className="text-white font-semibold text-lg sm:text-xl">
                  Structured Preparation
                </p>
              </div> */}
            </div>
            {classroomImage.description && (
              <p className="text-gray-400 text-lg max-w-3xl mx-auto mt-6 text-center leading-relaxed">
                {classroomImage.description}
              </p>
            )}
          </div>
        )}

        {/* SECTION 2: Student Success Stories */}
        {successStories && successStories.length > 0 && (
          <div className={`space-y-10 opacity-0 translate-y-8 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : ''
          }`}>
            <h2 className="text-4xl sm:text-5xl font-bold text-center text-white">
              Student Success Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {successStories.map((story, index) => (
                <div
                  key={index}
                  className="group relative w-full max-w-[380px] h-full rounded-[30px] border border-white/10 bg-gradient-to-br from-gray-900/90 via-gray-950/80 to-black/90 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/40 hover:shadow-blue-500/15 hover:translate-y-[-8px] hover:shadow-2xl overflow-hidden flex flex-col"
                >
                  {story.image && imageMap[story.image] && (
                    <div className="relative h-[380px] overflow-hidden flex-shrink-0">
                      <img
                        src={imageMap[story.image]}
                        alt={story.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}
                  <div className="p-7 space-y-5 flex-1 flex flex-col">
                    <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 self-start">
                      <span className="text-lg">🏆</span>
                      <span className="text-blue-400 font-semibold text-sm">
                        {story.achievement}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {story.name}
                      </h3>
                      <p className="text-blue-400 font-medium text-sm mb-1">
                        {story.exam}
                      </p>
                    </div>
                    {story.year && (
                      <p className="text-gray-500 text-sm">
                        {story.year}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: Google Reviews */}
        {reviews && reviews.length > 0 && (
          <div className={`space-y-10 opacity-0 translate-y-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : ''
          }`}>
            <h2 className="text-4xl sm:text-5xl font-bold text-center text-white">
              Google Reviews
            </h2>
            <div className="flex overflow-x-auto gap-6 pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible justify-items-center">
              {reviews.map((review, index) => {
                const initial = review.name.charAt(0).toUpperCase();
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full max-w-[380px] h-[320px] group relative rounded-[30px] border border-white/10 bg-gradient-to-br from-gray-900/90 via-gray-950/80 to-black/90 p-7 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/40 hover:shadow-blue-500/15 hover:translate-y-[-8px] hover:shadow-2xl flex flex-col"
                  >
                    <div className="flex items-start gap-4 mb-4 flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        {initial}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-base mb-1">
                          {review.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 text-lg">★★★★★</span>
                          <span className="text-gray-500 text-xs">Google Review</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed flex-1">
                      {review.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 4: Premium Feature Cards */}
        <div className={`space-y-10 opacity-0 translate-y-8 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : ''
        }`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-white">
            Why Students Trust Elite Academy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "👨‍🏫",
                title: "Expert Faculty",
                subtitle: "Experienced mentors"
              },
              {
                icon: "📚",
                title: "Study Material",
                subtitle: "Updated notes & PDFs"
              },
              {
                icon: "📝",
                title: "Weekly Tests",
                subtitle: "Regular evaluation"
              },
              {
                icon: "🎥",
                title: "Recorded Classes",
                subtitle: "Learn anytime"
              },
              {
                icon: "🎯",
                title: "Personal Mentorship",
                subtitle: "One-to-one guidance"
              },
              {
                icon: "📍",
                title: "Online + Offline",
                subtitle: "Learn your way"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-[30px] border border-white/10 bg-gradient-to-br from-gray-900/90 via-gray-950/80 to-black/90 p-8 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/40 hover:shadow-blue-500/15 hover:translate-y-[-8px] hover:shadow-2xl text-center"
              >
                <div className="space-y-4">
                  <div className="text-5xl mb-2">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
