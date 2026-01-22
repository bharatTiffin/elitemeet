import { useState, useEffect } from 'react';
import { trackerAPI } from '../services/api';
import { ChevronRight, PlayCircle, BookOpen, X, Clock, MonitorPlay, GraduationCap } from 'lucide-react';

export default function Tracker() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ categories: [], types: [], subjects: [], topics: [] });
  const [selection, setSelection] = useState({ category: null, type: null, subject: null });
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await trackerAPI.getExamCategories();
      setData(prev => ({ ...prev, categories: res.data.data }));
    } finally { setLoading(false); }
  };

  const handleCategorySelect = async (cat) => {
    setSelection({ ...selection, category: cat });
    setLoading(true);
    try {
      const res = await trackerAPI.getExamTypes(cat._id);
      setData(prev => ({ ...prev, types: res.data.data }));
      setStep(2);
    } finally { setLoading(false); }
  };

  const handleTypeSelect = async (type) => {
    setSelection({ ...selection, type: type });
    setLoading(true);
    try {
      const res = await trackerAPI.getSubjects(type._id);
      setData(prev => ({ ...prev, subjects: res.data.data }));
      setStep(3);
    } finally { setLoading(false); }
  };

  const handleSubjectSelect = async (sub) => {
    setSelection({ ...selection, subject: sub });
    setLoading(true);
    try {
      const res = await trackerAPI.getTopics(sub._id);
      setData(prev => ({ ...prev, topics: res.data.data }));
      setStep(4);
    } finally { setLoading(false); }
  };

  const openVideo = (url) => {
    const videoId = url ? (url.split('v=')[1] || url.split('/').pop()) : 'dQw4w9WgXcQ'; 
    setActiveVideo(videoId);
  };

  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse">
          <div className="w-12 h-12 bg-slate-800 rounded-xl mb-4"></div>
          <div className="w-3/4 h-6 bg-slate-800 rounded mb-2"></div>
          <div className="w-1/2 h-4 bg-slate-800 rounded"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 text-white bg-[#020617] min-h-screen relative font-sans">
      
      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-md">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/20">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-red-500 text-white rounded-full transition-all"
            >
              <X size={24} />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Course Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-10 text-center md:text-left">
         {/* <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Learning Tracker
         </h1> */}
         {/* <p className="text-slate-400 mt-2">Track your progress and watch expert-led video lessons.</p> */}
      </div>

      {/* Breadcrumbs with your Theme Colors */}
      <nav className="flex items-center gap-2 text-sm mb-8 bg-slate-900/40 p-3 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar">
        <button onClick={() => setStep(1)} className={`px-3 py-1 rounded-lg transition ${step === 1 ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>Exams</button>
        {step > 1 && <> <ChevronRight size={14} className="text-slate-600" /> <button onClick={() => setStep(2)} className={`px-3 py-1 rounded-lg transition ${step === 2 ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>{selection.category?.name}</button> </>}
        {step > 2 && <> <ChevronRight size={14} className="text-slate-600" /> <button onClick={() => setStep(3)} className={`px-3 py-1 rounded-lg transition ${step === 3 ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>{selection.type?.name}</button> </>}
      </nav>

      {loading ? <SkeletonGrid /> : (
        <div className="fade-in">
          {/* Step 1: Categories */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.categories.map(cat => (
                <div key={cat._id} onClick={() => handleCategorySelect(cat)} 
                     className="group p-6 bg-slate-900/50 border border-slate-800 rounded-3xl cursor-pointer hover:border-blue-500/50 hover:bg-slate-800/80 transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <GraduationCap className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                  <div className="flex items-center text-slate-400 text-sm gap-2">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-xs">Full Syllabus</span>
                    <span>•</span>
                    <span>Updated 2025</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Exam Types */}
          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.types.map(type => (
                <div key={type._id} onClick={() => handleTypeSelect(type)}
                     className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl flex justify-between items-center cursor-pointer hover:border-blue-500 hover:bg-slate-800 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-blue-500 rounded-full group-hover:h-10 transition-all"></div>
                    <span className="text-lg font-semibold">{type.name}</span>
                  </div>
                  <ChevronRight className="text-slate-600 group-hover:text-blue-500" />
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Subject Grid */}
          {step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.subjects.map(sub => (
                <div key={sub._id} onClick={() => handleSubjectSelect(sub)}
                     className="relative p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-[2rem] cursor-pointer shadow-xl hover:translate-y-[-8px] transition-all overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <BookOpen size={80} />
                  </div>
                  <BookOpen className="text-blue-400 mb-4" />
                  <h4 className="text-2xl font-black mb-4 leading-tight">{sub.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[0%] group-hover:w-[40%] transition-all duration-1000"></div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest">Start Now</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Video Topic View */}
          {step === 4 && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <MonitorPlay className="text-blue-500" /> {selection.subject?.name}
                </h2>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">Active Course</span>
              </div>
              
              {data.topics.map((topic, index) => (
                <div key={topic._id} className="group p-5 bg-slate-900/40 hover:bg-slate-900/80 rounded-2xl flex flex-col md:flex-row gap-5 items-start md:items-center justify-between border border-slate-800 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="relative w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 transition-colors">
                      <span className="text-slate-600 group-hover:text-blue-500 font-black text-xl">{index + 1}</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{topic.name}</h5>
                      <div className="flex items-center gap-3 mt-1 text-slate-500 text-xs">
                         <span className="flex items-center gap-1"><Clock size={12}/> 45 Mins</span>
                         <span>•</span>
                         <span className="text-blue-400 font-medium">Video Lecture</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => openVideo(topic.videoUrl)}
                    className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                  >
                    <PlayCircle size={18} /> WATCH NOW
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}