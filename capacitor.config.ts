import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.label_uploader.app',
  appName: 'label-upload-ui',
  webDir: 'build',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  }
};

export default config;
