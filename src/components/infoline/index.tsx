import {Label} from 'heroui-native/label';
import {Typography as Text} from 'heroui-native/text';
import {View} from 'react-native';
import {openLink} from 'utils';

type Props = {
  title: string;
  content: string;
  twitter?: string | null;
  instagram?: string | null;
  myanimelist?: string | null;
};

/**
 * InfoLine
 */
const InfoLine: React.FC<Props> = ({
  title,
  content,
  twitter,
  instagram,
  myanimelist,
}) => {
  const openTwitter = () => {
    if (twitter) {
      openLink(`https://twitter.com/${twitter}`);
    }
  };
  const openInstagram = () => {
    if (instagram) {
      openLink(`https://www.instagram.com/${instagram}`);
    }
  };
  const openMAL = () => {
    if (myanimelist) {
      openLink(myanimelist);
    }
  };

  return (
    <View className="my-2">
      <Label>{title}</Label>
      <Text.Paragraph selectable className="text-justify">
        {content}
      </Text.Paragraph>
      {!!twitter && (
        <Text className="text-justify">
          Twitter:{' '}
          <Text className="text-justify underline" onPress={openTwitter}>
            {twitter}
          </Text>
        </Text>
      )}
      {!!instagram && (
        <Text className="text-justify">
          Instagram:{' '}
          <Text className="text-justify underline" onPress={openInstagram}>
            {instagram}
          </Text>
        </Text>
      )}
      {!!myanimelist && (
        <Text className="text-justify">
          MyAnimeList:{' '}
          <Text className="text-justify underline" onPress={openMAL}>
            {myanimelist}
          </Text>
        </Text>
      )}
    </View>
  );
};

export default InfoLine;
