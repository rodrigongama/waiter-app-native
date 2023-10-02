import { FlatList, Modal } from 'react-native';
import { Text } from '../Text';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { formatCurrency } from '../../utils/formatCurrency';
import { Product } from '../../types/Product';

import * as Styles from './styles';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({
  visible,
  onClose,
  product,
  onAddToCart,
}: ProductModalProps) {
  if (!product) return null;

  function handleAddToCart(product: Product) {
    onAddToCart(product);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Styles.Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${product.imagePath}`,
        }}
      >
        <Styles.CloseButton onPress={onClose}>
          <Close />
        </Styles.CloseButton>
      </Styles.Image>

      <Styles.ModalBody>
        <Styles.Header>
          <Text size={24} weight="600">
            {product.name}
          </Text>

          <Text color="#666" style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </Styles.Header>

        {product.ingredients.length > 0 && (
          <Styles.IngredientsContainer>
            <Text weight="600" color="#666">
              Ingredientes
            </Text>

            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              data={product.ingredients}
              keyExtractor={(ingredients) => ingredients._id}
              renderItem={({ item: ingredient }) => (
                <Styles.Ingredient>
                  <Text>{ingredient.icon}</Text>

                  <Text size={14} color="#666" style={{ marginLeft: 20 }}>
                    {ingredient.name}
                  </Text>
                </Styles.Ingredient>
              )}
            />
          </Styles.IngredientsContainer>
        )}
      </Styles.ModalBody>

      <Styles.Footer>
        <Styles.FooterContainer>
          <Styles.PriceContainer>
            <Text color="#666">Preço</Text>

            <Text size={20} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </Styles.PriceContainer>

          <Button onPress={() => handleAddToCart(product)}>
            Adicionar ao pedido
          </Button>
        </Styles.FooterContainer>
      </Styles.Footer>
    </Modal>
  );
}
