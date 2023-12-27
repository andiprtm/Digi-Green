import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from "react-native";
import {EyePassword} from "../../assets/svgs";

function Index({label,type,value,onChange}) {

    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [focusPassword, setFocusPassword] = useState(false);

    const [focusUsername, setFocusUsername] = useState(false);

    const customStyleUsername = focusUsername ? styles.textInputBasicSecondary : styles.textInputBasic ;

    const customStylePassword = focusPassword ? styles.secondary : styles.container ;

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View>
            {label && (
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16 }}>
                    {label}
                </Text>
            )}

            {type === 'Basic' &&
                <TextInput
                    placeholder="Enter Username"
                    placeholderTextColor="#aaa"
                    style={customStyleUsername}
                    onChangeText={onChange}
                    value={value}
                    onFocus={()=>{
                        setFocusUsername(true)
                    }}
                    onEndEditing={()=>{
                        setFocusUsername(false)
                    }}
                />
            }

            {type === 'Password' &&
                <View style={customStylePassword}>
                    <TextInput
                        secureTextEntry={!showPassword}
                        value={value}
                        onChangeText={onChange}
                        style={styles.input}
                        placeholder="Enter Password"
                        placeholderTextColor="#aaa"
                        onFocus={()=>{
                            setFocusPassword(true);
                        }}
                        onEndEditing={()=>{
                            setFocusPassword(false)
                        }}
                    />
                    <EyePassword
                        type={showPassword  ? 'eye-off' : 'eye'}
                        style={styles.icon}
                        onPress={toggleShowPassword}
                    />
                </View>
            }
        </View>
    );
}

export default Index;

const styles = StyleSheet.create({
    textInputBasic: {
        marginTop: 1,
        fontFamily: 'Poppins-Medium',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        paddingHorizontal: 14,
        height: 49,
        fontSize: 16,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        paddingHorizontal: 14,
    },
    input: {
        flex: 1,
        color: '#333',
        paddingVertical: 10,
        paddingRight: 10,
        fontSize: 16,
        height: 49,
        fontFamily: 'Poppins-Medium',
    },
    icon: {
        marginLeft: 10,
    },
    heading: {
        alignItems: 'center',
        fontSize: 20,
        color: 'green',
        marginBottom: 20,
    },
    secondary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        paddingHorizontal: 14,
        borderWidth:2,
        borderColor: "#95D5B2",
    },
    textInputBasicSecondary: {
        marginTop: 1,
        fontFamily: 'Poppins-Medium',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        paddingHorizontal: 14,
        height: 49,
        fontSize: 16,
        borderWidth:2,
        borderColor: "#95D5B2",
    },
})