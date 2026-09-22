import {AppRegistry, LogBox} from 'react-native';
import {
  ReanimatedLogLevel,
  configureReanimatedLogger,
} from 'react-native-reanimated';
import {name as appName} from './app.json';
import App from './src/routes';

configureReanimatedLogger({level: ReanimatedLogLevel.error});

LogBox.ignoreLogs([
  'InteractionManager has been deprecated',
  'SafeAreaView has been deprecated',
]);

AppRegistry.registerComponent(appName, () => App);
