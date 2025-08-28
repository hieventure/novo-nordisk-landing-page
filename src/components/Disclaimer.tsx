interface DisclaimerProps {
  text: string;
}

export function Disclaimer({ text }: DisclaimerProps) {
  return (
    <div className="text-center py-2 sm:py-6 px-4 sm:px-8">
      <p className="text-ozempic-disclaimer text-ozempic-gray max-w-3xl mx-auto leading-snug italic tracking-tighter">
        {text}
      </p>
    </div>
  );
}
