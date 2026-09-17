import {useIsFocused} from '@react-navigation/native';
import {TurboImage} from 'components/uniwind';
import {Typography} from 'heroui-native/text';
import {useEffect, useRef, useState} from 'react';
import {StatusBar, View} from 'react-native';
import AwesomeGallery from 'react-native-awesome-gallery';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppTheme} from 'store';
import type {GalleryRef, RenderItemInfo} from 'react-native-awesome-gallery';
import type {RootStackScreenProps} from 'typings/navigation';

const renderItem = ({
  item,
  setImageDimensions,
}: RenderItemInfo<{uri: string}>) => {
  return (
    <TurboImage
      className="absolute top-0 right-0 bottom-0 left-0"
      source={{uri: item.uri}}
      onSuccess={({nativeEvent: {height, width}}) => {
        setImageDimensions({width, height});
      }}
    />
  );
};

const GalleryScreen = ({
  navigation,
  route,
}: RootStackScreenProps<'Gallery'>) => {
  const appTheme = useAppTheme();
  const {top} = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const gallery = useRef<GalleryRef>(null);
  const [infoVisible, setInfoVisible] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
    if (!isFocused) {
      StatusBar.setHidden(false, 'fade');
    }
    return () => {
      StatusBar.setBarStyle(
        appTheme === 'dark' ? 'light-content' : 'dark-content',
      );
    };
  }, [isFocused]);

  const onIndexChange = (index: number) => {
    if (isFocused) {
      navigation.setParams({idx: index});
    }
  };

  const onTap = () => {
    StatusBar.setHidden(infoVisible, 'slide');
    setInfoVisible(!infoVisible);
  };

  return (
    <View className="flex-1">
      {infoVisible && (
        <Animated.View
          className="absolute z-10 w-full bg-black/50"
          entering={FadeInUp.duration(250)}
          exiting={FadeOutUp.duration(250)}
          style={{
            height: top + 60,
            paddingTop: top,
          }}>
          <View className="flex-1 items-center justify-center">
            <Typography className="text-white" weight="semibold">
              {route.params.idx + 1} / {route.params.images.length}
            </Typography>
          </View>
        </Animated.View>
      )}
      <AwesomeGallery
        ref={gallery}
        loop
        data={route.params.images.map(uri => ({uri}))}
        doubleTapInterval={150}
        initialIndex={route.params.idx}
        keyExtractor={item => item.uri}
        numToRender={3}
        renderItem={renderItem}
        onIndexChange={onIndexChange}
        onScaleEnd={scale => {
          if (scale < 0.8) {
            navigation.goBack();
          }
        }}
        onSwipeToClose={navigation.goBack}
        onTap={onTap}
      />
    </View>
  );
};

export default GalleryScreen;
