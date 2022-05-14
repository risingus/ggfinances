import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
	Container,
	Footer,
	FooterWrapper,
	Header,
	SignInTitle,
	Title,
	TitleWrapper,
} from './styles';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SighInSocialButton } from '../../components/SighInSocialButton';
import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';

export function SignIn() {
	const theme = useTheme();
	const { signInWithGoogle, signInWithApple } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	async function handleSignInWithGoogle() {
		try {
			setIsLoading(true);
			await signInWithGoogle();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar a conta Google');
			setIsLoading(false);
		}
	}

	async function handleSignInWithApple() {
		try {
			setIsLoading(true);
			await signInWithApple();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar a conta Apple');
			setIsLoading(false);
		}
	}

	return (
		<Container>
			<Header>
				<TitleWrapper>
					<LogoSvg width={RFValue(120)} height={RFValue(168)} />

					<Title>
						Controle suas {'\n'} fianças de forma {'\n'} muito simples
					</Title>
				</TitleWrapper>

				<SignInTitle>Faça seu login com {'\n'} uma das contas abaixo</SignInTitle>
			</Header>

			<Footer>
				<FooterWrapper>
					<SighInSocialButton
						title="Entrar com google"
						svg={GoogleSvg}
						onPress={handleSignInWithGoogle}
					/>

					{Platform.OS === 'ios' && (
						<SighInSocialButton
							title="Entrar com Apple"
							svg={AppleSvg}
							onPress={handleSignInWithApple}
						/>
					)}
				</FooterWrapper>

				{isLoading && <ActivityIndicator color={theme.colors.shape} size="small" />}
			</Footer>
		</Container>
	);
}
