import React, { useState } from 'react';
import { 
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Alert,
 } from 'react-native';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { 
  Container, 
  Fields, 
  Form, 
  Header, 
  Title, 
  TransactionsTypes
} from './styles';
import { CategorySelection } from '../CategorySelection';
import { InputForm } from '../../components/Forms/InputForm';


interface CategoryProps {
  key: string;
  name: string
}

interface FormDataProps {
  name: string;
  amount: string;
}

const formSchema = yup.object().shape({
  name: yup
  .string()
  .required('Nome é obrigatório'),
  amount: yup
  .number()
  .typeError('Informe um valor númerico')
  .required('Preço é obrigatório')
  .positive('O valor não pode ser negativo')
})


export function Register() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(formSchema)
  })
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  function handleTransactionsTypeSelect(value: 'up' | 'down') {
    if (transactionType === value) {
      setTransactionType('') 
      return
    }
    setTransactionType(value)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleSelectCategory(value: CategoryProps) {
    setCategory(value)
  }

  function handleRegister(form: FormDataProps) {
    if (!transactionType) return Alert.alert('Selecione o tipo da transação');
    if(category.key === 'category') return Alert.alert('Selecione uma categoria');
    const data = {
      name: form.name,
      amount: form.amount
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <Container>
        <Header>
          <Title>
            Cadastro
          </Title>
        </Header>

        <Form>
    
          <Fields>
            <InputForm 
              placeholder='Nome'
              name="name"
              control={control}
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm 
              placeholder='Preço'
              name="amount"
              control={control}
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>

              <TransactionTypeButton 
                title='Entrada' 
                type="up" 
                onPress={() => handleTransactionsTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton 
                title='Saída' 
                type="down" 
                onPress={() => handleTransactionsTypeSelect('down')}
                isActive={transactionType === 'down'}
              />

            </TransactionsTypes>

            <CategorySelectButton 
              title={category.name} 
              onPress={handleOpenSelectCategoryModal}
            />
            
          </Fields>
        
          <Button 
            title="Enviar" 
            onPress={handleSubmit(handleRegister)} 
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelection 
            category={category}
            setCategory={handleSelectCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>

      </Container>

    </TouchableWithoutFeedback>
   
  )
}