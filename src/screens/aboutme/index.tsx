import {MaterialDesignIcons} from 'components/uniwind';
import {Config, RELEASE_NOTE} from 'config';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Separator} from 'heroui-native/separator';
import {Typography as Text} from 'heroui-native/text';
import {ScrollView, View} from 'react-native';
import {openLink} from 'utils';

const openGithub = () => openLink(Config.GITHUB_PROJECT);
const openLLSIFnet = () => openLink(Config.LLSIFNET);
const openSchoolido = () => openLink(Config.SCHOOLIDO);

const AboutMeScreen = () => {
  return (
    <ScrollView contentContainerClassName="gap-3 p-3 pb-safe-offset-3">
      <View className="items-center justify-center">
        <Text className="text-center">
          {'Powered by '}
          <Text className="text-center underline" onPress={openSchoolido}>
            School Idol Tomodachi
          </Text>
          {', '}
          <Text className="text-center underline" onPress={openLLSIFnet}>
            llsif.net
          </Text>
        </Text>
        <PressableFeedback
          className="items-center justify-center"
          onPress={openGithub}>
          <MaterialDesignIcons name="github" size={50} />
          <Text>Project</Text>
        </PressableFeedback>
      </View>
      <Separator />
      <Text>{RELEASE_NOTE}</Text>
    </ScrollView>
  );
};

export default AboutMeScreen;
