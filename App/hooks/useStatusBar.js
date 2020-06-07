import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '~/Theme';

function useStatusBar(style, backgroundColor = Colors.white, animated = true) {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style, animated);
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(false);
        StatusBar.setBackgroundColor(backgroundColor, animated);
      }
    }, []),
  );
}

useCallback.propTypes = {
  style: PropTypes.oneOf(['light-content', 'dark-content']).isRequired,
  backgroundColor: PropTypes.string,
  animated: PropTypes.bool,
};

export default useStatusBar;
