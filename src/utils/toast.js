import { showMessage } from 'react-native-flash-message';

export const showToast = (message, type, description, marginTop) => {
  showMessage({
    message,
    type,
    description,
    floating: true,
    style: {
      marginTop: marginTop || 0,
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12,
    },
  });
};
