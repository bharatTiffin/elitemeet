import React, { useState, useRef, useEffect } from 'react';

const LiveClassVideo = ({ videoId = "s8dka2X-lNk" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef(null);

  const toggleFullScreen = (e) => {
    e.stopPropagation(); // Prevents clicking the button from triggering the container click
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-black rounded-lg overflow-hidden" 
      style={{ paddingTop: "56.25%" }}
      onClick={() => setShowControls(!showControls)}
    >
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      <iframe
        className="absolute top-0 left-0 w-full h-full border-none"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1`}
        allow="autoplay; encrypted-media; fullscreen"
        onLoad={() => setIsLoaded(true)}
        title="Live Class"
      />
      
      {/* SHIELDS (Pointer-events-none ensures they don't block clicks on the button) */}
      <div className="absolute top-0 right-0 w-[45%] h-[18%] bg-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[10%] h-[12%] bg-transparent z-10 pointer-events-none" />

      {/* MOBILE FRIENDLY FULLSCREEN BUTTON */}
      <button 
        onClick={toggleFullScreen}
        className={`absolute bottom-20 right-4 z-40 transition-opacity duration-300 bg-red-600 hover:bg-red-700 text-white text-[12px] font-bold px-4 py-2 rounded uppercase shadow-2xl
          ${showControls ? 'opacity-100' : 'opacity-0'}
        `}
      >
        ⛶ Full Screen
      </button>
    </div>
  );
};

export default LiveClassVideo;