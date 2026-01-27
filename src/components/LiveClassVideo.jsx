import React, { useState } from 'react';

const LiveClassVideo = ({ meetingLink }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!meetingLink) {
    return (
      <div className="relative w-full bg-black rounded-lg overflow-hidden flex items-center justify-center" style={{ paddingTop: "56.25%" }}>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white text-center">
            <div className="text-xl mb-2">No Live Class Scheduled</div>
            <div className="text-sm text-gray-400">Check back later for upcoming live sessions</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden">
      {/* Header with meeting info */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="text-white">
          <div className="text-lg font-semibold mb-2">Live Class in Progress</div>
          <div className="text-sm text-gray-300 mb-3">Join the Google Meet session below:</div>
          
          {/* Meeting Link Display */}
          <div className="bg-gray-900 p-3 rounded-lg mb-3">
            <div className="text-xs text-gray-400 mb-1">Meeting Link:</div>
            <div className="text-sm text-blue-400 break-all font-mono">{meetingLink}</div>
          </div>
          
          {/* Open Meet Button */}
          <a 
            href={meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Join Google Meet
          </a>
        </div>
      </div>
      
      {/* Embedded Google Meet iframe */}
      {/* <div className="relative" style={{ paddingTop: "56.25%" }}> */}
        {/* {!isLoaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
              <div className="text-white text-sm">Loading Google Meet...</div>
            </div>
          </div>
        )} */}
        
        {/* <iframe
          className="absolute top-0 left-0 w-full h-full border-none"
          src={meetingLink}
          allow="camera; microphone; display-capture; fullscreen; clipboard-write; autoplay"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
          title="Google Meet Live Class"
        /> */}
      {/* </div> */}
    </div>
  );
};

export default LiveClassVideo;