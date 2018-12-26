import React from 'react';
import { StyleSheet, View, ScrollView, Text, FlatList } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Table, Row } from 'react-native-table-component';

import { ApplicationStyles } from '../../Theme';
import styles from './styles';

export default class Tracker extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tableHead: ['date', 't1', 't1_diff', 't2', 't2_diff', 't3', 't3_diff', 't1_song', 't1_song_diff', 't2_song', 't2_song_diff', 't3_song', 't3_song_diff'],
			widCell: [120, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
			selectedTab: this.props.wwTracker === null ? 1 : 0
		}
	}

	_onTabPress = (index) => this.setState({ selectedTab: index });

	_keyExtractor = (item, index) => `data ${index}`;

	_renderItem = ({ item }) => <Row data={item}
		widthArr={this.state.widCell}
		textStyle={styles.trackerText} />

	render() {
		return (
			<View style={styles.container}>
				<View style={[ApplicationStyles.center, styles.trackerRegion]}>
					<SegmentedControlTab values={['Worldwide', 'Japanese']}
						selectedIndex={this.state.selectedTab}
						onTabPress={this._onTabPress} />
				</View>
				{this.state.selectedTab === 0
					? <ScrollView horizontal={this.props.wwTracker !== null}>
						{this.props.wwTracker === null
							? <Text style={styles.whiteCenter}>No data</Text>
							: <View>
								<Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
									<Row data={this.state.tableHead}
										widthArr={this.state.widCell}
										style={styles.trackerHead}
										textStyle={styles.trackerText} />
								</Table>
								<FlatList data={this.props.wwTracker}
									keyExtractor={this._keyExtractor}
									renderItem={this._renderItem} />
							</View>}
					</ScrollView>
					: <ScrollView horizontal={this.props.jpTracker !== null}>
						{this.props.jpTracker === null
							? <Text style={styles.whiteCenter}>No data</Text>
							: <View>
								<Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
									<Row data={this.state.tableHead}
										widthArr={this.state.widCell}
										style={styles.trackerHead}
										textStyle={styles.trackerText} />
								</Table>
								<FlatList data={this.props.jpTracker}
									keyExtractor={this._keyExtractor}
									renderItem={this._renderItem} />
							</View>}
					</ScrollView>}
			</View>
		)
	}
}
