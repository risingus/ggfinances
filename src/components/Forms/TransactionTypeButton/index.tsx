import React from 'react';
import { Title, Container, Icon, Button } from './styles';
import {RectButtonProps} from 'react-native-gesture-handler';



interface TransactionButtonProps extends RectButtonProps {
  title: string;
  type: 'positive' | 'negative';
  isActive: boolean;
}


export function TransactionTypeButton({
  title, 
  type, 
  isActive, 
  ...rest}: TransactionButtonProps) {
  return (
    <Container 
      
      isActive={isActive} 
      type={type}
    >
      <Button
        {...rest} 
      >

        <Icon name={type === 'positive' ? (
          'arrow-up-circle') : (
          'arrow-down-circle')} 
          type={type}
        />
        <Title isActive={isActive} >
          {title}
        </Title>

      </Button>
     

    </Container>
  )
}

