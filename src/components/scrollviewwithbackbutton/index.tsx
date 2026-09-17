import {useNavigation} from '@react-navigation/native';
import {MaterialDesignIcons} from 'components/uniwind';
import {Button} from 'heroui-native/button';
import {useState} from 'react';
import {View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {ScrollViewProps} from 'react-native';

const ScrollViewWithBackButton = ({
  children,
  right,
  ...props
}: ScrollViewProps & {
  children?: React.ReactNode;
  right?: React.ReactNode;
}) => {
  const scrollAV = useSharedValue(0);
  const {top} = useSafeAreaInsets();
  const [currentOffset, setCurrentOffset] = useState(0);
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const styleX = useAnimatedStyle(() => {
    const translateX = interpolate(scrollAV.value, [0, 1], [0, -50], 'clamp');
    return {transform: [{translateX}]};
  }, [scrollAV]);

  const styleY = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollAV.value,
      [0, 1],
      [0, -50 - top],
      'clamp',
    );
    return {transform: [{translateX}]};
  }, [scrollAV, top]);

  const onScroll = useAnimatedScrollHandler(event => {
    const offset = event.contentOffset.y;
    if (offset > 50) {
      const dif = offset - (currentOffset || 0);
      if (Math.abs(dif) > 10) {
        if (dif < 0) {
          scrollAV.set(withTiming(0, {duration: 100}));
        } else {
          scrollAV.set(withTiming(1, {duration: 100}));
        }
      }
    } else {
      scrollAV.set(withTiming(0, {duration: 100}));
    }
    setCurrentOffset(offset);
  });

  return (
    <View className="flex-1">
      <Animated.ScrollView
        {...props}
        contentContainerClassName="pt-safe-offset-12 pb-safe-offset-0"
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}>
        {children}
      </Animated.ScrollView>
      <Animated.View className="absolute pt-safe-offset-0" style={styleX}>
        <Button isIconOnly onPress={goBack}>
          <MaterialDesignIcons name="arrow-left" />
        </Button>
      </Animated.View>
      <Animated.View
        className="absolute right-0 pt-safe-offset-0"
        style={styleY}>
        {right}
      </Animated.View>
    </View>
  );
};

export default ScrollViewWithBackButton;
