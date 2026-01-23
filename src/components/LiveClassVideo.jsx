import React, { useState, useRef } from 'react';

const LiveClassVideo = ({ videoId }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef(null);

  const toggleFullScreen = (e) => {
    e.stopPropagation();
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
      className="relative w-full bg-black rounded-lg overflow-hidden group" 
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
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=0`}
        allow="autoplay; encrypted-media; fullscreen"
        onLoad={() => setIsLoaded(true)}
        title="Live Class"
      />
      
      {/* --- OVERLAY SHIELDS --- */}
      
      {/* 1. TOP-RIGHT SHIELD: Blocks 'Share' and 'Watch Later' */}
      <div className="absolute top-0 right-0 w-[40%] h-[20%] z-20 pointer-events-auto bg-transparent" />

      {/* 2. BOTTOM PROGRESS AREA: Set to pointer-events-none so users CAN click the timeline */}
      <div className="absolute bottom-0 left-0 w-full h-[12%] z-20 pointer-events-none bg-transparent" />
      
      {/* 3. BOTTOM-RIGHT SHIELD: Still blocks the YouTube Logo specifically */}
      <div className="absolute bottom-0 right-0 w-[12%] h-[12%] z-30 pointer-events-auto bg-transparent" />

      {/* 4. TOP-LEFT SHIELD: Blocks Title/Channel info */}
      <div className="absolute top-0 left-0 w-[60%] h-[15%] z-20 pointer-events-auto bg-transparent" />

      {/* CUSTOM FULLSCREEN BUTTON */}
      <button 
        onClick={toggleFullScreen}
        className={`absolute bottom-16 right-4 z-40 transition-opacity duration-300 bg-red-600 hover:bg-red-700 text-white text-[12px] font-bold px-4 py-2 rounded uppercase shadow-2xl
          ${showControls ? 'opacity-100' : 'opacity-0'}
        `}
      >
        ⛶ Full Screen
      </button>
    </div>
  );
};

export default LiveClassVideo;

// import React, { useState, useRef } from 'react';

// const LiveClassVideo = ({ videoId = "IhzM-4VJz50" }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const containerRef = useRef(null);

//   const toggleFullScreen = (e) => {
//     e.stopPropagation();
//     if (!document.fullscreenElement) {
//       if (containerRef.current.requestFullscreen) {
//         containerRef.current.requestFullscreen();
//       } else if (containerRef.current.webkitRequestFullscreen) {
//         containerRef.current.webkitRequestFullscreen();
//       }
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//       }
//     }
//   };

//   return (
//     <div 
//       ref={containerRef} 
//       className="relative w-full bg-black rounded-lg overflow-hidden group" 
//       style={{ paddingTop: "56.25%" }}
//     >
//       {/* 1. Loading Spinner */}
//       {!isLoaded && (
//         <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
//         </div>
//       )}

//       {/* 2. The Video Player (Z-index 10) */}
//       <iframe
//         className="absolute top-0 left-0 w-full h-full border-none z-10"
//         src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3&fs=1&disablekb=0`}
//         allow="autoplay; encrypted-media; fullscreen"
//         onLoad={() => setIsLoaded(true)}
//         title="Live Class"
//       />
      
//       {/* 3. Interaction Layer 
//           We removed the "Shields" here. 
//           The mouse will now interact directly with the iframe.
//       */}

//       {/* 4. Custom Fullscreen Button (Z-index 40 so it stays on top) */}
//       <button 
//         onClick={toggleFullScreen}
//         className="absolute bottom-20 right-4 z-40 bg-red-600 hover:bg-red-700 text-white text-[12px] font-bold px-4 py-2 rounded uppercase shadow-2xl transition-transform active:scale-95"
//       >
//         ⛶ Full Screen
//       </button>
//     </div>
//   );
// };

// export default LiveClassVideo;