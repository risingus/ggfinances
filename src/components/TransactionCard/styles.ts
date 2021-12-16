import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';


interface TransactionTypeProps {
  type: string;
}


export const Container = styled.View`
  background: ${({theme}) => theme.colors.shape};
  border-radius: 5px;
  padding: 17px 24px;
  margin: 0 0 16px 0;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const Amount = styled.Text<TransactionTypeProps>`
  font-size: ${RFValue(20)}px;
  margin: 2px 0 0 0;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme, type}) => type === 'positive' ? (
    theme.colors.success
    ) : (
      theme.colors.attention
    )}
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 19px 0 0 0;

`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.text};

`;

export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text};
  margin: 0 0 0 17px;
`;

export const Date = styled.Text`
font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.regular};

`;