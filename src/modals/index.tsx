import {Dimensions, Easing} from 'react-native';
import {createModalStack} from 'react-native-modalfy';
import FlatListModal from './flatlist';
import type {ModalStackConfig} from 'react-native-modalfy';
import type {ModalStackParamList} from 'typings/modalfy';

const {height} = Dimensions.get('screen');

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
    transitionOptions: animatedValue => ({
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [height, 0, height],
          }),
        },
      ],
    }),
  },
};

export default createModalStack<ModalStackParamList>(modalConfig, {
  backBehavior: 'none',
});
