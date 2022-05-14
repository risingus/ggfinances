import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { ThemeProvider } from 'styled-components/native';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';
import { AuthProvider, useAuth } from './src/hooks/auth';
import theme from './src/global/styles/theme';

import {
	useFonts,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export default function App() {
	const { userStorageLoading } = useAuth();
	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (!fontsLoaded || userStorageLoading) {
		return <AppLoading />;
	}

	return (
		<ThemeProvider theme={theme}>
			<StatusBar barStyle="light-content" />
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</ThemeProvider>
	);
}
