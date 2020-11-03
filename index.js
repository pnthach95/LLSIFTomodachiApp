import { AppRegistry } from 'react-native';
import App from './App/screens';
import bgMessaging from './App/Services/bgMessaging';

AppRegistry.registerComponent('LLSIFTomodachi', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
