import { MapCard } from '@/components/MapCard';
import { CTAGroup } from '@/components/CTAGroup';
// import { Disclaimer } from '@/components/Disclaimer';
// import { QRSection } from '@/components/QRSection';
import { LanguageToggle } from '@/components/LanguageToggle';
import { eventData } from '@/content/event';
import backgroundDesktop from '@/assets/bg-desktop.png';
import { Countdown } from '@/components/Countdown';
import kvBannerViDesktop from '@/assets/kv-banner-vi-desktop.png';
import kvBannerViMobile from '@/assets/kv-banner-vi-mobile.png';
import kvBannerEnDesktop from '@/assets/kv-banner-en-desktop.png';
import kvBannerEnMobile from '@/assets/kv-banner-en-mobile.png';
import kvVideoViDesktop from '@/assets/kv-video-vi-desktop.mp4';
import kvVideoEnDesktop from '@/assets/kv-video-en-desktop.mp4';
import kvVideoViMobile from '@/assets/kv-video-vi-mobile.mp4';
import kvVideoEnMobile from '@/assets/kv-video-en-mobile.mp4';
import isMobile from 'is-mobile';
import eventInfoVi from '@/assets/event-info-vi.png';
import eventInfoEn from '@/assets/event-info-en.png';
import footerVi from '@/assets/footer-vi.png';
import footerEn from '@/assets/footer-en.png';

import { useState, useEffect, useRef } from 'react';

