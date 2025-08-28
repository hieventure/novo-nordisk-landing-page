export function EventMeta() {
  return (
    <div className="text-center py-2 sm:py-8 sm:px-4 px-2">
      <div className="inline-flex items-center justify-center gap-3 sm:gap-6 text-md sm:text-5xl lg:text-5xl font-black leading-none">
        {/* Time */}
        <span className="text-gradient-red">07:30 AM</span>

        {/* Separator */}
        <span className="text-gradient-red">|</span>

        {/* Day */}
        <span className="text-gradient-red uppercase">CHỦ NHẬT</span>

        {/* Separator */}
        <span className="text-gradient-red">|</span>

        {/* Date */}
        <span className="text-gradient-red">12.10.2025</span>
      </div>
    </div>
  );
}
