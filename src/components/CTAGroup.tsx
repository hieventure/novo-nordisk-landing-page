import { downloadICS, generateICS } from '@/lib/ics';
import { eventData } from '@/content/event';
interface CTAGroupProps {
  labels: {
    saveTheDate: string;
    confirmAttendance: string;
  };
  rsvpUrl?: string;
}

export function CTAGroup({ labels }: CTAGroupProps) {
  const formatGoogleDate = (isoString: string) => {
    // Returns YYYYMMDDTHHMMSSZ in UTC as required by Google Calendar template
    const d = new Date(isoString);
    const pad = (n: number) => String(n).padStart(2, '0');
    const yyyy = d.getUTCFullYear();
    const mm = pad(d.getUTCMonth() + 1);
    const dd = pad(d.getUTCDate());
    const hh = pad(d.getUTCHours());
    const mi = pad(d.getUTCMinutes());
    const ss = pad(d.getUTCSeconds());
    return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
  };

  const handleSaveTheDate = () => {
    // Platform detection
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && (navigator as any).maxTouchPoints > 1);
    const isMacOS = /Macintosh/.test(ua) && !(navigator as any).maxTouchPoints; // desktop mac
    const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);

    // In-app browser detection
    const isFacebookBrowser = /FBAN|FBAV|FB_IAB/.test(ua);
    const isInAppBrowser = isFacebookBrowser || /Instagram|WhatsApp|Line|WeChat|TikTok/.test(ua);

    // Event data used for both flows
    const start = formatGoogleDate(eventData.startDateTime);
    const end = formatGoogleDate(eventData.endDateTime);
    const title = eventData.title;
    const details = eventData.subtitle;
    const location = `${eventData.venue.name}, ${eventData.venue.address}`;

    const openGoogle = () => {
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        details,
        location,
        dates: `${start}/${end}`,
      });
      const googleUrl = `https://calendar.google.com/calendar/render?${params.toString()}`;
      const win = window.open(googleUrl, '_blank', 'noopener,noreferrer');
      return !!win;
    };

    const handleInAppBrowser = () => {
      const ua = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(ua);
      // const isAndroid = /Android/.test(ua);

      // Show user-friendly platform-specific message
      const platformMessage = isIOS
        ? "Tap 'Open in Safari' or 'Open in...' to continue"
        : 'Select your preferred browser to continue';

      const instructions = `To add this event to your calendar:\n\n1. ${platformMessage}\n2. Return to this page\n3. Tap "Save the Date" again\n\nEvent Details:\n📅 ${title}\n📍 ${location}\n🕰️ October 12, 2025 at 7:30 AM (Vietnam time)`;

      if (confirm(instructions + '\n\nOpen in browser now?')) {
        triggerNativeBrowserPopup();
      }
    };

    const triggerNativeBrowserPopup = () => {
      const currentUrl = window.location.href;
      const ua = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(ua);
      const isAndroid = /Android/.test(ua);

      if (isAndroid) {
        // ANDROID: Most aggressive approach that actually works
        const domain = window.location.hostname;
        const cleanUrl = currentUrl.replace(/^https?:\/\//, '');

        // Method 1: Direct intent with BROWSABLE category (forces external)
        const primaryIntent = `intent://${cleanUrl}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;component=com.android.browser/.BrowserActivity;end`;

        // Method 2: Market intent to force app chooser
        const marketIntent = `market://search?q=${encodeURIComponent(domain)}`;

        // Method 3: Generic browser intent
        const browserIntent = `intent://${cleanUrl}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;S.android.intent.extra.REFERRER=android-app://com.android.browser;end`;

        try {
          // Primary: Force immediate navigation (most aggressive)
          window.location.assign(primaryIntent);

          // Backup: Try after short delay
          setTimeout(() => {
            try {
              window.top.location.href = browserIntent;
            } catch (e) {
              // Try parent frame
              try {
                window.parent.location.href = marketIntent;
              } catch (e2) {
                // Last resort: Create new window with intent
                const newWindow = window.open('', '_blank');
                if (newWindow) {
                  newWindow.location.href = primaryIntent;
                  newWindow.close();
                }
              }
            }
          }, 300);
        } catch (error) {
          console.log('Android primary intent failed:', error);

          // Emergency fallback: Force page navigation with market
          setTimeout(() => {
            window.location.href = marketIntent;
          }, 600);
        }
      } else if (isIOS) {
        // IOS: Most aggressive approach that actually works

        // Method 1: Universal link with custom protocol
        const universalLink = `https://www.google.com/url?q=${encodeURIComponent(currentUrl)}`;

        // Method 2: Smart App Banner simulation
        const smartBannerUrl = `itms-apps://itunes.apple.com/app/safari/id1146562112?mt=8&url=${encodeURIComponent(
          currentUrl
        )}`;

        // Method 3: Direct scheme attempts
        const schemes = [
          `googlechrome://x-callback-url/open/?url=${encodeURIComponent(
            currentUrl
          )}&x-success=googlechrome://`,
          `firefox://open-url?url=${encodeURIComponent(currentUrl)}`,
          `opera-touch://open?url=${encodeURIComponent(currentUrl)}`,
          `safari-${currentUrl}`,
        ];

        try {
          // Primary: Force navigation with top frame
          window.top.location.href = universalLink;

          // Backup: Try schemes with delays
          schemes.forEach((scheme, index) => {
            setTimeout(() => {
              try {
                if (index === 0) {
                  window.location.assign(scheme);
                } else {
                  window.location.replace(scheme);
                }
              } catch (e) {
                console.log(`iOS scheme ${index} failed:`, e);

                // Final attempt: Smart App Banner
                if (index === schemes.length - 1) {
                  window.location.href = smartBannerUrl;
                }
              }
            }, index * 400);
          });
        } catch (error) {
          console.log('iOS primary method failed:', error);

          // Emergency: Force App Store link
          setTimeout(() => {
            window.location.href = smartBannerUrl;
          }, 1500);
        }
      } else {
        // Desktop fallback
        window.open(currentUrl, '_blank', 'noopener,noreferrer');
      }
    };

    const downloadAppleICS = () => {
      const event = {
        title,
        description: details,
        location,
        startDateTime: eventData.startDateTime,
        endDateTime: eventData.endDateTime,
      };

      // For iOS Safari, try multiple approaches
      if (isIOS && isSafari) {
        try {
          // Method 1: Try webcal:// URL for iOS
          const icsContent = generateICS(event);
          const blob = new Blob([icsContent], { type: 'text/calendar' });
          const url = URL.createObjectURL(blob);

          // Create a temporary link element
          const link = document.createElement('a');
          link.href = url;
          link.download = 'ozempic-event.ics';
          link.target = '_blank';
          link.rel = 'noopener';

          // Trigger click
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Clean up
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (error) {
          console.log('iOS calendar method failed, trying Google Calendar fallback');
          // Fallback to Google Calendar
          const opened = openGoogle();
          if (!opened) {
            alert(
              'Please manually add this event to your calendar:\n\nTitle: ' +
                title +
                '\nDate: October 12, 2025 at 7:30 AM\nLocation: ' +
                location
            );
          }
        }
      } else {
        downloadICS(event, 'ozempic-the-power-of-less.ics');
      }
    };

    // Handle in-app browsers first (they have limited functionality)
    if (isInAppBrowser) {
      handleInAppBrowser();
      return;
    }

    if (isIOS) {
      // iOS - Use native calendar directly (better user experience)
      downloadAppleICS();
    } else if (isMacOS) {
      // macOS - Use ICS download
      downloadAppleICS();
    } else {
      // Other platforms -> prefer Google Calendar; fallback to ICS if blocked
      const opened = openGoogle();
      if (!opened) downloadAppleICS();
    }
  };

  // const handleConfirmAttendance = () => {
  //   window.open(rsvpUrl, '_blank', 'noopener,noreferrer');
  // };

  return (
    <div className="flex flex-row justify-center items-center gap-2 sm:gap-6 px-0 md:py-8 py-4">
      {/* Save the Date CTA */}
      <button
        onClick={handleSaveTheDate}
        className="group relative bg-cta-gradient text-white font-extrabold text-xs sm:text-xl lg:text-ozempic-cta px-4 sm:px-8 py-4 sm:px-12 sm:py-5 rounded-full shadow-cta-inner border border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gradient-orange/50 min-w-[120px] sm:min-w-[320px] w-[50%]"
        aria-label="Download calendar event for The Power of Less"
      >
        {labels.saveTheDate}
      </button>

      {/* Confirm Attendance CTA */}
      {/* <button
        onClick={handleConfirmAttendance}
        className="group relative bg-cta-gradient text-white font-bold text-xs sm:text-xl lg:text-ozempic-cta px-4 sm:px-8 py-4 sm:px-12 sm:py-5 rounded-full shadow-cta-inner border border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gradient-red/50 min-w-[120px] sm:min-w-[320px] uppercase w-[50%]"
        aria-label="Confirm attendance for The Power of Less event"
      >
        {labels.confirmAttendance}
      </button> */}
    </div>
  );
}
