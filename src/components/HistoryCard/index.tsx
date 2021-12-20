import React from 'react';
import { Amount, Container, Title } from './style';


interface HistoryCardProps {
  title: string;
  amount: string;
  color: string;
}

export function HistoryCard({color, title, amount}: HistoryCardProps) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>

  )
}