import SectionWrapper from './SectionWrapper';

function CalloutBox({ callout }) {
  return (
    <aside
      className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 sm:p-6"
      aria-label={callout.title || 'Important note'}
    >
      {callout.title && (
        <p className="text-blue-300 font-semibold text-sm uppercase tracking-wide mb-2">
          {callout.title}
        </p>
      )}
      <p className="text-gray-200 text-base sm:text-lg leading-relaxed">{callout.text}</p>
    </aside>
  );
}

export default function AboutExam({ about }) {
  return (
    <SectionWrapper id="about-exam" alt narrow>
      <header className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold">{about.title}</h2>
      </header>
      <article className="space-y-5 text-gray-300 text-base sm:text-lg leading-relaxed">
        {about.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {about.callouts?.map((callout) => (
          <CalloutBox key={callout.title} callout={callout} />
        ))}
      </article>
    </SectionWrapper>
  );
}
