import {Images} from 'assets';
import {Progress} from 'components/progress';
import {Typography as Text} from 'heroui-native/text';
import {Image, View} from 'react-native';
import useStore from 'store';

type Props = {
  text: AttributeType;
  stat: number;
};

/** SPC = Smile Pure Cool */
const SPCStats = ({text, stat}: Props) => {
  const cachedData = useStore(s => s.cachedData);
  const maxStats = [
    cachedData?.maxStats?.Smile || 0,
    cachedData?.maxStats?.Pure || 0,
    cachedData?.maxStats?.Cool || 0,
  ];
  let progress = 0;
  switch (text) {
    case 'Smile':
      progress = stat / maxStats[0];
      break;
    case 'Pure':
      progress = stat / maxStats[1];
      break;
    default:
      progress = stat / maxStats[2];
      break;
  }

  return (
    <View className="py-2.5">
      <Text>{text}</Text>
      <View className="flex-row">
        <Image
          className="mr-2.5 h-7.5 w-7.5"
          resizeMode="contain"
          source={Images.multi[text]}
        />
        <View className="flex-1">
          <Text>{stat}</Text>
          <Progress
            data-attribute={text}
            indicatorClassName="data-[attribute=Cool]:bg-cool data-[attribute=Pure]:bg-pure data-[attribute=Smile]:bg-smile"
            value={progress}
          />
        </View>
      </View>
    </View>
  );
};

export default SPCStats;
