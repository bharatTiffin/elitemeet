const LiveChat = ({ meetingLink }) => {
  // For Google Meet links, show information about chat functionality
  if (meetingLink && meetingLink.includes('meet.google.com')) {
    return (
      <div className="flex flex-col w-full h-[500px]">
        <div className="flex-grow border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-gray-900">
          <div className="p-6 text-center text-white h-full flex flex-col justify-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="text-xl font-semibold mb-2">Google Meet Chat</div>
              <div className="text-sm text-gray-400 mb-4">
                Chat functionality is built into Google Meet
              </div>
            </div>
            
            <div className="space-y-3 text-left bg-gray-800 p-4 rounded-lg">
              <div className="text-sm font-semibold text-green-400 mb-2">How to access chat:</div>
              <div className="text-xs text-gray-300 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Click "Join Google Meet" button to open the meeting</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Chat is available in the Google Meet interface</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Look for the chat icon (💬) in the meeting controls</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>You can ask questions and interact with the teacher there</span>
                </div>
              </div>
            </div>
            
            <a 
              href={meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors mt-6"
            >
              Open Google Meet for Chat
            </a>
          </div>
        </div>
        
        <p className="text-[10px] text-gray-500 mt-2 px-2 text-center">
          Chat is only available within the Google Meet session
        </p>
      </div>
    );
  }

  // Fallback when no meeting link
  return (
    <div className="flex flex-col w-full h-[500px]">
      <div className="flex-grow border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <div className="text-lg font-semibold mb-2">Live Chat</div>
          <div className="text-sm text-gray-400">
            Chat will be available when the live session starts
          </div>
        </div>
      </div>
      
      <p className="text-[10px] text-gray-500 mt-1 px-1">
        Chat functionality depends on the live streaming platform
      </p>
    </div>
  );
};

export default LiveChat;
