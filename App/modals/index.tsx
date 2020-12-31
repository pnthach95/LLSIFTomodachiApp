import { Easing } from 'react-native';
import { createModalStack } from 'react-native-modalfy';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import FlatListModal from './flatlist';

import type { ModalStackConfig } from 'react-native-modalfy';
import type { ModalStackParamList } from '~/typings';

const modalConfig: ModalStackConfig = {
  list: {
    modal: FlatListModal,
    position: 'bottom',
    animateInConfig: {
      easing: Easing.bezier(0.42, -0.03, 0.27, 0.95),
      duration: 450,
    },
    animateOutConfig: {
      easing: Easing.bezier(0.42, -0.03, 0.27, 0.95),
      duration: 450,
    },
    transitionOptions: (animatedValue) => ({
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [
              responsiveScreenHeight(100),
              0,
              responsiveScreenHeight(100),
            ],
          }),
        },
      ],
    }),
  },
};

export default createModalStack<ModalStackParamList>(modalConfig, {
  backBehavior: 'none',
});
