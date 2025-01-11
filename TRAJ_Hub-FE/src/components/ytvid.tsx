

interface YouTubeVideoProps {
  videoId: string;
  aspect?: string;
}

const Video = ({videoId, aspect = 'aspect-video'}: YouTubeVideoProps) => {

  return (
    <div className='relative flex m-auto h-full w-full'>
      <iframe
        src={videoId}
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className= {`${aspect} relative my-4 mx-auto flex h-auto w-full z-20`}
      ></iframe>
    </div>
  );
};

export default Video;
