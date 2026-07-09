import { Link } from 'react-router-dom';
import PageSeo from '../../components/PageSeo';
import { getBlogIndex } from '../../config/blogs';

const featuredTopics = [
  {
    title: 'PSSSB Coaching',
    path: '/psssb-coaching',
    description: 'Expert guidance for PSSSB exam preparation with live classes, mock tests and structured study material.',
  },
  {
    title: 'Punjab Police Coaching',
    path: '/punjab-police-coaching',
    description: 'Focused preparation for Punjab Police recruitment with expert faculty and updated practice resources.',
  },
  {
    title: 'Patwari Coaching',
    path: '/patwari-coaching',
    description: 'A strong preparation plan for Patwari aspirants with test-based learning and daily practice.',
  },
  {
    title: 'SSC Coaching',
    path: '/ssc-coaching',
    description: 'Complete exam support for SSC aspirants through updated notes, tests and revision strategies.',
  },
];

export default function BlogHome() {
  const posts = getBlogIndex();

  return (
    <>
      <PageSeo
        path="/blog"
        titleOverride="Elite Academy Blog | Punjab Government Exam Updates, Notifications & Preparation Guides"
        descriptionOverride="Explore expert blog articles for PSSSB, Punjab Police, Patwari, SSC and other Punjab government exam aspirants with the latest updates, tips and strategy guides."
        keywords="Punjab government exam blog, PSSSB recruitment blog, Elite Academy blog, exam preparation articles"
      />

      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_45%),linear-gradient(135deg,_#050816_0%,_#0f172a_100%)] text-white">
        <section className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex w-fit items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-200">
              Elite Academy Blog
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Punjab Government Exam Updates, Strategy & Career Guidance
            </h1>
            <p className="text-lg leading-8 text-slate-300">
              Read expert-led articles on PSSSB recruitment, Punjab Police coaching, Patwari preparation, SSC updates and smart study strategies designed for serious aspirants.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {featuredTopics.map((topic) => (
              <Link
                key={topic.path}
                to={topic.path}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white/10"
              >
                <h2 className="text-lg font-semibold text-white">{topic.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-400">{topic.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-300">Latest articles</p>
              <h2 className="text-2xl font-semibold text-white">Fresh content for serious exam preparation</h2>
            </div>
            <p className="text-sm text-slate-400">Updated regularly with recruitment alerts and smart study guidance.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 shadow-2xl shadow-black/20"
              >
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-blue-600/60 via-indigo-600/40 to-slate-800 p-6">
                  <div className="rounded-2xl border border-white/20 bg-black/20 p-6 text-center backdrop-blur-sm">
                    <div className="text-4xl font-semibold tracking-[0.25em] text-white">EA</div>
                    <p className="mt-2 text-sm uppercase tracking-[0.3em] text-blue-100">Blog</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3 text-sm text-slate-400">
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-slate-500">{post.readingTime}</span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
