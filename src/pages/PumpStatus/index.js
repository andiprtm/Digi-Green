import { useContext, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { PrimaryButton, Separator } from '../../components';
import GlobalStyles from '../../styles/GlobalStyles';
import { HydroponicConfigContext } from '../../config/Context';
import LoadingOverlay from '../../components/LoadingOverlay';

function PumpStatus({ navigation, route }) {
  const hydroponicConfigContext = useContext(HydroponicConfigContext);
  const status = route.params.status;

  const [pumpStatus, setPumpStatus] = useState(status);

  function toggleStatusHandler() {
    setPumpStatus((prevStatus) => !prevStatus);
  }

  function submitPumpStatusHandler() {
    hydroponicConfigContext.setConfig('pumpStatus', pumpStatus);
    navigation.goBack();
  }

  if(hydroponicConfigContext.loading) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>Nyalakan atau matikan pompa</Text>
      <Separator height={16} />
      <View style={styles.pumpStatusContainer}>
        <Text style={styles.pumpStatusContainer.text}>Status Pompa</Text>
        <Switch
          value={pumpStatus}
          onChange={toggleStatusHandler}
          thumbColor={GlobalStyles.colors.primary}
          trackColor={GlobalStyles.colors.inversePrimary}
        />
      </View>
      <Separator height={16} />
      <PrimaryButton onPress={submitPumpStatusHandler} text="Update" />
    </View>
  );
}

export default PumpStatus;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 24,
  },
  text: {
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
});
