import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../PageSeo';
import Footer from '../Footer';
import { getFaqSchema } from '../../config/structuredData';
import AnimatedBackground from './AnimatedBackground';
import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import AboutExam from './AboutExam';
import ExamDetailsSection from './ExamDetailsSection';
import PostsCovered from './PostsCovered';
import WhyChooseUs from './WhyChooseUs';
import StudentSuccessSection from './StudentSuccessSection';
import CourseFeatures from './CourseFeatures';
import PreparationTimeline from './PreparationTimeline';
import ResourcesSection from './ResourcesSection';
import BranchSection from './BranchSection';
import FAQSection from './FAQSection';
import FinalCTA from './FinalCTA';

/**
 * Reusable SEO landing page for government exam coaching keywords.
 * All content is driven by the exam configuration object.
 */
export default function ExamLandingPage({ config }) {
  const ctaPath = config.ctaPath || '/online-coaching';
  const faqSchema = getFaqSchema(config.faq.items);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [config.slug]);

  return (
    <>
      <PageSeo
        path={config.slug}
        titleOverride={config.seo.title}
        descriptionOverride={config.seo.description}
        keywords={config.seo.keywords}
        extraSchema={[faqSchema, ...(config.seo.extraSchema || [])]}
      />

      <div className="bg-black text-white min-h-screen overflow-x-hidden">
        <AnimatedBackground />
        <LandingNavbar examName={config.examName} />

        <HeroSection hero={config.hero} ctaPath={ctaPath} />
        <AboutExam about={config.about} />
        <ExamDetailsSection details={config.examDetails} />
        <PostsCovered posts={config.posts} />
        <WhyChooseUs whyChooseUs={config.whyChooseUs} />
        <StudentSuccessSection
          classroomImage={config.studentSuccess?.classroomImage}
          successStories={config.studentSuccess?.successStories}
          reviews={config.studentSuccess?.reviews}
          stats={config.studentSuccess?.stats}
        />
        <CourseFeatures program={config.program} />
        <PreparationTimeline timeline={config.timeline} />
        <ResourcesSection resources={config.resources} />
        <BranchSection branches={config.branches} />
        <FAQSection faq={config.faq} />
        <FinalCTA finalCta={config.finalCta} ctaPath={ctaPath} />

        {/* Breadcrumb navigation for SEO internal linking */}
        <nav
          aria-label="Breadcrumb"
          className="px-4 sm:px-6 py-6 border-t border-white/10 text-sm text-gray-400"
        >
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="hover:text-blue-400 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/online-coaching" className="hover:text-blue-400 hover:underline">
              Online Coaching
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{config.examName}</span>
          </div>
        </nav>

        <Footer />
      </div>
    </>
  );
}
