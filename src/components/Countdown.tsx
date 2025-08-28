import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string; // ISO string
  timezone: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className="text-center py-8">
        <p className="text-2xl font-bold text-ozempic-teal">Sự kiện đã bắt đầu!</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Countdown display */}
      <div className="flex justify-center items-center gap-6 sm:gap-8 lg:gap-12">
        <TimeUnit value={timeLeft.days} label="NGÀY" />
        <TimeUnit value={timeLeft.hours} label="GIỜ" />
        <TimeUnit value={timeLeft.minutes} label="PHÚT" />
        <TimeUnit value={timeLeft.seconds} label="GIÂY" />
      </div>
    </div>
  );
}

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Number circle with gradient border */}
      <div className="relative mb-3">
        {/* Gradient border */}
        <div className="w-[160px] h-[160px] rounded-full bg-gradient-to-r from-gradient-orange to-gradient-red p-1">
          {/* Inner white circle */}
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gradient-red">
              {value.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Label */}
      <span className="text-sm sm:text-base font-bold text-ozempic-teal uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
