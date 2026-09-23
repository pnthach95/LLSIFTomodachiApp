import {MaterialDesignIcons} from 'components/uniwind';
import {Card} from 'heroui-native/card';
import {ControlField} from 'heroui-native/control-field';
import {Label} from 'heroui-native/label';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Separator} from 'heroui-native/separator';
import {Switch} from 'heroui-native/switch';
import {Typography as Text} from 'heroui-native/text';
import {View} from 'react-native';
import {getVersion} from 'react-native-device-info';
import {
  onSwitchTheme,
  onSwitchWorldwideOnly,
  useAppTheme,
  useWorldwideOnly,
} from 'store';
import type {MainTabScreenProps} from 'typings/navigation';

const iconSize = 30;

const MoreScreen = ({navigation}: MainTabScreenProps<'MoreScreen'>) => {
  const worldwideOnly = useWorldwideOnly();
  const theme = useAppTheme();

  const goToIdols = () => navigation.navigate('IdolsScreen');
  const goToSongs = () => navigation.navigate('SongsScreen');
  const goToAboutMe = () => navigation.navigate('AboutMeScreen');

  return (
    <View className="grow justify-center gap-3 p-3">
      <Card className="gap-3">
        <Card.Header>
          <Card.Title className="text-accent">Options</Card.Title>
        </Card.Header>
        <Card.Body className="gap-3">
          <ControlField
            isSelected={worldwideOnly}
            onSelectedChange={onSwitchWorldwideOnly}>
            <Label className="flex-1">Search Worldwide only</Label>
            <ControlField.Indicator>
              <Switch />
            </ControlField.Indicator>
          </ControlField>
          <Separator />
          <ControlField
            isSelected={theme === 'dark'}
            onSelectedChange={onSwitchTheme}>
            <Label className="flex-1">Dark theme</Label>
            <ControlField.Indicator>
              <Switch />
            </ControlField.Indicator>
          </ControlField>
        </Card.Body>
      </Card>
      <Card className="gap-3">
        <Card.Header>
          <Card.Title className="text-accent">Navigation</Card.Title>
        </Card.Header>
        <Card.Body className="gap-3">
          <PressableFeedback
            className="flex-row items-center gap-2"
            onPress={goToIdols}>
            <MaterialDesignIcons
              colorClassName="accent-smile"
              name="face-woman"
              size={iconSize}
            />
            <Text>Idols</Text>
          </PressableFeedback>
          <Separator />
          <PressableFeedback
            className="flex-row items-center gap-2"
            onPress={goToSongs}>
            <MaterialDesignIcons
              colorClassName="accent-pure"
              name="music-box-multiple"
              size={iconSize}
            />
            <Text>Songs</Text>
          </PressableFeedback>
          <Separator />
          <PressableFeedback
            className="flex-row items-center gap-2"
            onPress={goToAboutMe}>
            <MaterialDesignIcons
              colorClassName="accent-cool"
              name="help-circle"
              size={iconSize}
            />
            <Text>About me</Text>
          </PressableFeedback>
        </Card.Body>
      </Card>
      <Text className="text-center">Version {getVersion()}</Text>
    </View>
  );
};

export default MoreScreen;
