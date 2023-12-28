import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, Switch, Text, View} from "react-native";
import {HydroponicConfigContext} from "../../config/Context";
import {ColoredInput, PrimaryButton, Separator, TimePickContainer} from "../../components";
import getFormattedDate from "../../utils/date";
import getFormattedTime from "../../utils/time";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import GlobalStyles from "../../styles/GlobalStyles";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {showToast} from "../../utils/toast";

function Index({navigation, route}) {
    const insets = useSafeAreaInsets()

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
    const [otoStatus, setOtoStatus] = useState(schedule.numberOfDays !== "0");

    function toggleStatusHandler() {
        setOtoStatus((prevStatus) => !prevStatus);
    }

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
            numberOfDays: otoStatus ? schedule.numberOfDays : "0",
            startDate: schedule.startDate,
            fertilizationTime: schedule.fertilizationTime,
        };

        console.log(updateSchedule.numberOfDays)

        if (
            (updateSchedule.numberOfDays < 0 || isNaN(updateSchedule.numberOfDays))
        ) {
            showToast('Nilai tidak valid', 'danger','nilai hari harus lebih dari 0', insets.top);
            return;
        }

        hydroponicConfigContext.setConfig('fertilizationSchedule', updateSchedule);
        showToast('Berhasil', 'success','data telah berhasil dirubah', insets.top);

        navigation.goBack();
    }



    return (
        <View style={styles.mainWrapper}>
            <Text style={styles.text}>
                Atur pemberian pupuk cair secara otomatis
            </Text>
            <Separator height={24}/>

            <Text style={styles.text2}>Nyalakan atau matikan pompa</Text>
            <Separator height={16} />
            <View style={styles.pumpStatusContainer}>
                <Text style={styles.pumpStatusContainer.text}>Status pemupukan otomatis</Text>
                <Switch
                    value={otoStatus}
                    onChange={toggleStatusHandler}
                    thumbColor={GlobalStyles.colors.primary}
                    trackColor={GlobalStyles.colors.inversePrimary}
                />
            </View>
            <Separator height={16} />

            <ColoredInput
                label={"Rentang hari pemupukan"}
                keyboardType="decimal-pad"
                placeholder="Masukkan rentang hari pemupukan"
                value={otoStatus ? schedule.numberOfDays : "0"}
                onChangeText={(text) => changeNumberOfDays(text)}
                focus={otoStatus}
                editable={otoStatus}
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
    },
    text2: {
        fontFamily: 'Poppins-SemiBold',
        color: 'gray',
    },
    pumpStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        text: {
            fontFamily: 'Poppins-SemiBold',
            color: GlobalStyles.colors.primary,
        },
    },
})