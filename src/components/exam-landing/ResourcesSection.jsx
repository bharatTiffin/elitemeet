import { Link } from 'react-router-dom';
import SectionWrapper from './SectionWrapper';

export default function ResourcesSection({ resources }) {
  return (
    <SectionWrapper id="resources">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">{resources.title}</h2>
      {resources.subtitle && (
        <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          {resources.subtitle}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.color || 'from-indigo-500 to-purple-500'} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />
            <div className="relative z-10">
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{item.description}</p>
              <span className="text-blue-400 text-sm font-semibold group-hover:underline">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
