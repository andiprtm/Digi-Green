import React from 'react';
import {StyleSheet, Text, View} from "react-native";

function Index({text, value}) {
    return (
        <View style={styles.main}>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

export default Index;

const styles = StyleSheet.create({
    main: {
        width: "30%",
        height: 84,
        alignContent: 'center',
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#DEDEDE',
        shadowColor: "#000000",
        shadowOffset: {
            width: -28,
            height: 25
        },
        shadowRadius: 10,
        elevation: 10,
        shadowOpacity: 1,
    },

    text: {
        marginTop: 6,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
    },

    value: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
    }
})