export default function VideoPlayer({ videoUrl }) {
  return (
    <div className="w-full h-[500px] bg-black rounded-lg overflow-hidden">
      <video src={videoUrl} controls className="w-full h-full"></video>
    </div>
  );
}
