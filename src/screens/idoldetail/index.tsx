import {Images} from 'assets';
import InfoLine from 'components/infoline';
import ScrollViewWithBackButton from 'components/scrollviewwithbackbutton';
import {TurboImage} from 'components/uniwind';
import dayjs from 'dayjs';
import {Typography as Text} from 'heroui-native/text';
import {useEffect, useState} from 'react';
import {Image, StyleSheet, View, useWindowDimensions} from 'react-native';
import LLSIFService from 'services/LLSIFService';
import {AddHTTPS} from 'utils';
import LoadingScreen from '../loading';
import type {RootStackScreenProps} from 'typings/navigation';

/**
 * Idol Detail Screen
 *
 * From parent screen, pass `name` to get Idol object.
 *
 * [Idol object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#objects)
 */
const IdolDetailScreen = ({
  route: {
    params: {name},
  },
}: RootStackScreenProps<'IdolDetailScreen'>) => {
  const {width} = useWindowDimensions();
  const itemWidth = ((width - 10) / 2 - 10) * 1.5;
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<(string | undefined)[]>([]);
  const [item, setItem] = useState<IdolObject | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      const params: CardSearchParams = {page: 1, search: name, page_size: 1};
      try {
        const res1 = await LLSIFService.fetchIdol(name);
        if (res1) {
          setItem(res1);
          const res2 = await LLSIFService.fetchCardList(params);
          if (Array.isArray(res2)) {
            if (res2.length === 0) {
              params.name = res1.name;
              params.japanese_name = '';
              const res3 = await LLSIFService.fetchCardList(params);
              if (Array.isArray(res3)) {
                setImages([
                  AddHTTPS(res3[0].transparent_image),
                  AddHTTPS(res3[0].transparent_idolized_image),
                ]);
              }
            } else {
              setImages([
                AddHTTPS(res2[0].transparent_image),
                AddHTTPS(res2[0].transparent_idolized_image),
              ]);
            }
          }
        }
      } catch {
        //
      } finally {
        setIsLoading(false);
      }
    };

    loadItem();
  }, []);

  return (
    <ScrollViewWithBackButton>
      {isLoading ? (
        <LoadingScreen />
      ) : item ? (
        <>
          <View style={styles.scrollView}>
            <Text
              className="font-bold text-other-attribute data-[attribute=Cool]:text-cool data-[attribute=Pure]:text-pure data-[attribute=Smile]:text-smile"
              data-attribute={item.attribute}>
              {name}
            </Text>
            {item?.japanese_name && (
              <Text
                className="text-other-attribute data-[attribute=Cool]:text-cool data-[attribute=Pure]:text-pure data-[attribute=Smile]:text-smile"
                data-attribute={item.attribute}>
                {item.japanese_name}
              </Text>
            )}
            {item && (
              <View className="flex-row">
                {!!item.main_unit && (
                  <Image
                    className="h-12.5 w-17.5"
                    resizeMode="contain"
                    source={Images.multi[item.main_unit]}
                  />
                )}
                {!!item.sub_unit && (
                  <Image
                    className="h-12.5 w-17.5"
                    resizeMode="contain"
                    source={Images.subUnit[item.sub_unit]}
                  />
                )}
              </View>
            )}
          </View>
          {Object.keys(Images.characters).includes(name) && (
            <Image
              source={Images.characters[name as keyof typeof Images.characters]}
              style={styles.character}
            />
          )}
          <View style={styles.imageRow}>
            {!!images[0] && images[0].includes('.png') && (
              <TurboImage
                resizeMode="contain"
                source={{uri: images[0]}}
                style={{width: itemWidth, height: itemWidth}}
              />
            )}
            {!!images[1] && images[1].includes('.png') && (
              <TurboImage
                resizeMode="contain"
                source={{uri: images[1]}}
                style={{width: itemWidth, height: itemWidth}}
              />
            )}
          </View>
          <View style={styles.scrollView}>
            {!!item.school && <InfoLine content={item.school} title="School" />}
            {!!item.attribute && (
              <InfoLine content={item.attribute} title="Attribute" />
            )}
            {!!item.birthday && (
              <InfoLine
                content={dayjs(item.birthday, 'MM-DD').format('MMMM DD')}
                title="Birthday"
              />
            )}
            {!!item.astrological_sign && (
              <InfoLine
                content={item.astrological_sign}
                title="Astrological Sign"
              />
            )}
            {!!item.blood && (
              <InfoLine content={item.blood} title="Blood Type" />
            )}
            {!!item.height && (
              <InfoLine content={`${item.height} cm`} title="Height" />
            )}
            {!!item.measurements && (
              <InfoLine content={item.measurements} title="Measurements" />
            )}
            {!!item.favorite_food && (
              <InfoLine content={item.favorite_food} title="Favorite Food" />
            )}
            {!!item.least_favorite_food && (
              <InfoLine
                content={item.least_favorite_food}
                title="Least Favorite Food"
              />
            )}
            {!!item.hobbies && (
              <InfoLine content={item.hobbies} title="Hobbies" />
            )}
            {item.year && <InfoLine content={item.year} title="Year" />}
            {!!item.cv && (
              <InfoLine
                content={`${item.cv.name} (${item.cv.nickname})`}
                instagram={item.cv.instagram}
                myanimelist={item.cv.url}
                title="CV"
                twitter={item.cv.twitter}
              />
            )}
            {!!item.summary && (
              <InfoLine content={item.summary} title="Summary" />
            )}
          </View>
        </>
      ) : (
        <Text>Error</Text>
      )}
    </ScrollViewWithBackButton>
  );
};

const styles = StyleSheet.create({
  character: {
    height: 100,
    position: 'absolute',
    right: 5,
    top: 120,
    width: 100,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scrollView: {
    marginHorizontal: 20,
  },
});

export default IdolDetailScreen;
