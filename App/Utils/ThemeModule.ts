import { NativeModules, Platform } from 'react-native';
const ThemeModule: ThemeModule = NativeModules.ThemeModule;

type ThemeModule = {
  setColor: (color: string) => void;
};

const setColor = (color: string): void => {
  if (Platform.OS === 'android') {
    ThemeModule.setColor(color);
  }
};

export default { setColor };
