interface HeroTitleProps {
  title: string;
  subtitle: string;
}

export function HeroTitle({ subtitle }: HeroTitleProps) {
  return (
    <div className="text-left">
      {/* Main title */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tight leading-none">
        <div className="text-gradient-orange mb-2">THE POWER</div>
        <div>
          <span className="text-black">OF</span> <span className="text-gradient-red">LESS</span>
        </div>
      </h1>

      {/* Subtitle */}
      <p className="text-xl sm:text-2xl font-bold text-ozempic-teal max-w-lg">{subtitle}</p>
    </div>
  );
}
