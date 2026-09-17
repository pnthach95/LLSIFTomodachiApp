import {Images} from 'assets';
import ConnectStatus from 'components/connectstatus';
import TimerCountdown from 'components/timercountdown';
import {TurboImage} from 'components/uniwind';
import {Config} from 'config';
import dayjs from 'dayjs';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Typography as Text} from 'heroui-native/text';
import {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import {getVersion} from 'react-native-device-info';
import {SafeAreaView} from 'react-native-screens/experimental';
import GithubService from 'services/GithubService';
import LLSIFService from 'services/LLSIFService';
import LLSIFdotnetService from 'services/LLSIFdotnetService';
import {saveCachedData, useCachedData} from 'store';
import {initCachedData} from 'store/init';
import {AddHTTPS, openLink, useEventNumColumns} from 'utils';
import type {NativeSyntheticEvent} from 'react-native';
import type {Success} from 'react-native-turbo-image';
import type {MainTabScreenProps} from 'typings/navigation';

type GithubVersion = {
  tag: string;
  filename: string;
  link: string;
};

/** Main Screen */
const MainScreen = ({navigation}: MainTabScreenProps<'MainScreen'>) => {
  const numColumns = useEventNumColumns();
  const {width} = useWindowDimensions();
  const widthBanner = width - 40;
  const {ENEvent, JPEvent} = useCachedData();
  const [version, setVersion] = useState<GithubVersion | null>(null);
  const [imgSize, setImgSize] = useState({width: 1, height: 1});
  const engImage = AddHTTPS(ENEvent.english_image);
  const jpImage = AddHTTPS(JPEvent.image);

  /** Start time of event */
  const eventStart = dayjs(JPEvent.beginning, Config.DATETIME_FORMAT_INPUT);
  /** End time of event */
  const eventEnd = dayjs(JPEvent.end, Config.DATETIME_FORMAT_INPUT);

  useEffect(() => {
    const getData = async () => {
      try {
        const cachedData: CachedDataObject = {...initCachedData};
        const enParams: EventSearchParams = {
          page: 1,
          ordering: '-english_beginning',
          page_size: 1,
        };
        const jpParams: EventSearchParams = {
          page: 1,
          ordering: '-beginning',
          page_size: 1,
        };
        const [data, eventEN, eventJP, evInfo] = await Promise.all([
          LLSIFService.fetchCachedData(),
          LLSIFService.fetchEventList(enParams),
          LLSIFService.fetchEventList(jpParams),
          LLSIFdotnetService.fetchEventInfo(),
        ]);
        if (data) {
          const cardsInfo = data.cards_info;
          const idols = cardsInfo.idols.map(({name}) => name);
          cachedData.idols = idols;
          const skills = cardsInfo.skills.map(({skill}) => skill);
          cachedData.skills = skills;
          const subUnits = cardsInfo.sub_units.map(
            value => value,
          ) as SubUnitNames[];
          cachedData.subUnits = subUnits;
          const schools = cardsInfo.schools.map((value: string) => value);
          cachedData.schools = schools;
          cachedData.maxStats = cardsInfo.max_stats;
          cachedData.songsMaxStats = cardsInfo.songs_max_stats;

          if (Array.isArray(eventEN)) {
            cachedData.ENEvent = eventEN[0];
          }
          if (Array.isArray(eventJP)) {
            cachedData.JPEvent = eventJP[0];
          }
          cachedData.eventInfo = evInfo;
          saveCachedData(cachedData);
        } else {
          throw new Error('data = null');
        }
      } catch {
      } finally {
      }
    };

    if (Platform.OS === 'android') {
      const compareVersion = (appVersion: string, gitVersion: string) => {
        const pa = appVersion.split('.');
        const pb = gitVersion.split('.');
        for (let i = 0; i < 3; i++) {
          const na = Number(pa[i]);
          const nb = Number(pb[i]);
          if (na > nb) {
            return false;
          }
          if (nb > na) {
            return true;
          }
          if (!isNaN(na) && isNaN(nb)) {
            return false;
          }
          if (isNaN(na) && !isNaN(nb)) {
            return true;
          }
        }
        return false;
      };

      const checkVersion = async () => {
        try {
          const result = await GithubService.fetchLatestVersion();
          // console.log('github', result);
          if (compareVersion(getVersion(), result.tag_name)) {
            setVersion({
              tag: result.tag_name,
              filename: result.assets[0].name,
              link: result.assets[0].browser_download_url,
            });
          }
        } catch {}
      };

      checkVersion();
    }
    getData();
  }, []);

  /** Get width, height of image in FastImage */
  const onLoad = ({nativeEvent}: NativeSyntheticEvent<Success>) => {
    setImgSize({width: nativeEvent.width, height: nativeEvent.height});
  };

  /** Navigate to Event Detail Screen */
  const navigateToEventDetail = (event: EventObject) => {
    navigation.navigate('EventDetailScreen', {
      eventName: event.japanese_name,
    });
  };

  const goToEvent = () => navigateToEventDetail(JPEvent);

  const onOpenLink = () => version && openLink(version.link);

  return (
    <SafeAreaView className="flex-1" edges={{top: true}}>
      {/* HEADER */}
      <View className="items-center">
        <Image
          className="h-13 w-full"
          resizeMode="contain"
          source={Images.logo}
        />
      </View>
      {version !== null && (
        <PressableFeedback
          className="w-9/10 items-center self-center bg-success p-2"
          onPress={onOpenLink}>
          <Text>{`Download new version ${version.tag} on Github!`}</Text>
        </PressableFeedback>
      )}
      <ConnectStatus />
      {/* BODY */}
      <ScrollView
        contentContainerClassName="items-center p-3"
        showsVerticalScrollIndicator={false}>
        <PressableFeedback className="items-center gap-3" onPress={goToEvent}>
          <View className="items-center">
            <Text>{`Event: ${ENEvent.english_status || ''}`}</Text>
          </View>
          <View className="flex-col gap-3 sm:flex-row">
            <View className="w-full items-center sm:w-1/2">
              <Text align="center" type="h3">
                {ENEvent.english_name}
              </Text>
              {engImage && (
                <TurboImage
                  resizeMode="contain"
                  source={{uri: engImage}}
                  style={{
                    width: widthBanner / numColumns,
                    height:
                      (widthBanner * imgSize.height) /
                      imgSize.width /
                      numColumns,
                  }}
                  onSuccess={onLoad}
                />
              )}
            </View>
            <View className="w-full items-center sm:w-1/2">
              <Text align="center" type="h3">
                {JPEvent.romaji_name}
              </Text>
              {jpImage && (
                <TurboImage
                  resizeMode="contain"
                  source={{uri: jpImage}}
                  style={{
                    width: widthBanner / numColumns,
                    height:
                      (widthBanner * imgSize.height) /
                      imgSize.width /
                      numColumns,
                  }}
                />
              )}
            </View>
          </View>
          <View className="items-center">
            <Text>{`Start: ${eventStart.format('LLL')}`}</Text>
            <Text>{`End: ${eventEnd.format('LLL')}`}</Text>
            {JPEvent.japan_current && (
              <Text>
                <TimerCountdown seconds={eventEnd.diff(dayjs())} />
                {' left'}
              </Text>
            )}
            {JPEvent.japan_status === 'announced' && (
              <Text>
                {'Starts in '}
                <TimerCountdown seconds={eventStart.diff(dayjs())} />
              </Text>
            )}
          </View>
        </PressableFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;
