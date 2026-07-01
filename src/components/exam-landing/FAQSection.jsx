import { Link } from 'react-router-dom';
import SectionWrapper from './SectionWrapper';

function renderAnswerWithLinks(answer) {
  if (typeof answer === 'string') {
    return answer;
  }

  return answer.map((part, index) => {
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
    if (part.type === 'phone') {
      return (
        <a key={index} href={`tel:${part.number}`} className="text-blue-400 hover:underline">
          {part.label || part.number}
        </a>
      );
    }
    return null;
  });
}

export default function FAQSection({ faq }) {
  return (
    <SectionWrapper id="faq" narrow>
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">{faq.title}</h2>
      {faq.subtitle && (
        <p className="text-gray-400 text-center mb-10">{faq.subtitle}</p>
      )}
      <div className="space-y-4">
        {faq.items.map(({ question, answer }) => (
          <details
            key={question}
            className="group rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black overflow-hidden"
          >
            <summary className="cursor-pointer px-6 py-4 font-semibold text-white list-none flex justify-between items-center gap-4">
              {question}
              <span className="text-gray-500 group-open:rotate-45 transition-transform text-xl leading-none shrink-0">
                +
              </span>
            </summary>
            <div className="px-6 pb-4 text-gray-300 text-sm leading-relaxed">
              {renderAnswerWithLinks(answer)}
            </div>
          </details>
        ))}
      </div>
    </SectionWrapper>
  );
}
