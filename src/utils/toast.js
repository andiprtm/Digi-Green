import { showMessage } from 'react-native-flash-message';

export const showToast = (message, type, marginTop) => {
  showMessage({
    message,
    type,
    floating: true,
    style: {
      marginTop: marginTop || 0,
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12,
    },
  });
};
