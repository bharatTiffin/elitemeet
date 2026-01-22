import React, { useState, useRef } from 'react';

const LiveClassVideo = ({ videoId = "IhzM-4VJz50" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-black rounded-lg overflow-hidden group" 
      style={{ paddingTop: "56.25%" }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      <iframe
        className="absolute top-0 left-0 w-full h-full border-none"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1`}
        allow="autoplay; encrypted-media"
        onLoad={() => setIsLoaded(true)}
        title="Live Class"
      />
      
      {/* 1. TOP-RIGHT SHIELD (Blocks Share/Title) */}
      <div 
        className="absolute top-0 right-0 w-[45%] h-[18%] bg-transparent z-10" 
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* 2. THE REDUCED LOGO SHIELD */}
      {/* Width reduced from 12% to 10% to uncover the Gear icon */}
      <div 
        className="absolute bottom-0 right-0 w-[8%] h-[12%] bg-transparent z-10" 
        style={{ cursor: 'default' }}
      />

      {/* 3. CUSTOM FULLSCREEN BUTTON */}
      {/* Move it up slightly more (bottom-16) to ensure it doesn't block 
          the quality settings menu when it opens upward */}
      <button 
        onClick={toggleFullScreen}
        className="absolute bottom-16 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase shadow-xl"
      >
        ⛶ Full Screen
      </button>
    </div>
  );
};

export default LiveClassVideo;