import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router';
import HydroponicConfigContextProvider from './src/config/Context';
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <HydroponicConfigContextProvider>
      <NavigationContainer>
        <Router />
        <FlashMessage position="top" />
      </NavigationContainer>
    </HydroponicConfigContextProvider>
  );
}
