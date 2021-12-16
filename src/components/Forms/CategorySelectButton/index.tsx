import React from 'react';
import { Category, Container, Icon } from './styles';

interface CategoryProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({title, onPress}: CategoryProps) {
  return (
    <Container onPress={onPress}>
      <Category>
        {title}
      </Category>
      <Icon name="chevron-down" />
    </Container>
  )
}