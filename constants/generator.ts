import { QrCode, Wifi, Image, Camera } from 'lucide-react';

export const MEDIA_ROUTES = {
  QR_CODE_GENERATOR: '/qr-code-generator',
  WIFI_QR_CODE_GENERATOR: '/wifi-qr-code-generator',
  SVG_PLACEHOLDER_GENERATOR: '/svg-placeholder-generator',
  CAMERA_RECORDER: '/camera-recorder',
};

export const mediaNavigationConfig = {
  titleKey: 'media',
  url: '#',
  icon: Image,
  items: [
    {
      titleKey: 'qrCodeGenerator',
      url: MEDIA_ROUTES.QR_CODE_GENERATOR,
      icon: QrCode,
    },
    {
      titleKey: 'wifiQrCodeGenerator',
      url: MEDIA_ROUTES.WIFI_QR_CODE_GENERATOR,
      icon: Wifi,
    },
    {
      titleKey: 'svgPlaceholderGenerator',
      url: MEDIA_ROUTES.SVG_PLACEHOLDER_GENERATOR,
      icon: Image,
    },
    {
      titleKey: 'cameraRecorder',
      url: MEDIA_ROUTES.CAMERA_RECORDER,
      icon: Camera,
    },
  ],
};
