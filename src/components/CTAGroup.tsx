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

      if (isIOS) {
        // iOS: Try multiple deep links to escape in-app browser
        const iosDeepLinks = [
          // Method 1: Safari web search deep link
          `x-web-search://?${encodeURIComponent(currentUrl)}`,

          // Method 2: Safari HTTPS scheme
          `x-safari-https://${currentUrl.replace(/^https?:\/\//, '')}`,

          // Method 3: Safari HTTP scheme
          `x-safari-http://${currentUrl.replace(/^https?:\/\//, '')}`,

          // Method 4: FBrowser (designed for escaping in-app browsers)
          `fbrowser://open?url=${encodeURIComponent(currentUrl)}`,

          // Method 5: Opener app deep link
          `opener://open?url=${encodeURIComponent(currentUrl)}`,

          // Method 6: iOS Shortcuts
          `shortcuts://run-shortcut?name=Open%20in%20Safari&input=${encodeURIComponent(
            currentUrl
          )}`,

          // Method 7: Chrome iOS
          `googlechrome://x-callback-url/open/?url=${encodeURIComponent(
            currentUrl
          )}&x-success=googlechrome://`,

          // Method 8: Firefox iOS
          `firefox://open-url?url=${encodeURIComponent(currentUrl)}`,

          // Method 9: Edge iOS
          `microsoft-edge-https://${currentUrl.replace(/^https?:\/\//, '')}`,

          // Method 10: Opera iOS
          `opera-https://${currentUrl.replace(/^https?:\/\//, '')}`,
        ];

        console.log('🚀 Trying iOS deep links to escape in-app browser...');

        // Try each deep link with delay
        iosDeepLinks.forEach((deepLink, index) => {
          setTimeout(() => {
            try {
              console.log(`📱 Trying iOS method ${index + 1}: ${deepLink.split('://')[0]}`);
              window.location.href = deepLink;
            } catch (error) {
              console.log(`❌ iOS method ${index + 1} failed:`, error);
            }
          }, index * 300); // 300ms delay between attempts
        });

        // Add Smart App Banner for Safari (Method 11)
        try {
          const existingBanner = document.querySelector('meta[name="apple-itunes-app"]');
          if (!existingBanner) {
            const smartBanner = document.createElement('meta');
            smartBanner.name = 'apple-itunes-app';
            smartBanner.content = `app-id=1146562112, app-argument=${encodeURIComponent(
              currentUrl
            )}`;
            document.head.appendChild(smartBanner);
            console.log('📱 Added Smart App Banner for Safari');
          }
        } catch (error) {
          console.log('❌ Smart App Banner failed:', error);
        }

        // Fallback: Copy to clipboard and show instructions (Method 12)
        setTimeout(() => {
          try {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(currentUrl).then(() => {
                alert(
                  `🔗 Link copied to clipboard!\n\nTo open in Safari:\n1. Open Safari app\n2. Paste the link in address bar\n3. Press Go\n\nOr try long-pressing any link on this page and select "Open in Safari"`
                );
              });
            } else {
              alert(
                `🔗 To open in Safari:\n\nCopy this link: ${currentUrl}\n\n1. Open Safari app\n2. Paste the link\n3. Press Go\n\nOr try long-pressing any link and select "Open in Safari"`
              );
            }
          } catch (error) {
            console.log('❌ Clipboard fallback failed:', error);
          }
        }, 3000); // Show after all deep links are tried
      } else if (isAndroid) {
        // Android: Intent URLs and browser deep links
        const cleanUrl = currentUrl.replace(/^https?:\/\//, '');

        const androidMethods = [
          // Method 1: Intent with explicit chooser
          `intent://${cleanUrl}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;S.android.intent.extra.chooser_title=Choose%20Browser;end`,

          // Method 2: Standard browser intent
          `intent://${cleanUrl}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`,

          // Method 3: Chrome Android
          `googlechrome://navigate?url=${encodeURIComponent(currentUrl)}`,

          // Method 4: Firefox Android
          `firefox://open-url?url=${encodeURIComponent(currentUrl)}`,

          // Method 5: Opera Android
          `opera://command/goto?url=${encodeURIComponent(currentUrl)}`,

          // Method 6: Samsung Internet
          `samsungbrowser://open?url=${encodeURIComponent(currentUrl)}`,

          // Method 7: Edge Android
          `microsoft-edge://open?url=${encodeURIComponent(currentUrl)}`,
        ];

        console.log('🚀 Trying Android methods to open in external browser...');

        androidMethods.forEach((method, index) => {
          setTimeout(() => {
            try {
              console.log(`🤖 Trying Android method ${index + 1}`);
              if (index === 0) {
                window.location.assign(method);
              } else {
                window.location.href = method;
              }
            } catch (error) {
              console.log(`❌ Android method ${index + 1} failed:`, error);
            }
          }, index * 400);
        });
      } else {
        // Desktop: Standard window.open
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
