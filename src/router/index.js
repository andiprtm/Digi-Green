import { createStackNavigator } from '@react-navigation/stack';
import {
    Home,
    Login,
    Splash,
    MinMaxPPM,
    PumpStatus,
    PumpActiveHour, FertilizationSchedule,
} from '../pages';
import GlobalStyles from '../styles/GlobalStyles';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: GlobalStyles.colors.onPrimary,
        headerStyle: { backgroundColor: GlobalStyles.colors.primary },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MinMaxPPM"
        component={MinMaxPPM}
        options={{
          headerShown: true,
          headerTitle: 'Minimum dan Maximum PPM',
        }}
      />
      <Stack.Screen
        name="PumpStatus"
        component={PumpStatus}
        options={{
          headerShown: true,
          headerTitle: 'Status Pompa',
        }}
      />
      <Stack.Screen
        name="PumpActiveHour"
        component={PumpActiveHour}
        options={{
          headerShown: true,
          headerTitle: 'Jam Hidup Pompa',
        }}
      />
        <Stack.Screen
            name="FertilizationSchedule"
            component={FertilizationSchedule}
            options={{
                headerShown: true,
                headerTitle: 'Pemberian Pupuk Cair',
            }}
        />
    </Stack.Navigator>
  );
};

export default Router;
