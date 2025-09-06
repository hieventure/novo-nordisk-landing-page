import qrCode from '@/assets/qr-code.png';
import qrCodeCaption from '@/assets/qr-code-caption.png';

export function QRSection() {
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
      {/* <p className="text-ozempic-qr text-ozempic-dark max-w-md mx-auto leading-relaxed max-w-[250px] font-bold text-sm px-6">
        {qrCaption}
      </p> */}
      <div className="flex justify-center">
        <img src={qrCodeCaption} alt="QR code caption" className="w-full max-w-[190px]" />
      </div>
    </div>
  );
}
