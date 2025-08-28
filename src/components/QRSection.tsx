import qrCode from '@/assets/qr-code.png';

interface QRSectionProps {
  qrCaption: string;
}

export function QRSection({ qrCaption }: QRSectionProps) {
  return (
    <div className="text-center">
      {/* QR Code */}
      <div className="inline-block p-4 rounded-2xl ">
        <img
          src={qrCode}
          alt="QR code for product information"
          className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64"
          width={246}
          height={246}
        />
      </div>

      {/* Caption */}
      <p className="text-ozempic-qr text-ozempic-dark max-w-md mx-auto leading-relaxed max-w-[250px] font-bold text-sm">
        {qrCaption}
      </p>
    </div>
  );
}
