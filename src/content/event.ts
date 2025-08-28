export const eventData = {
  title: 'THE POWER OF LESS',
  subtitle: 'Một tuần 1 lần - bảo vệ đa cơ quan',

  // Event timing
  startDateTime: '2025-10-12T07:30:00+07:00', // Asia/Ho_Chi_Minh timezone
  endDateTime: '2025-10-12T09:30:00+07:00',
  timezone: 'Asia/Ho_Chi_Minh',

  // Venue
  venue: {
    name: 'Thiskyhall Sala',
    address: 'Tầng 5 - 10 D. Mai Chí Thọ, Phường An Khánh, Thủ Đức, Hồ Chí Minh',
    googleMapsUrl: 'https://maps.google.com/?q=Thiskyhall+Sala+Mai+Chi+Tho+Thu+Duc+Ho+Chi+Minh',
  },

  // CTAs
  rsvpUrl: 'mailto:ozempic-event@novonordisk.com?subject=RSVP - The Power of Less Event',

  // Features/USPs
  features: [
    {
      id: 'control-glucose',
      title: 'Kiểm soát',
      subtitle: 'Đường huyết',
      icon: 'feature-icon-1.png',
    },
    {
      id: 'control-cardiovascular',
      title: 'Kiểm soát',
      subtitle: 'Tim Mạch',
      icon: 'feature-icon-2.png',
    },
    {
      id: 'control-weight',
      title: 'Kiểm soát',
      subtitle: 'Cân Nặng',
      icon: 'feature-icon-2.png',
    },
  ],

  // Assets
  assets: {
    novoNordiskLogo: 'novo-nordisk-logo.png',
    ozempicLogo: 'ozempic-logo.png',
    mapImage: 'map-image.png',
    qrCode: 'qr-code.png',
    countdownBg: 'countdown-bg.png',
  },

  // Content
  disclaimer:
    '*Trang thông tin dành riêng cho nhân viên y tế. Vui lòng không chia sẻ, sao chép hoặc phát tán dưới bất kỳ hình thức nào.',
  qrCaption:
    'Quét QR code để xem thông tin kê toa đầy đủ của sản phẩm đã được Bộ Y Tế Việt Nam phê duyệt',

  // Button labels
  labels: {
    saveTheDate: 'SAVE THE DATE',
    confirmAttendance: 'XÁC NHẬN THAM DỰ',
  },
};
