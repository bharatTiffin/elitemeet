import SectionWrapper from './SectionWrapper';

export default function WhyChooseUs({ whyChooseUs }) {
  return (
    <SectionWrapper id="why-choose-us" alt>
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">{whyChooseUs.title}</h2>
      {whyChooseUs.subtitle && (
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">{whyChooseUs.subtitle}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {whyChooseUs.items.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 transition-all duration-300 hover:border-gray-600 hover:shadow-xl hover:shadow-blue-500/10"
          >
            {item.icon && <span className="text-3xl mb-3 block">{item.icon}</span>}
            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
