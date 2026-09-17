import {MaterialDesignIcons} from 'components/uniwind';
import {View, useWindowDimensions} from 'react-native';

type Props = {
  array: number[];
};

/**
 * Star bar in Song Detail Screen
 *
 * Prop:
 * - array: Star array
 */
const StarBar = ({array}: Props) => {
  const {width} = useWindowDimensions();
  return (
    <View className="flex-row justify-center">
      {array.map((item, index) => (
        <MaterialDesignIcons
          key={`star${index}`}
          className="px-0.5"
          colorClassName="data-[item=0]:accent-star0 data-[item=1]:accent-star1 data-[item=2]:accent-star2 data-[item=3]:accent-star3 data-[item=4]:accent-star4 data-[item=5]:accent-star5"
          data-item={item.toString()}
          name="star"
          size={width * 0.06}
        />
      ))}
    </View>
  );
};

export default StarBar;
