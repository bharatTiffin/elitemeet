import React, { useState } from 'react';

const LiveClassVideo = ({ videoId = "SZZXXnNZ8jg" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingTop: "56.25%" }}>
      {/* 1. THE LOADING OVERLAY: Sits on top until iframe is ready */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* The Actual Video */}
      <iframe
        className="absolute top-0 left-0 w-full h-full border-none"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        onLoad={() => setIsLoaded(true)} // Only show content when ready
        title="Live Class"
      />
      
      {/* THE SHIELDS: These are now effectively "pre-loaded" under the overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-[22%] bg-transparent z-10" 
        style={{ cursor: 'default' }}
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="absolute bottom-0 right-0 w-[25%] h-[15%] bg-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[15%] bg-transparent z-10" />
    </div>
  );
};

export default LiveClassVideo;