import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

export default class ProgressBar extends React.Component {
	render() {
		return (
			<View style={[styles.background, this.props.backgroundStyle]}>
				<View style={[styles.fill, this.props.fillStyle, { width: `${this.props.progress}%` }]}>
					<Text style={styles.text}>{this.props.number}</Text>
				</View>
			</View>
		)
	}
}
