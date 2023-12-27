import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import getFormattedTime from '../../utils/time';
import { LoadingOverlay, PrimaryButton, Separator, TimePickContainer } from '../../components';
import { HydroponicConfigContext } from '../../config/Context';

function PumpActiveHour({ navigation, route }) {
  const hydroponicConfigContext = useContext(HydroponicConfigContext);
  const pumpActiveRangeHour = route.params.range;
  const [rangeHour, setRangeHour] = useState({
    startTime: pumpActiveRangeHour.startTime,
    endTime: pumpActiveRangeHour.endTime,
  });

  const [selectedTimeProperty, setSelectedTimeProperty] = useState('startTime');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const updatedTime = {
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
    setRangeHour({
      ...rangeHour,
      [selectedTimeProperty]: updatedTime,
    });

    hideDatePicker();
  };

  function submitRangeHourHandler() {
    const updatedRangeHour = {
      startTime: rangeHour.startTime,
      endTime: rangeHour.endTime,
    };

    if (
      updatedRangeHour.startTime.hour > updatedRangeHour.endTime.hour ||
      (updatedRangeHour.startTime.hour === updatedRangeHour.endTime.hour &&
        updatedRangeHour.startTime.minute >= updatedRangeHour.endTime.minute)
    ) {
      Alert.alert(
        'Range Tidak Valid',
        'Jam nyala pompa harus sebelum jam mati pompa'
      );
      return;
    }

    hydroponicConfigContext.setConfig('pumpActiveRangeHour', updatedRangeHour);

    navigation.goBack();
  }

  if (hydroponicConfigContext.loading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>Isikan jam nyala dan mati pompa</Text>
      <Separator height={16} />
      <TimePickContainer
        label="Jam Nyala Pompa"
        onPress={() => {
          setSelectedTimeProperty('startTime');
          showDatePicker();
        }}
        value={getFormattedTime(rangeHour.startTime)}
        text={'Pilih Jam'}
      />
      <Separator height={16} />
      <TimePickContainer
        label="Jam Mati Pompa"
        onPress={() => {
          setSelectedTimeProperty('endTime');
          showDatePicker();
        }}
        value={getFormattedTime(rangeHour.endTime)}
        text={'Pilih Jam'}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Separator height={16} />
      <PrimaryButton onPress={submitRangeHourHandler} text="Update" />
    </View>
  );
}

export default PumpActiveHour;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 24,
  },
  text: {
    fontFamily: `Poppins-SemiBold`,
    color: 'gray',
  },
});
