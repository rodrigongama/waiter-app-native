import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';

import { getCategories } from '../services/getCategories';
import { getProducts } from '../services/getProducts';
import { getProductsByCategory } from '../services/getProductsByCategory';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { Category } from '../types/Category';

import * as Styles from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (itemIndex < 0) return prevState.concat({ quantity: 1, product });

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  }

  async function handleSelectCategory(categoryId: string) {
    setIsLoadingProducts(true);

    let products: Product[] = [];

    if (!categoryId) {
      products = await getProducts();
    } else {
      products = await getProductsByCategory(categoryId);
    }

    setProducts(products);
    setIsLoadingProducts(false);
  }

  useEffect(() => {
    Promise.all([getCategories(), getProducts()]).then(
      ([categories, products]) => {
        setCategories(categories);
        setProducts(products);
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <>
      <Styles.Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading && (
          <Styles.CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </Styles.CenteredContainer>
        )}

        {!isLoading && (
          <>
            <Styles.CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </Styles.CategoriesContainer>

            <Styles.MenuContainer>
              <Menu
                products={products}
                onAddToCart={handleAddToCart}
                loading={isLoadingProducts}
              />
            </Styles.MenuContainer>
          </>
        )}
      </Styles.Container>

      <Styles.Footer>
        <Styles.FooterContainer>
          {!selectedTable && (
            <Button
              disabled={isLoading}
              onPress={() => setIsTableModalVisible(true)}
            >
              Novo pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </Styles.FooterContainer>
      </Styles.Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
