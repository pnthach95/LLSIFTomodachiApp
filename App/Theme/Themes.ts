/* eslint-disable @typescript-eslint/no-namespace */
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import merge from 'deepmerge';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      card: string;
      border: string;
    }
  }
}

export const Light = merge(DefaultTheme, PaperDefaultTheme);
export const Dark = merge(DarkTheme, PaperDarkTheme);
