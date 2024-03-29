import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {VictoryAxis, VictoryChart, VictoryLine} from 'victory-native';
import LLSIFdotnetService from '~/Services/LLSIFdotnetService';
import {AppStyles, Colors, Fonts, Metrics} from '~/Theme';
import useStore from '~/store';
import type {RootStackScreenProps} from '~/typings/navigation';
import LoadingScreen from '../Loading';
import type {ViewStyle} from 'react-native';

type TrackerDataProps = {
  table: string[][] | null;
  chart: {
    seriesName: string;
    data: {x: string; y: number}[] | null;
    color: string;
  }[];
};

const chartPadding = {left: 70, top: 20, bottom: 30, right: 20};
const colorArr = [
  Colors.red400,
  Colors.blue500,
  Colors.green500,
  Colors.orange500,
  Colors.purpleA400,
  Colors.teal500,
  Colors.lime600,
  Colors.lightGreen600,
  Colors.cyan700,
  Colors.indigo600,
];

const Row = ({data, style}: {data: string[]; style?: ViewStyle | null}) => {
  const {colors} = useTheme();
  return data ? (
    <View style={[AppStyles.row, style]}>
      {data.map((item, i) => {
        const wth = i === 0 ? 130 : 80;
        return (
          <View
            key={i}
            style={[styles.border, {width: wth, borderColor: colors.text}]}>
            <Text>{item}</Text>
          </View>
        );
      })}
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
  const insets = useSafeAreaInsets();
  const eventInfo = useStore(s => s.cachedData.eventInfo);
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [trackerData, setTrackerData] = useState<TrackerDataProps>({
    table: null,
    chart: [],
  });
  const wwEventInfo = eventInfo.ww || [];
  const jpEventInfo = eventInfo.jp || [];
  const axisStyle = {
    tickLabels: {
      fill: colors.text,
    },
    axis: {
      stroke: colors.text,
    },
  };
  const bottom = {height: insets.bottom};

  useEffect(() => {
    navigation.setOptions({title: route.params.name});
    getData();
  }, []);

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

  const keyExtractor = (item: string[], index: number): string =>
    `data ${index}`;

  const renderItem = ({item, index}: {item: string[]; index: number}) => (
    <Row data={item} style={index === 0 ? styles.head : null} />
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {trackerData.table !== null ? (
        <>
          <Text style={Fonts.style.center}>Data from llsif.net</Text>
          {trackerData.chart !== undefined && (
            <View style={AppStyles.screen}>
              <VictoryChart
                height={responsiveHeight(33)}
                padding={chartPadding}>
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
              <View style={styles.row}>
                {trackerData.chart.map(value => (
                  <View key={value.seriesName} style={AppStyles.row}>
                    <View
                      style={[styles.block, {backgroundColor: value.color}]}
                    />
                    <Text>{value.seriesName}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          <View style={AppStyles.screen}>
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
        <Text style={Fonts.style.center}>No data</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    height: Metrics.doubleBaseMargin,
    marginRight: Metrics.baseMargin,
    width: Metrics.doubleBaseMargin,
  },
  border: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  head: {
    backgroundColor: Colors.grey400,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: Metrics.baseMargin,
  },
});

export default Tracker;
