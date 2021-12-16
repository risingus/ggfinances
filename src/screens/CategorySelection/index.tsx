import React from 'react';
import { FlatList, Alert} from 'react-native';
import { Button } from '../../components/Forms/Button';
import { categories } from '../../utils/categories';
import { Category, Container, Footer, Header, Icon, Name, Separator, Title } from './styles';


interface CategoryProps {
  key: string;
  name: string
}


interface CategorySelectionProps {
  category?: CategoryProps;
  setCategory?: (category: CategoryProps) => void;
  closeSelectCategory?: () => void;
}


export function CategorySelection({
  category, 
  setCategory,
  closeSelectCategory
} : CategorySelectionProps) {

  return (
    <Container>
      <Header>
        <Title>
          Categoria
        </Title>
      </Header>

        <FlatList 
          data={categories}
          style={{flex: 1, width: '100%'}}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => (
            <Category
              onPress={() => setCategory(item)}
              isActive={category.key === item.key}
            >
              <Icon name={item.icon} />
              <Name>
                {item.name}
              </Name>
            </Category>
          )}
          ItemSeparatorComponent={() => <Separator />}
        />

        <Footer>

          <Button 
            title="Selecionar" 
            onPress={closeSelectCategory}
          />
          
        </Footer>

      
    </Container>
  )
}