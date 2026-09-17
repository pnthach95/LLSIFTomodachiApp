import {Images} from 'assets';
import {Spinner} from 'heroui-native/spinner';
import {Image, View} from 'react-native';

/**
 * Splash Screen
 */
const LoadingScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Image
        className="h-1/2 w-1/2"
        resizeMode="contain"
        source={Images.logo}
      />
      <Spinner size="lg" />
    </View>
  );
};

export default LoadingScreen;
