import {useThemeColor} from 'heroui-native/hooks';
import {Typography as Text} from 'heroui-native/text';
import {useEffect, useState} from 'react';
import {FlatList, ScrollView, View, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LLSIFdotnetService from 'services/LLSIFdotnetService';
import useStore from 'store';
import {useCSSVariable} from 'uniwind';
import {VictoryAxis, VictoryChart, VictoryLine} from 'victory-native';
import LoadingScreen from '../loading';
import type {ColorValue} from 'react-native';
import type {RootStackScreenProps} from 'typings/navigation';

type TrackerDataProps = {
  table: string[][] | null;
  chart: {
    seriesName: string;
    data: {x: string; y: number}[] | null;
    color: string | number | undefined;
  }[];
};

const chartPadding = {left: 70, top: 20, bottom: 30, right: 20};

const Row = ({data, index}: {data: string[]; index: number}) => {
  return data ? (
    <View
      className="flex-row first:w-32.5 data-[index=0]:bg-gray-400"
      data-index={index.toString()}>
      {data.map((item, i) => (
        <View key={i} className="w-20 border">
          <Text>{item}</Text>
        </View>
      ))}
    </View>
  ) : null;
};

const parseEventTracker = (data: string) => {
  const result: string[][] = [];
  const rows = data.split('\n');
  rows.forEach(row => {
    const rowArr = row.split(',');
    if (rowArr.length > 10) {
      result.push(rowArr);
    }
  });
  return result;
};

const Tracker = ({
  navigation,
  route,
}: RootStackScreenProps<'EventTrackerScreen'>) => {
  const {height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const eventInfo = useStore(s => s.cachedData.eventInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [trackerData, setTrackerData] = useState<TrackerDataProps>({
    table: null,
    chart: [],
  });
  const wwEventInfo = eventInfo.ww || [];
  const jpEventInfo = eventInfo.jp || [];
  const textColor = useThemeColor('field-foreground');
  const axisStyle = {
    tickLabels: {
      fill: textColor,
    },
    axis: {
      stroke: textColor,
    },
  };
  const bottom = {height: insets.bottom};
  const colorArr = useCSSVariable([
    '--color-red-400',
    '--color-blue-500',
    '--color-green-500',
    '--color-orange-500',
    '--color-purple-400',
    '--color-teal-500',
    '--color-lime-600',
    '--color-light-green-600',
    '--color-cyan-700',
    '--color-indigo-600',
  ]);

  useEffect(() => {
    const getData = async () => {
      let table: string[][] = [];
      const {isWW, name, backup} = route.params;
      let targetEvent = isWW
        ? wwEventInfo.filter(value => value.event_name === name)
        : jpEventInfo.filter(value => value.event_name === name);
      // After merged, they use English event name in JP event tracker
      if (targetEvent.length === 0 && backup) {
        targetEvent = jpEventInfo.filter(value => value.event_name === backup);
      }
      if (targetEvent.length > 0) {
        const res = await LLSIFdotnetService.fetchEventData({
          server: isWW ? 'EN' : 'JP',
          id: targetEvent[0].event_id,
        });
        if (res) {
          table = parseEventTracker(res);
        }
      }
      const chart = [];
      let colorCount = 0;
      for (let i = 2; i < table[0].length; i += 2) {
        if (table[0][i].startsWith('t')) {
          const row: TrackerDataProps['chart'][0]['data'] = [];
          for (let j = 1; j < table.length; j++) {
            row.push({x: table[j][0], y: Number(table[j][i])});
          }
          chart.push({
            seriesName: table[0][i],
            data: row,
            color: colorArr[colorCount],
          });
          colorCount += 1;
        }
      }
      setTrackerData({table, chart});
      setIsLoading(false);
    };
    navigation.setOptions({title: route.params.name});
    getData();
  }, []);

  const keyExtractor = (item: string[], index: number): string =>
    `data ${index}`;

  const renderItem = ({item, index}: {item: string[]; index: number}) => (
    <Row data={item} index={index} />
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {trackerData.table !== null ? (
        <>
          <Text className="text-center">Data from llsif.net</Text>
          {trackerData.chart !== undefined && (
            <View className="flex-1">
              <VictoryChart height={height * 0.33} padding={chartPadding}>
                {trackerData.chart.map(value => (
                  <VictoryLine
                    key={value.seriesName}
                    data={value.data || []}
                    style={{data: {stroke: value.color}}}
                  />
                ))}
                <VictoryAxis dependentAxis style={axisStyle} />
                <VictoryAxis fixLabelOverlap={true} style={axisStyle} />
              </VictoryChart>
              <View className="flex-row flex-wrap items-center justify-around p-2.5">
                {trackerData.chart.map(value => (
                  <View key={value.seriesName} className="flex-row">
                    <View
                      className="mr-2.5 h-5 w-5"
                      style={{backgroundColor: value.color as ColorValue}}
                    />
                    <Text>{value.seriesName}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          <View className="flex-1">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FlatList
                data={trackerData.table}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
              />
            </ScrollView>
          </View>
          <View style={bottom} />
        </>
      ) : (
        <Text className="text-center">No data</Text>
      )}
    </>
  );
};

export default Tracker;
