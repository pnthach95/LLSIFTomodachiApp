import React from 'react';
import {
  View, ScrollView, Text, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import PureChart from 'react-native-pure-chart';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Row } from 'react-native-table-component';

import { ApplicationStyles, Metrics } from '~/Theme';
import styles from './styles';

export default class Tracker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Date', 'T1', 'Δ', 'T2', 'Δ', 'T3', 'Δ'],
      widCell: [130, 80, 80, 80, 80, 80, 80],
      wwGroup: {},
      jpGroup: {},
      selectedTab: this.props.wwTracker === null ? 0 : 1,
    };
  }

  static propTypes = {
    wwTracker: PropTypes.any,
    jpTracker: PropTypes.any,
  }

  componentDidMount() {
    this.setState({
      wwGroup: {
        table: this.props.wwTracker,
        chart: [
          {
            seriesName: 'T1',
            data: this.getLine(this.props.wwTracker, 1),
            color: 'red',
          },
          {
            seriesName: 'T2',
            data: this.getLine(this.props.wwTracker, 3),
            color: 'green',
          },
          {
            seriesName: 'T3',
            data: this.getLine(this.props.wwTracker, 5),
            color: 'blue',
          },
        ],
      },
      jpGroup: {
        table: this.props.jpTracker,
        chart: [
          {
            seriesName: 'T1',
            data: this.getLine(this.props.jpTracker, 1),
            color: 'red',
          },
          {
            seriesName: 'T2',
            data: this.getLine(this.props.jpTracker, 3),
            color: 'green',
          },
          {
            seriesName: 'T3',
            data: this.getLine(this.props.jpTracker, 5),
            color: 'blue',
          },
        ],
      },
    });
  }

  getLine = (data, position) => {
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
  }

  onTabPress = index => this.setState({ selectedTab: index });

  keyExtractor = (item, index) => `data ${index}`;

  renderItem = ({ item }) => <Row data={item}
    widthArr={this.state.widCell}
    style={styles.trackerCell}
    textStyle={styles.trackerText} />

  renderGroup = data => (data.table !== null
    ? <View style={ApplicationStyles.screen}>
      {data.chart !== undefined
        && <PureChart data={data.chart} type='line'
          height={Metrics.screenHeight / 4} />}
      <Text style={[styles.whiteCenter, styles.trackerText]}>Data from llsif.net</Text>
      <ScrollView horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <View>
          <Row data={this.state.tableHead}
            widthArr={this.state.widCell}
            style={styles.trackerHead}
            textStyle={styles.trackerText} />
          <FlatList data={data.table}
            showsVerticalScrollIndicator={false}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem} />
        </View>
      </ScrollView>
    </View>
    : <Text style={styles.whiteCenter}>No data</Text>)

  render() {
    return <View style={styles.container}>
      <View style={[ApplicationStyles.center, styles.trackerRegion]}>
        <SegmentedControlTab values={['Japanese', 'Worldwide']}
          selectedIndex={this.state.selectedTab}
          onTabPress={this.onTabPress} />
      </View>
      {this.state.selectedTab === 0
        ? this.renderGroup(this.state.jpGroup)
        : this.renderGroup(this.state.wwGroup)}
    </View>;
  }
}
