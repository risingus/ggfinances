import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { VictoryPie } from 'victory-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChartContainer, Container, Content, Header, LoadContainer, Month, MonthSelect, MonthSelectButton, MonthSelectIcon, Title } from './style';
import { categories } from '../../utils/categories';
import { HistoryCard } from '../../components/HistoryCard';
import { formatNumberToMoney } from '../../utils/formatValues';
import { useAuth } from '../../hooks/auth';

interface TransactionDataProps {
	type: 'positive' | 'negative';
	name: string;
	amount: string;
	category: string;
	date: string;
}

interface ResumoDataProps {
	category: string;
	formatedAmount: string;
	amount: number;
	color: string;
	key: string;
	percentage?: string;
}

export function Resume() {
	const { user } = useAuth();
	const theme = useTheme();
	const navPadding = useBottomTabBarHeight();
	const [isLoading, setIsloading] = useState(true);
	const [resumoData, setResumoData] = useState<ResumoDataProps[]>([]);
	const [selectedDate, setSelectedDate] = useState(new Date());

	function handleChangeDate(action: 'next' | 'prev') {
		setIsloading(true);

		if (action === 'next') {
			const newDate = addMonths(selectedDate, 1);
			setSelectedDate(newDate);
			return;
		}

		const newDate = subMonths(selectedDate, 1);
		setSelectedDate(newDate);
		setIsloading(false);
	}

	async function loadData() {
		const dataKey = `@ggfinances:transactions:user:${user.id}`;
		const response = await AsyncStorage.getItem(dataKey);
		if (!response) {
			setResumoData([]);
			setIsloading(false);
			return;
		}
		const formattedResponse = response ? JSON.parse(response) : [];
		const expenses = formattedResponse.filter(
			(transaction: TransactionDataProps) =>
				transaction.type === 'negative' &&
				new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
				new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
		);

		const expensesTotalValue = expenses.reduce((acc: number, expense: TransactionDataProps) => {
			return acc + Number(expense.amount);
		}, 0);

		const paymentsByCategory = categories.map((category) => {
			const summary = expenses.reduce(
				(acc: ResumoDataProps, expense: TransactionDataProps) => {
					if (expense.category === category.key) {
						acc.amount += Number(expense.amount);
						acc.category = category.name;
						acc.color = category.color;
						acc.key = category.key;
					}
					return acc;
				},
				{
					amount: 0,
					category: '',
					color: '',
					key: '',
				}
			);

			return summary;
		});

		const resumoInfo = paymentsByCategory.filter((obj) => obj.category !== '');
		const formatedResumoInfo = resumoInfo.map((resumo) => {
			resumo.percentage = `${((resumo.amount / expensesTotalValue) * 100).toFixed(0)}%`;
			resumo.formatedAmount = formatNumberToMoney(resumo.amount);
			return resumo;
		});

		setResumoData(formatedResumoInfo);
		setIsloading(false);
	}

	useFocusEffect(
		useCallback(() => {
			loadData();
		}, [selectedDate])
	);

	return (
		<Container>
			<Header>
				<Title>Resumo</Title>
			</Header>

			<Content
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: navPadding,
					paddingHorizontal: 24,
				}}>
				<MonthSelect>
					<MonthSelectButton onPress={() => handleChangeDate('prev')}>
						<MonthSelectIcon name="chevron-left" />
					</MonthSelectButton>

					<Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

					<MonthSelectButton onPress={() => handleChangeDate('next')}>
						<MonthSelectIcon name="chevron-right" />
					</MonthSelectButton>
				</MonthSelect>

				{isLoading ? (
					<LoadContainer>
						<ActivityIndicator color={theme.colors.primary} size="large" />
					</LoadContainer>
				) : (
					<>
						<ChartContainer>
							<VictoryPie
								data={resumoData}
								x="percentage"
								y="amount"
								colorScale={resumoData.map((category) => category.color)}
								labelRadius={80}
								style={{
									labels: {
										fontSize: RFValue(17),
										fontWeight: 'bold',
										fill: theme.colors.shape,
									},
								}}
							/>
						</ChartContainer>

						{resumoData.map((resumo) => (
							<HistoryCard
								title={resumo.category}
								color={resumo.color}
								amount={resumo.formatedAmount}
								key={resumo.key}
							/>
						))}
					</>
				)}
			</Content>
		</Container>
	);
}

