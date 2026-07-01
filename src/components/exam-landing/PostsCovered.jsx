import SectionWrapper from './SectionWrapper';

export default function PostsCovered({ posts }) {
  return (
    <SectionWrapper id="posts-covered">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">{posts.title}</h2>
      {posts.subtitle && (
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">{posts.subtitle}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.items.map((post) => (
          <div
            key={post}
            className="group rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-5 text-center transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <span className="text-2xl mb-2 block">{post.icon || '📋'}</span>
            <span className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
              {post.name || post}
            </span>
          </div>
        ))}
      </div>
      {posts.footer && (
        <p className="text-gray-400 text-center mt-8 text-sm">{posts.footer}</p>
      )}
    </SectionWrapper>
  );
}
