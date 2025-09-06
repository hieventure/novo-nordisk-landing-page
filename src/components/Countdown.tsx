import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string; // ISO string
  timezone: string;
  language: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ targetDate, language }: CountdownProps) {
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
        <p className="text-2xl font-bold text-ozempic-teal">
          {language === 'vi' ? 'Sự kiện đã bắt đầu!' : 'Event started!'}
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Countdown display */}
      <div className="flex justify-center items-center gap-3 sm:gap-6 md:gap-8 lg:gap-12 px-4">
        <TimeUnit value={timeLeft.days} label={language === 'vi' ? 'NGÀY' : 'DAYS'} />
        <TimeUnit value={timeLeft.hours} label={language === 'vi' ? 'GIỜ' : 'HOURS'} />
        <TimeUnit value={timeLeft.minutes} label={language === 'vi' ? 'PHÚT' : 'MINUTES'} />
        <TimeUnit value={timeLeft.seconds} label={language === 'vi' ? 'GIÂY' : 'SECONDS'} />
      </div>
    </div>
  );
}

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  // Static partial circle - about 75% completion like in the reference image
  const circumference = Math.PI * 2 * 50;
  const gapLength = circumference * 0.25; // 25% gap
  const strokeLength = circumference * 0.75; // 75% stroke

  return (
    <div className="flex flex-col items-center">
      {/* Circular progress ring - responsive sizing */}
      <div className="relative mb-2 sm:mb-4">
        <svg
          width="80"
          height="80"
          viewBox="0 0 120 120"
          className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[180px] md:h-[180px] transform -rotate-90"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5DCC8" />
              <stop offset="30%" stopColor="#F4B17A" />
              <stop offset="70%" stopColor="#EC9C1A" />
              <stop offset="100%" stopColor="#DD2C34" />
            </linearGradient>
          </defs>

          {/* Center background circle */}
          <circle cx="60" cy="60" r="44" fill="#F5F5F5" />

          {/* Uniform background ring - single color */}
          <circle cx="60" cy="60" r="50" fill="none" stroke="#E8D5C4" strokeWidth="12" />

          {/* Colored partial ring - static 75% */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={`url(#gradient-${label})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${strokeLength} ${gapLength}`}
            strokeDashoffset="0"
          />
        </svg>

        {/* Center number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-black"
            style={{ color: '#DD2C34' }}
          >
            {value.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Label */}
      <span className="text-xs sm:text-sm md:text-base font-bold text-ozempic-teal uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
