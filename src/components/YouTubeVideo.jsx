import React, { useState } from 'react';

const parseYoutubeVideoId = (videoId) => {
  const raw = String(videoId);
  const idMatch = raw.match(/(?:youtu\.be\/|v=|\/embed\/)?([A-Za-z0-9_-]{11})/);
  const id = idMatch ? idMatch[1] : raw.split('&')[0].split('?')[0];
  const timeMatch = raw.match(/(?:\?|&|^)t=([0-9hms]+)/);
  return {
    id,
    time: timeMatch ? timeMatch[1] : null,
  };
};

const parseYoutubeTimestamp = (timestamp) => {
  if (!timestamp) return 0;
  const normalized = String(timestamp).trim().toLowerCase();
  if (/^[0-9]+$/.test(normalized)) {
    return parseInt(normalized, 10);
  }
  const matches = normalized.match(/(\d+)(h|m|s)/g);
  if (!matches) return 0;
  return matches.reduce((total, part) => {
    const value = parseInt(part.slice(0, -1), 10);
    const unit = part.slice(-1);
    if (unit === 'h') return total + value * 3600;
    if (unit === 'm') return total + value * 60;
    return total + value;
  }, 0);
};

const YouTubeVideo = ({ videoId }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { id: cleanVideoId, time } = parseYoutubeVideoId(videoId);
  const startSeconds = parseYoutubeTimestamp(time);

  if (!cleanVideoId) {
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
        src={`https://www.youtube.com/embed/${cleanVideoId}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1&autoplay=0&start=${startSeconds}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        title="YouTube Video Player"
      />
    </div>
  );
};

export default YouTubeVideo;
