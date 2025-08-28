interface MapCardProps {
  venue: {
    name: string;
    address: string;
    googleMapsUrl: string;
  };
}

export function MapCard({ venue }: MapCardProps) {
  const handleMapClick = () => {
    window.open(venue.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-[775px] mx-auto px-4 sm:px-8">
      {/* Map container with rounded outline */}
      <div
        className="relative rounded-[28px] px-[30px] py-[16px] bg-white/20 ring-1 ring-white/60 backdrop-blur-[2px] cursor-pointer transition-transform hover:scale-[1.01]"
        onClick={handleMapClick}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMapClick();
          }
        }}
        aria-label={`Open ${venue.name} in Google Maps`}
      >
        <div className="relative bg-white rounded-[22px] overflow-hidden shadow-map-inner border border-white/70">
          {/* Real map (Google Maps embed) */}
          <div className="aspect-[715/420] relative">
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${venue.name} map`}
              src={`${venue.googleMapsUrl}${
                venue.googleMapsUrl.includes('?') ? '&' : '?'
              }output=embed`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
