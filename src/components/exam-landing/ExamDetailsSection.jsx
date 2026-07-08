import { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';

const iconMap = {
  notification: '🔔',
  eligibility: '📋',
  exam: '📝',
  pattern: '📝',
  selection: '🎯',
  salary: '💰',
  preparation: '📚',
  prepare: '📚',
  syllabus: '📚',
  default: '📌',
};

function getIconForHeading(heading) {
  if (!heading) return iconMap.default;
  const lowerHeading = heading.toLowerCase();
  
  if (lowerHeading.includes('notification')) return iconMap.notification;
  if (lowerHeading.includes('eligibility')) return iconMap.eligibility;
  if (lowerHeading.includes('pattern') || lowerHeading.includes('syllabus')) return iconMap.pattern;
  if (lowerHeading.includes('selection') || lowerHeading.includes('process')) return iconMap.selection;
  if (lowerHeading.includes('salary') || lowerHeading.includes('career') || lowerHeading.includes('pay')) return iconMap.salary;
  if (lowerHeading.includes('preparation') || lowerHeading.includes('prepare')) return iconMap.preparation;
  
  return iconMap.default;
}

function highlightImportantText(text) {
  const importantPatterns = [
    /\b\d+\s*(?:years?|months?)\b/gi,
    /₹[\d,]+/g,
    /\b(?:Bachelor'?s?|Master'?s?|PhD|Diploma|Degree|Graduate|Post\s*Graduate)\b/gi,
    /\b(?:\d{1,2}-hour|\d{1,2}\s*hour)\s*(?:computer|course|training)/gi,
    /\b(?:General\s*Knowledge|Reasoning|Punjabi|English|Current\s*Affairs|Mathematics|Quantitative|Computer\s*Awareness|Typing|Stenography|Document\s*Verification|Mock\s*Tests|Weekly\s*Tests|Live\s*Classes|Recorded\s*Lectures|Personal\s*Mentorship|Study\s*Material|Elite\s*Academy)\b/gi,
  ];

  let highlightedText = text;
  importantPatterns.forEach(pattern => {
    highlightedText = highlightedText.replace(pattern, (match) => {
      return `<span class="font-semibold text-white bg-blue-500/20 px-1.5 py-0.5 rounded">${match}</span>`;
    });
  });

  return highlightedText;
}

export default function ExamDetailsSection({ details }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!details || !Array.isArray(details.sections) || details.sections.length === 0) {
    return null;
  }

  const sections = details.sections.filter((section) => {
    if (!section) return false;

    const content = Array.isArray(section.content)
      ? section.content.filter((item) => typeof item === 'string' && item.trim())
      : [];

    return section.heading || content.length > 0;
  });

  if (sections.length === 0) {
    return null;
  }

  return (
    <SectionWrapper id="exam-details" alt narrow>
      <div className="max-w-[1100px] mx-auto">
        {details.title && (
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-center text-white">
            {details.title}
          </h2>
        )}
        {details.subtitle && (
          <p className="text-gray-400 text-center mb-16 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
            {details.subtitle}
          </p>
        )}

        <div className="space-y-8">
          {sections.map((section, index) => {
            const content = Array.isArray(section.content)
              ? section.content.filter((item) => typeof item === 'string' && item.trim())
              : [];

            if (content.length === 0 && !section.heading) {
              return null;
            }

            const icon = getIconForHeading(section.heading);

            return (
              <article
                key={`${section.heading || 'section'}-${index}`}
                className={`group relative rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/90 via-gray-950/80 to-black/90 p-8 sm:p-10 shadow-xl shadow-black/30 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/40 hover:shadow-blue-500/10 hover:translate-y-[-4px] hover:shadow-2xl opacity-0 translate-y-8 ${
                  isVisible ? 'opacity-100 translate-y-0' : ''
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative pl-6">
                  {section.heading && (
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/10">
                        {icon}
                      </div>
                      <div className="flex-1">
                        <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent mb-3" />
                        <h3 className="text-2xl sm:text-3xl font-semibold text-white">
                          {section.heading}
                        </h3>
                        <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent mt-3" />
                      </div>
                    </div>
                  )}
                  
                  {content.length > 0 && (
                    <div className="space-y-6">
                      {content.map((paragraph, paragraphIndex) => (
                        <p
                          key={`${section.heading || 'section'}-${paragraphIndex}`}
                          className="text-gray-300 text-base sm:text-lg leading-8 max-w-[75ch]"
                          dangerouslySetInnerHTML={{
                            __html: highlightImportantText(paragraph),
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
