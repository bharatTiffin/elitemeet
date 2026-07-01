import SectionWrapper from './SectionWrapper';

export default function PreparationTimeline({ timeline }) {
  return (
    <SectionWrapper id="preparation-process" alt>
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">{timeline.title}</h2>
      {timeline.subtitle && (
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">{timeline.subtitle}</p>
      )}
      <div className="max-w-3xl mx-auto">
        {timeline.steps.map((step, index) => (
          <div key={step.label} className="flex gap-4 sm:gap-6">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm shrink-0">
                {index + 1}
              </div>
              {index < timeline.steps.length - 1 && (
                <div className="w-0.5 flex-1 min-h-[2rem] bg-gradient-to-b from-blue-500/50 to-purple-500/50 my-1" />
              )}
            </div>
            <div className={`pb-8 ${index === timeline.steps.length - 1 ? 'pb-0' : ''}`}>
              <h3 className="text-lg font-bold text-white mb-1">{step.label}</h3>
              {step.description && (
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
