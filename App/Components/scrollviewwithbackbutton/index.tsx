import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Animated, ScrollView, StyleSheet, View} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
} from 'react-native';

const ScrollViewWithBackButton = ({
  children,
  right,
  ...props
}: ScrollViewProps & {
  children?: React.ReactNode;
  right?: React.ReactNode;
}) => {
  const scrollAV = useRef(new Animated.Value(0)).current;
  const safeAreaInsets = useSafeAreaInsets();
  const [currentOffset, setCurrentOffset] = useState(0);
  const {colors} = useTheme();
  const navigation = useNavigation();
  const scroll = {
    paddingTop: 50 + safeAreaInsets.top,
  };
  const top = {
    paddingTop: safeAreaInsets.top,
  };
  const bottom = {
    paddingBottom: safeAreaInsets.bottom,
  };
  const goBack = () => navigation.goBack();

  const translateX = scrollAV.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const translateY = scrollAV.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50 - safeAreaInsets.top],
    extrapolate: 'clamp',
  });

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.y;
    if (offset > 50) {
      const dif = offset - (currentOffset || 0);
      if (Math.abs(dif) > 10) {
        if (dif < 0) {
          Animated.timing(scrollAV, {
            duration: 100,
            toValue: 0,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(scrollAV, {
            duration: 100,
            toValue: 1,
            useNativeDriver: true,
          }).start();
        }
      }
    } else {
      Animated.timing(scrollAV, {
        duration: 100,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
    setCurrentOffset(offset);
  };

  return (
    <View style={styles.flex1}>
      <ScrollView
        {...props}
        contentContainerStyle={[scroll, bottom]}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}>
        {children}
      </ScrollView>
      <Animated.View style={[styles.back, top, {transform: [{translateX}]}]}>
        <IconButton
          icon="arrow-left"
          style={{backgroundColor: colors.background}}
          onPress={goBack}
        />
      </Animated.View>
      <Animated.View style={[styles.right, top, {transform: [{translateY}]}]}>
        {right}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    position: 'absolute',
  },
  flex1: {
    flex: 1,
  },
  right: {
    position: 'absolute',
    right: 0,
  },
});

export default ScrollViewWithBackButton;
