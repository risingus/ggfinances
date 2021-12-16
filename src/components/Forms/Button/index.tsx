import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Title, Container} from './styles';

interface ButtonProps extends TouchableOpacityProps {
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