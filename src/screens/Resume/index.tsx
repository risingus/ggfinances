import React from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import { Container, Header, Title } from './style';


export function Resume() {
  return (
    <Container>
      <Header>
       <Title>Resumo</Title>
      </Header>

      <HistoryCard title="bla" color='red' amount='454' />
    </Container>
  )
}