import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';


export const Container = styled.View`
  background: ${({theme}) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  background: ${({theme}) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(90)}px;
  align-items: center ;
  justify-content: flex-end;
  padding: 0 0 19px 0;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Form =  styled.View`
  flex: 1;
  width: 100%;
  padding: 24px;
  justify-content: space-between;
`;

export const Fields = styled.View`

`;

export const TransactionsTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 16px 0;
`;