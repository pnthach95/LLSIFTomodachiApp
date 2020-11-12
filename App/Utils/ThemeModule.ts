import { NativeModules } from 'react-native';
const ThemeModule: ThemeModule = NativeModules.ThemeModule;
export default ThemeModule;

type ThemeModule = {
  setColor: (color: string) => void;
};
