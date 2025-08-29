import { HeaderLogos } from '@/components/HeaderLogos';
import { EventMeta } from '@/components/EventMeta';
import { MapCard } from '@/components/MapCard';
import { CTAGroup } from '@/components/CTAGroup';
import { Disclaimer } from '@/components/Disclaimer';
import { QRSection } from '@/components/QRSection';
import { eventData } from '@/content/event';
import backgroundDesktop from '@/assets/bg-desktop.png';
import { Countdown } from '@/components/Countdown';
import uspImage from '@/assets/usp-image.png';
import taglineImage from '@/assets/tagline-image.png';
import keyartImage from '@/assets/keyart-image.png';
import isMobile from 'is-mobile';

export function Landing() {
  const isMobileView = isMobile();

  return (
    <div
      className="min-h-screen bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundDesktop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      {!isMobileView && (
        <section className="relative overflow-hidden min-h-[680px] md:min-h-[720px] xl:min-h-[800px]">
          {/* Hero Content Container - Max width only for very large screens (2xl+) */}
          <div className="2xl:max-w-[1200px] 2xl:mx-auto flex flex-row relative pt-6 md:pt-8">
            {/* Hero Content Positioned in Left Side */}
            <div className="relative z-10 flex items-start flex-col start w-[50%] gap-16">
              {/* Header */}
              <HeaderLogos />
              <div
                className="w-full max-w-[600px] px-4 sm:px-8 lg:max-w-[650px]"
                style={{ paddingLeft: '64px' }}
              >
                {/* Hero Image - Left content from design */}
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={taglineImage}
                    alt={eventData.title}
                    className="w-full max-w-[520px] md:max-w-[640px] lg:max-w-[760px] xl:max-w-[860px] mb-[40px]"
                  />
                  <p className="text-ozempic-teal text-3xl  font-bold italic mb-[40px]">
                    Một tuần 1 lần - bảo vệ đa cơ thể
                  </p>
                  <img
                    src={uspImage}
                    alt={eventData.title}
                    className="w-full max-w-[520px] md:max-w-[640px] lg:max-w-[760px] xl:max-w-[860px]"
                  />
                </div>
              </div>
            </div>

            <div className="w-[50%]">
              <img
                src={keyartImage}
                alt={eventData.title}
                className="w-full max-w-[520px] md:max-w-[640px] lg:max-w-[760px] xl:max-w-[860px]"
              />
            </div>
          </div>
        </section>
      )}

      {isMobileView && (
        <>
          {/* Mobile Container with max-width only for very large screens */}
          <div className="2xl:max-w-[1200px] 2xl:mx-auto px-8">
            {/* Header - Always at top */}
            <HeaderLogos />

            {/* Hero Content - Responsive Layout */}
            <div className="relative mb-2">
              {/* Mobile: Stack content vertically, Desktop: Left positioned */}
              <div className="flex-1 flex flex-col justify-center items-center">
                {/* Hero Content */}
                <div className="flex flex-col items-center text-center w-full">
                  <img
                    src={taglineImage}
                    alt={eventData.title}
                    className="w-full sm:max-w-[400px] mb-6"
                  />
                  <p className="text-ozempic-teal text-lg sm:text-2xl font-bold italic mb-6">
                    1 LẦN/TUẦN - KIỂM SOÁT ĐA MỤC TIÊU
                  </p>
                  <img
                    src={uspImage}
                    alt={eventData.title}
                    className="w-full max-w-[300px] sm:max-w-[400px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <section
            className="relative overflow-hidden min-h-[550px] bg-no-repeat hero-bg-mobile md:hero-bg-desktop bg-cover"
            style={{
              backgroundImage: `url(${keyartImage})`,
            }}
          ></section>
        </>
      )}

      {/* Content Container - Max width only for very large screens (2xl+) */}
      <div className="2xl:max-w-[1200px] 2xl:mx-auto px-4">
        <section className="py-6 md:py-8">
          <Countdown targetDate={eventData.startDateTime} timezone={eventData.timezone} />
        </section>

        {/* Event Meta */}
        <section className="py-4 md:py-8 text-center">
          <EventMeta />
        </section>

        {/* Venue Info */}
        <section className="py-6 text-center">
          <div className="flex items-center justify-center gap-3 text-ozempic-teal mb-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">Thiskyhall Sala</span>
          </div>
          <p className="text-lg sm:text-xl text-ozempic-gray max-w-3xl mx-auto leading-relaxed font-medium italic">
            Tầng 5 - 10 Đ. Mai Chí Thọ, Phường An Khánh, Thủ Đức, Hồ Chí Minh
          </p>
        </section>

        {/* Map Section */}
        <section className="py-2 sm:py-8">
          <MapCard venue={eventData.venue} />
        </section>

        {/* CTAs */}
        <section className="py-2 sm:py-8">
          <CTAGroup labels={eventData.labels} rsvpUrl={eventData.rsvpUrl} />
        </section>

        {/* Disclaimer */}
        <section className="py-2 sm:py-6">
          <Disclaimer text={eventData.disclaimer} />
        </section>

        {/* QR Section */}
        <section className="py-2 sm:py-8">
          <QRSection qrCaption={eventData.qrCaption} />
        </section>
      </div>

      {/* Footer spacing */}
      <div className="h-8"></div>
    </div>
  );
}
