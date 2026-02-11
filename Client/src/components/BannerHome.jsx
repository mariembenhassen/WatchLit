import { bannerHomeStyles } from "../assets/dummyStyles";
import NavBar from "./NavBar";
import video from "../assets/watchBanner2.mp4";
import { useEffect, useRef } from "react";
import BL1 from "../assets/rightsliverr.jpg";
import BM1 from "../assets/vintage.jpg";
import BR1 from "../assets/leftsilver.jpg";

const BannerHome = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion : reduce)").matches;
    if (reduceMotion && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("autoplay");
    }
  }, []);
  return (
    <div className={bannerHomeStyles.container}>
      <div className={bannerHomeStyles.navbarWrapper}>
        <NavBar />
      </div>
      {/* bg video */}

      <div className={bannerHomeStyles.videoContainer}>
        <video
          ref={videoRef}
          className={bannerHomeStyles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/fallback.jpg"
          role="presentation"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      {/* content */}
      <div className={bannerHomeStyles.contentContainer}>
        <div className={bannerHomeStyles.h1Container}>
          <h1
            style={bannerHomeStyles.playfairFont}
            className={bannerHomeStyles.h1Text}
          >
            <span className={bannerHomeStyles.h1SpanGray}>
              Move with purpose
            </span>
            <span className={bannerHomeStyles.h1SpanYellow}>
              Every second counts
            </span>
            <p className={bannerHomeStyles.subtext}>
              Discover our exclusive collection of handcrafted timpieces that
              embdy precision , luxury, and timeless style.
            </p>
          </h1>
        </div>
        {/* cards section  */}
        <div className={bannerHomeStyles.cardsContainer}>
          <div className={bannerHomeStyles.grid}>
            {/**1 */}
            <div
              className={`${bannerHomeStyles.cardWrapper}
             ${bannerHomeStyles.leftCardTransform}
              `}
            >
              <div
                className={`${bannerHomeStyles.cardBase}
             ${bannerHomeStyles.cardPadding}
              `}
              >
                <img
                  src={BL1}
                  alt="left logo"
                  className={`${bannerHomeStyles.cardImage}
                  ${bannerHomeStyles.leftCardImage} 
               `}
                  loading="lazy"
                />
              </div>
              <p
                className={`${bannerHomeStyles.cardLabel} 
              ${bannerHomeStyles.cardLabelGray}`}
              >
                Clasic Heritage
              </p>
            </div>
            {/*2*/}
            <div
              className={`${bannerHomeStyles.cardWrapper}
             ${bannerHomeStyles.middleCardTransform}
              `}
            >
              <div
                className={`${bannerHomeStyles.cardMiddle}
             ${bannerHomeStyles.cardPadding}
              `}
              >
                <img
                  src={BM1}
                  alt="Middle logo"
                  className={`${bannerHomeStyles.cardImage}
                  ${bannerHomeStyles.middleCardImage} 
               `}
                  loading="lazy"
                />
              </div>
              <p
                className={`${bannerHomeStyles.cardLabel} 
              ${bannerHomeStyles.cardLabelGray}`}
              >
                Limited Edition
              </p>
            </div>
            {/*3 */}
            <div
              className={`${bannerHomeStyles.cardWrapper}
             ${bannerHomeStyles.rightCardTransform}
              `}
            >
              <div
                className={`${bannerHomeStyles.cardBase}
             ${bannerHomeStyles.cardPadding}
              `}
              >
                <img
                  src={BR1}
                  alt="right logo"
                  className={`${bannerHomeStyles.cardImage}
                  ${bannerHomeStyles.rightCardImage} 
               `}
                  loading="lazy"
                />
              </div>
              <p
                className={`${bannerHomeStyles.cardLabel} 
              ${bannerHomeStyles.cardLabelGray}`}
              >
                Modern Precision
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerHome;
