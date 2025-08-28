import { downloadICS } from '@/lib/ics';
import { eventData } from '@/content/event';

interface CTAGroupProps {
  labels: {
    saveTheDate: string;
    confirmAttendance: string;
  };
  rsvpUrl: string;
}

export function CTAGroup({ labels, rsvpUrl }: CTAGroupProps) {
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
    const isApple = isIOS || isMacOS;

    // Event data used for both flows
    const start = formatGoogleDate(eventData.startDateTime);
    const end = formatGoogleDate(eventData.endDateTime);
    const title = `${eventData.title} - Ozempic Event`;
    const details = `${eventData.subtitle}\n\n${eventData.venue.name}\n${eventData.venue.address}`;
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

    const downloadAppleICS = () => {
      const event = {
        title,
        description: `\n${details}`,
        location,
        startDateTime: eventData.startDateTime,
        endDateTime: eventData.endDateTime,
      };
      downloadICS(event, 'ozempic-the-power-of-less.ics');
    };

    if (isApple) {
      // Apple Calendar (iOS/macOS) -> use ICS
      downloadAppleICS();
    } else {
      // Other platforms -> prefer Google Calendar; fallback to ICS if blocked
      const opened = openGoogle();
      if (!opened) downloadAppleICS();
    }
  };

  const handleConfirmAttendance = () => {
    window.open(rsvpUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 px-4 sm:px-8 py-8">
      {/* Save the Date CTA */}
      <button
        onClick={handleSaveTheDate}
        className="group relative bg-cta-gradient text-white font-extrabold text-lg sm:text-xl lg:text-ozempic-cta px-8 py-4 sm:px-12 sm:py-5 rounded-full shadow-cta-inner border border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gradient-orange/50 min-w-[280px] sm:min-w-[320px]"
        aria-label="Download calendar event for The Power of Less"
      >
        {labels.saveTheDate}
      </button>

      {/* Confirm Attendance CTA */}
      <button
        onClick={handleConfirmAttendance}
        className="group relative bg-cta-gradient text-white font-bold text-lg sm:text-xl lg:text-ozempic-cta px-8 py-4 sm:px-12 sm:py-5 rounded-full shadow-cta-inner border border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gradient-red/50 min-w-[280px] sm:min-w-[320px] uppercase"
        aria-label="Confirm attendance for The Power of Less event"
      >
        {labels.confirmAttendance}
      </button>
    </div>
  );
}
