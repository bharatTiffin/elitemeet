// const LiveClassVideo = () => {
//   return (
//     <div style={{ position: "relative", paddingTop: "56.25%" }}>
//       <iframe
//         src="https://www.youtube.com/embed/iVGoxHwtVu8?autoplay=1&controls=0&rel=0&modestbranding=1"
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           border: "none",
//         }}
//         allow="autoplay; encrypted-media"
//         allowFullScreen
//         title="Live Class"
//       />
//     </div>
//   );
// };

// export default LiveClassVideo;


const LiveClassVideo = ({ videoId="iVGoxHwtVu8" }) => {
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
      
      {/* The Invisible Shield: Blocks clicks on the Share button and Logo */}
      <div 
        className="absolute top-0 left-0 w-full h-16 bg-transparent z-10" 
        style={{ cursor: 'default' }}
        onContextMenu={(e) => e.preventDefault()} // Disables right-click
      />
      <div 
        className="absolute bottom-0 right-0 w-24 h-12 bg-transparent z-10" 
      />
    </div>
  );
};
export default LiveClassVideo;
