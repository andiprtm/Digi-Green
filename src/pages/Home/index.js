import React, {useCallback, useContext,} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView, StyleSheet} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {useFonts} from "expo-font";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {ChevronRightIcon, DoorOutIcon, PinPointIcon} from "../../assets/svgs";
import {InformationCard, Separator} from "../../components";
import getFormattedTime from '../../utils/time';
import getFormattedDate from '../../utils/date'
import { HydroponicConfigContext } from '../../config/Context';

SplashScreen.preventAutoHideAsync();

function Home({navigation, route}) {
  const {weatherData} = route.params
  const hydroponicConfigContext = useContext(HydroponicConfigContext);
  const insets = useSafeAreaInsets()
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/font/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/font/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../../assets/font/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../../assets/font/Poppins-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      hydroponicConfigContext.fetchConfig();
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  const customStyleStatus = hydroponicConfigContext.config.pumpStatus ? styles.standartStyle : styles.pumpNotActive;
  
  return (
      <View onLayout={onLayoutRootView} style={{flex: 1,backgroundColor: 'white', paddingTop: 20,}}>
        <StatusBar />
        <ScrollView style={{marginTop: insets.top, paddingHorizontal: 24, paddingBottom: 30}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center', marginRight: 10}}>
                <Image
                    source={{uri: "https://source.unsplash.com/random/300×300"}}
                    style={{width: 40, height: 40, borderRadius: 20}}
                />
              </View>
              <View>
                <Text style={{fontFamily: 'Poppins-Bold', fontSize: 15}}>Selamat Pagi, Andi</Text>
                <Text style={{fontFamily: 'Poppins-Medium', fontSize: 13}}>Selasa, 26 Desember 2023</Text>
              </View>
            </View>
            <TouchableOpacity onPress={navigation.goBack} style={{alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: 'white'}}>
              <DoorOutIcon />
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: '#08B117', borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
            <View style={{paddingLeft: 20, paddingVertical: 10, width: '50%'}}>
              <Text style={{fontFamily: 'Poppins-Bold', fontSize: 18, color: 'white'}}>Cuaca hari ini</Text>
              <Text style={{fontFamily: 'Poppins-Bold', fontSize: 48, color: 'white'}}>{Math.round(weatherData.main.temp)}°C</Text>
              <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <PinPointIcon/>
                <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 15, color: 'white'}}>{weatherData.name}</Text>
              </View>
            </View>
            <View style={{justifyContent: 'center', borderRadius: 16, width: '45%', backgroundColor: '#C7F9CC', alignItems: "center"}}>
              <Image style={{width: 150, height: 100}} source={{uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}}/>
            </View>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 18}}>Informasi Umum</Text>
            <View style={{flexDirection: 'row', gap: 15, justifyContent: 'center', marginTop: 10}}>
              <InformationCard text={"temperature"} value={Math.round(weatherData.main.temp)+"°C"} />
              <InformationCard text={"Humidity"} value={"48%"}/>
              <InformationCard text={"Fertil Tank"} value={"200 ml"}/>
            </View>
          </View>
          <View style={{marginTop: 16}}>
            <View style={{flexDirection: 'row', gap: 15, justifyContent: 'center', marginTop: 10}}>
              <InformationCard text={"PPM"} value={30}/>
              <InformationCard text={"Water Level"} value={"80%"}/>
              <InformationCard text={"PH"} value={6}/>
            </View>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 18}}>Pengaturan Hidroponik</Text>
            <View style={{gap: 15, marginTop: 10}}>
              <TouchableOpacity onPress={() => {navigation.navigate("MinMaxPPM", {"PPM":hydroponicConfigContext.config.PPM})}} style={{borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#DEDEDE', padding: 5, paddingHorizontal: 10 }}>
                <View>
                  <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Minimum dan Maksimum PPM</Text>
                  <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14, color: '#1cc62b'}}>Min : {hydroponicConfigContext.config.PPM.minimum} , Max : {hydroponicConfigContext.config.PPM.maximum}</Text>
                </View>
                <ChevronRightIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {navigation.navigate("PumpStatus", {"status": hydroponicConfigContext.config.pumpStatus})}} style={{borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#DEDEDE', padding: 5, paddingHorizontal: 10}}>
                <View>
                  <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Status Pompa</Text>
                  <Text style={customStyleStatus}>{hydroponicConfigContext.config.pumpStatus ? "NYALA" : "MATI"}</Text>
                </View>
                <ChevronRightIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {navigation.navigate("PumpActiveHour", {"range" : hydroponicConfigContext.config.pumpActiveRangeHour})}} style={{borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#DEDEDE', padding: 5, paddingHorizontal: 10}}>
                <View>
                  <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Jam Hidup Pompa</Text>
                  <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14, color: '#1cc62b'}}>{getFormattedTime(hydroponicConfigContext.config.pumpActiveRangeHour.startTime)} - {getFormattedTime(hydroponicConfigContext.config.pumpActiveRangeHour.endTime)}</Text>
                </View>
                <ChevronRightIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {navigation.navigate("FertilizationSchedule", {"schedule" : hydroponicConfigContext.config.fertilizationSchedule})}} style={{borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#DEDEDE', padding: 5, paddingHorizontal: 10}}>
                <View>
                  <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Pemberian Pupuk Cair</Text>
                  <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14, color: '#1cc62b'}}>{getFormattedDate(hydroponicConfigContext.config.fertilizationSchedule.startDate)}, pukul {getFormattedTime(hydroponicConfigContext.config.fertilizationSchedule.fertilizationTime)}</Text>
                </View>
                <ChevronRightIcon />
              </TouchableOpacity>
            </View>
          </View>
          <Separator height={30}/>
        </ScrollView>
      </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  pumpNotActive: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#E80101',
  },
  standartStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1cc62b',
  }
})