import React from 'react';
import { 
  Amount, 
  Category, 
  CategoryName, 
  Container, 
  Footer, 
  Icon, Title, 
  Date 
} from './styles';


interface CategoryProps {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  title: string;
  amount: string;
  category: CategoryProps;
  date: string;
  type: 'positive' | 'negative';
}

export interface DataProps {
  data: TransactionCardProps
}


export function TransactionCard({
  data: {
    title,
    amount,
    category,
    date,
    type
  }
} : DataProps)  {
  return (
    <Container>
      <Title>{title}</Title>

      <Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>


    </Container>
  )

}