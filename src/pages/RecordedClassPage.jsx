import React, { useState, useEffect, useMemo } from 'react';
import { coachingAPI } from '../services/api';
import YouTubeVideo from '../components/YouTubeVideo';

const RecordedClassPage = ({ courseType = 'complete' }) => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [subjectFilter, setSubjectFilter] = useState('');
  const [subSubjectFilter, setSubSubjectFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [dateFilter, setDateFilter] = useState('');
  
  // Available subjects and sub-subjects
  const subjects = ["Maths", "Reasoning", "English", "Punjabi GK", "Punjabi Grammar", "General Knowledge", "Computer", "Current Affairs", "General Studies"];
  const subSubjects = ["Polity", "Economics", "Geography", "Environment", "Science", "Modern-History", "Ancient-History", "Medieval-History"];

  const parseYoutubeVideoId = (videoId) => {
    const raw = String(videoId);
    const idMatch = raw.match(/(?:youtu\.be\/|v=|\/embed\/)?([A-Za-z0-9_-]{11})/);
    const id = idMatch ? idMatch[1] : raw.split('&')[0].split('?')[0];
    const timeMatch = raw.match(/(?:\?|&|^)t=([0-9hms]+)/);
    return {
      id,
      time: timeMatch ? timeMatch[1] : null,
    };
  };

  const parseYoutubeTimestamp = (timestamp) => {
    if (!timestamp) return 0;
    const normalized = String(timestamp).trim().toLowerCase();
    if (/^[0-9]+$/.test(normalized)) {
      return parseInt(normalized, 10);
    }
    const matches = normalized.match(/(\d+)(h|m|s)/g);
    if (!matches) return 0;
    return matches.reduce((total, part) => {
      const value = parseInt(part.slice(0, -1), 10);
      const unit = part.slice(-1);
      if (unit === 'h') return total + value * 3600;
      if (unit === 'm') return total + value * 60;
      return total + value;
    }, 0);
  };

  const getYoutubeThumbnail = (videoId) => {
    const { id } = parseYoutubeVideoId(videoId);
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  };

const BATCHES = [
  {
    id: 'batch_june_1',
    name: '1 June Batch',
    icon: 'school-outline',
    videos: [
      {
        _id: 'bx_v1',
        videoId: 'yZcL3FUHVJU?t=20m',
        title: 'Polity – 1 June',
        description: 'Polity Class 1st June batch.',
        subject: 'General Studies',
        subSubject: 'Polity',
        createdAt: '2025-06-01T10:00:00Z',
      },
      {
        _id: 'bx_v2',
        videoId: 'yZcL3FUHVJU?t=1h52m',
        title: 'Maths: Number System – 1 June',
        description: 'Maths: Number System Class 1st June batch.',
        subject: 'Maths',
        // subSubject: 'Polity',
        createdAt: '2025-06-01T11:00:00Z',
      },
      {
        _id: 'bx_v3',
        videoId: 'yZcL3FUHVJU?t=3h',
        title: 'Reasoning: Calender – 1 June',
        description: 'Reasoning: Calender Class 1st June batch.',
        subject: 'Reasoning',
        // subSubject: 'Polity',
        createdAt: '2025-06-01T12:00:00Z',
      },
      //2nd june
      {
        _id: 'bx_v4',
        videoId: 'w1iZFQlLt7E?t=20m',
        title: 'Maths: Number System – 2 June',
        description: 'Maths: Number System Class 2nd June batch.',
        subject: 'Maths',
        // subSubject: '',
        createdAt: '2025-06-02T10:00:00Z',
      },
      {
        _id: 'bx_v5',
        videoId: 'w1iZFQlLt7E?t=1h54m',
        title: 'Polity – 2 June',
        description: 'Polity Class 2nd June batch.',
        subject: 'General Studies',
        subSubject: 'Polity',
        createdAt: '2025-06-02T11:00:00Z',
      },
      {
        _id: 'bx_v6',
        videoId: 'w1iZFQlLt7E?t=2h49m',
        title: 'Reasoning: Calender – 2 June',
        description: 'Reasoning: Calender Class 2nd June batch.',
        subject: 'Reasoning',
        // subSubject: '',
        createdAt: '2025-06-02T12:00:00Z',
      },
      //3rd june
      {
        _id: 'bx_v7',
        videoId: '49_Ubu2J2t4?t=28m',
        title: 'Maths: Number System – 3 June',
        description: 'Maths: Number System class for 3rd June.',
        subject: 'Maths',
        // subSubject: '',
        createdAt: '2025-06-03T10:00:00Z',
      },
      {
        _id: 'bx_v8',
        videoId: '49_Ubu2J2t4?t=2h4m',
        title: 'Polity Class – 3 June (Session 1)',
        description: 'Polity class for 3rd June batch.',
        subject: 'General Studies',
        subSubject: 'Polity',
        createdAt: '2025-06-03T11:00:00Z',
      },
      {
        _id: 'bx_v9',
        videoId: 'zWy_C1ve4Mw?t=1m',
        title: 'Polity Class – 3 June (Session 2)',
        description: 'Polity class for 3rd June batch.',
        subject: 'General Studies',
        subSubject: 'Polity',
        createdAt: '2025-06-03T12:00:00Z',
      },
      {
        _id: 'bx_v10',
        videoId: 'zWy_C1ve4Mw?t=30m',
        title: 'Reasoning: Clock Class – 3 June ',
        description: 'Reasoning: Clock class for 3rd June batch.',
        subject: 'Reasoning',
        // subSubject: 'Polity',
        createdAt: '2025-06-03T13:00:00Z',
      },



      // 4 june
      {
        _id: 'bx_v12',
        videoId: 'WpFmwhv6Y1E?t=25m',
        title: 'Polity Class – 4 June',
        description: 'Polity class for 4th June batch.',
        subject: 'General Studies',
        subSubject: 'Polity',
        createdAt: '2025-06-04T10:00:00Z',
      },
      {
        _id: 'bx_v11',
        videoId: 'WpFmwhv6Y1E?t=1h30m',
        title: 'Maths: Number System – 4 June',
        description: 'Maths: Number System class for 4th June batch.',
        subject: 'Maths',
        // subSubject: '',
        createdAt: '2025-06-04T11:00:00Z',
      },
      {
        _id: 'bx_v13',
        videoId: 'WpFmwhv6Y1E?t=2h30m',
        title: 'Reasoning Class – 4 June',
        description: 'Reasoning class for 4th June batch.',
        subject: 'Reasoning',
        // subSubject: '',
        createdAt: '2025-06-04T12:00:00Z',
      },
      // 5 june
      {
        _id: 'bx_v14',
        videoId: 'TJVZ3wD8dfw?t=19m',
        title: 'Current Affairs – 5 June',
        description: 'Current Affairs: Class for 5th June batch.',
        subject: 'Current Affairs',
        subSubject: '',
        createdAt: '2025-06-05T10:00:00Z',
      },
      {
        _id: 'bx_v15',
        videoId: 'TJVZ3wD8dfw?t=1h16m',
        title: 'Maths: Number System – 5 June',
        description: 'Maths: Number System Class for 5th June batch.',
        subject: 'Maths',
        subSubject: '',
        createdAt: '2025-06-05T11:00:00Z',
      },
      {
        _id: 'bx_v16',
        videoId: 'TJVZ3wD8dfw?t=2h33m',
        title: 'Reasoning:Clock – 5 June',
        description: 'Reasoning: Clock for 5th June batch.',
        subject: 'Reasoning',
        subSubject: '',
        createdAt: '2025-06-05T12:00:00Z',
      },



      //6 june
      {
        _id: 'bx_v17',
        videoId: 'TE3SUqjUzdA?t=1m',
        title: 'Punjabi GK – 6 June',
        description: 'Punjabi GK Class for 6th June batch.',
        subject: 'Punjabi GK',
        subSubject: '',
        createdAt: '2025-06-06T10:00:00Z',
      },
      // {
      //   _id: 'b1_v7',
      //   videoId: 'TE3SUqjUzdA?t=1h30m',
      //   title: 'Punjabi Grammar – 6 June',
      //   description: 'Punjabi Grammar Class for 6th June batch.',
      //   subject: 'Punjabi Grammar',
      //   subSubject: '',
      //   createdAt: '2025-06-06T10:00:00Z',
      // },
      {
        _id: 'bx_v19',
        videoId: 'TE3SUqjUzdA?t=1h15m',
        title: 'Computer Class – 6 June',
        description: 'Computer Class for 6th June batch.',
        subject: 'Computer',
        subSubject: '',
        createdAt: '2025-06-06T12:00:00Z',
      },

      //8th june
      {
        _id: 'bx_v20',
        videoId: 'iz3oX4f3gOY?t=22m',
        title: 'Polity – 8 June',
        description: 'Polity Class for 8th June batch.',
        subject: 'General Studies',
        subSubject: 'Polity',
        createdAt: '2025-06-08T10:00:00Z',
      },
      {
        _id: 'bx_v21',
        videoId: 'iz3oX4f3gOY?t=1h41m',
        title: 'Reasoning: Clock – 8 June',
        description: 'Reasoning: Clock Class for 8th June batch.',
        subject: 'Reasoning',
        // subSubject: '',
        createdAt: '2025-06-08T11:00:00Z',
      },
      {
        _id: 'bx_v21',
        videoId: 'O-GOtS4_JDQ?t=5m',
        title: 'Live Class – 9 June',
        description: 'Recorded live session for 9th June batch.',
        subject: 'General Studies',
        subSubject: 'Polity',
        createdAt: '2025-06-09T10:00:00Z',
      },
      {
        _id: 'b1_v11',
        videoId: 'EB13sQTYjhk',
        title: 'Live Class – 9 June',
        description: 'Recorded live session for 9th June batch.',
        subject: 'Maths',
        subSubject: '',
        createdAt: '2025-06-09T10:00:00Z',
      },
      {
        _id: 'b1_v12',
        videoId: '_cLLKv6ZdmY',
        title: 'Live Class – 10 June',
        description: 'Recorded live session for 10th June batch.',
        subject: 'General Studies',
        subSubject: 'Polity',
        createdAt: '2025-06-10T10:00:00Z',
      },
      {
        _id: 'b1_v13',
        videoId: 'IR4a9028p10',
        title: 'Live Class – 10 June',
        description: 'Divisiblity rule',
        subject: 'Maths',
        subSubject: '',
        createdAt: '2025-06-10T10:00:00Z',
      },
      {
        _id: 'b1_v14',
        videoId: 'WcROnGURSns',
        title: 'Live Class – 10 June',
        description: 'Clock Last part',
        subject: 'Reasoning',
        subSubject: '',
        createdAt: '2025-06-10T10:00:00Z',
      },

      {
        _id: 'b1_v15',
        videoId: '-x5zv6QWQ_w',
        title: 'Live Class – 11 June Polity basic',
        description: 'basic',
        subject: 'General Studies',
        subSubject: 'Polity',
        createdAt: '2025-06-11T10:00:00Z',
      },
      {
        _id: 'b1_v16',
        videoId: 'nW8WFbP-LqY',
        title: 'Live Class – 11 June',
        description: 'number system last class',
        subject: 'Maths',
        subSubject: '',
        createdAt: '2025-06-11T10:00:00Z',
      },
      {
        _id: 'b1_v17',
        videoId: 'LCjdIvaFmMA',
        title: 'Live Class – 11 June',
        description: 'Clock',
        subject: 'Reasoning',
        subSubject: '',
        createdAt: '2025-06-11T10:00:00Z',
      },
      {
        _id: 'b1_v18',
        videoId: 'GksXXFkzyRg',
        title: 'Live Class – 12 June Polity basic',
        description: 'basic',
        subject: 'General Studies',
        subSubject: 'Polity',
        createdAt: '2025-06-12T10:00:00Z',
      },
      {
        _id: 'b1_v19',
        videoId: 't94OMMcB8cg',
        title: 'Live Class – 12 June',
        description: 'Simplification',
        subject: 'Maths',
        subSubject: '',
        createdAt: '2025-06-12T10:00:00Z',
      },
      {
        _id: 'b1_v20',
        videoId: 'LS9-Ze7y2Ps',
        title: 'Live Class – 12 June',
        description: 'blood relation',
        subject: 'Reasoning',
        subSubject: '',
        createdAt: '2025-06-12T10:00:00Z',
      },
      {
        _id: 'b1_v21',
        videoId: 'KnjJ4fQSFb8',
        title: 'Current affairs 1-10 June – 13 June',
        description: 'Current affairs 1-10 June',
        subject: 'Current Affairs',
        subSubject: '',
        createdAt: '2025-06-13T09:00:00Z',
      },
      {
        _id: 'b1_v22',
        videoId: '7D-56hB3ZnA',
        title: 'Punjabi GK – 13 June',
        description: 'Punjabi GK',
        subject: 'Punjabi GK',
        subSubject: '',
        createdAt: '2025-06-13T10:00:00Z',
      },
      // punjabi grammer
      {
        _id: 'b1_v23',
        videoId: '7D-56hB3ZnA?t=1h40m',
        title: 'Punjabi Grammer – 13 June',
        description: 'Punjabi Grammer',
        subject: 'Punjabi Grammer',
        subSubject: '',
        createdAt: '2025-06-13T11:00:00Z',
      },
      // Computer
      {
        _id: 'b1_v24',
        videoId: '7D-56hB3ZnA?t=1h59m',
        title: 'Basics of Computer – 13 June',
        description: 'Basics of Computer',
        subject: 'Computer',
        subSubject: '',
        createdAt: '2025-06-13T12:00:00Z',
      },

      // 15 june classes
      {
        _id: 'b1_v25',
        videoId: 'vdBxYzhoeAQ?t=34m',
        title: 'Reasoning – 15 June',
        description: 'Reasoning – 15 June',
        subject: 'Reasoning',
        subSubject: '',
        createdAt: '2025-06-15T10:00:00Z',
      },
      {
        _id: 'b1_v26',
        videoId: 'vdBxYzhoeAQ?t=1h25m',
        title: 'Maths – 15 June',
        description: 'Maths – 15 June',
        subject: 'Maths',
        subSubject: '',
        createdAt: '2025-06-15T11:00:00Z',
      },
      {
        _id: 'b1_v27',
        videoId: 'vdBxYzhoeAQ?t=2h35m',
        title: 'Nouns and Pronouns – 15 June',
        description: 'Nouns and Pronouns – 15 June',
        subject: 'English',
        subSubject: '',
        createdAt: '2025-06-15T12:00:00Z',
      }
    ],
  },
  // Add more batches here as needed:
  // { id: 'batch_july_1', name: '1 July Batch', icon: 'school-outline', videos: [...] },
];
  
  // Calculate lecture counts by subject
  const activeData = selectedBatch ? selectedBatch.videos : classes;
  const subjectCounts = useMemo(() => {
    const counts = {};
    activeData.forEach(item => {
      if (item.subject) {
        counts[item.subject] = (counts[item.subject] || 0) + 1;
      }
    });
    return counts;
  }, [activeData]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      // Logic to switch API based on courseType
      const response = courseType === 'crash' 
        ? await coachingAPI.getCrashCourseClasses(subjectFilter, subSubjectFilter)
        : await coachingAPI.getAllClasses(subjectFilter, subSubjectFilter);
        
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch classes when filters change
  useEffect(() => {
    fetchClasses();
  }, [courseType, subjectFilter, subSubjectFilter]);

  // Apply filters and sorting
  useEffect(() => {
    const activeData = selectedBatch ? selectedBatch.videos : classes;
    let filtered = [...activeData];

    if (subjectFilter) {
      filtered = filtered.filter(item => item.subject === subjectFilter);
    }
    if (subSubjectFilter) {
      filtered = filtered.filter(item => item.subSubject === subSubjectFilter);
    }
    if (dateFilter) {
      filtered = filtered.filter(item => 
        new Date(item.createdAt).toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
      );
    }
    
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'subject':
        filtered.sort((a, b) => a.subject.localeCompare(b.subject));
        break;
      default:
        break;
    }
    
    setFilteredClasses(filtered);
  }, [classes, selectedBatch, subjectFilter, subSubjectFilter, dateFilter, sortBy]);
  
  // Reset sub-subject filter when subject changes
  useEffect(() => {
    if (subjectFilter !== 'General Studies') {
      setSubSubjectFilter('');
    }
  }, [subjectFilter]);

  const handleSelectBatch = (batch) => {
    clearAllFilters();
    setSelectedBatch(batch);
  };

  const handleSelectAll = () => {
    clearAllFilters();
    setSelectedBatch(null);
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setSubjectFilter('');
    setSubSubjectFilter('');
    setDateFilter('');
    setSortBy('newest');
  };

  if (loading) return <div className="text-white p-10">Loading Records...</div>;

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Recorded Classes</h1>

      {/* Batch Selector */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-medium text-lg">🎯 Batch</span>
          <button
            onClick={handleSelectAll}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${!selectedBatch ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            All
          </button>
          {BATCHES.map((batch) => (
            <button
              key={batch.id}
              onClick={() => handleSelectBatch(batch)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${selectedBatch?.id === batch.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {batch.name}
            </button>
          ))}
        </div>
        {selectedBatch && (
          <div className="text-sm text-gray-400">
            Showing {selectedBatch.videos.length} videos from <span className="text-white">{selectedBatch.name}</span>.
          </div>
        )}
      </div>
      
      {/* Subject Counts Summary */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold mb-3 text-blue-400">📚 Lecture Count by Subject</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(subjectCounts).map(([subject, count]) => (
            <button
              key={subject}
              onClick={() => setSubjectFilter(subject === subjectFilter ? '' : subject)}
              className={`p-2 rounded-lg text-sm font-medium transition-all ${
                subjectFilter === subject
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {subject} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Video Player Section (Shows only if a video is clicked) */}
      {selectedVideo && (
        <div className="mb-10 bg-black p-4 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{selectedVideo.title}</h2>
            <button onClick={() => setSelectedVideo(null)} className="text-red-500 font-bold">Close Player ✕</button>
          </div>
          <div className="max-w-4xl mx-auto">
             <YouTubeVideo videoId={selectedVideo.videoId} />
          </div>
          <p className="mt-4 text-gray-400">{selectedVideo.description}</p>
        </div>
      )}

      {/* Enhanced Filter Bar */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="font-medium text-lg">🔍 Filters:</span>
          <button
            onClick={clearAllFilters}
            className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          {/* Sub-Subject Filter (Only for General Studies) */}
          {subjectFilter === 'General Studies' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GS Topic</label>
              <select
                value={subSubjectFilter}
                onChange={(e) => setSubSubjectFilter(e.target.value)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="">All GS Topics</option>
                {subSubjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          )}
          
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
              <option value="subject">Subject</option>
            </select>
          </div>
          
          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Filter by Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        
        {/* Active Filters Display */}
        {(subjectFilter || subSubjectFilter || dateFilter) && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-400">Active filters:</span>
            {subjectFilter && (
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                Subject: {subjectFilter}
                <button
                  onClick={() => setSubjectFilter('')}
                  className="ml-1 hover:text-red-300"
                >
                  ✕
                </button>
              </span>
            )}
            {subSubjectFilter && (
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                GS Topic: {subSubjectFilter}
                <button
                  onClick={() => setSubSubjectFilter('')}
                  className="ml-1 hover:text-red-300"
                >
                  ✕
                </button>
              </span>
            )}
            {dateFilter && (
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                Date: {new Date(dateFilter).toLocaleDateString('en-IN')}
                <button
                  onClick={() => setDateFilter('')}
                  className="ml-1 hover:text-red-300"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-4 text-gray-400">
        Showing {filteredClasses.length} of {classes.length} lectures
        {filteredClasses.length !== classes.length && ` (filtered)`}
      </div>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((item) => (
            <div 
              key={item._id} 
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => {
                setSelectedVideo(item);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative pt-[56.25%] bg-gray-700">
                 <img 
                   src={getYoutubeThumbnail(item.videoId)} 
                   alt="thumbnail" 
                   className="absolute top-0 left-0 w-full h-full object-cover"
                   onError={(e) => {
                     e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"%3E%3Crect fill="%23374151" width="320" height="180"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Thumbnail%3C/text%3E%3C/svg%3E';
                   }}
                 />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                    <span className="bg-red-600 p-3 rounded-full text-white text-sm font-bold">▶ Play</span>
                 </div>
                 {/* Subject Badge */}
                 <div className="absolute top-2 left-2">
                   <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full font-medium">
                     {item.subject}
                   </span>
                 </div>
                 {item.subSubject && (
                   <div className="absolute top-2 right-2">
                     <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full font-medium">
                       {item.subSubject}
                     </span>
                   </div>
                 )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold truncate mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-3">{item.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <p className="text-blue-400 font-mono">
                    {new Date(item.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                  {/* {item.meetingLink && (
                    <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs">Live</span>
                  )} */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg mb-4">No recordings found</p>
            {(subjectFilter || subSubjectFilter || dateFilter) && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordedClassPage;