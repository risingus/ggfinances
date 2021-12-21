import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from "react-native-gesture-handler";
import {Feather} from '@expo/vector-icons';
import styled from "styled-components/native";


export const Container = styled.View`
  background: ${({theme}) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  background: ${({theme}) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(90)}px;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0 19px 0;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(200)}px 0 0 0;
`;

export const Content = styled.ScrollView`

`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0 0 0;
`;


export const MonthSelectButton = styled(BorderlessButton)`
  
`;


export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;
