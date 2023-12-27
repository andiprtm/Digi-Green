import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, Text, View} from "react-native";
import {HydroponicConfigContext} from "../../config/Context";
import {ColoredInput, PrimaryButton, Separator, TimePickContainer} from "../../components";
import getFormattedDate from "../../utils/date";
import getFormattedTime from "../../utils/time";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import date from "../../utils/date";

function Index({navigation, route}) {

    const today = new Date();

    const hydroponicConfigContext = useContext(HydroponicConfigContext);
    const fertilizationSchedule = route.params.schedule;
    const [schedule, setSchedule] = useState({
        numberOfDays: fertilizationSchedule.numberOfDays,
        startDate: fertilizationSchedule.startDate,
        fertilizationTime: fertilizationSchedule.fertilizationTime,
    })

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (date) => {
        const updatedTime = {
            hour: date.getHours(),
            minute: date.getMinutes(),
        };

        setSchedule({
            ...schedule,
            fertilizationTime: updatedTime,
        });

        hideTimePicker();
    };

    const handleDateConfirm = (date) => {

        const updateDate = {
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        }

        setSchedule({
            ...schedule,
            startDate: updateDate,
        });

        hideDatePicker();
    };

    const changeNumberOfDays = (number) => {
        console.log(number)
        setSchedule({
            ...schedule,
            numberOfDays: number,
        });
    }

    function submitScheduleHandler() {
        const updateSchedule = {
            numberOfDays: schedule.numberOfDays,
            startDate: schedule.startDate,
            fertilizationTime: schedule.fertilizationTime,
        };

        console.log(updateSchedule.numberOfDays)

        if (
            updateSchedule.numberOfDays <= 0 || isNaN(updateSchedule.numberOfDays)
        ) {
            Alert.alert(
                'Nilai tidak valid',
                'nilai hari harus lebih dari 0'
            );
            return;
        }

        hydroponicConfigContext.setConfig('fertilizationSchedule', updateSchedule);

        navigation.goBack();
    }



    return (
        <View style={styles.mainWrapper}>
            <Text style={styles.text}>
                Atur pemberian pupuk cair secara otomatis
            </Text>
            <Separator height={24}/>

            <ColoredInput
                keyboardType="decimal-pad"
                placeholder="Masukkan rentang hari pemupukan"
                value={schedule.numberOfDays}
                onChangeText={(text) => changeNumberOfDays(text)}
            />

            <Separator height={12}/>

            <TimePickContainer
                label={"Tanggal pemupukan"}
                onPress={ () => {
                    showDatePicker();
                }}
                value={getFormattedDate(schedule.startDate)}
                text={"Pilih Hari"}
            />

            <Separator height={12}/>

            <TimePickContainer
                label={"Waktu pemupukan"}
                onPress={() => {
                    showTimePicker();
                }}
                value={getFormattedTime(schedule.fertilizationTime)}
                text={"Pilih Jam"}
            />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                minimumDate={today}
            />

            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
            />

            <Separator height={24}/>
            <PrimaryButton onPress={submitScheduleHandler} text={"Update"}/>
        </View>
    );
}

export default Index;

const styles = StyleSheet.create({
    mainWrapper: {
        padding: 24,
    },
    text: {
        fontFamily: "Poppins-Medium",
    }
})