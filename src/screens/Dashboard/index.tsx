import React, { useEffect, useState, useCallback } from 'react';
import {useTheme} from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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
  LogoutButton,
  LoadContainer
} from './styles';
import { formatNumberToMoney, formatStringToDate, formatStringToDateBig } from '../../utils/formatValues';

export interface TransactionsListProps extends TransactionCardProps {
  id: string;

}
interface HighLightDataProps {
  deposits: string;
  total: string;
  withdraws: string;
  lastTransactions?: {
    lastWithdraw?: string;
    lastDeposit?: string;
    lastTransaction?: string;
  }
}


export function Dashboard() {
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionsListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightDataProps>({} as HighLightDataProps);


  function getLastTransactions(value: TransactionsListProps[]) {
    const entries = new Date(Math.max.apply(Math, value.filter((transaction: TransactionsListProps) => transaction.type === 'positive')
    .map((transaction: TransactionsListProps) => new Date(transaction.date).getTime())));

    const withdraws = new Date(Math.max.apply(Math, value.filter((transaction: TransactionsListProps) => transaction.type === 'negative')
    .map((transaction: TransactionsListProps) => new Date(transaction.date).getTime())));

    const totalTransactions = new Date(Math.max.apply(Math, value.map((transaction) => new Date(transaction.date).getTime())))
    
    return {
      lastWithdraw: formatStringToDateBig(withdraws),
      lastDeposit: formatStringToDateBig(entries),
      lastTransaction: formatStringToDateBig(totalTransactions),
    } 
  }

  function getHightLightCardData(value) {
    const lastTransactions = getLastTransactions(value);

    const summary = value.reduce(
      (acc, transaction) => {
        if (transaction.type === 'positive') {
          acc.deposits += transaction.amount;
          acc.total += transaction.amount;
        } else {
          acc.withdraws += transaction.amount;
          acc.total -= transaction.amount;
        }

        return acc;
      },
      {
        deposits: 0,
        withdraws: 0,
        total: 0,
      }
    );


    summary.total = formatNumberToMoney(Number(summary.total));

    summary.deposits = formatNumberToMoney(Number(summary.deposits));

    summary.withdraws = formatNumberToMoney(Number(summary.withdraws));

    summary.lastTransactions = lastTransactions;

    return summary;

  }


  async function loadTransaction() {
    const dataKey = '@ggfinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactionsResponse = response ? JSON.parse(response) : [];

    const summary = await getHightLightCardData(transactionsResponse);

    const formatedTransactions: TransactionsListProps[] = transactionsResponse.map((transaction: TransactionsListProps) => {
      const amount = formatNumberToMoney(Number(transaction.amount))

      const formatedDate = formatStringToDate(transaction.date);

      return {
        id: transaction.id,
        name: transaction.name,
        amount,
        type: transaction.type,
        category: transaction.category,
        date: formatedDate
      }
    })

    setTransactions(formatedTransactions);
    setHighLightData(summary);
    setIsLoading(false)
    console.log(summary)
  }

  useEffect(() => {
    loadTransaction();
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransaction();

  }, []))

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large"/>
        </LoadContainer>
       ) : (
        <>
          <Header>
            <UserWrapper>

              <UserInfo>
                <Photo
                  source={{ uri: "https://avatars.githubusercontent.com/u/42497575?v=4" }}
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

              <LogoutButton onPress={() => { }}>
                <Icon name="power" />
              </LogoutButton>


            </UserWrapper>

          </Header>

          <HighlighCards>
            <HighLighCard
              title="Entradas"
              amount={highLightData.deposits}
              lastTransaction={`Última entrada dia ${highLightData.lastTransactions.lastDeposit}`}
              type='up'
            />
            <HighLighCard
              title="Saídas"
              amount={highLightData.withdraws}
              lastTransaction={`Última saída dia ${highLightData.lastTransactions.lastWithdraw}`}
              type='down'
            />
            <HighLighCard
              title="Total"
              amount={highLightData.total}
              lastTransaction={`01 à ${highLightData.lastTransactions.lastTransaction}`}
              type='total'
            />
          </HighlighCards>

          <Transactions>
            <Title>
              Transações
            </Title>

            <TransactionsList
              data={transactions}
              keyExtractor={(item: TransactionsListProps) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )
      }
    </Container>
  )
}