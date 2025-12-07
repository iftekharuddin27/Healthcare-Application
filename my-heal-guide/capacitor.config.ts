import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.medico.app',
  appName: 'Medico',
  webDir: 'dist',
  backgroundColor: '#0e1115', // Dark background to prevent white flashes

  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0e1115',
      overlaysWebView: false,
    },
  },
};

export default config;