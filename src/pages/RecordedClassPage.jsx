import React, { useState, useEffect, useMemo } from 'react';
import { coachingAPI } from '../services/api';
import YouTubeVideo from '../components/YouTubeVideo';

const RecordedClassPage = ({ courseType = 'complete' }) => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [subjectFilter, setSubjectFilter] = useState('');
  const [subSubjectFilter, setSubSubjectFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [dateFilter, setDateFilter] = useState('');
  
  // Available subjects and sub-subjects
  const subjects = ["Maths", "Reasoning", "English", "Punjabi GK", "Punjabi Grammar", "General Knowledge", "Computer", "Current Affairs", "General Studies"];
  const subSubjects = ["Polity", "Economics", "Geography", "Environment", "Science", "Modern-History", "Ancient-History", "Medieval-History"];
  
  // Calculate lecture counts by subject
  const subjectCounts = useMemo(() => {
    const counts = {};
    classes.forEach(item => {
      counts[item.subject] = (counts[item.subject] || 0) + 1;
    });
    return counts;
  }, [classes]);

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
    let filtered = [...classes];
    
    // Apply date filter
    if (dateFilter) {
      filtered = filtered.filter(item => 
        new Date(item.createdAt).toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
      );
    }
    
    // Apply sorting
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
  }, [classes, dateFilter, sortBy]);
  
  // Reset sub-subject filter when subject changes
  useEffect(() => {
    if (subjectFilter !== 'General Studies') {
      setSubSubjectFilter('');
    }
  }, [subjectFilter]);
  
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
                   src={`https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`} 
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