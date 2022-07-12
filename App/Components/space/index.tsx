import React from 'react';
import {View} from 'react-native';
import type {ViewProps} from 'react-native';

type Props = ViewProps & {
  height?: number;
  width?: number;
};

const Space = ({height = 10, width, ...rest}: Props) => {
  return <View {...rest} style={{height, width}} />;
};

export default Space;
