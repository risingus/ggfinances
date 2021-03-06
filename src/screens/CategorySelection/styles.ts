import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface CategoryProps {
  isActive: boolean;
  onPress: () => void;
}

interface TextIconProps {
  isActive: boolean;
}


export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background: ${({theme}) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding: 0 0 19px 0;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;
  flex-direction: row;
  align-items: center;

  background: ${({theme, isActive}) => isActive ? (
    theme.colors.primary_light) : (
    theme.colors.background)};
`;

export const Icon = styled(Feather)<TextIconProps>`
  font-size: ${RFValue(20)}px;
  margin: 0 16px 0 0;

  color: ${({theme, isActive}) => isActive ? (
    theme.colors.shape) : (
    theme.colors.text_dark)};
`;

export const Name = styled.Text<TextIconProps>`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({theme, isActive}) => isActive ? (
    theme.colors.shape) : (
    theme.colors.text_dark)};
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background: ${({theme}) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;

`;