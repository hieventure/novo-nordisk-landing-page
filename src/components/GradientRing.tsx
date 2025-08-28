export function GradientRing() {
  return (
    <div className="absolute right-0 top-0 w-[120%] h-[120%] -translate-y-[10%] translate-x-[20%] pointer-events-none overflow-hidden">
      {/* Main gradient circle - much larger to match design */}
      <div className="relative w-full h-full">
        {/* Outer red gradient */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gradient-red via-gradient-red/90 to-gradient-red/70"></div>

        {/* Middle orange gradient */}
        <div className="absolute inset-[5%] rounded-full bg-gradient-to-br from-gradient-orange via-gradient-orange/90 to-yellow-400"></div>

        {/* Inner yellow/white gradient */}
        <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-yellow-300 via-yellow-200 to-white/80"></div>

        {/* Center white area with subtle gradient */}
        <div className="absolute inset-[25%] rounded-full bg-gradient-to-br from-white/90 to-white/60"></div>

        {/* Clock elements positioned in the ring */}
        <div className="absolute top-[35%] right-[15%] w-8 h-8">
          <div className="w-full h-full bg-white/30 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-[25%] right-[20%] w-6 h-6">
          <div className="w-full h-full bg-yellow-200/50 rounded-full animate-pulse delay-500"></div>
        </div>
        <div className="absolute top-[20%] right-[30%] w-4 h-4">
          <div className="w-full h-full bg-gradient-orange/40 rounded-full animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  );
}
