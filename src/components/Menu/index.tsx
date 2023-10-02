import { useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { Text } from '../Text';
import { ProductModal } from '../ProductModal';
import { PlusCircle } from '../Icons/PlusCircle';
import { Empty } from '../Icons/Empty';

import { formatCurrency } from '../../utils/formatCurrency';
import { Product } from '../../types/Product';

import * as Styles from './styles';

interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
  loading: boolean;
}

export function Menu({ onAddToCart, products, loading }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  if (loading) {
    return (
      <Styles.CenteredContainer>
        <ActivityIndicator color="#d73035" size="large" />
      </Styles.CenteredContainer>
    );
  }

  if (products.length === 0) {
    return (
      <Styles.CenteredContainer>
        <Empty />
        <Text color="#666" style={{ marginTop: 24 }}>
          Nenhum produto foi encontrado
        </Text>
      </Styles.CenteredContainer>
    );
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />

      <FlatList
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        data={products}
        keyExtractor={(product) => product._id}
        ItemSeparatorComponent={Styles.Separator}
        renderItem={({ item: product }) => (
          <Styles.Product onPress={() => handleOpenModal(product)}>
            <Styles.ProductImage
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${product.imagePath}`,
              }}
            />

            <Styles.ProductDetails>
              <Text weight="600">{product.name}</Text>

              <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                {product.description}
              </Text>

              <Text size={14} weight="600">
                {formatCurrency(product.price)}
              </Text>
            </Styles.ProductDetails>

            <Styles.AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </Styles.AddToCartButton>
          </Styles.Product>
        )}
      />
    </>
  );
}
