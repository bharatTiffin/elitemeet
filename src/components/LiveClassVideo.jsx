const LiveClassVideo = ({ videoId = "SZZXXnNZ8jg" }) => {
  return (
    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      {/* The Actual Video */}
      <iframe
        className="absolute top-0 left-0 w-full h-full border-none"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Live Class"
      />
      
      {/* TOP SHIELD: Covers Title and Share Button */}
      {/* Using h-[20%] ensures it scales with the video height on mobile */}
      <div 
        className="absolute top-0 left-0 w-full h-[20%] bg-transparent z-10" 
        style={{ cursor: 'default' }}
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* BOTTOM RIGHT SHIELD: Covers YouTube Logo */}
      {/* Using percentages to ensure it stays over the logo on all screens */}
      <div 
        className="absolute bottom-0 right-0 w-[25%] h-[15%] bg-transparent z-10" 
      />
      
      {/* Optional: BOTTOM LEFT SHIELD: Covers "Watch on YouTube" link */}
      <div 
        className="absolute bottom-0 left-0 w-[40%] h-[15%] bg-transparent z-10" 
      />
    </div>
  );
};