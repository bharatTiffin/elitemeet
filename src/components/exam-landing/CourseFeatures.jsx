import SectionWrapper from './SectionWrapper';

export default function CourseFeatures({ program }) {
  return (
    <SectionWrapper id="coaching-program">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">{program.title}</h2>
      {program.subtitle && (
        <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          {program.subtitle}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {program.features.map((feature) => (
          <div
            key={feature.title}
            className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-6 overflow-hidden group hover:border-indigo-500/30 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <span className="text-3xl mb-4 block">{feature.icon}</span>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
