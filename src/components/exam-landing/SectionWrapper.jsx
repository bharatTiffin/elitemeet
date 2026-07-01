export default function SectionWrapper({
  children,
  id,
  className = '',
  alt = false,
  narrow = false,
}) {
  const maxWidth = narrow ? 'max-w-4xl' : 'max-w-6xl';
  const bgClass = alt ? 'border-y border-white/10 bg-white/[0.02]' : '';

  return (
    <section id={id} className={`relative px-4 sm:px-6 py-16 ${bgClass} ${className}`}>
      <div className={`${maxWidth} mx-auto`}>{children}</div>
    </section>
  );
}
