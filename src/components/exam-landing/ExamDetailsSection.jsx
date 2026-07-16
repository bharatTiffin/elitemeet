import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  fail: '⚠️',
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
  if (lowerHeading.includes('fail')) return iconMap.fail;

  return iconMap.default;
}

function highlightImportantText(text) {
  const importantPatterns = [
    /\b\d+\s*(?:years?|months?)\b/gi,
    /₹[\d,]+/g,
    /\b(?:Bachelor'?s?|Master'?s?|PhD|Diploma|Degree|Graduate|Post\s*Graduate)\b/gi,
    /\b(?:\d{1,2}-hour|\d{1,2}\s*hour)\s*(?:computer|course|training)/gi,
    /\b(?:General\s*Knowledge|Reasoning|Punjabi|English|Current\s*Affairs|Mathematics|Quantitative|Computer\s*Awareness|Typing|Stenography|Document\s*Verification|Mock\s*Tests|Weekly\s*Tests|Live\s*Classes|Recorded\s*Lectures|Personal\s*Mentorship|Study\s*Material|Elite\s*Academy|Tracker\s*App|PYQ)\b/gi,
  ];

  let highlightedText = text;
  importantPatterns.forEach((pattern) => {
    highlightedText = highlightedText.replace(pattern, (match) => {
      return `<span class="font-semibold text-white bg-blue-500/20 px-1.5 py-0.5 rounded">${match}</span>`;
    });
  });

  return highlightedText;
}

function renderInlineLinks(parts) {
  return parts.map((part, index) => {
    if (typeof part === 'string') {
      return part;
    }
    if (part.type === 'link') {
      return (
        <Link key={index} to={part.path} className="text-blue-400 hover:underline">
          {part.label}
        </Link>
      );
    }
    return null;
  });
}

function ContentBlock({ block, blockKey }) {
  if (typeof block === 'string') {
    return (
      <p
        key={blockKey}
        className="text-gray-300 text-base sm:text-lg leading-8 max-w-[75ch]"
        dangerouslySetInnerHTML={{ __html: highlightImportantText(block) }}
      />
    );
  }

  if (block.type === 'paragraph') {
    if (Array.isArray(block.parts)) {
      return (
        <p key={blockKey} className="text-gray-300 text-base sm:text-lg leading-8 max-w-[75ch]">
          {renderInlineLinks(block.parts)}
        </p>
      );
    }
    return (
      <p
        key={blockKey}
        className="text-gray-300 text-base sm:text-lg leading-8 max-w-[75ch]"
        dangerouslySetInnerHTML={{ __html: highlightImportantText(block.text) }}
      />
    );
  }

  if (block.type === 'bullets') {
    return (
      <ul key={blockKey} className="list-disc list-outside ml-6 space-y-2 text-gray-300 text-base sm:text-lg leading-8 max-w-[75ch]">
        {block.items.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: highlightImportantText(item) }} />
        ))}
      </ul>
    );
  }

  if (block.type === 'callout') {
    return (
      <aside
        key={blockKey}
        className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 sm:p-6 max-w-[75ch]"
        aria-label={block.title || 'Important note'}
      >
        {block.title && (
          <p className="text-blue-300 font-semibold text-sm uppercase tracking-wide mb-2">
            {block.title}
          </p>
        )}
        <p
          className="text-gray-200 text-base sm:text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightImportantText(block.text) }}
        />
      </aside>
    );
  }

  if (block.type === 'table') {
    return (
      <figure key={blockKey} className="overflow-x-auto max-w-full">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm sm:text-base">
          <caption className="sr-only">{block.caption}</caption>
          <thead>
            <tr className="border-b border-white/20">
              {block.headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3 text-blue-300 font-semibold bg-white/5"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-white/10 hover:bg-white/5">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 text-gray-300 leading-relaxed">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {block.caption && (
          <figcaption className="text-gray-500 text-sm mt-3 text-center">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return null;
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
      ? section.content.filter((item) => item !== null && item !== undefined && item !== '')
      : [];

    return section.heading || content.length > 0;
  });

  if (sections.length === 0) {
    return null;
  }

  return (
    <SectionWrapper id="exam-details" alt narrow>
      <header className="max-w-[1100px] mx-auto mb-16 text-center">
        {details.title && (
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            {details.title}
          </h2>
        )}
        {details.subtitle && (
          <p className="text-gray-400 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
            {details.subtitle}
          </p>
        )}
      </header>

      <div className="max-w-[1100px] mx-auto space-y-8">
        {sections.map((section, index) => {
          const content = Array.isArray(section.content)
            ? section.content.filter((item) => item !== null && item !== undefined && item !== '')
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
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative pl-6">
                {section.heading && (
                  <header className="flex items-center gap-4 mb-8">
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/10"
                      aria-hidden="true"
                    >
                      {icon}
                    </div>
                    <div className="flex-1">
                      <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent mb-3" />
                      <h3 className="text-2xl sm:text-3xl font-semibold text-white">
                        {section.heading}
                      </h3>
                      <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent mt-3" />
                    </div>
                  </header>
                )}

                {content.length > 0 && (
                  <div className="space-y-6">
                    {content.map((block, blockIndex) => (
                      <ContentBlock
                        key={`${section.heading || 'section'}-${blockIndex}`}
                        block={block}
                        blockKey={`${section.heading || 'section'}-${blockIndex}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
