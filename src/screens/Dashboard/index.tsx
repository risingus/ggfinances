import React, { useState, useCallback } from 'react';
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
import { useAuth } from '../../hooks/auth';

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
	};
}

export function Dashboard() {
	const theme = useTheme();
	const { signOut, user } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState<TransactionsListProps[]>([]);
	const [highLightData, setHighLightData] = useState<HighLightDataProps>({} as HighLightDataProps);

	function getLastTransactions(value: TransactionsListProps[]) {
		const testEntries = value.filter((transaction) => transaction.type === 'positive');
		const testWithdraws = value.filter((transaction) => transaction.type === 'negative');

		const entries = new Date(
			Math.max.apply(
				Math,
				testEntries.map((transaction: TransactionsListProps) =>
					new Date(transaction.date).getTime()
				)
			)
		);

		const withdraws = new Date(
			Math.max.apply(
				Math,
				testWithdraws.map((transaction: TransactionsListProps) =>
					new Date(transaction.date).getTime()
				)
			)
		);

		const totalTransactions = new Date(
			Math.max.apply(
				Math,
				value.map((transaction) => new Date(transaction.date).getTime())
			)
		);

		return {
			lastWithdraw: testWithdraws.length >= 1 ? formatStringToDateBig(withdraws) : '',
			lastDeposit: testEntries.length >= 1 ? formatStringToDateBig(entries) : '',
			lastTransaction: value.length >= 1 ? formatStringToDateBig(totalTransactions) : '',
		};
	}

	function getHightLightCardData(value) {
		if (!value) {
			const summary = {
				total: '',
				deposits: '',
				withdraws: '',
				lastTransactions: {
					lastWithdraw: '',
					lastDeposit: '',
					lastTransaction: '',
				},
			};
			return summary;
		}

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
		const dataKey = `@ggfinances:transactions:user:${user.id}`;
		const response = await AsyncStorage.getItem(dataKey);
		const transactionsResponse = response ? JSON.parse(response) : [];
		const summary = await getHightLightCardData(transactionsResponse);

		const formatedTransactions: TransactionsListProps[] = transactionsResponse.map(
			(transaction: TransactionsListProps) => {
				const amount = formatNumberToMoney(Number(transaction.amount));

				const formatedDate = formatStringToDate(transaction.date);

				return {
					id: transaction.id,
					name: transaction.name,
					amount,
					type: transaction.type,
					category: transaction.category,
					date: formatedDate,
				};
			}
		);
		setTransactions(formatedTransactions);
		setHighLightData(summary);
		setIsLoading(false);
	}

	useFocusEffect(
		useCallback(() => {
			loadTransaction();
		}, [])
	);

	return (
		<Container>
			{isLoading ? (
				<LoadContainer>
					<ActivityIndicator color={theme.colors.primary} size="large" />
				</LoadContainer>
			) : (
				<>
					<Header>
						<UserWrapper>
							<UserInfo>
								<Photo source={{ uri: `${user.photo }`}} />
								<User>
									<UserGreeting>Olá,</UserGreeting>
									<UserName>{user.name}</UserName>
								</User>
							</UserInfo>

							<LogoutButton onPress={signOut}>
								<Icon name="power" />
							</LogoutButton>
						</UserWrapper>
					</Header>

					<HighlighCards>
						<HighLighCard
							title="Entradas"
							amount={highLightData.deposits}
							lastTransaction={
								highLightData.lastTransactions.lastDeposit
									? `Última entrada dia ${highLightData.lastTransactions.lastDeposit}`
									: `Nenhuma entrada efetuada`
							}
							type="up"
						/>
						<HighLighCard
							title="Saídas"
							amount={highLightData.withdraws}
							lastTransaction={
								highLightData.lastTransactions.lastWithdraw
									? `Última saída dia ${highLightData.lastTransactions.lastWithdraw}`
									: `Nenhuma gasto registrado`
							}
							type="down"
						/>
						<HighLighCard
							title="Total"
							amount={highLightData.total}
							lastTransaction={
								highLightData.lastTransactions.lastTransaction
									? `01 à ${highLightData.lastTransactions.lastTransaction}`
									: ''
							}
							type="total"
						/>
					</HighlighCards>

					<Transactions>
						<Title>{transactions.length >= 1 ? 'Transações' : ''}</Title>

						<TransactionsList
							data={transactions}
							keyExtractor={(item: TransactionsListProps) => item.id}
							renderItem={({ item }) => <TransactionCard data={item} />}
						/>
					</Transactions>
				</>
			)}
		</Container>
	);
}