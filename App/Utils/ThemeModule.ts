import { NativeModules, Platform } from 'react-native';
const ThemeModule: ThemeModule = NativeModules.ThemeModule;

const setColor = (color: string): void => {
  if (Platform.OS === 'android') {
    ThemeModule.setColor(color);
  }
};

export default { setColor };

type ThemeModule = {
  setColor: (color: string) => void;
};
