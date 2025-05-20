import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.label_uploader.app',
  appName: 'label-upload-ui',
  webDir: 'build',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    "SplashScreen": {
      "launchShowDuration": 1000,
      "launchAutoHide": true,
      "backgroundColor": "#650808",
      "androidSplashResourceName": "splash",
      "iosSplashResourceName": "Default"
    }
  }
};

export default config;
