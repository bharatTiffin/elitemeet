import LiveClassVideo from "../components/LiveClassVideo";
import LiveChat from "../components/LiveChat";

const LiveClassPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="md:col-span-2">
        <LiveClassVideo />
      </div>

      <div className="md:col-span-1">
        <LiveChat />
      </div>
    </div>
  );
};

export default LiveClassPage;