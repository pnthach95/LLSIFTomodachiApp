import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  ViewStyle
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import tinycolor from 'color';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';

import LoadingScreen from '../Loading';
import UserContext from '~/Context/UserContext';
import LLSIFdotnetService from '~/Services/LLSIFdotnetService';
import { AppStyles, Colors, Fonts } from '~/Theme';
import type { EventTrackerScreenProps } from '~/Utils/types';

type xyObject = { x: string; y: number };

type ChartData = {
  seriesName: string;
  data: xyObject[] | null;
  color: string;
};

type TrackerDataProps = {
  table: string[][] | null;
  chart: ChartData[];
};

const chartPadding = { left: 70, top: 20, bottom: 30, right: 20 };

const Row = ({ data, style }: { data: string[]; style?: ViewStyle | null }) => {
  const { colors } = useTheme();
  return data ? (
    <View style={[AppStyles.row, style]}>
      {data.map((item, i) => {
        const wth = i === 0 ? 130 : 80;
        return (
          <View
            key={i}
            style={[styles.border, { width: wth, borderColor: colors.text }]}>
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
  rows.forEach((row) => {
    const rowArr = row.split(',');
    if (rowArr.length > 10) {
      result.push(rowArr);
    }
  });
  return result;
};

const Tracker: React.FC<EventTrackerScreenProps> = ({ navigation, route }) => {
  const { state } = useContext(UserContext);
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [trackerData, setTrackerData] = useState<TrackerDataProps>({
    table: null,
    chart: []
  });
  const wwEventInfo = state.cachedData.eventInfo.ww || [];
  const jpEventInfo = state.cachedData.eventInfo.jp || [];
  const axisStyle = {
    tickLabels: {
      // fontSize: Font.normal.fontSize,
      fill: colors.text
    },
    axis: {
      stroke: colors.text
    }
  };

  useEffect(() => {
    void getData();
    navigation.setOptions({
      title: route.params.name
    });
  }, []);

  const getData = async () => {
    let table: string[][] = [];
    const { isWW, name } = route.params;
    const targetEvent = isWW
      ? wwEventInfo.filter((value) => value.event_name === name)
      : jpEventInfo.filter((value) => value.event_name === name);
    if (targetEvent.length > 0) {
      const res = await LLSIFdotnetService.fetchEventData({
        server: isWW ? 'EN' : 'JP',
        id: targetEvent[0].event_id
      });
      if (res) {
        table = parseEventTracker(res);
      }
    }
    const chart = [];
    for (let i = 2; i < table[0].length; i += 2) {
      const row: xyObject[] = [];
      for (let j = 1; j < table.length; j++) {
        row.push({ x: table[j][0], y: Number(table[j][i]) });
      }
      chart.push({
        seriesName: table[0][i],
        data: row,
        color: tinycolor({ r: 25 * i, g: 17 * i, b: 37 * i })
          .rotate(5 * i)
          .hex()
      });
    }
    setTrackerData({ table, chart });
    setIsLoading(false);
  };

  const keyExtractor = (item: string[], index: number): string =>
    `data ${index}`;

  const renderItem = ({ item, index }: { item: string[]; index: number }) => (
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
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <VictoryChart padding={chartPadding}>
                  {trackerData.chart.map((value) => (
                    <VictoryLine
                      key={value.seriesName}
                      data={value.data || []}
                      style={{
                        data: { stroke: value.color }
                      }}
                    />
                  ))}
                  <VictoryAxis dependentAxis style={axisStyle} />
                  <VictoryAxis style={axisStyle} fixLabelOverlap={true} />
                </VictoryChart>
              </ScrollView>
            </View>
          )}
          <View style={AppStyles.screen}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <FlatList
                  data={trackerData.table}
                  stickyHeaderIndices={[0]}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={keyExtractor}
                  renderItem={renderItem}
                />
              </View>
            </ScrollView>
          </View>
        </>
      ) : (
        <Text style={Fonts.style.center}>No data</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  border: {
    borderWidth: StyleSheet.hairlineWidth
  },
  head: {
    backgroundColor: Colors.grey400
  }
});

Tracker.propTypes = {
  route: PropTypes.any
};

export default Tracker;
