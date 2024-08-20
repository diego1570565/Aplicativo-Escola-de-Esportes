import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'AplicativoEE',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    "cleartext": true,
    "allowNavigation": [
      "http://*",
      "https://*"
    ]
  }
};

export default config;
