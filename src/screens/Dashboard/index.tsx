import React from 'react';
import { HighLighCard } from '../../components/HighLighCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { 
  Container, 
  Header,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
  Icon,
  HighlighCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton
 } from './styles';


 export interface TransactionsListProps extends TransactionCardProps {
  id: string;
 }


export function Dashboard() {
  const lista: TransactionsListProps[] = [ 
    {
      id: '1',
      title: 'Desenvolvimento de site',
      type: 'positive',
      date: "13/04/2020",
      amount: 'R$ 12.000,00',
      category: {
        icon: "dollar-sign",
        name: 'Vendas'
      },
    },
    {
      id: '2',
      title: 'JBS',
      type: 'negative',
      date: "13/04/2020",
      amount: 'R$ 23,00',
      category: {
        icon: "coffee",
        name: 'Alimentação'
      },
    },
    {
      id: '3',
      title: 'Aluguel AP',
      type: 'negative',
      date: "13/04/2020",
      amount: 'R$ 1.000,00',
      category: {
        icon: "shopping-bag",
        name: 'Casa'
      },
    },

  ]

  return (
    <Container>
      <Header>
        <UserWrapper>

          <UserInfo>
            <Photo 
              source={{uri: "https://avatars.githubusercontent.com/u/42497575?v=4"}} 
            />
            <User>
              <UserGreeting>
                Olá,
              </UserGreeting>
              <UserName>
                Gustavo
              </UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power"/>
          </LogoutButton>
            

        </UserWrapper>

      </Header>

      <HighlighCards>
        <HighLighCard 
          title="Entradas" 
          amount='R$ 17.400,00' 
          lastTransaction='Última entrada dia 13 de abril'
          type='up'
        />
        <HighLighCard 
          title="Saídas" 
          amount='R$ 1.400,00' 
          lastTransaction='Última saída dia 13 de abril'
          type='down'
        />
        <HighLighCard 
          title="Total" 
          amount='R$ 16.000,00' 
          lastTransaction='01 à 16 de abril'
          type='total'
        />    
      </HighlighCards>

      <Transactions>
        <Title>
          Listagem
        </Title>

        <TransactionsList 
          data={lista}
          keyExtractor={(item : TransactionsListProps) => item.id}
          renderItem={({item}) => <TransactionCard data={item} />}
        />

        

      </Transactions>

    </Container>
  )
}