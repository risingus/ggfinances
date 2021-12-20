import React, { useState } from 'react';
import { 
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Alert,
} from 'react-native';
import {useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';
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
    reset,
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
  const {navigate}: NavigationProp<ParamListBase>  = useNavigation()

  function handleTransactionsTypeSelect(value: 'positive' | 'negative') {
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

  async function handleRegister(form: FormDataProps) {
    const dataKey = '@ggfinances:transactions';
    if (!transactionType) return Alert.alert('Selecione o tipo da transação');
    if(category.key === 'category') return Alert.alert('Selecione uma categoria');
    
    const newTransaction = {
      id: `${uuid.v4()}`,
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const data  = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ];
      
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });
      reset();
      navigate('Listagem');

      
    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possível salvar")
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
                type="positive" 
                onPress={() => handleTransactionsTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton 
                title='Saída' 
                type="negative" 
                onPress={() => handleTransactionsTypeSelect('negative')}
                isActive={transactionType === 'negative'}
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