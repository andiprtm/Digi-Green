import { ActivityIndicator, StyleSheet, View } from "react-native";
import GlobalStyles from "../../styles/GlobalStyles";

function LoadingOverlay() {
  return (
    <View style={styles.contanier}>
      <ActivityIndicator size="large" color={GlobalStyles.colors.primary} />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
});