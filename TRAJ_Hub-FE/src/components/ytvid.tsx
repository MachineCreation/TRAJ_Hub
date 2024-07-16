

interface YouTubeVideoProps {
  videoId: string;
}

const YouTubeVideo = (props: YouTubeVideoProps) => {
  const videoSrc = `https://www.youtube.com/embed/${props.videoId}`;

  return (
    <div className='relative flex m-auto h-full w-full'>
      <iframe
        src={videoSrc}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
        className='relative m-auto flex h-full w-auto z-20'
      ></iframe>
    </div>
  );
};

export default YouTubeVideo;
