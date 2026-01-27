import React, { useState } from 'react';

const YouTubeVideo = ({ videoId }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!videoId) {
    return (
      <div className="relative w-full bg-black rounded-lg overflow-hidden flex items-center justify-center" style={{ paddingTop: "56.25%" }}>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white text-center">
            <div className="text-xl mb-2">No Video Available</div>
            <div className="text-sm text-gray-400">This video is currently not available</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingTop: "56.25%" }}>
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
            <div className="text-white text-sm">Loading video...</div>
          </div>
        </div>
      )}
      
      <iframe
        className="absolute top-0 left-0 w-full h-full border-none"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1&autoplay=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        title="YouTube Video Player"
      />
    </div>
  );
};

export default YouTubeVideo;
