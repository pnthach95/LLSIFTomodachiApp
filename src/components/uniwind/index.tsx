import {MaterialDesignIcons as OMaterialDesignIcons} from '@react-native-vector-icons/material-design-icons';
import {MaterialIcons as OMaterialIcons} from '@react-native-vector-icons/material-icons';
import {BlurView as OBlurView} from '@sbaiahmed1/react-native-blur';
import {KeyboardAwareScrollView as OGKeyboardAwareScrollView} from 'react-native-keyboard-controller';
import Animated from 'react-native-reanimated';
import {SafeAreaView as OSafeAreaView} from 'react-native-safe-area-context';
import OTurboImage from 'react-native-turbo-image';
import {withUniwind} from 'uniwind';

export const SafeAreaView = withUniwind(OSafeAreaView);
export const KeyboardAwareScrollView = withUniwind(OGKeyboardAwareScrollView);
const CMaterialDesignIcons = withUniwind(OMaterialDesignIcons);
const CMaterialIcons = withUniwind(OMaterialIcons);

export const MaterialDesignIcons = (
  props: React.ComponentProps<typeof CMaterialDesignIcons>,
) => (
  <CMaterialDesignIcons
    colorClassName="accent-foreground"
    size={24}
    {...props}
  />
);

export const MaterialIcons = (
  props: React.ComponentProps<typeof CMaterialIcons>,
) => <CMaterialIcons colorClassName="accent-foreground" size={24} {...props} />;

export const TurboImage = withUniwind(OTurboImage);

export const AnimatedTurboImage = Animated.createAnimatedComponent(TurboImage);

export const BlurView = withUniwind(OBlurView);
