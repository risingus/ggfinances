import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


export const Container = styled.View`
  background: ${({theme}) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  background: ${({theme}) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0 19px 0;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;