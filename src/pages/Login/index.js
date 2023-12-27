import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useFonts} from "expo-font";
import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import {Loading, PrimaryButton, Separator, UserInput} from "../../components";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Accuracy} from "expo-location";
import {LogoOnly} from "../../assets/svgs";
import axios from "axios";
import {WEATHER_API} from "../../config/OpenWeather";

SplashScreen.preventAutoHideAsync();

function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const insets = useSafeAreaInsets()
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/font/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/font/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../../assets/font/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../../assets/font/Poppins-Bold.ttf'),
  });
  const [status, requestPermission] = Location.useForegroundPermissions()
  const [locationGranted, setLocationGranted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getLocationPermission = () => {
    requestPermission()
        .then(r => r)
        .catch(e => alert(e.toString()))
  }

  useEffect(() => {
    if (status?.granted) {
      setLocationGranted(true)
    } else if (!status?.granted && status?.canAskAgain) {
      getLocationPermission()
    }
  }, [status]);

  useEffect(() => {
    getLocationPermission()
  }, []);

  const getWeatherAPI = ({lat, lon}) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${WEATHER_API.key}&units=metric`)
        .then(r => {
          navigation.navigate('Home', {weatherData: r.data})
          setIsLoading(false)
        })
        .catch(e => {
          alert(e.toString())
          setIsLoading(false)
        })
  }
  
  console.log(username)

  const onSubmit = () => {
    if (username === 'digimin' && password === 'Digiword3!') {
      setIsLoading(true);
      Location.getCurrentPositionAsync({ accuracy: Accuracy.High })
          .then((r) => getWeatherAPI({ lat: r.coords.latitude, lon: r.coords.longitude }))
          .catch(() => {
            alert('Failed to get current location!');
            setIsLoading(false);
          });
    } else {
      // Menampilkan pesan alert jika username atau password salah
      alert({username} + {password});
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
      <>
        <View style={styles.parent} onLayout={onLayoutRootView}>
          <StatusBar />
          <View style={styles.logo}>
            <LogoOnly/>
          </View>
          <View style={{marginTop: insets.top, marginHorizontal: 24}}>
            <View>
              <Text style={{fontFamily: "Poppins-Bold", fontSize: 20, textAlign: "center"}}>Hi, Greener</Text>
              <Text style={{fontFamily: "Poppins-Medium", fontSize: 15, textAlign: "center"}}>Yuk masuk ke aplikasi dan segera pantau hidroponikmu</Text>
            </View>
            <Separator height={61}/>
            <UserInput label={"Username"} type={"Basic"} onChange={(text) => setUsername(text)} />
            <Separator height={5}/>
            <UserInput label={"Password"} type={"Password"} onChange={(text) => setPassword(text)} />
            <Separator height={61}/>
            <PrimaryButton text="LOGIN" onPress={onSubmit}/>
          </View>
        </View>
        {isLoading && <Loading />}
      </>

  );
}

export default Login;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#ffffff',
    paddingTop: 96,
    flex: 1
  },
  logo: {
    alignItems: "center",
  },

})
