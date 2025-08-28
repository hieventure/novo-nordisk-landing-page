# Ozempic "The Power of Less" Event Landing Page

A production-ready React landing page for Novo Nordisk's Ozempic event, converted from Figma design with pixel-perfect accuracy.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Countdown**: Live countdown to event with Asia/Ho_Chi_Minh timezone
- **Interactive CTAs**:
  - Save the Date (downloads .ics calendar file)
  - Confirm Attendance (opens RSVP link)
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Modern Stack**: React 18 + Vite + TypeScript + Tailwind CSS
- **Performance Optimized**: Fast loading with optimized assets

## 🎯 Event Details

- **Title**: THE POWER OF LESS
- **Date**: October 12, 2025
- **Time**: 07:30 AM (Asia/Ho_Chi_Minh timezone)
- **Venue**: Thiskyhall Sala, Ho Chi Minh City

## 🛠️ Development

### Prerequisites

- Node.js 20.19+ or 22.12+
- pnpm (recommended) or npm

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── HeaderLogos.tsx
│   ├── HeroTitle.tsx
│   ├── GradientRing.tsx
│   ├── FeaturePills.tsx
│   ├── Countdown.tsx
│   ├── EventMeta.tsx
│   ├── MapCard.tsx
│   ├── CTAGroup.tsx
│   ├── Disclaimer.tsx
│   └── QRSection.tsx
├── pages/              # Page-level components
│   └── Landing.tsx
├── lib/                # Utilities
│   └── ics.ts
├── content/            # Static content data
│   └── event.ts
└── assets/             # Images and media
```

## 🎨 Design System

The project uses a custom Tailwind theme based on the Figma design tokens:

### Colors

- **Ozempic Teal**: `#006373`
- **Gradient Orange**: `#EC9C1A`
- **Gradient Red**: `#DD2C34`
- **Light Gray**: `#E5E5E5`
- **Dark Text**: `#333333`

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 700, 800

## 📱 Components

### Core Components

1. **HeaderLogos**: Novo Nordisk and Ozempic brand logos
2. **HeroTitle**: Main event title with gradient text effects
3. **GradientRing**: Animated hero background element
4. **FeaturePills**: Three key benefits (Glucose, Cardiovascular, Weight control)
5. **Countdown**: Real-time countdown with timezone awareness
6. **EventMeta**: Event date, time, and day display
7. **MapCard**: Interactive venue map with Google Maps integration
8. **CTAGroup**: Action buttons for calendar download and RSVP
9. **QRSection**: QR code for product information
10. **Disclaimer**: Medical disclaimer text

### Functionality

- **Calendar Integration**: Generates RFC-compliant .ics files
- **Map Integration**: Opens venue location in Google Maps
- **Timezone Handling**: Proper handling of Asia/Ho_Chi_Minh timezone
- **Responsive Images**: Optimized loading and display
- **Accessibility**: Screen reader friendly with proper semantic markup

## 🎯 Customization

### Event Data

Update event details in `src/content/event.ts`:

```typescript
export const eventData = {
  title: 'THE POWER OF LESS',
  startDateTime: '2025-10-12T07:30:00+07:00',
  venue: {
    name: 'Thiskyhall Sala',
    address: '...',
    googleMapsUrl: '...',
  },
  rsvpUrl: 'mailto:...',
  // ... more configuration
};
```

### Styling

Customize the design system in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'ozempic-teal': '#006373',
      // ... more colors
    }
  }
}
```

## 🚀 Deployment

The project is optimized for deployment on modern platforms:

### Netlify

```bash
pnpm build
# Deploy the dist/ folder
```

### Vercel

```bash
pnpm build
# Deploy with Vercel CLI or GitHub integration
```

### Other Platforms

The build outputs standard static files that can be deployed anywhere.

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: ~200KB gzipped

## 🧪 Testing

Run the test suite:

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e
```

## 📄 License

This project is developed for Novo Nordisk. All rights reserved.

## 🤝 Contributing

This is an internal project. For questions or improvements, contact the development team.

---

**Note**: This landing page is designed specifically for healthcare professionals. The content and information should not be shared outside the intended audience.
