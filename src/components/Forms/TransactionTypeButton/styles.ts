import styled, {css} from 'styled-components/native';
import {Feather} from '@expo/vector-icons'
import {RectButton} from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';


interface IconProps {
  type: 'up' | 'down'
}

interface ContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

interface TextProps {
  isActive: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 48%;
  
  border-width: 1px;
  border-style: solid;
  border-color: ${({theme, isActive}) => !isActive ? (
    theme.colors.text) : 'transparent'};
  border-radius: 5px;

  ${({isActive, type}) => isActive && type === 'up' && css`
    background: ${({theme}) => theme.colors.success_light};
  `}

  ${({isActive, type}) => isActive && type === 'down' && css`
    background: ${({theme}) => theme.colors.attention_light};
  `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin: 0 12px 0 0;
  color: ${({theme, type}) => type === 'up' ?(
    theme.colors.success) : (theme.colors.attention)};

`;

export const Title = styled.Text<TextProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme, isActive}) => isActive ? theme.colors.shape : theme.colors.text_dark};
`;