export function Landing() {
  const isMobileView = isMobile();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [language, setLanguage] = useState('vi');
  const [useTestVideo, setUseTestVideo] = useState(false);
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Check for query parameter on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const testVideo = urlParams.get('testVideo');

    if (testVideo === 'true') {
      setUseTestVideo(true);
    } 
  }, []);

  // Detect in-app browser
  useEffect(() => {
    const detectInAppBrowser = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
      
      // Common in-app browser patterns
      const inAppPatterns = [
        /FBAN|FBAV/i, // Facebook
        /Instagram/i, // Instagram
        /Line/i, // LINE
        /MicroMessenger/i, // WeChat
        /QQ/i, // QQ
        /MQQBrowser/i, // QQ Browser
        /UCBrowser/i, // UC Browser
        /baiduboxapp/i, // Baidu
        /baidubrowser/i, // Baidu Browser
        /MiuiBrowser/i, // MIUI Browser
        /SamsungBrowser/i, // Samsung Browser
        /wv/i, // WebView
        /Version.*Chrome.*Mobile/i, // Chrome Mobile WebView
      ];

      const isInApp = inAppPatterns.some(pattern => pattern.test(userAgent));
      setIsInAppBrowser(isInApp);
    };

    detectInAppBrowser();
  }, []);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !useTestVideo) return;

    const handleLoadedData = () => {
      setVideoError(false);
    };

    const handleError = () => {
      console.warn('Video failed to load, falling back to image');
      setVideoError(true);
    };

    const handleCanPlay = () => {
      // Try to play the video
      video.play().catch((error) => {
        console.warn('Video autoplay failed:', error);
        setVideoError(true);
      });
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [useTestVideo, language, isMobileView]);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
  };

  const getVideoSource = () => {
    if (isMobileView) {
      return language === 'vi' ? kvVideoViMobile : kvVideoEnMobile;
    }
    return language === 'vi' ? kvVideoViDesktop : kvVideoEnDesktop;
  };

  return (
    <div
      className="min-h-screen bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundDesktop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      <div
        className={`relative ${
          useTestVideo
            ? `w-screen ${isMobileView ? 'pt-[calc(16/9*100%)]' : 'pt-[calc(9/16*100%)]'} overflow-hidden flex items-center justify-center`
            : ''
        } `}
      >
        {/* Conditional rendering based on videoVersion */}
        {useTestVideo && !videoError && !isInAppBrowser ? (
          /* Video Banner - Only show when video is supported and not in in-app browser */
          <video
            ref={videoRef}
            key={`${language}-${isMobileView ? 'mobile' : 'desktop'}`}
            className="w-full absolute top-0 left-0 right-0"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            webkit-playsinline="true"
            x5-playsinline="true"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="false"
            controls={false}
            disablePictureInPicture
            onError={() => setVideoError(true)}
          >
            <source src={getVideoSource()} type="video/mp4" />
            {/* Fallback image for browsers that don't support video */}
            <img
              src={language === 'vi' 
                ? (isMobileView ? kvBannerViMobile : kvBannerViDesktop)
                : (isMobileView ? kvBannerEnMobile : kvBannerEnDesktop)
              }
              alt="KV Banner"
              className="w-full h-full object-contain"
            />
          </video>
        ) : useTestVideo && isInAppBrowser ? (
          /* In-app browser fallback - Show image with play button overlay */
          <div className="relative w-full">
            <img
              src={language === 'vi' 
                ? (isMobileView ? kvBannerViMobile : kvBannerViDesktop)
                : (isMobileView ? kvBannerEnMobile : kvBannerEnDesktop)
              }
              alt="KV Banner"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
              <button
                onClick={() => {
                  // Try to play video when user clicks
                  if (videoRef.current) {
                    videoRef.current.play().catch(() => {
                      console.warn('Video play failed on user interaction');
                    });
                  }
                }}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-200"
                aria-label="Play video"
              >
                <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
            {/* Hidden video element for user interaction */}
            <video
              ref={videoRef}
              className="hidden"
              loop
              muted
              playsInline
              preload="metadata"
              webkit-playsinline="true"
              x5-playsinline="true"
              x5-video-player-type="h5"
              x5-video-player-fullscreen="false"
              controls={false}
              disablePictureInPicture
            >
              <source src={getVideoSource()} type="video/mp4" />
            </video>
          </div>
        ) : (
          /* Original Image Banner - Default behavior */
          <img
            src={
              language === 'vi'
                ? isMobileView
                  ? kvBannerViMobile
                  : kvBannerViDesktop
                : isMobileView
                ? kvBannerEnMobile
                : kvBannerEnDesktop
            }
            alt="KV Banner"
            className="w-full h-auto"
          />
        )}

        {/* Language Toggle */}
        <div className="absolute top-2 right-2 sm:top-2 sm:right-4 z-10">
          <LanguageToggle
            onLanguageChange={language => {
              // TODO: Implement language switching logic
              console.log('Language changed to:', language);
              handleLanguageChange(language);
            }}
          />
        </div>
      </div>

      {/* Content Container - Max width only for very large screens (2xl+) */}
      <div className={`2xl:max-w-[1200px] 2xl:mx-auto px-4 ${useTestVideo ? 'mt-[50px]' : ''}`}>
        <section>
          <Countdown
            targetDate={eventData.startDateTime}
            timezone={eventData.timezone}
            language={language}
          />
        </section>

        {/* Event Meta */}
        {/* <section className="py-4 md:py-8 text-center">
          <EventMeta />
        </section> */}

        <div>
          <img
            src={language === 'vi' ? eventInfoVi : eventInfoEn}
            alt="Event Info"
            className="w-full h-auto"
          />
        </div>

        {/* Venue Info */}
        {/* <section className="py-6 text-center">
          <div className="flex items-center justify-center gap-3 text-ozempic-teal mb-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">Thiskyhall Sala</span>
          </div>
          {!isMobileView ? (
            <p className="text-lg sm:text-xl text-ozempic-gray max-w-3xl mx-auto leading-relaxed font-medium italic">
              Tầng 5 - 10 Đ. Mai Chí Thọ, Phường An Khánh, Thủ Đức, Hồ Chí Minh
            </p>
          ) : (
            <p className="text-md text-ozempic-gray max-w-3xl mx-auto leading-relaxed font-medium italic">
              Tầng 5 - 10 Đ. Mai Chí Thọ <br /> Phường An Khánh, Thủ Đức, Hồ Chí Minh
            </p>
          )}
        </section> */}

        {/* Map Section */}
        <section className="py-2 sm:py-8">
          <MapCard venue={eventData.venue} />
        </section>

        {/* CTAs */}
        <section>
          <CTAGroup />
        </section>

        {/* Disclaimer */}
        {/* <section className="py-2 sm:py-6">
          <Disclaimer />
        </section> */}

        {/* QR Section */}
        {/* <section className="py-2 sm:py-8">
          <QRSection />
        </section> */}
      </div>

      {/* Footer spacing */}
      <div className="mb-8 lg:px-8 px-4">
        <img src={language === 'vi' ? footerVi : footerEn} alt="Footer" className="w-full h-auto" />
      </div>
    </div>
  );
}
