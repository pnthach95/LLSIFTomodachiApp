import {MaterialDesignIcons} from 'components/uniwind';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Switch} from 'heroui-native/switch';
import {Typography as Text} from 'heroui-native/text';
import {ScrollView, View} from 'react-native';
import {getVersion} from 'react-native-device-info';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {initAppOptions} from 'store/init';
import {useStorage} from 'utils';
import type {MainTabScreenProps} from 'typings/navigation';

const iconSize = 30;

const MoreScreen = ({navigation}: MainTabScreenProps<'MoreScreen'>) => {
  const [settings, setSettings] = useStorage('settings', initAppOptions);
  const insets = useSafeAreaInsets();
  const top = {paddingTop: insets.top};

  /** Toggle worldwide option */
  const worldwideToggle = () => {
    const data: AppOptions = {
      ...settings,
      worldwideOnly: !settings.worldwideOnly,
    };
    setSettings(data);
  };

  /** Toggle dark theme */
  const themeToggle = () => {
    const data: AppOptions = {
      ...settings,
      isDark: !settings.isDark,
    };
    setSettings(data);
  };

  const goToIdols = () => navigation.navigate('IdolsScreen');
  const goToSongs = () => navigation.navigate('SongsScreen');
  const goToAboutMe = () => navigation.navigate('AboutMeScreen');

  return (
    <ScrollView
      contentContainerStyle={top}
      showsVerticalScrollIndicator={false}>
      <View className="flex-row items-center justify-between px-5 pt-5 pb-2.5">
        <Text className="font-bold text-blue-600">Options</Text>
      </View>
      <PressableFeedback onPress={worldwideToggle}>
        <View className="flex-row items-center justify-between p-2.5">
          <Text>Search Worldwide only</Text>
          <Switch
            isSelected={settings.worldwideOnly}
            onSelectedChange={worldwideToggle}
          />
        </View>
      </PressableFeedback>
      <PressableFeedback onPress={themeToggle}>
        <View className="flex-row items-center justify-between p-2.5">
          <Text>Dark theme</Text>
          <Switch isSelected={settings.isDark} onSelectedChange={themeToggle} />
        </View>
      </PressableFeedback>
      <View className="flex-row items-center justify-between px-5 pt-5 pb-2.5">
        <Text className="font-bold text-blue-600">Navigation</Text>
      </View>
      <PressableFeedback onPress={goToIdols}>
        <View className="flex-row items-center gap-2 p-2.5">
          <MaterialDesignIcons
            colorClassName="accent-smile"
            name="face-woman"
            size={iconSize}
          />
          <Text>Idols</Text>
        </View>
      </PressableFeedback>
      <PressableFeedback onPress={goToSongs}>
        <View className="flex-row items-center gap-2 p-2.5">
          <MaterialDesignIcons
            colorClassName="accent-pure"
            name="music-box-multiple"
            size={iconSize}
          />
          <Text>Songs</Text>
        </View>
      </PressableFeedback>
      <PressableFeedback onPress={goToAboutMe}>
        <View className="flex-row items-center gap-2 p-2.5">
          <MaterialDesignIcons
            colorClassName="accent-cool"
            name="help-circle"
            size={iconSize}
          />
          <Text>About me</Text>
        </View>
      </PressableFeedback>
      <Text className="text-center">Version {getVersion()}</Text>
    </ScrollView>
  );
};

export default MoreScreen;
