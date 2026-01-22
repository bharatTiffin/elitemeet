// const LiveChat = () => {
//   return (
//     <iframe
//       src="https://www.youtube.com/live_chat?v=iVGoxHwtVu8&embed_domain=eliteacademy.pro"
//       width="100%"
//       height="500"
//       style={{ border: "none" }}
//       title="Live Chat"
//     />
//   );
// };

// export default LiveChat;


const LiveChat = ({ videoId="iVGoxHwtVu8" }) => {
  // Use 'localhost' for your current dev environment, 
  // but change this to 'eliteacademy.pro' when you deploy!
  const hostname = window.location.hostname; 

  return (
    <div className="w-full h-[500px] border border-gray-300 rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${hostname}`}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Live Chat"
      />
    </div>
  );
};
export default LiveChat;
