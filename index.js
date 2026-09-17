import {AppRegistry, LogBox} from 'react-native';
import {name as appName} from './app.json';
import App from './src/routes';

LogBox.ignoreLogs([
  'InteractionManager has been deprecated',
  'SafeAreaView has been deprecated',
]);

AppRegistry.registerComponent(appName, () => App);
