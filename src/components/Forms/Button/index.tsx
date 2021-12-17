import React from 'react';
import {RectButtonProps} from 'react-native-gesture-handler';
import { Title, Container} from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
}

export function Button({title, ...rest}) {
  return (
    <Container {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  )
}