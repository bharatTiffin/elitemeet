import { motion } from 'framer-motion';

export default function Section({ eyebrow, title, description, children, id, className = '' }) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-10 md:mb-14"
          >
            {eyebrow && (
              <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
