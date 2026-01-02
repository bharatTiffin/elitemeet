import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';

function Books() {
  const navigate = useNavigate();
  const [selectedBundle, setSelectedBundle] = useState(null);
const allBooks = [
  {
    id: 'polity',
    name: 'Complete Polity Package',
    icon: '⚖️',
    price: 199,
    originalPrice: 299,
    pages: 90,
    pyqPages: 20,
    color: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    gradient: 'from-blue-400 via-cyan-400 to-teal-400',
    route: '/polity-book', // Existing route
    features: [
      '90 Pages Full Polity Notes',
      '20 Pages PYQs (2012–2025)',
      'December 2025 Updated',
      '100% PSSSB + Punjab Exam Oriented'
    ],
    highlights: [
      'Complete coverage of Indian Constitution',
      'Union & State Government structure',
      'Panchayati Raj & Local Bodies',
      'Judiciary & Constitutional Bodies',
      'Important Articles & Amendments',
      'Latest PYQs with solutions'
    ],
    description: 'Score full marks in Polity — No extra books needed! Complete PSSSB & Punjab Exams preparation material.',
  },
  {
    id: 'economics',
    name: 'Complete Economics Package',
    icon: '💰',
    price: 199,
    originalPrice: 299,
    pages: 85,
    pyqPages: 18,
    color: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    gradient: 'from-green-400 via-emerald-400 to-teal-400',
    route: '/economics-book',
    features: [
      '85 Pages Full Economics Notes',
      '18 Pages PYQs (2012–2025)',
      'December 2025 Updated',
      '100% PSSSB + Punjab Exam Oriented'
    ],
    highlights: [
      'Indian Economy basics & structure',
      'Budget & Fiscal Policy',
      'Banking & Monetary Policy (RBI)',
      'Economic Survey highlights',
      'Punjab Economy specifics',
      'Latest economic developments'
    ],
    description: 'Master Economics for PSSSB exams — From basics to advanced concepts, all in one package.',
  },
  {
    id: 'geography',
    name: 'Complete Geography Package',
    icon: '🌍',
    price: 199,
    originalPrice: 299,
    pages: 80,
    pyqPages: 16,
    color: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30',
    gradient: 'from-cyan-400 via-blue-400 to-indigo-400',
    route: '/geography-book',
    features: [
      '80 Pages Full Geography Notes',
      '16 Pages PYQs (2012–2025)',
      'December 2025 Updated',
      'Maps & Diagrams included'
    ],
    highlights: [
      'Physical Geography essentials',
      'Indian Geography complete coverage',
      'Punjab Geography in depth',
      'World Geography key facts',
      'Rivers, Mountains, Climate zones',
      'Economic & Agricultural Geography'
    ],
    description: 'Complete Geography preparation — India, Punjab & World Geography for maximum marks.',
  },
  {
    id: 'environment',
    name: 'Complete Environment Package',
    icon: '🌱',
    price: 199,
    originalPrice: 299,
    pages: 75,
    pyqPages: 15,
    color: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30',
    gradient: 'from-emerald-400 via-teal-400 to-green-400',
    route: '/environment-book',
    features: [
      '75 Pages Full Environment Notes',
      '15 Pages PYQs (2012–2025)',
      'December 2025 Updated',
      'Climate Change & Biodiversity covered'
    ],
    highlights: [
      'Environmental Ecology basics',
      'Climate Change & Global Warming',
      'Biodiversity & Conservation',
      'Pollution types & control measures',
      'Environmental Acts & Policies',
      'Sustainable Development Goals (SDGs)',
      'Punjab Environmental issues',
      'Latest environmental updates'
    ],
    description: 'Complete Environment & Ecology preparation — Score maximum marks with latest updates and PYQs.',
  },
  {
    id: 'science',
    name: 'Complete Science Package',
    icon: '🔬',
    price: 199,
    originalPrice: 299,
    pages: 95,
    pyqPages: 22,
    color: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    gradient: 'from-purple-400 via-pink-400 to-rose-400',
    route: '/science-book',
    features: [
      '95 Pages Full Science Notes',
      '22 Pages PYQs (2012–2025)',
      'December 2025 Updated',
      'Physics, Chemistry, Biology covered'
    ],
    highlights: [
      'Physics: Laws, Motion, Energy, Electricity',
      'Chemistry: Elements, Compounds, Reactions',
      'Biology: Human Body, Diseases, Genetics',
      'Scientific Inventions & Discoveries',
      'Latest Science & Technology updates',
      'Space & Defense technology',
      'Indian Scientists & their contributions',
      'Exam-focused numerical problems'
    ],
    description: 'Master General Science — Physics, Chemistry, Biology all covered with latest developments and PYQs.',
  },
  {
    id: 'modern-history',
    name: 'Complete Modern History Package',
    icon: '📜',
    price: 199,
    originalPrice: 299,
    pages: 88,
    pyqPages: 19,
    color: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/30',
    gradient: 'from-orange-400 via-red-400 to-pink-400',
    route: '/modern-history-book',
    features: [
      '88 Pages Full Modern History Notes',
      '19 Pages PYQs (2012–2025)',
      'December 2025 Updated',
      '1757-1947 complete coverage'
    ],
    highlights: [
      'British East India Company & expansion',
      'Indian Freedom Struggle movements',
      'Important leaders & their contributions',
      'Revolt of 1857 in detail',
      'Indian National Congress formation',
      'Gandhi Era & Non-cooperation movements',
      'Partition of India & Independence',
      'Punjab role in freedom struggle'
    ],
    description: 'Complete Modern History (1757-1947) — Freedom struggle, British rule, and India\'s path to independence.',
  },
  {
    id: 'ancient-history',
    name: 'Complete Ancient History Package',
    icon: '🏛️',
    price: 199,
    originalPrice: 299,
    pages: 82,
    pyqPages: 17,
    color: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/30',
    gradient: 'from-amber-400 via-orange-400 to-yellow-400',
    route: '/ancient-history-book',
    features: [
      '82 Pages Full Ancient History Notes',
      '17 Pages PYQs (2012–2025)',
      'December 2025 Updated',
      'Prehistoric to 8th Century CE'
    ],
    highlights: [
      'Indus Valley Civilization complete',
      'Vedic Age & Literature',
      'Mauryan & Gupta Empires',
      'Buddhist & Jain traditions',
      'Indian Art, Architecture & Sculptures',
      'Ancient Punjab history & culture',
      'Important dynasties & rulers',
      'Ancient Indian economy & trade'
    ],
    description: 'Complete Ancient History — From Indus Valley to 8th Century, all major civilizations and dynasties covered.',
  },
  {
    id: 'medieval-history',
    name: 'Complete Medieval History Package',
    icon: '🏰',
    price: 199,
    originalPrice: 299,
    pages: 78,
    pyqPages: 16,
    color: 'from-red-500/20 to-pink-500/20',
    border: 'border-red-500/30',
    gradient: 'from-red-400 via-pink-400 to-rose-400',
    route: '/medieval-history-book',
    features: [
      '78 Pages Full Medieval History Notes',
      '16 Pages PYQs (2012–2025)',
      'December 2025 Updated',
      '8th Century to 1757 CE'
    ],
    highlights: [
      'Delhi Sultanate period complete',
      'Mughal Empire & major rulers',
      'Sikh Gurus & Sikh Empire',
      'Bhakti & Sufi movements',
      'Medieval Indian architecture',
      'Regional kingdoms & their culture',
      'Punjab under Mughals & Sikhs',
      'Transition to British rule'
    ],
    description: 'Complete Medieval History (8th-18th Century) — Delhi Sultanate, Mughal Empire, and Sikh history covered.',
  },
];


  // Bundle Offers
  const bundles = [
    {
      id: 'complete',
      name: 'Complete Pack (All 8 Books)',
      icon: '🎁',
      originalPrice: 1592,
      price: 999,
      savings: 593,
      discount: 37,
      badge: 'BEST VALUE',
      badgeColor: 'bg-green-500',
      gradient: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-500',
      books: 8,
      description: 'Get all 8 subjects at massive discount — Complete exam preparation',
      features: [
        'All 8 Subject Books (630+ pages)',
        'Complete PYQs Collection (140+ pages)',
        'Save ₹593 (37% discount)',
        'Lifetime access to all PDFs',
        'Email delivery within 5 minutes'
      ]
    },
    {
      id: 'without-polity',
      name: 'All Books Except Polity',
      icon: '📦',
      originalPrice: 1393,
      price: 899,
      savings: 494,
      discount: 35,
      badge: 'POPULAR',
      badgeColor: 'bg-orange-500',
      gradient: 'from-orange-500/20 to-red-500/20',
      border: 'border-orange-500',
      books: 7,
      description: 'Already have Polity? Get the remaining 7 books at discounted price',
      features: [
        '7 Subject Books (540+ pages)',
        'Complete PYQs Collection (120+ pages)',
        'Save ₹494 (35% discount)',
        'Perfect for existing Polity buyers',
        'Email delivery within 5 minutes'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Books - Elite Academy | PSSSB & Punjab Exam Preparation</title>
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-12">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-blue-500/10">
                📚 Complete Study Material
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PSSSB & Punjab Exams
            </h1>
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
              Complete Book Collection
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Exam-oriented crisp content • Previous Year Questions • Latest updates • 
              <span className="text-white font-semibold"> Maximum marks in minimum time</span>
            </p>
          </div>

          {/* Bundle Offers Section - HIGHLIGHTED */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              🎁 Bundle Offers - Save More
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
              {bundles.map((bundle) => (
                <div
                  key={bundle.id}
                  className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-2 border-white/10 hover:border-white/30 rounded-3xl p-8 transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedBundle(bundle.id)}
                >
                  {/* Badge */}
                  <div className="absolute -top-3 right-6">
                    <span className={`${bundle.badgeColor} text-white text-xs px-4 py-1.5 rounded-full font-bold shadow-lg`}>
                      {bundle.badge}
                    </span>
                  </div>

                  {/* Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${bundle.gradient} blur-3xl rounded-3xl opacity-30`}></div>

                  <div className="relative">
                    <div className="text-5xl mb-4">{bundle.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{bundle.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{bundle.description}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          ₹{bundle.price}
                        </span>
                        <span className="text-xl text-gray-500 line-through">₹{bundle.originalPrice}</span>
                      </div>
                      <div className="inline-block bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full">
                        <span className="text-green-400 text-sm font-semibold">
                          Save ₹{bundle.savings} ({bundle.discount}% OFF)
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {bundle.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Button */}
                    <button
                      onClick={() => {/* Handle bundle purchase */}}
                      className={`w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r ${bundle.gradient.replace('/20', '')} hover:shadow-lg hover:shadow-current/40 transition-all duration-300`}
                    >
                      Buy {bundle.name.includes('Complete') ? 'Complete Pack' : 'This Bundle'} →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-500 text-sm">
              💡 Bundle buyers get all PDFs delivered to email within 5 minutes
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-gray-800"></div>
            <span className="text-gray-600 font-semibold">OR BUY INDIVIDUAL BOOKS</span>
            <div className="flex-1 h-px bg-gray-800"></div>
          </div>

          {/* Individual Books Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBooks.map((book) => (
              <div
                key={book.id}
                className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20 cursor-pointer group"
                onClick={() => navigate(book.route)}

              >
                {/* Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${book.color} blur-3xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                <div className="relative">
                  {/* Badge */}
                  <div className="inline-block mb-4">
                    <span className={`text-sm border ${book.border} px-3 py-1 rounded-full backdrop-blur-sm bg-gradient-to-r ${book.color}`}>
                      {book.icon} Study Material
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-black mb-3 bg-gradient-to-r ${book.gradient} bg-clip-text text-transparent`}>
                    {book.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                    {book.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className={`bg-gradient-to-r ${book.color} rounded-lg p-3 text-center`}>
                      <div className="text-2xl font-bold text-white">{book.pages}</div>
                      <div className="text-xs text-gray-300">Pages Notes</div>
                    </div>
                    <div className={`bg-gradient-to-r ${book.color} rounded-lg p-3 text-center`}>
                      <div className="text-2xl font-bold text-white">{book.pyqPages}</div>
                      <div className="text-xs text-gray-300">Pages PYQs</div>
                    </div>
                  </div>

                  {/* Features - Compact */}
                  <div className={`bg-gradient-to-r ${book.color} rounded-xl p-4 mb-4 border ${book.border}`}>
                    <h4 className="text-xs font-bold text-white mb-2">What's Inside:</h4>
                    <ul className="space-y-1">
                      {book.highlights.slice(0, 3).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-300">
                          <span className="text-green-400 mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                      <li className="text-xs text-blue-400 font-semibold">+ {book.highlights.length - 3} more topics...</li>
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-3xl font-black text-white">₹{book.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">₹{book.originalPrice}</span>
                    </div>
                    <span className="text-xs text-green-400 font-semibold">33% OFF</span>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => navigate(book.route)}
                    className={`w-full py-3 rounded-xl font-bold bg-gradient-to-r ${book.gradient.replace('via-', 'to-')} hover:shadow-lg transition-all duration-300`}
                  >
                    View Details & Buy →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 max-w-2xl">
              <p className="text-gray-300 text-sm mb-2">
                📦 <span className="font-semibold text-white">Instant Delivery:</span> All PDFs sent to your email within 5 minutes
              </p>
              <p className="text-gray-400 text-xs">
                💡 Need help? Email us at <span className="text-blue-400">2025eliteacademy@gmail.com</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Books;
