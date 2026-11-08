import Section from './Section';
import {
  CoursesGrid, OnlineVsOffline, AboutElite, LearnAtElite, StudentSuccess, Testimonials,
  TrustBadges, FeatureGrid, BuiltForPrep, BranchesPreview, FAQ, FinalCTA,
} from './HomeSections';
import { JoinTeamSection, FrenchCourseSection } from './HomeExtras';
import { STUDENT_SUCCESS_DATA } from '../../config/studentSuccessData';

export default function HomeBelowFold({ courses, handleCardClick, handleJobApply, frenchCourseInfo, handleFrenchCourse, faqItems }) {
  return (
    <>
        <Section
          id="courses"
          eyebrow="Courses & Preparation Programs"
          title={<>Every program an aspirant needs, <span className="text-gradient">in one place.</span></>}
          description="Elite Academy prepares students for a wide range of Punjab and central government competitive examinations. Explore online coaching, test series, books, and current affairs programs — each built to support PSSSB, Punjab Police, Patwari, SSC, Banking, and other government exams."
        >
          <CoursesGrid courses={courses} onSelect={handleCardClick} />
        </Section>

        <Section
          eyebrow="Online or Offline"
          title="Choose how you learn."
          description="The same structured curriculum and faculty support — available the way that fits your life."
        >
          <OnlineVsOffline />
        </Section>

        <Section
          eyebrow="About Elite Academy"
          title="Punjab's trusted government exam coaching institute."
        >
          <AboutElite />
        </Section>

        <Section
          eyebrow="Learn at Elite Academy"
          title="Offline and online coaching for Punjab & Central Government exams."
        >
          <LearnAtElite classroomImage={STUDENT_SUCCESS_DATA.classroomImage} />
        </Section>

        <Section
          eyebrow="Student Success"
          title="Real students. Real selections."
          description="Recent selections from Elite Academy students in Punjab government examinations."
        >
          <StudentSuccess stories={STUDENT_SUCCESS_DATA.successStories} />
        </Section>

        <Section
          eyebrow="Google Reviews"
          title="Verified feedback from real students."
          description="Verified feedback from students at our Chandigarh and Fatehgarh Sahib branches."
        >
          <Testimonials reviews={STUDENT_SUCCESS_DATA.reviews} />
        </Section>

        <Section eyebrow="Why Students Trust Us" title="Why Students Trust Elite Academy.">
          <TrustBadges />
        </Section>

        <Section
          eyebrow="Why Elite"
          title="Why Choose Elite Academy."
          description="Practical benefits that support your government exam preparation from day one."
        >
          <FeatureGrid />
        </Section>

        <Section eyebrow="Our Commitment" title="Built for serious exam preparation.">
          <BuiltForPrep />
        </Section>

        <Section eyebrow="Our Branches" title="Our Branches in Punjab.">
          <BranchesPreview />
        </Section>

        <JoinTeamSection onApply={handleJobApply} />

        <FrenchCourseSection info={frenchCourseInfo} onOpen={handleFrenchCourse} />

        <Section eyebrow="FAQ" title="Questions, answered.">
          <FAQ items={faqItems} />
        </Section>

        <FinalCTA />
    </>
  );
}
