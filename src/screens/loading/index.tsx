import {Images} from 'assets';
import {Spinner} from 'heroui-native/spinner';
import {Image, View, useWindowDimensions} from 'react-native';

/**
 * Splash Screen
 */
const LoadingScreen = () => {
  const {width} = useWindowDimensions();
  return (
    <View className="flex-1 items-center justify-center">
      <Image
        resizeMode="contain"
        source={Images.logo}
        style={{height: width / 2, width: width * 0.7}}
      />
      <Spinner size="lg" />
    </View>
  );
};

export default LoadingScreen;
