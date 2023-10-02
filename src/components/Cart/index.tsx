import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Button } from '../Button';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';

import { createOrder } from '../../services/createOrder';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';

import * as Styles from './styles';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmOrder,
  selectedTable,
}: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isCartEmpty = cartItems.length === 0;
  const total = cartItems.reduce(
    (acc, { quantity, product }) => acc + quantity * product.price,
    0
  );

  async function handleConfirmOrder() {
    setIsLoading(true);

    createOrder(selectedTable, cartItems);

    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    setIsModalVisible(false);
    onConfirmOrder();
  }

  return (
    <>
      <OrderConfirmedModal visible={isModalVisible} onOk={handleOk} />

      {!isCartEmpty && (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          renderItem={({ item: cartItem }) => (
            <Styles.Item>
              <Styles.ProductContainer>
                <Styles.Image
                  source={{
                    uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${cartItem.product.imagePath}`,
                  }}
                />

                <Styles.QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </Styles.QuantityContainer>

                <Styles.ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>

                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </Styles.ProductDetails>
              </Styles.ProductContainer>

              <Styles.Actions>
                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Styles.Actions>
            </Styles.Item>
          )}
        />
      )}

      <Styles.Summary>
        <Styles.TotalContainer>
          {!isCartEmpty && (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          )}

          {isCartEmpty && <Text color="#999">Seu carrinho está vazio</Text>}
        </Styles.TotalContainer>

        <Button
          disabled={isCartEmpty}
          onPress={handleConfirmOrder}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Styles.Summary>
    </>
  );
}
