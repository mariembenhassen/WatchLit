import { bannerHomeStyles} from '../assets/dummyStyles'
import NavBar from './NavBar'
import video from '../assets/watchBanner2.mp4'
import { useEffect, useRef } from 'react';

const BannerHome = () => {
  const videoRef  = useRef(null);
  useEffect(()=>{
    const reduceMotion = 
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion : reduce)").matches;
    if(reduceMotion && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("autoplay")
    }
  } , []);
  return (
    <div className={bannerHomeStyles.container}>
      <div className={bannerHomeStyles.navbarWrapper}>
         <NavBar/>
         </div> 
    {/* bg video */}

    <div className={ bannerHomeStyles.videoContainer} >
      <video ref={videoRef} className={bannerHomeStyles.video}
      autoPlay muted loop playsInline  preload='metadata'
      poster="/fallback.jpg" role='presentation'>
        <source src={video} type='video/mp4'/>
      </video>

    </div>
    </div>
  );
};

export default BannerHome
