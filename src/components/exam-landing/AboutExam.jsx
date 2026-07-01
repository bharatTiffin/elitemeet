import SectionWrapper from './SectionWrapper';

export default function AboutExam({ about }) {
  return (
    <SectionWrapper id="about-exam" alt narrow>
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">{about.title}</h2>
      <div className="space-y-5 text-gray-300 text-base sm:text-lg leading-relaxed">
        {about.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </SectionWrapper>
  );
}
