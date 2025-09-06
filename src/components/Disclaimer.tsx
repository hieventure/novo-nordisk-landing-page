import disclaimerText from '@/assets/disclaimer-text.png';

export function Disclaimer() {
  return (
    <div className="text-center py-2 sm:py-6 px-4 sm:px-8 flex justify-center">
      {/* <p className="text-ozempic-disclaimer text-ozempic-gray max-w-3xl mx-auto leading-snug italic tracking-tighter">
        {text}
      </p> */}
      <img src={disclaimerText} alt="Disclaimer text" className="w-full max-w-[480px]" />
    </div>
  );
}
