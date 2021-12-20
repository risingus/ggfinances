import React from 'react';
import { categories } from '../../utils/categories';
import { 
  Amount, 
  Category, 
  CategoryName, 
  Container, 
  Footer, 
  Icon, Title, 
  Date 
} from './styles';


export interface TransactionCardProps {
  name: string;
  amount: string;
  category: string;
  date: string;
  type: 'positive' | 'negative';
}

export interface DataProps {
  data: TransactionCardProps
}


export function TransactionCard({
  data: {
    name,
    amount,
    category,
    date,
    type
  }
} : DataProps)  {
  const categoryProps = categories.find(
    item => item.key === category
  );
  return (
    <Container>
      <Title>{name}</Title>

      <Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={categoryProps.icon} />
          <CategoryName>{categoryProps.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>


    </Container>
  )

}