import { AppRegistry } from 'react-native';
import App from './App/Containers';
import bgMessaging from './App/Services/bgMessaging';

AppRegistry.registerComponent('LLSIFTomodachi', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
