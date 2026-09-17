import {MaterialIcons, SafeAreaView} from 'components/uniwind';
import {Button} from 'heroui-native/button';
import {Typography} from 'heroui-native/text';
import {ScrollView} from 'react-native';
import RNRestart from 'react-native-restart';
import type {ErrorBoundaryProps} from 'react-native-error-boundary';

const ErrorBoundaryScreen: ErrorBoundaryProps['FallbackComponent'] = ({
  error,
}) => {
  const restart = () => {
    RNRestart.restart();
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-y-3 bg-background p-6">
      <MaterialIcons colorClassName="accent-danger" name="error" size={100} />
      <Typography.Heading align="center" type="h4" weight="bold">
        An unexpected error occurred
      </Typography.Heading>
      <ScrollView
        className="grow-0 rounded-xl border border-red-500"
        contentContainerClassName="p-3 sm:p-10">
        <Typography selectable selectionColorClassName="accent-danger">
          {error.toString()}
        </Typography>
      </ScrollView>
      <Button onPress={restart}>Reopen app</Button>
    </SafeAreaView>
  );
};

export default ErrorBoundaryScreen;
