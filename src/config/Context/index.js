import axios from 'axios';
import { createContext, useState } from 'react';

const FIREBASE_URL = process.env.EXPO_PUBLIC_FIREBASE_URL;

export const HydroponicConfigContext = createContext({
  config: {},
  loading: false,
  setConfig: (key) => {},
  fetchConfig: () => {},
  updateConfig: () => {},
});

function HydroponicConfigContextProvider({ children }) {
  const [hydroponicConfig, setHydroponicConfig] = useState({
    PPM: {
      minimum: 0,
      maximum: 0,
    },
    pumpStatus: false,
    pumpActiveRangeHour: {
      startTime: { hour: 0, minute: 0 },
      endTime: { hour: 0, minute: 0 },
    },
    fertilizationSchedule: {
      numberOfDays: 0,
      startDate: { date: 1, month: 1, year: 2000 },
      fertilizationTime: { hour: 0, minute: 0 },
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function setConfig(key, value) {
    setHydroponicConfig((prevHydroponicConfig) => ({
      ...prevHydroponicConfig,
      [key]: value,
    }));

    await updateConfig({
      ...hydroponicConfig,
      [key]: value,
    });
  }

  async function fetchConfig() {
    try {
      setIsLoading(true);
      const response = await axios.get(FIREBASE_URL);
      setIsLoading(false);
      const fetchedData = response.data;

      setHydroponicConfig({
        PPM: fetchedData.PPM,
        pumpStatus: fetchedData.pumpStatus,
        pumpActiveRangeHour: fetchedData.pumpActiveRangeHour,
        fertilizationSchedule: fetchedData.fertilizationSchedule,
      });
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  }

  async function updateConfig(newConfig) {
    try {
      setIsLoading(true);
      const response = await axios.put(FIREBASE_URL, newConfig);
      setIsLoading(false);
      console.log('Data updated successfully!: ' + response.status);
    } catch (error) {
      console.error('Error updating data to Firebase:', error);
    }
  }

  const value = {
    config: hydroponicConfig,
    loading: isLoading,
    setConfig: setConfig,
    fetchConfig: fetchConfig,
    updateConfig: updateConfig,
  };

  return (
    <HydroponicConfigContext.Provider value={value}>
      {children}
    </HydroponicConfigContext.Provider>
  );
}

export default HydroponicConfigContextProvider;
