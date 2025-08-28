import novoNordiskLogo from '@/assets/novo-nordisk-logo.png';
import ozempicLogo from '@/assets/ozempic-logo.png';

export function HeaderLogos({ isMobile }: { isMobile?: boolean }) {
  return (
    <header className="flex items-center  gap-4 sm:gap-[3.75rem] px-4 pt-8 pb-8 sm:px-8 lg:px-16">
      <img
        src={novoNordiskLogo}
        alt="Novo Nordisk"
        className="h-10 sm:h-16 lg:h-18 w-auto"
        width={103}
        height={72}
      />
      <img
        src={ozempicLogo}
        alt="Ozempic"
        className="h-10 sm:h-16 lg:h-16 w-auto"
        width={211}
        height={64}
      />
    </header>
  );
}
