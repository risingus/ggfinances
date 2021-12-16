import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import AppLoading from 'expo-app-loading';
import theme from './src/global/styles/theme'
import { Dashboard } from './src/screens/Dashboard';
import { Register } from './src/screens/Register';


import {
  useFonts, 
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { StatusBar } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }


  return (
    <ThemeProvider theme={theme}>
      {/* <Dashboard /> */}
      <Register />
    </ThemeProvider>
   
  );
}
