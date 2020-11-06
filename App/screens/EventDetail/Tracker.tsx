import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import {
  responsiveHeight,
  responsiveWidth
} from 'react-native-responsive-dimensions';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Row } from 'react-native-table-component';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';

import { AppStyles, Colors, Metrics, Fonts } from '~/Theme';

type Props = {
  wwTracker: string[][] | null;
  jpTracker: string[][] | null;
};

const tableHead = ['Date', 'T1', 'Δ', 'T2', 'Δ', 'T3', 'Δ'];
const widCell = [130, 80, 80, 80, 80, 80, 80];

const getLine = (data: string[][] | null, position: number) => {
  if (data === null) return [];
  const result = [];
  for (let i = 0; i < data.length; i += 4) {
    const element = data[i];
    result.push({ x: element[0], y: Number(element[position]) });
  }
  const last = data[data.length - 1];
  if (result[result.length - 1].x !== last[0]) {
    result.push({ x: last[0], y: Number(last[position]) });
  }
  return result;
};

const Tracker: React.FC<Props> = ({ wwTracker, jpTracker }) => {
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState(wwTracker === null ? 0 : 1);
  const [maxChartWidth, setMaxChartWidth] = useState(responsiveWidth(90));
  const chartHeight = responsiveHeight(50);
  const wwGroup = {
    table: wwTracker,
    chart: [
      {
        seriesName: 'T1',
        data: getLine(wwTracker, 1),
        color: 'red'
      },
      {
        seriesName: 'T2',
        data: getLine(wwTracker, 3),
        color: 'green'
      },
      {
        seriesName: 'T3',
        data: getLine(wwTracker, 5),
        color: 'blue'
      }
    ]
  };
  const jpGroup = {
    table: jpTracker,
    chart: [
      {
        seriesName: 'T1',
        data: getLine(jpTracker, 1),
        color: 'red'
      },
      {
        seriesName: 'T2',
        data: getLine(jpTracker, 3),
        color: 'green'
      },
      {
        seriesName: 'T3',
        data: getLine(jpTracker, 5),
        color: 'blue'
      }
    ]
  };

  const axisStyle = {
    tickLabels: {
      // fontSize: Font.normal.fontSize,
      fill: colors.text
    },
    axis: {
      stroke: colors.text
    }
  };

  const onTabPress = (index: number): void => setSelectedTab(index);

  const keyExtractor = (item: string[], index: number): string =>
    `data ${index}`;

  const renderItem = ({ item }: { item: string[] }) => (
    <Row data={item} widthArr={widCell} textStyle={styles.text} />
  );

  const renderGroup = (data: typeof jpGroup) =>
    data.table !== null ? (
      <View style={AppStyles.screen}>
        {data.chart !== undefined && (
          <ScrollView
            horizontal
            style={{ height: responsiveHeight(50) }}
            showsHorizontalScrollIndicator={false}>
            <VictoryChart width={maxChartWidth} height={chartHeight}>
              <VictoryLine
                data={data.chart[0].data}
                style={{
                  data: { stroke: data.chart[0].color },
                  parent: { border: '1px solid #ccc' }
                }}
              />
              <VictoryLine
                data={data.chart[1].data}
                style={{
                  data: { stroke: data.chart[1].color },
                  parent: { border: '1px solid #ccc' }
                }}
              />
              <VictoryLine
                data={data.chart[2].data}
                style={{
                  data: { stroke: data.chart[2].color },
                  parent: { border: '1px solid #ccc' }
                }}
              />
              <VictoryAxis dependentAxis style={axisStyle} />
              <VictoryAxis style={axisStyle} />
            </VictoryChart>
          </ScrollView>
        )}
        <Text style={Fonts.style.center}>Data from llsif.net</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <Row
              data={tableHead}
              widthArr={widCell}
              style={styles.head}
              textStyle={styles.text}
            />
            <FlatList
              data={data.table}
              showsVerticalScrollIndicator={false}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
      </View>
    ) : (
      <Text style={Fonts.style.center}>No data</Text>
    );

  return (
    <View style={AppStyles.screen}>
      <View style={[AppStyles.center, styles.region]}>
        <SegmentedControlTab
          values={['Japanese', 'Worldwide']}
          selectedIndex={selectedTab}
          onTabPress={onTabPress}
        />
      </View>
      {selectedTab === 0 ? renderGroup(jpGroup) : renderGroup(wwGroup)}
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    backgroundColor: Colors.grey400,
    height: 40
  },
  region: {
    height: Metrics.navBarHeight,
    marginHorizontal: Metrics.doubleBaseMargin
  },
  text: {
    margin: 6
  }
});

Tracker.propTypes = {
  jpTracker: PropTypes.any,
  wwTracker: PropTypes.any
};

export default Tracker;
