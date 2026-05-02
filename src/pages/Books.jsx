import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { booksAPI } from '../services/api';

function Books() {
  const navigate = useNavigate();
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [allBooks, setAllBooks] = useState([]); 
   const [loading, setLoading] = useState(true);
   const [bundles, setBundles] = useState([]);

  const getFallbackBooks = () => ([
    {
      id: 'polity',
      type: 'polity',
      name: 'Polity',
      description: 'Constitution, polity concepts, and exam-focused topics.',
      pages: 80,
      pyqPages: 20,
      highlights: ['Constitution basics', 'Important articles', 'PYQs with explanations'],
      route: '/polity-book',
      ...getBookUIConfig('polity')
    },
    {
      id: 'economics',
      type: 'economics',
      name: 'Economics',
      description: 'Economics basics with Punjab exam-oriented coverage.',
      pages: 75,
      pyqPages: 18,
      highlights: ['Macro + Micro basics', 'Budget concepts', 'PYQ practice'],
      route: '/economics-book',
      ...getBookUIConfig('economics')
    },
    {
      id: 'geography',
      type: 'geography',
      name: 'Geography',
      description: 'Physical + Indian geography in crisp notes format.',
      pages: 72,
      pyqPages: 17,
      highlights: ['Maps and locations', 'Climate patterns', 'PYQs included'],
      route: '/geography-book',
      ...getBookUIConfig('geography')
    },
    {
      id: 'environment',
      type: 'environment',
      name: 'Environment',
      description: 'Environment and ecology quick revision notes.',
      pages: 65,
      pyqPages: 16,
      highlights: ['Ecology basics', 'Pollution and laws', 'Exam-targeted PYQs'],
      route: '/environment-book',
      ...getBookUIConfig('environment')
    },
    {
      id: 'science',
      type: 'science',
      name: 'Science',
      description: 'General science for competitive exams with PYQs.',
      pages: 78,
      pyqPages: 22,
      highlights: ['Physics/Chem/Bio mix', 'Short facts', 'PYQs and revision'],
      route: '/science-book',
      ...getBookUIConfig('science')
    },
    {
      id: 'modern-history',
      type: 'modern-history',
      name: 'Modern History',
      description: 'Freedom struggle and major modern events.',
      pages: 70,
      pyqPages: 18,
      highlights: ['Timeline-based notes', 'Important acts', 'PYQ focus'],
      route: '/modern-history-book',
      ...getBookUIConfig('modern-history')
    },
    {
      id: 'ancient-history',
      type: 'ancient-history',
      name: 'Ancient History',
      description: 'Ancient India concepts in quick-prep format.',
      pages: 60,
      pyqPages: 15,
      highlights: ['Dynasties and culture', 'Key facts', 'PYQ section'],
      route: '/ancient-history-book',
      ...getBookUIConfig('ancient-history')
    },
    {
      id: 'medieval-history',
      type: 'medieval-history',
      name: 'Medieval History',
      description: 'Medieval India complete concise notes.',
      pages: 62,
      pyqPages: 15,
      highlights: ['Sultanate to Mughals', 'Administration', 'Exam PYQs'],
      route: '/medieval-history-book',
      ...getBookUIConfig('medieval-history')
    }
  ]);

  const getFallbackBundles = () => ([
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
      description: 'Get all 8 subjects at massive discount - complete exam preparation',
      features: [
        'All 8 Subject Books',
        'Complete PYQs Collection',
        'Save big with bundle pricing',
        'Lifetime PDF access',
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
      description: 'Already have Polity? Get remaining books at discounted price',
      features: [
        '7 Subject Books',
        'Complete PYQs Collection',
        'Perfect for existing Polity buyers',
        'Lifetime PDF access',
        'Email delivery within 5 minutes'
      ]
    }
  ]);

  useEffect(() => {
    fetchAllBooks();
    fetchBundles();
  }, []);

    const fetchAllBooks = async () => {
    try {
      const response = await booksAPI.getAllBooks();
      const books = response?.data?.books || [];
      
      // Map backend data to include UI-specific properties
      const booksWithUI = books.map(book => ({
        ...book,
        // Map book types to routes
        route: `/${String(book.type || '').replace(/_/g, '-')}-book`,
        
        // Add UI-specific styling based on book type
        ...getBookUIConfig(book.type)
      }));

      setAllBooks(booksWithUI.length ? booksWithUI : getFallbackBooks());
    } catch (error) {
      // Keep fallback hardcoded data if API fails
      setAllBooks(getFallbackBooks());
    } finally {
      setLoading(false);
    }
  };

 const fetchBundles = async () => {
    try {
      const [completePackRes, withoutPolityRes] = await Promise.all([
        booksAPI.getPackageInfo('complete-pack'),
        booksAPI.getPackageInfo('without-polity')
      ]);

      const completePack = completePackRes.data.package;
      const withoutPolity = withoutPolityRes.data.package;

      const bundlesData = [
        {
          id: 'complete',
          name: completePack.name,
          icon: '🎁',
          originalPrice: completePack.originalPrice,
          price: completePack.price,
          savings: completePack.originalPrice - completePack.price,
          discount: Math.round(((completePack.originalPrice - completePack.price) / completePack.originalPrice) * 100),
          badge: 'BEST VALUE',
          badgeColor: 'bg-green-500',
          gradient: 'from-green-500/20 to-emerald-500/20',
          border: 'border-green-500',
          books: 8,
          description: completePack.description,
          features: completePack.features
        },
        {
          id: 'without-polity',
          name: withoutPolity.name,
          icon: '📦',
          originalPrice: withoutPolity.originalPrice,
          price: withoutPolity.price,
          savings: withoutPolity.originalPrice - withoutPolity.price,
          discount: Math.round(((withoutPolity.originalPrice - withoutPolity.price) / withoutPolity.originalPrice) * 100),
          badge: 'POPULAR',
          badgeColor: 'bg-orange-500',
          gradient: 'from-orange-500/20 to-red-500/20',
          border: 'border-orange-500',
          books: 7,
          description: withoutPolity.description,
          features: withoutPolity.features
        }
      ];
      setBundles(bundlesData);
    } catch (error) {
      setBundles(getFallbackBundles());
    }
  };



  // UI configuration for each book type
  const getBookUIConfig = (bookType) => {
    const configs = {
      'polity': {
        icon: '⚖️',
        color: 'from-blue-500/20 to-cyan-500/20',
        border: 'border-blue-500/30',
        gradient: 'from-blue-400 via-cyan-400 to-teal-400'
      },
      'economics': {
        icon: '💰',
        color: 'from-green-500/20 to-emerald-500/20',
        border: 'border-green-500/30',
        gradient: 'from-green-400 via-emerald-400 to-teal-400'
      },
      'geography': {
        icon: '🌍',
        color: 'from-cyan-500/20 to-blue-500/20',
        border: 'border-cyan-500/30',
        gradient: 'from-cyan-400 via-blue-400 to-indigo-400'
      },
      'environment': {
        icon: '🌱',
        color: 'from-emerald-500/20 to-teal-500/20',
        border: 'border-emerald-500/30',
        gradient: 'from-emerald-400 via-teal-400 to-green-400'
      },
      'science': {
        icon: '🔬',
        color: 'from-purple-500/20 to-pink-500/20',
        border: 'border-purple-500/30',
        gradient: 'from-purple-400 via-pink-400 to-rose-400'
      },
      'modern-history': {
        icon: '📜',
        color: 'from-orange-500/20 to-red-500/20',
        border: 'border-orange-500/30',
        gradient: 'from-orange-400 via-red-400 to-pink-400'
      },
      'ancient-history': {
        icon: '🏛️',
        color: 'from-amber-500/20 to-orange-500/20',
        border: 'border-amber-500/30',
        gradient: 'from-amber-400 via-orange-400 to-yellow-400'
      },
      'medieval-history': {
        icon: '🏰',
        color: 'from-red-500/20 to-pink-500/20',
        border: 'border-red-500/30',
        gradient: 'from-red-400 via-pink-400 to-rose-400'
      }
    };
    
    return configs[bookType] || {};
  };



  // Bundle Offers
  // const bundles = [
  //   {
  //     id: 'complete',
  //     name: 'Complete Pack (All 8 Books)',
  //     icon: '🎁',
  //     originalPrice: 1592,
  //     price: 999,
  //     savings: 593,
  //     discount: 37,
  //     badge: 'BEST VALUE',
  //     badgeColor: 'bg-green-500',
  //     gradient: 'from-green-500/20 to-emerald-500/20',
  //     border: 'border-green-500',
  //     books: 8,
  //     description: 'Get all 8 subjects at massive discount — Complete exam preparation',
  //     features: [
  //       'All 8 Subject Books (630+ pages)',
  //       'Complete PYQs Collection (140+ pages)',
  //       'Save ₹593 (37% discount)',
  //       'Lifetime access to all PDFs',
  //       'Email delivery within 5 minutes'
  //     ]
  //   },
  //   {
  //     id: 'without-polity',
  //     name: 'All Books Except Polity',
  //     icon: '📦',
  //     originalPrice: 1393,
  //     price: 899,
  //     savings: 494,
  //     discount: 35,
  //     badge: 'POPULAR',
  //     badgeColor: 'bg-orange-500',
  //     gradient: 'from-orange-500/20 to-red-500/20',
  //     border: 'border-orange-500',
  //     books: 7,
  //     description: 'Already have Polity? Get the remaining 7 books at discounted price',
  //     features: [
  //       '7 Subject Books (540+ pages)',
  //       'Complete PYQs Collection (120+ pages)',
  //       'Save ₹494 (35% discount)',
  //       'Perfect for existing Polity buyers',
  //       'Email delivery within 5 minutes'
  //     ]
  //   }
  // ];

    if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading e-books...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>E-Books - Elite Academy | PSSSB & Punjab Exam Preparation</title>
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
              📚 Complete Study Material in English
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PSSSB & Punjab Exams
            </h1>
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
              Complete E-Book Collection
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Exam-oriented crisp content • Previous Year Questions • Latest updates • English Language • 
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
                    onClick={() => {
                      // Navigate to dedicated bundle purchase page
                      if (bundle.id === 'complete') {
                        navigate('/complete-pack');
                      } else if (bundle.id === 'without-polity') {
                        navigate('/without-polity-pack');
                      }
                    }}
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
                // onClick={() => navigate(book.route)}
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
                      <div className="text-xs text-gray-300">PYQs Questions</div>
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
                  {/* <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-3xl font-black text-white">₹{book.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">₹{book.originalPrice}</span>
                    </div>
                    <span className="text-xs text-green-400 font-semibold">33% OFF</span>
                  </div> */}

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

          <div className="mt-16 text-center">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <p className="text-sm text-amber-300 mb-2">🥀 Payment Issue</p>
              <p className="text-xs text-gray-300">
                If your payment is not processing correctly or you experience any problems, please email us at{' '}
                <a href="mailto:2025eliteacademy@gmail.com" className="text-amber-400 hover:underline">
                  2025eliteacademy@gmail.com
                </a>
                 for manual confirmation and assistance.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Books;
