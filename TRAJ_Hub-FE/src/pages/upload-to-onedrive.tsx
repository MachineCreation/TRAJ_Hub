// react

// components
import Header from "../components/header";
import Video from "../components/ytvid";


function UploadVideo() {

  return (
    <div className="w-full">
      <Header
        name={'upload video'} />
      <section className="flex flex-col xl:h-screen w-full max-w-[1850px] m-auto justify-items-center relative">
        <Video 
            videoId='https://obnwntqubaadmcbmdjjp.supabase.co/storage/v1/object/public/main_page_clips/onedrive_upload.mp4?' />
      </section>
    </div>
  )
}

export default UploadVideo;