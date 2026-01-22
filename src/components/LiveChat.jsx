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


const LiveChat = ({ videoId = "iVGoxHwtVu8" }) => {
  const domain = "www.eliteacademy.pro"; 

  return (
    <div className="flex flex-col w-full h-[500px]">
      <div className="flex-grow border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <iframe
          src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${domain}`}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Live Chat"
          /* UPDATED SANDBOX: 
             Added 'allow-top-navigation' and 'allow-popups-to-escape-sandbox'
             This fixes the "SecurityError" in your logs.
          */
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation allow-popups-to-escape-sandbox"
        />
      </div>
      
      <p className="text-[10px] text-gray-500 mt-1 px-1">
        If chat doesn't appear, please ensure you are logged into YouTube and "Third-party cookies" are enabled.
      </p>
    </div>
  );
};

export default LiveChat;
