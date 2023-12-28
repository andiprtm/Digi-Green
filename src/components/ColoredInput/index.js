import { StyleSheet, Text, TextInput, View } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';



function ColoredInput({ label, keyboardType, placeholder, value, onChangeText, editable, focus }) {

  const customStyle = editable ? styles.input : styles.inputDisabled ;

  return (
    <View style={styles.container}>
      {label && (
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14 }}>
            {label}
          </Text>
      )}
      <TextInput
        style={customStyle}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={GlobalStyles.colors.primary}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        selectTextOnFocus={focus}
      />
    </View>
  );
}

export default ColoredInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    fontFamily: 'Poppins-SemiBold',
    color: GlobalStyles.colors.primary,
    backgroundColor: GlobalStyles.colors.inversePrimary,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 16,
  },
  inputDisabled: {
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 16,
  },
});
