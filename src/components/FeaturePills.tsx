import featureIcon1 from '@/assets/feature-icon-1.png';
import featureIcon2 from '@/assets/feature-icon-2.png';

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

interface FeaturePillsProps {
  features: Feature[];
}

export function FeaturePills({ features }: FeaturePillsProps) {
  const getIconSrc = (iconName: string) => {
    switch (iconName) {
      case 'feature-icon-1.png':
        return featureIcon1;
      case 'feature-icon-2.png':
      default:
        return featureIcon2;
    }
  };

  return (
    <div className="flex flex-row gap-3 sm:gap-4">
      {features.map(feature => (
        <div
          key={feature.id}
          className="flex flex-row items-center bg-gradient-orange rounded-full px-4 py-2 sm:px-5 sm:py-3 shadow-lg"
        >
          {/* Icon */}
          <div className="w-6 h-6 sm:w-8 sm:h-8 mr-2 flex items-center justify-center bg-white rounded-full">
            <img
              src={getIconSrc(feature.icon)}
              alt={`${feature.title} ${feature.subtitle}`}
              className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
            />
          </div>

          {/* Text */}
          <div className="text-white text-left">
            <div className="text-xs sm:text-sm font-bold leading-tight">{feature.title}</div>
            <div className="text-xs sm:text-sm font-bold leading-tight">{feature.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
