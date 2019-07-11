import React from 'react';
import {
  View, Text, SectionList, FlatList, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/Ionicons';

import Fade from '~/Components/Fade/Fade';
import IdolItem from '~/Components/IdolItem/IdolItem';
import Seperator from '~/Components/Seperator/Seperator';
import SquareButton from '~/Components/SquareButton/SquareButton';
import LLSIFService from '~/Services/LLSIFService';
import SplashScreen from '../SplashScreen/SplashScreen';
import { Colors, ApplicationStyles, Images } from '~/Theme';
import styles from './styles';

/**
 * Idol List Screen
 *
 * State:
 * - isLoading: Loading state
 * - list: Data for FlatList
 *
 * @class IdolsScreen
 * @extends {React.Component}
 */
export default class IdolsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: [],
    };
  }

  static propTypes = {
    schools: PropTypes.array,
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      focused
        ? <Icon name='ios-star' size={30} color={Colors.pink} />
        : <Icon name='ios-star-outline' size={30} color={Colors.inactive} />
    ),
    tabBarLabel: 'Idols',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive,
    },
  }

  componentDidMount() {
    LLSIFService.fetchIdolList().then((res) => {
      const { schools } = this.props;
      const array = [];
      schools.forEach((school) => {
        const item = {
          title: school,
          data: [
            {
              key: school,
              list: res.filter(value => value.school === school),
            },
          ],
        };
        array.push(item);
      });
      const item = {
        title: 'Other',
        data: [
          {
            key: 'Other',
            list: res.filter(value => value.school === null),
          },
        ],
      };
      array.push(item);
      this.setState({ isLoading: false, list: array });
    });
  }

  /**
   * Navigate to Idol Detail Screen
   *
   * @param {String} name
   * @memberof IdolsScreen
   */
  navigateToIdolDetail = name => () => this.props.navigation.navigate('IdolDetailScreen', { name });

  /**
   * Key extractor for FlatList
   *
   * @memberof IdolsScreen
   */
  keyExtractor = item => `idol${item.name}`;

  /**
   * Render item in FlatList
   *
   * @param {Object} item
   * @memberof IdolsScreen
   */
  renderItem = ({ item }) => <IdolItem item={item}
    onPress={this.navigateToIdolDetail(item.name)} />;

  /**
   * Open drawer
   *
   * @memberof IdolsScreen
   */
  openDrawer = () => this.props.navigation.openDrawer();

  render() {
    return (
      <View style={[ApplicationStyles.screen, styles.container]}>
        <Fade visible={this.state.isLoading}
          style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
          <SplashScreen bgColor={Colors.blue} />
        </Fade>
        <Fade visible={!this.state.isLoading}
          style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
          {/* HEADER */}
          <ElevatedView elevation={5}
            style={[ApplicationStyles.header, styles.container]}>
            <SquareButton name={'ios-menu'} onPress={this.openDrawer} color={'white'} />
            <Image source={Images.logo} style={ApplicationStyles.imageHeader} />
            <View style={styles.hole} />
          </ElevatedView>
          {/* BODY */}
          <SectionList sections={this.state.list}
            initialNumToRender={9}
            keyExtractor={(item, index) => `School${index}`}
            style={styles.list}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionText}>{title}</Text>
            )}
            stickySectionHeadersEnabled={false}
            ListHeaderComponent={<View style={styles.height10} />}
            ListFooterComponent={<View style={styles.height10} />}
            SectionSeparatorComponent={(data) => {
              if (data.leadingItem && data.leadingItem.key === 'Other') return null;
              const styleSeperator = {
                backgroundColor: 'white',
                marginBottom: data.leadingItem ? 20 : 0,
              };
              return <Seperator style={styleSeperator} />;
            }}
            renderItem={({ item }) => <FlatList
              numColumns={3}
              data={item.list}
              initialNumToRender={9}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />}
          />
        </Fade>
      </View>
    );
  }
}
