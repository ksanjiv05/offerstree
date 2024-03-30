import Toast from 'react-native-toast-message';

type ToastMessageType = {
  type?: 'success' | 'error' | 'info';
  title: string;
  text?: string;
  visibilityTime?: number;
  topOffset?: number;
  onPress?: () => void;
};

interface IToastMessage {
  publish(notification: ToastMessageType): void;
}

class ToastMessage implements IToastMessage {
  publish({
    type = 'success',
    title,
    text,
    visibilityTime = 2000,
    topOffset = 20,
    onPress,
  }: ToastMessageType): void {
    Toast.show({
      type: type,
      text1: title,
      text2: text,
      visibilityTime: visibilityTime,
      topOffset: topOffset,
      onPress: onPress ? onPress : undefined,
    });
  }
}

export const toastMessage = new ToastMessage();
