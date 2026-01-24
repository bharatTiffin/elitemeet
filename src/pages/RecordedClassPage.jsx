import React, { useState, useEffect } from 'react';
import { coachingAPI } from '../services/api';
import LiveClassVideo from '../components/LiveClassVideo'; // Reusing your video component

const RecordedClassPage = ({ courseType = 'complete' }) => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

const fetchClasses = async () => {
    try {
      setLoading(true);
      // Logic to switch API based on courseType
      const response = courseType === 'crash' 
        ? await coachingAPI.getCrashCourseClasses() 
        : await coachingAPI.getAllClasses();
        
      setClasses(response.data);
      setFilteredClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Filtering
  useEffect(() => {
    if (dateFilter) {
      const filtered = classes.filter(item => 
        new Date(item.createdAt).toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
      );
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses(classes);
    }
  }, [dateFilter, classes]);

  if (loading) return <div className="text-white p-10">Loading Records...</div>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Recorded Classes</h1>

      {/* Video Player Section (Shows only if a video is clicked) */}
      {selectedVideo && (
        <div className="mb-10 bg-black p-4 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{selectedVideo.title}</h2>
            <button onClick={() => setSelectedVideo(null)} className="text-red-500 font-bold">Close Player ✕</button>
          </div>
          <div className="max-w-4xl mx-auto">
             <LiveClassVideo videoId={selectedVideo.videoId} />
          </div>
          <p className="mt-4 text-gray-400">{selectedVideo.description}</p>
        </div>
      )}

      {/* Filter Bar */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <label className="font-medium">Filter by Date:</label>
        <input 
          type="date" 
          className="bg-gray-800 border border-gray-600 p-2 rounded text-white"
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <button 
          onClick={() => setDateFilter('')}
          className="text-sm bg-gray-700 px-3 py-2 rounded hover:bg-gray-600"
        >
          Clear Filter
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((item) => (
            <div 
              key={item._id} 
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all cursor-pointer shadow-lg"
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
                 />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                    <span className="bg-red-600 p-3 rounded-full text-white">▶ Play</span>
                 </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold truncate">{item.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mt-1">{item.description}</p>
                <p className="text-xs text-blue-400 mt-3 font-mono">
                  {new Date(item.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">No recordings found for this date.</p>
        )}
      </div>
    </div>
  );
};

export default RecordedClassPage;