import React from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Table, Row } from 'react-native-table-component';
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory-native';

import { ApplicationStyles } from '../../Theme';
import styles from './styles';

export default class Tracker extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tableHead: ['Date', 't1', 'Δ', 't2', 'Δ', 't3', 'Δ', 't1_song', 'Δ', 't2_song', 'Δ', 't3_song', 'Δ'],
			widCell: [120, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
			wwGroup: {},
			jpGroup: {},
			selectedTab: 0,
			ok: false
		};
	}

	componentDidMount() {
		this.setState({
			wwGroup: {
				table: this.props.wwTracker,
				t1: this._getLine(this.props.wwTracker, 1),
				t2: this._getLine(this.props.wwTracker, 3),
				t3: this._getLine(this.props.wwTracker, 5)
			},
			jpGroup: {
				table: this.props.jpTracker,
				t1: this._getLine(this.props.jpTracker, 1),
				t2: this._getLine(this.props.jpTracker, 3),
				t3: this._getLine(this.props.jpTracker, 5)
			},
			selectedTab: this.props.wwTracker === null ? 1 : 0,
			ok: true
		})
	}

	_getLine = (data, position) => {
		var result = [];
		for (let i = 0; i < data.length; i++) {
			const element = data[i];
			result.push({ x: element[0], y: element[position] });
		}
		return result;
	}

	_onTabPress = (index) => this.setState({ selectedTab: index });

	_keyExtractor = (item, index) => `data ${index}`;

	_renderItem = ({ item }) => <Row data={item}
		widthArr={this.state.widCell}
		textStyle={styles.trackerText} />

	_renderTable = (data) =>
		<ScrollView horizontal={data !== null}>
			{data !== null
				? <View>
					<Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
						<Row data={this.state.tableHead}
							widthArr={this.state.widCell}
							style={styles.trackerHead}
							textStyle={styles.trackerText} />
					</Table>
					<FlatList data={data}
						keyExtractor={this._keyExtractor}
						renderItem={this._renderItem} />
				</View>
				: <Text style={styles.whiteCenter}>No data</Text>}
		</ScrollView>

	_renderLine = (data, color) =>
		<VictoryLine data={data}
			animate={{
				duration: 2000,
				onLoad: { duration: 1000 }
			}}
			style={{
				data: { stroke: color },
				parent: { border: "1px solid #ccc" }
			}} />

	_renderChart = (t1, t2, t3) =>
		<VictoryChart theme={VictoryTheme.material}>
			{this._renderLine(t1, '#932834')}
			{this._renderLine(t2, '#a41bc0')}
			{this._renderLine(t3, '#0a0bee')}
		</VictoryChart>

	_renderGroup = (data) =>
		<View>
			{this._renderChart(data.t1, data.t2, data.t3)}
			{this._renderTable(data.table)}
		</View>

	render() {
		if (this.state.ok)
			return <View style={styles.container}>
				<View style={[ApplicationStyles.center, styles.trackerRegion]}>
					<SegmentedControlTab values={['Worldwide', 'Japanese']}
						selectedIndex={this.state.selectedTab}
						onTabPress={this._onTabPress} />
				</View>
				{this.state.selectedTab === 0
					? this._renderGroup(this.state.wwGroup)
					: this._renderGroup(this.state.jpGroup)}
			</View>
		else
			return <View style={[styles.container, ApplicationStyles.center]}>
				<BarIndicator count={9} color={'white'} />
			</View>
	}
}
