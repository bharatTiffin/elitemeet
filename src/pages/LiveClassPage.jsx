// import LiveClassVideo from "../components/LiveClassVideo";
// import LiveChat from "../components/LiveChat";

// const LiveClassPage = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
//       <div className="md:col-span-2">
//         <LiveClassVideo />
//       </div>

//       <div className="md:col-span-1">
//         <LiveChat />
//       </div>
//     </div>
//   );
// };

// export default LiveClassPage;

import { useState, useEffect } from 'react';
import { coachingAPI } from "../services/api";
import LiveClassVideo from "../components/LiveClassVideo";
import LiveChat from "../components/LiveChat";

const LiveClassPage = ({ courseType = 'complete' }) => {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveDetails = async () => {
      try {
        const res = courseType === 'crash'
          ? await coachingAPI.getCrashCourseLatestVideo()
          : await coachingAPI.getLatestVideo();
        
        setVideoId(res.data.videoId);
      } catch (error) {
        console.error("Error fetching live video:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveDetails();
  }, [courseType]);

  if (loading) return <div className="p-10 text-white">Loading Live Session...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black min-h-screen">
      <div className="md:col-span-2">
        <LiveClassVideo videoId={videoId} />
      </div>
      <div className="md:col-span-1">
        <LiveChat videoId={videoId} />
      </div>
    </div>
  );
};

export default LiveClassPage;
