import React, { useState, useRef } from 'react';

const LiveClassVideo = ({ videoId = "IhzM-4VJz50" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  // Function to trigger full screen on the container, not the iframe
  const handleFullScreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) { /* Safari */
        containerRef.current.webkitRequestFullscreen();
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-black rounded-lg overflow-hidden" 
      style={{ paddingTop: "56.25%" }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      <iframe
        className="absolute top-0 left-0 w-full h-full border-none"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3&fs=0`} // Added fs=0 to hide YT's native FS button
        allow="autoplay; encrypted-media"
        // remove allowFullScreen so user can't trigger native FS
        onLoad={() => setIsLoaded(true)}
        title="Live Class"
      />
      
      {/* THE SHIELDS: These stay on top because they are inside the containerRef */}
      <div className="absolute top-0 left-0 w-full h-[22%] bg-transparent z-10" onContextMenu={(e) => e.preventDefault()} />
      <div className="absolute bottom-0 right-0 w-[25%] h-[15%] bg-transparent z-10" />
      
      {/* Custom Full Screen Button (Optional but recommended) */}
      <button 
        onClick={handleFullScreen}
        className="absolute bottom-2 right-12 z-20 bg-white/20 p-1 rounded text-white text-xs"
      >
        Full Screen
      </button>
    </div>
  );
};

export default LiveClassVideo;