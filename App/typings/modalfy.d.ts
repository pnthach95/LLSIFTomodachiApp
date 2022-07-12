import {
  ModalComponentProp,
  ModalComponentWithOptions,
} from 'react-native-modalfy';

type ModalStackParamList = {
  list: {
    title: string;
    selectedItem: string | undefined;
    data?: string[];
    objectData?: LVObject<string>[];
    onPress: (item: string) => void;
  };
};

type ListModalComponent = ModalComponentWithOptions<
  ModalComponentProp<ModalStackParamList, void, 'list'>
>;
