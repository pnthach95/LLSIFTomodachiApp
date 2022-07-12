import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {
  Colors,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      card: string;
      border: string;
    }
  }
}
export const Light = {
  ...DefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...PaperDefaultTheme.colors,
  },
};
export const Dark = {
  ...DarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...PaperDarkTheme.colors,
    surface: Colors.grey800,
  },
};
