import {Typography} from 'heroui-native/text';
import {View} from 'react-native';
import {useIsConnected} from 'react-native-offline';

/**
 * Connect Status
 */
const ConnectStatus = () => {
  const isConnected = useIsConnected();

  if (!isConnected)
    return (
      <View className="bg-red-600 p-3">
        <Typography className="text-center text-white">
          No internet connection
        </Typography>
      </View>
    );
};

export default ConnectStatus;
