import React from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Table, Row } from 'react-native-table-component';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

import { ApplicationStyles } from '../../Theme';
import styles from './styles';

export default class Tracker extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tableHead: ['Date', 't1', 't1_diff', 't2', 't2_diff', 't3', 't3_diff', 't1_song', 't1_song_diff', 't2_song', 't2_song_diff', 't3_song', 't3_song_diff'],
			widCell: [120, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
			selectedTab: this.props.wwTracker === null ? 1 : 0
		}
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

	render() {
		return (
			<View style={styles.container}>
				<View style={[ApplicationStyles.center, styles.trackerRegion]}>
					<SegmentedControlTab values={['Worldwide', 'Japanese']}
						selectedIndex={this.state.selectedTab}
						onTabPress={this._onTabPress} />
				</View>
				<VictoryChart theme={VictoryTheme.material}>
					<VictoryLine
						style={{
							data: { stroke: "#c43a31" },
							parent: { border: "1px solid #ccc" }
						}}
						data={[
							{ x: 1, y: 2 },
							{ x: 2, y: 3 },
							{ x: 3, y: 5 },
							{ x: 4, y: 4 },
							{ x: 5, y: 7 }
						]}
					/>
				</VictoryChart>
				{this.state.selectedTab === 0
					? this._renderTable(this.props.wwTracker)
					: this._renderTable(this.props.jpTracker)}
			</View>
		)
	}
}
