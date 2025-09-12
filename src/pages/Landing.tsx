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

import { useState, useEffect } from 'react';

export function Landing() {
  const isMobileView = isMobile();

  const [language, setLanguage] = useState('vi');
  const [videoVersion, setVideoVersion] = useState(0); // 0 = no video, 1 = version 1, 2 = version 2

  // Check for query parameter on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const testVideo = urlParams.get('testVideo');

    if (testVideo === '1') {
      setVideoVersion(1);
    } else if (testVideo === '2') {
      setVideoVersion(2);
    } else {
      setVideoVersion(0);
    }
  }, []);

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
          videoVersion > 0
            ? 'w-screen h-screen overflow-hidden flex items-center justify-center'
            : ''
        } `}
      >
        {/* Conditional rendering based on videoVersion */}
        {videoVersion > 0 ? (
          /* Video Banner - Only show for Vietnamese language when videoVersion > 0 */
          <video
            className="w-full h-full object-fill"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={getVideoSource()} type="video/mp4" />
            {/* Fallback image for browsers that don't support video */}
            <img
              src={isMobileView ? kvBannerViMobile : kvBannerViDesktop}
              alt="KV Banner"
              className="w-full h-full object-contain"
            />
          </video>
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
      <div className={`2xl:max-w-[1200px] 2xl:mx-auto px-4 ${videoVersion > 0 ? 'mt-[60px]' : ''}`}>
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
