import styled, {css} from 'styled-components/native';
import {Feather} from '@expo/vector-icons'
import {RFValue} from 'react-native-responsive-fontsize'

interface TypeProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<TypeProps>`
  background: ${({theme, type}) => type === 'total' ? (
    theme.colors.secondary) : ( 
    theme.colors.shape)};

  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px ${RFValue(42)}px 23px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-size: ${RFValue(14)}px;
  color: ${({theme, type}) => type === 'total' ? (
    theme.colors.shape) : ( 
    theme.colors.text_dark)};
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<TypeProps>`
  color: ${({theme}) => theme.colors.success};
  font-size: ${RFValue(40)}px;

  ${({type, theme}) => type === 'up' && css`
    color: ${({theme}) => theme.colors.success};
  `}

  ${({type, theme}) => type === 'down' && css`
    color: ${({theme}) => theme.colors.attention};
  `}

  ${({type, theme}) => type === 'total' && css`
    color: ${({theme}) => theme.colors.shape};
  `}
`;

export const Footer = styled.View`

`;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({theme, type}) => type === 'total' ? (
    theme.colors.shape) : ( 
    theme.colors.text_dark)};;
  margin-top: 38px; 
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme, type}) => type === 'total' ? (
    theme.colors.shape) : ( 
    theme.colors.text)};
`;