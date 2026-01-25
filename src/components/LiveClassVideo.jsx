import React, { useState } from 'react';

const LiveClassVideo = ({ videoId }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="relative w-full bg-black rounded-lg overflow-hidden" 
      style={{ paddingTop: "56.25%" }} // Maintains 16:9 Aspect Ratio
    >
      {/* Loading Spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      <iframe
        className="absolute top-0 left-0 w-full h-full border-none"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&fs=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        title="Live Class"
      />
    </div>
  );
};

export default LiveClassVideo;