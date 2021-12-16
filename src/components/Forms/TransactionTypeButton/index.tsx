import React from 'react';
import { Title, Container, Icon } from './styles';
import {TouchableOpacityProps} from 'react-native'



interface TransactionButtonProps extends TouchableOpacityProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}


export function TransactionTypeButton({
  title, 
  type, 
  isActive, 
  ...rest}: TransactionButtonProps) {
  return (
    <Container 
      {...rest} 
      isActive={isActive} 
      type={type}
    >
      <Icon name={type === 'up' ? (
        'arrow-up-circle') : (
        'arrow-down-circle')} 
        type={type}
      />
      <Title isActive={isActive} >
        {title}
      </Title>

    </Container>
  )
}

